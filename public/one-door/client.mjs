import {simulate,DEFAULTS} from './model.mjs';
const form=document.querySelector('#door-controls');
const canvas=document.querySelector('#door-view'),ctx=canvas.getContext('2d');
const slider=document.querySelector('#tick'),play=document.querySelector('#play');
const names=['One large carrier','Six medium carriers','Twenty-four small carriers'];
const colors=['#8f5d3e','#326d63','#555c8e'];
let run, tick=0, playing=false,last=0;
function controls(){const f=new FormData(form);return Object.fromEntries(Object.keys(DEFAULTS).map(k=>[k,Number(f.get(k))]));}
function stop(){playing=false;play.textContent='Play';}
function reset(){stop();try{run=simulate(controls());tick=0;draw();}catch(e){document.querySelector('#lab-status').textContent=e.message;}}
function draw(){
 const f=run.frames[tick];slider.value=String(tick);
 document.querySelector('#lab-status').textContent=`Round ${tick} / 120 · ${tick<61?'Disruption arrives at round 61':run.shock.correlated?'Shared failure draw applied':'Independent unit failures applied'}`;
 document.querySelector('#score-body').innerHTML=f.arms.map((a,i)=>`<tr><th scope="row">${names[i]}</th><td>${a.total}</td><td>${a.post}</td><td>${a.units.filter(u=>u.alive).length} / ${a.n}</td></tr>`).join('');
 const w=Math.max(300,Math.round(canvas.getBoundingClientRect().width));canvas.width=w;canvas.height=615;
 ctx.clearRect(0,0,w,615);ctx.fillStyle='#f7f3eb';ctx.fillRect(0,0,w,615);
 f.arms.forEach((a,i)=>{
  const y=i*205;ctx.fillStyle='#302f29';ctx.font=(w<500?'16':'20')+'px Georgia';ctx.fillText(names[i],24,y+29);
  ctx.font='13px sans-serif';ctx.fillStyle='#68675f';ctx.fillText(`${24/a.n} work units per crossing`,24,y+50);
  ctx.fillStyle='#ddd7ca';ctx.fillRect(w-48,y+67,6,110);ctx.clearRect(w-50,y+108,10,32);
  ctx.fillStyle='#f7f3eb';ctx.fillRect(w-50,y+108,10,32);
  ctx.fillStyle=colors[i];ctx.font='22px Georgia';ctx.textAlign='right';ctx.fillText(String(a.total),w-20,y+29);ctx.textAlign='left';
  for(const u of a.units){
   const served=a.served.includes(u.id),ready=u.readyAt<=tick, x=served?w-45:(32+(u.id%8)*(w-110)/8),cy=y+88+Math.floor(u.id/8)*37;
   const size=a.n===1?20:a.n===6?13:8;
   ctx.fillStyle=!u.alive?'#c5bfb5':served?'#b88730':ready?colors[i]:'#9cafaa';ctx.beginPath();ctx.arc(x,cy,size,0,Math.PI*2);ctx.fill();
   if(!u.alive){ctx.strokeStyle='#766e62';ctx.beginPath();ctx.moveTo(x-6,cy-6);ctx.lineTo(x+6,cy+6);ctx.moveTo(x+6,cy-6);ctx.lineTo(x-6,cy+6);ctx.stroke();}
  }
  ctx.strokeStyle='#ddd7ca';ctx.beginPath();ctx.moveTo(24,y+196);ctx.lineTo(w-24,y+196);ctx.stroke();
 });
 const chart=document.querySelector('#curve'),c=chart.getContext('2d');const cw=Math.max(300,Math.round(chart.getBoundingClientRect().width));chart.width=cw;chart.height=240;const span=cw-75;c.clearRect(0,0,cw,240);
 const max=Math.max(1,...run.summary.map(a=>a.total));
 c.strokeStyle='#d2cdc2';c.beginPath();c.moveTo(50,20);c.lineTo(50,205);c.lineTo(cw-25,205);c.stroke();
 c.font='13px sans-serif';c.fillStyle='#69665f';c.fillText(`${max} work units`,50,14);c.fillText('0',30,210);c.fillText('120 rounds',cw-92,233);
 c.setLineDash([4,4]);c.beginPath();c.moveTo(50+span*61/120,20);c.lineTo(50+span*61/120,205);c.stroke();c.setLineDash([]);
 c.fillText('disruption',50+span*61/120+8,30);
 for(let i=0;i<3;i++){c.strokeStyle=colors[i];c.lineWidth=2.5;c.beginPath();for(let t=0;t<=tick;t++){const x=50+span*t/120,y=205-175*run.frames[t].arms[i].total/max;if(t===0)c.moveTo(x,y);else c.lineTo(x,y);}c.stroke();}
}
form.addEventListener('submit',e=>e.preventDefault());form.addEventListener('change',reset);
play.addEventListener('click',()=>{if(playing){stop();return;}if(tick===120)tick=0;playing=true;last=0;play.textContent='Pause';requestAnimationFrame(animate);});
function animate(now){if(!playing)return;if(now-last>=100){tick=Math.min(120,tick+1);last=now;draw();if(tick===120)stop();}if(playing)requestAnimationFrame(animate);}
slider.addEventListener('input',()=>{stop();tick=Number(slider.value);draw();});
document.querySelector('#reset').addEventListener('click',reset);
document.querySelector('#next-seed').addEventListener('click',()=>{form.elements.namedItem('seed').value=String((controls().seed+1)>>>0);reset();});
document.querySelector('#defaults').addEventListener('click',()=>{for(const [k,v]of Object.entries(DEFAULTS))form.elements.namedItem(k).value=String(v);reset();});
document.querySelector('#download').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(run,null,2)+'\n'],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`one-door-seed-${run.settings.seed}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});reset();

new ResizeObserver(()=>{if(run)draw();}).observe(canvas.parentElement);
