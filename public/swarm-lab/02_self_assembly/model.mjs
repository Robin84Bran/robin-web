import {rng,clamp,checked,seedOf} from '../shared.mjs';
export const id='self-assembly';
function largest(cells){const unseen=new Set(cells.map((_,i)=>i));let best=0;while(unseen.size){const queue=[unseen.values().next().value];unseen.delete(queue[0]);let n=0;while(queue.length){const i=queue.pop();n++;for(const j of unseen)if(Math.hypot(cells[i].x-cells[j].x,cells[i].y-cells[j].y)<.085){unseen.delete(j);queue.push(j);}}best=Math.max(best,n);}return cells.length?best/cells.length:0;}
export function run(p={}){
 const seed=seedOf(p),adhesion=checked(p,'adhesion',.8,0,1),range=checked(p,'range',.22,.1,.4),damage=p.damage!==false,boundary=p.boundary??'dish';
 if(!['dish','square'].includes(boundary))throw new RangeError('boundary');
 const random=rng(seed),history=[];
 let cells=Array.from({length:72},(_,i)=>{const a=random()*Math.PI*2,r=Math.sqrt(random())*.36;return {id:i,x:.5+r*Math.cos(a),y:.5+r*Math.sin(a)};});
 let removed=0;
 function frame(t){return {t,value:largest(cells),connected:largest(cells),survivors:cells.length,removed,cells:cells.map(x=>({...x}))};}
 history.push(frame(0));
 for(let t=1;t<=160;t++){
  if(t===90&&damage){const order=[...cells].sort((a,b)=>Math.hypot(a.x-.5,a.y-.5)-Math.hypot(b.x-.5,b.y-.5));const ids=new Set(order.slice(0,14).map(x=>x.id));cells=cells.filter(c=>!ids.has(c.id));removed=ids.size;}
  const forces=cells.map(()=>({x:0,y:0}));
  for(let i=0;i<cells.length;i++)for(let j=i+1;j<cells.length;j++){
   const dx=cells[j].x-cells[i].x,dy=cells[j].y-cells[i].y,d=Math.hypot(dx,dy)||1e-8;
   const f=d<.043?-.18*(.043-d):d<range?adhesion*.012*(d-.043):0;
   forces[i].x+=f*dx/d;forces[i].y+=f*dy/d;forces[j].x-=f*dx/d;forces[j].y-=f*dy/d;
  }
  cells=cells.map((c,i)=>{
   // ID/time-addressed noise keeps surviving particles paired across damage arms.
   const noise=rng(seed+c.id*1009+t*7919);
   let x=c.x+forces[i].x+(noise()-.5)*.003,y=c.y+forces[i].y+(noise()-.5)*.003;
   if(boundary==='dish'){const dx=x-.5,dy=y-.5,d=Math.hypot(dx,dy);if(d>.45){x=.5+.45*dx/d;y=.5+.45*dy/d;}}
   return {id:c.id,x:clamp(x,.04,.96),y:clamp(y,.04,.96)};
  });
  history.push(frame(t));
 }
 return {id,seed,params:{adhesion,range,damage,boundary},history,summary:{connected:history.at(-1).connected,survivors:cells.length,removed}};
}
