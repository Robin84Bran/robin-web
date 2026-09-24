import {rng,checked,seedOf} from '../shared.mjs';
export const id='attention-windows';
export function run(p={}){
 const seed=seedOf(p),agents=checked(p,'agents',50,1,1000),noise=checked(p,'noise',.6,0,1.5),drift=checked(p,'drift',.5,0,1),pool=p.pool===true;
 if(![1,50,1000].includes(agents))throw new RangeError('agents');
 const n=12000,random=rng(seed),values=Array.from({length:n},(_,i)=>drift*(i/(n-1)-.5)+(random()-.5)*2*noise),motifId=Array(n).fill(-1);
 for(let m=0;m<48;m++){const start=m*250+Math.floor(random()*230),orientation=random()<.5?-1:1;for(let j=0;j<8;j++){values[start+j]+=orientation*(j%2?1.4:-1.4);motifId[start+j]=m;}}
 const width=n/agents,windows=[],found=new Set(),history=[];let falseFlags=0,completed=0,globalAlarm=null,globalEarly=0,globalLate=0;
 function frame(t){return {t,value:found.size/48,recall:found.size/48,hits:found.size,falseFlags,recordReads:t*100,completedWindows:completed,globalAlarm,localFlags:windows.filter(w=>w.flag).map(w=>({start:w.start,end:w.end,trueHit:w.motifs.length>0})),globalTruth:drift>0};}
 history.push(frame(0));
 for(let t=1;t<=120;t++){
  const available=t*100;
  while((completed+1)*width<=available){const start=completed*width,end=start+width;let even=0,odd=0,ne=0,no=0,early=0,late=0;const counts=new Map();
   for(let i=start;i<end;i++){const v=values[i];if(i%2){odd+=v;no++;}else{even+=v;ne++;}if(i<start+width/4)early+=v;if(i>=end-width/4)late+=v;if(pool&&i<n/4)globalEarly+=v;if(pool&&i>=n*3/4)globalLate+=v;if(motifId[i]>=0)counts.set(motifId[i],(counts.get(motifId[i])??0)+1);}
   const flag=Math.abs(even/ne-odd/no)>.45,motifs=[...counts].filter(([,count])=>count>=4).map(([m])=>m);
   if(flag){if(motifs.length)motifs.forEach(m=>found.add(m));else falseFlags++;}
   if(width>=n/2)globalAlarm=(late-early)/(width/4)>.18;
   windows.push({start,end,flag,motifs});completed++;
  }
  if(t===120&&pool)globalAlarm=(globalLate-globalEarly)/(n/4)>.18;
  history.push(frame(t));
 }
 return {id,seed,params:{agents,noise,drift,pool,records:n,windowWidth:width,recordReadBudget:n,coordinatorSummaryMerges:pool?agents:0},history,summary:{recall:found.size/48,hits:found.size,falseFlags,recordReads:n,globalAlarm,globalTruth:drift>0,globalCorrect:globalAlarm===null?null:globalAlarm===(drift>0),abstained:globalAlarm===null}};
}
