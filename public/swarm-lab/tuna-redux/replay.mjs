const mode=document.querySelector('#rule');
const play=document.querySelector('#play');
const runs={};
let frames=[];
const stations=[{id:0,x:8,y:8},{id:1,x:92,y:8},{id:2,x:92,y:92},{id:3,x:8,y:92}];
const cableEnds=[[0,1],[1,2],[2,3],[3,0]];
const svg=document.getElementById('ocean'),slider=document.getElementById('tick'),label=document.getElementById('tickLabel');
const ns='http://www.w3.org/2000/svg';let timer=null;
function el(name,attrs){const node=document.createElementNS(ns,name);for(const [k,v] of Object.entries(attrs))node.setAttribute(k,v);return node}
function render(index){const f=frames[index];svg.replaceChildren();
 for(const p of f.partitions)svg.append(el('rect',{x:p.x-1,y:p.y_min,width:2,height:p.y_max-p.y_min,class:'partition'}));
 for(const c of f.cables){const ends=cableEnds[c.id],a=stations[ends[0]],b=stations[ends[1]];svg.append(el('line',{x1:a.x,y1:a.y,x2:b.x,y2:b.y,class:'cable '+(c.broken?'broken':'')}))}
 for(const s of stations){const d=`M ${s.x} ${s.y-2} L ${s.x+2} ${s.y} L ${s.x} ${s.y+2} L ${s.x-2} ${s.y} Z`;svg.append(el('path',{d,class:'station'}));const t=el('text',{x:s.x+2.7,y:s.y+1,class:'label'});t.textContent='S'+s.id;svg.append(t)}
 const colors={REPAIR:'#ae621c',MOVE:'#35698d',RECHARGE:'#35698d',RELAY:'#42755d',HOLD:'#42755d'};
 for(const a of f.agents){const circle=el('circle',{cx:a.x,cy:a.y,r:1.15,fill:a.active?(colors[a.action]||'#42755d'):'#555956',class:'agent '+(a.active?'':'down')});const tip=el('title',{});tip.textContent=`A${a.id} · ${a.action} · energy ${a.energy}`;circle.append(tip);svg.append(circle)}
 const status=document.getElementById('status');status.textContent=f.service_connected?'NETWORK CONNECTED':'NETWORK PARTITIONED';status.className='status '+(f.service_connected?'ok':'bad');
 document.getElementById('detail').textContent=`terminals ${(f.station_fraction*100).toFixed(0)}% · energy ${f.energy_cost.toFixed(2)} · messages ${f.communication_messages} · repairs ${f.repairs} · escalations ${f.human_escalations}`;
 const homeCount=f.agents.filter(a=>Math.hypot(a.x-(16+(a.id%8)*68/7),a.y-(16+Math.floor(a.id/8)*68/3))<=0.401).length;
 document.querySelector('#homes').textContent=homeCount+' / 32 at home';
 slider.value=index;label.textContent='t='+f.tick}

function pause(){
 clearInterval(timer);timer=null;play.textContent='Play';
}
function selectRun(){
 pause();frames=runs[mode.value];
 const timeline=document.querySelector('#timeline');
 timeline.replaceChildren();
 for(const f of frames){
  const mark=document.createElement('i');
  mark.style.background=f.service_connected?'#598371':'#ae493f';
  mark.title='Tick '+f.tick+(f.service_connected?' connected':' partitioned');
  timeline.append(mark);
 }
 render(Number(slider.value));
}
async function start(){
 for(const rule of ['on','off']){
  const response=await fetch('/swarm-lab/tuna-redux/recall-'+rule+'.json');
  if(!response.ok) throw Error('Unable to load replay');
  runs[rule]=await response.json();
 }
 selectRun();
 for(const control of [mode,play,slider]) control.disabled=false;
 mode.addEventListener('change',selectRun);
 slider.addEventListener('input',()=>{pause();render(Number(slider.value));});
 play.addEventListener('click',()=>{
  if(timer){pause();return;}
  play.textContent='Pause';
  timer=setInterval(()=>render((Number(slider.value)+1)%frames.length),180);
 });
}
start().catch(()=>{document.querySelector('#status').textContent='Replay unavailable. Reload to try again.';});
