import {simulate,WIDTH,HEIGHT} from './model.mjs';
const form=document.querySelector('#lab-controls'), canvas=document.querySelector('canvas'), ctx=canvas.getContext('2d');
const slider=document.querySelector('#round'), status=document.querySelector('#lab-status');
const names={swarm:'Three-rule swarm',solo:'Central learner',random:'Random control'};
const colors={swarm:'#a95441',solo:'#426e69',random:'#817565'};
let result,index=0,playing=false,last=0;
function params(){return {seed:Number(form.elements.seed.value),agents:Number(form.elements.agents.value),explore:Number(form.elements.explore.value),share:Number(form.elements.share.value),shift:form.elements.shift.checked};}
function draw(){
 const f=result.frames[index], panelW=360, panelH=270, scale=13;
 canvas.width=1080;canvas.height=270;ctx.fillStyle='#f5f1e8';ctx.fillRect(0,0,1080,270);
 for(let k=0;k<3;k++){
  const ox=k*panelW+22,oy=38;ctx.fillStyle=colors[f.arms[k].name];ctx.font='16px Georgia';ctx.fillText(names[f.arms[k].name],ox,22);
  for(let y=0;y<HEIGHT;y++)for(let x=0;x<WIDTH;x++){
   let v=0;for(const [cx,cy] of f.centers){const dx=Math.min(Math.abs(x-cx),WIDTH-Math.abs(x-cx)),dy=Math.min(Math.abs(y-cy),HEIGHT-Math.abs(y-cy));v=Math.max(v,Math.exp(-(dx*dx+dy*dy)/12));}
   ctx.fillStyle=`rgba(200,166,78,${0.05+v*0.55})`;ctx.fillRect(ox+x*scale,oy+y*scale,scale-1,scale-1);
  }
  ctx.fillStyle=colors[f.arms[k].name];for(const c of f.arms[k].positions){ctx.beginPath();ctx.arc(ox+(c%WIDTH+.5)*scale,oy+(Math.floor(c/WIDTH)+.5)*scale,3,0,2*Math.PI);ctx.fill();}
 }
 slider.value=String(index);status.textContent=`Round ${f.round} / ${result.settings.rounds} · ${result.settings.shift&&f.round>result.changeAt?'Food has moved':'Original food locations'} · ${result.settings.agents*f.round} observations per arm`;
 document.querySelector('#scores').innerHTML=f.arms.map(a=>`<div><strong>${names[a.name]}</strong><b>${a.mean.toFixed(3)}</b><span>mean reward / observation</span></div>`).join('');
}
function reset(){playing=false;document.querySelector('#play').textContent='Play';if(!form.reportValidity())return;try{result=simulate(params());}catch(error){status.textContent=error.message;return;}index=0;slider.max=String(result.frames.length-1);draw();}
form.addEventListener('submit',event=>{event.preventDefault();reset();});
form.addEventListener('change',reset);
document.querySelector('#play').addEventListener('click',()=>{if(index===result.frames.length-1)index=0;playing=!playing;document.querySelector('#play').textContent=playing?'Pause':'Play';});
document.querySelector('#reset').addEventListener('click',reset);
document.querySelector('#next-seed').addEventListener('click',()=>{form.elements.seed.value=String((Number(form.elements.seed.value)+1)>>>0);reset();});
slider.addEventListener('input',()=>{playing=false;document.querySelector('#play').textContent='Play';index=Number(slider.value);draw();});
document.querySelector('#download').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([JSON.stringify(result,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=`three-rules-seed-${result.settings.seed}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
function animate(t){if(playing&&t-last>95){last=t;if(index<result.frames.length-1){index++;draw();}else{playing=false;document.querySelector('#play').textContent='Play';}}requestAnimationFrame(animate);}
reset();requestAnimationFrame(animate);
