import {rng,checked,seedOf} from '../shared.mjs';
export const id='memory-islands';
export function run(p={}){
 const seed=seedOf(p),strategy=p.strategy??'reflection',change=checked(p,'change',2,0,4);
 if(!['fresh','skills','reflection'].includes(strategy)||!Number.isInteger(change))throw new RangeError('strategy/change');
 const random=rng(seed),base=Array.from({length:4},()=>Math.floor(random()*4)),prefs=Array(4).fill(null),banned=Array.from({length:4},()=>new Set());
 // Skill-bearing arms start with the same four correct policies from a prior world.
 if(strategy!=='fresh')base.forEach((x,i)=>prefs[i]=x);
 let successes=0,failures=0,repeatMistakes=0;const history=[],seen=new Set();
 const frame=(t,context=null,action=null,correct=null,world=0)=>({t,value:t?successes/t:0,rate:t?successes/t:0,successes,failures,repeatMistakes,context,action,correct,world,prefs:[...prefs]});
 history.push(frame(0));
 for(let t=1;t<=120;t++){
  const world=Math.floor((t-1)/40),context=(t-1)%4;
  if((t-1)%40===0){seen.clear();if(strategy==='fresh')prefs.fill(null);banned.forEach(x=>x.clear());}
  const target=(base[context]+(context<change?world:0))%4;
  const u=rng(seed+t*8191)();let choices=[0,1,2,3];
  if(strategy==='reflection'){choices=choices.filter(x=>!banned[context].has(x));if(!choices.length){banned[context].clear();choices=[0,1,2,3];}}
  const action=prefs[context]??choices[Math.floor(u*choices.length)],correct=action===target;
  if(correct){successes++;prefs[context]=action;}else{
   failures++;const key=context+':'+action;if(seen.has(key))repeatMistakes++;seen.add(key);prefs[context]=null;
   if(strategy==='reflection')banned[context].add(action);
  }
  history.push(frame(t,context,action,correct,world));
 }
 return {id,seed,params:{strategy,change,worlds:3,trialsPerWorld:40,actions:4,contexts:4,initialSkills:strategy==='fresh'?0:4},history,summary:{successes,failures,rate:successes/120,repeatMistakes}};
}
