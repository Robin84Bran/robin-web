import {rng,checked,seedOf} from '../shared.mjs';
export const id='shared-channel';
export function run(p={}){
 const seed=seedOf(p),volume=checked(p,'volume',8,0,20),trust=checked(p,'trust',.25,0,1),threshold=checked(p,'threshold',40,10,100),leadTrue=p.leadTrue!==false,shared=p.shared!==false;
 const n=1000,directions=128,random=rng(seed),truth=Array(directions).fill(false);truth[0]=leadTrue;
 const order=Array.from({length:127},(_,i)=>({i:i+1,k:random()})).sort((a,b)=>a.k-b.k);order.slice(0,leadTrue?15:16).forEach(x=>truth[x.i]=true);
 const evidence=Array(directions).fill(0);let counts=Array(directions).fill(0),board=Array(directions).fill(1),collapseStep=null;board[0]=1000;const history=[];
 const frame=t=>{let entropy=0;for(const c of counts){const q=c/n;if(q)entropy-=q*Math.log(q);}const effective=t?Math.exp(entropy):directions;return {t,value:effective/directions,effectiveDirections:effective,uniqueDirections:counts.filter(c=>c>0).length,trueFlags:evidence.filter((x,i)=>x>=threshold&&truth[i]).length,falseFlags:evidence.filter((x,i)=>x>=threshold&&!truth[i]).length,counts:[...counts],evidence:[...evidence],truth:[...truth],collapseStep};};
 history.push(frame(0));
 for(let t=1;t<=30;t++){
  counts=Array(directions).fill(0);const votes=Array(directions).fill(0),follow=shared?1-(1-trust)**volume:0;let total=0;const cdf=board.map(x=>total+=(x+1)**2);
  const choose=u=>{const target=u*total;let lo=0,hi=directions-1;while(lo<hi){const mid=(lo+hi)>>1;if(target<cdf[mid])hi=mid;else lo=mid+1;}return lo;};
  for(let i=0;i<n;i++){const r=rng(seed+t*104729+i*8191),adopt=r(),choice=r(),evidenceDraw=r(),d=adopt<follow?choose(choice):Math.floor(choice*directions);counts[d]++;if(evidenceDraw<(truth[d]?.8:.03)){votes[d]++;evidence[d]++;}}
  board=votes;const f=frame(t);if(f.value<.25&&collapseStep===null)collapseStep=t;f.collapseStep=collapseStep;history.push(f);
 }
 const f=history.at(-1);return {id,seed,params:{volume,trust,threshold,leadTrue,shared,agents:n,directions,rounds:30,adoptionProbability:shared?1-(1-trust)**volume:0},history,summary:{diversity:f.value,effectiveDirections:f.effectiveDirections,uniqueDirections:f.uniqueDirections,trueFlags:f.trueFlags,falseFlags:f.falseFlags,collapseStep,attempts:n*30}};
}
