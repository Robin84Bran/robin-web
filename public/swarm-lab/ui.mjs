import {experiments,compare,VERSION} from './lab.mjs';
const root=document.querySelector('[data-swarm-lab]');
if(root){
 const e=experiments.find(x=>x.id===root.dataset.swarmLab),form=root.querySelector('form'),canvas=root.querySelector('canvas'),ctx=canvas.getContext('2d');
 const timeline=root.querySelector('[name="time"]'),readout=root.querySelector('[data-readout]'),notice=root.querySelector('[data-notice]'),play=root.querySelector('[data-play]');
 const colors=['#59736a','#bd674e','#9a7a36'];let runs=[],time=0,timer=null;
 const controls=[...form.querySelectorAll('[data-param]')];
 const params=()=>Object.fromEntries(controls.map(c=>[c.name,c.type==='checkbox'?c.checked:c.tagName==='SELECT'?c.value:Number(c.value)]));
 const url=new URL(location.href);
 for(const c of controls){const v=url.searchParams.get(c.name);if(v!==null){if(c.type==='checkbox')c.checked=v==='true';else c.value=v;}}
 function pause(){clearInterval(timer);timer=null;play.textContent='Play';play.setAttribute('aria-pressed','false');}
 function restart(){pause();try{if(!form.checkValidity())throw Error('Please keep values within the displayed limits.');runs=compare(e.id,params());time=0;timeline.max=String(runs[0].history.length-1);notice.textContent='Ready. Same seed, matched starting conditions.';draw();}catch(err){runs=[];ctx.clearRect(0,0,canvas.width,canvas.height);readout.textContent='No valid run. Correct the controls to continue.';notice.textContent=err.message;}}
 function line(x1,y1,x2,y2,color,width=1){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.stroke();}
 function text(s,x,y,size=12,color='#514f45'){ctx.fillStyle=color;ctx.font=`${size}px system-ui, sans-serif`;ctx.fillText(s,x,y);}
 function dot(x,y,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill();}
 function draw(){
  if(!runs.length)return;timeline.value=String(time);root.querySelector('[data-time]').textContent=`${e.id==='mars-jar'?'Day':'Step'} ${time} / ${timeline.max}`;
  const w=canvas.clientWidth,mobile=w<650,pw=mobile?w:w/runs.length,ph=mobile?230:270,nrows=mobile?runs.length:1,h=nrows*ph+220,dpr=Math.min(devicePixelRatio||1,2);
  canvas.height=Math.round(h*dpr);canvas.width=Math.round(w*dpr);canvas.style.height=h+'px';ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);
  runs.forEach((r,i)=>{
   const f=r.history[time],ox=mobile?0:i*pw,oy=mobile?i*ph:0,cx=ox+pw/2,cy=oy+ph/2+6,scale=Math.min(pw-40,ph-65);
   text(`${String(i+1).padStart(2,'0')}  ${e.labels[i]}`,ox+15,oy+22,13,colors[i]);
   if(e.id==='cell-city'){
    const cell=Math.min((pw-34)/16,(ph-65)/12),sx=cx-cell*8,sy=oy+42;
    f.cells.forEach((v,j)=>{const group=Math.floor(j/16),within=j%16,x=(group%4)*4+within%4,y=Math.floor(group/4)*4+Math.floor(within/4);ctx.fillStyle=v?'#668375':'#c37a63';ctx.fillRect(sx+x*cell+(x%4===0?2:0),sy+y*cell+(y%4===0?2:0),cell-2,cell-2);});
   }else if(e.id==='self-assembly'){
    ctx.strokeStyle='#c9c4b6';ctx.lineWidth=1;ctx.beginPath();if(r.params.boundary==='dish')ctx.arc(cx,cy,scale*.45,0,2*Math.PI);else ctx.rect(cx-scale*.46,cy-scale*.46,scale*.92,scale*.92);ctx.stroke();
    for(let a=0;a<f.cells.length;a++)for(let b=a+1;b<f.cells.length;b++){const u=f.cells[a],v=f.cells[b];if(Math.hypot(u.x-v.x,u.y-v.y)<.085)line(cx+(u.x-.5)*scale,cy+(u.y-.5)*scale,cx+(v.x-.5)*scale,cy+(v.y-.5)*scale,'#66837555');}
    f.cells.forEach(c=>dot(cx+(c.x-.5)*scale,cy+(c.y-.5)*scale,3.7,colors[i]));
    text(`${f.survivors} particles · ${f.removed} removed`,ox+15,oy+ph-8,11);
   }else if(e.id==='mars-jar'){
    const barw=(pw-70)/3,bh=ph-115,base=oy+ph-48;
    f.stock.forEach((v,j)=>{const x=ox+20+j*(barw+10);ctx.fillStyle='#dedbd0';ctx.fillRect(x,base-bh,barw,bh);ctx.fillStyle=['#7094a3','#668375','#b99550'][j];const frac=Math.min(1,v/r.params.initial[j]);ctx.fillRect(x,base-bh*frac,barw,bh*frac);text(['Water','Oxygen','Food'][j],x,base+18,11);text(v.toFixed(1),x,base-bh-8,12);});
    text(f.alive?`Plant integrity ${(f.integrity*100).toFixed(0)}%`:`Failed day ${r.summary.failedAt}; state frozen`,ox+15,oy+ph-8,11,f.alive?'#514f45':'#ae463b');
   }else{
    const gap=Math.min((pw-40)/12,(ph-72)/10),sx=cx-gap*5.5,sy=oy+49;
    for(let j=1;j<=120;j++){const f2=r.history[j];dot(sx+((j-1)%12)*gap,sy+Math.floor((j-1)/12)*gap,Math.max(2,gap*.3),j>time?'#ddd9cd':f2.correct?'#668375':'#c37a63');}
    text(`${f.repeatMistakes} repeated mistakes`,ox+15,oy+ph-8,11);
   }
  });
  const top=nrows*ph+32,left=42,right=w-20,bottom=h-32,max=e.id==='mars-jar'?Math.max(1,...runs.flatMap(r=>r.history.map(f=>f.value))):1;
  for(let j=0;j<=4;j++){const y=bottom-(bottom-top)*j/4;line(left,y,right,y,'#dcd7ca');text(e.id==='mars-jar'?(max*j/4).toFixed(0):`${j*25}%`,2,y+4,10);}
  const marker=e.id==='self-assembly'?[90]:e.id==='mars-jar'?[30]:e.id==='memory-islands'?[40,80]:[];
  marker.forEach(t=>{const x=left+(right-left)*t/Number(timeline.max);ctx.setLineDash([3,4]);line(x,top,x,bottom,'#aaa391');ctx.setLineDash([]);text(String(t),x+3,top-6,10);});
  runs.forEach((r,i)=>{ctx.beginPath();ctx.strokeStyle=colors[i];ctx.lineWidth=2;ctx.setLineDash(i===0?[5,3]:[]);r.history.slice(0,time+1).forEach((f,j)=>{const x=left+(right-left)*j/Number(timeline.max),y=bottom-(bottom-top)*f.value/max;j?ctx.lineTo(x,y):ctx.moveTo(x,y);});ctx.stroke();ctx.setLineDash([]);});
  text('0',left,bottom+17,10);text(`${timeline.max} ${e.id==='mars-jar'?'days':'steps'}`,right-66,bottom+17,10);text(e.unit,left,top-15,11);
  readout.replaceChildren(...runs.map((r,i)=>{const f=r.history[time],p=document.createElement('p'),b=document.createElement('strong');b.textContent=e.labels[i]+': ';p.append(b,document.createTextNode(e.id==='mars-jar'?`${f.value.toFixed(1)} crew-days of limiting stock · ${f.alive?'operating':'failed, frozen'} · ${f.lost.reduce((a,b)=>a+b,0).toFixed(1)} total units lost`:`${(f.value*100).toFixed(1)}% ${e.unit}`));return p;}));
 }
 form.addEventListener('submit',ev=>ev.preventDefault());
 controls.forEach(c=>c.addEventListener('change',()=>{const out=c.parentElement.querySelector('output');if(out)out.textContent=c.value;restart();}));
 play.addEventListener('click',()=>{if(!runs.length)return;if(timer){pause();return;}if(time>=Number(timeline.max))time=0;play.textContent='Pause';play.setAttribute('aria-pressed','true');timer=setInterval(()=>{time++;draw();if(time>=Number(timeline.max))pause();},85);});
 root.querySelector('[data-step]').addEventListener('click',()=>{pause();time=Math.min(time+1,Number(timeline.max));draw();});
 root.querySelector('[data-reset]').addEventListener('click',restart);
 root.querySelector('[data-next]').addEventListener('click',()=>{form.elements.seed.value=(Number(form.elements.seed.value)+1)>>>0;restart();});
 timeline.addEventListener('input',()=>{pause();time=Number(timeline.value);draw();});
 root.querySelector('[data-share]').addEventListener('click',async()=>{if(!runs.length)return;const u=new URL(location.href);u.search='';for(const[k,v]of Object.entries(params()))u.searchParams.set(k,String(v));u.searchParams.set('v',VERSION);history.replaceState(null,'',u);try{await navigator.clipboard.writeText(u.href);notice.textContent='Replay link copied: same version, seed and controls.';}catch{notice.textContent='Replay link is now in the address bar. Copy it to share.';}});
 for(const kind of ['json','csv'])root.querySelector(`[data-export="${kind}"]`).addEventListener('click',()=>{
  if(!runs.length)return;
  const data=kind==='json'?JSON.stringify({version:VERSION,experiment:e.id,controls:params(),runs},null,2):['version,seed,arm,step,metric,value',...runs.flatMap((r,i)=>r.history.map(f=>`${VERSION},${r.seed},${e.labels[i]},${f.t},${e.id==='mars-jar'?'daysReserve':e.metric},${f.value}`))].join('\n');
  const link=document.createElement('a'),blob=URL.createObjectURL(new Blob([data],{type:kind==='json'?'application/json':'text/csv'}));link.href=blob;link.download=`${e.id}-seed-${params().seed}.${kind}`;link.click();setTimeout(()=>URL.revokeObjectURL(blob),1000);notice.textContent=`Full ${kind.toUpperCase()} run downloaded.`;
 });
 document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});window.addEventListener('pagehide',pause);new ResizeObserver(draw).observe(canvas);
 controls.forEach(c=>{const out=c.parentElement.querySelector('output');if(out)out.textContent=c.value;});
 restart();if(url.searchParams.has('v')&&url.searchParams.get('v')!==VERSION)notice.textContent=`This is model ${VERSION}; the link requested another version. Do not treat it as an exact replay.`;
 root.querySelectorAll('button,input,select').forEach(c=>c.disabled=false);
}
