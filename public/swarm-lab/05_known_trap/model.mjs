import {rng,clamp,checked,seedOf} from '../shared.mjs';
export const id='known-trap';
export function run(p={}){
 const seed=seedOf(p),bias=checked(p,'bias',.8,0,1),noise=checked(p,'noise',.2,0,.8),knownShare=checked(p,'knownShare',.5,0,1),budget=checked(p,'budget',60,12,120),labelsVisible=p.labelsVisible!==false;
 if(!Number.isInteger(budget))throw new RangeError('budget must be an integer');
 const random=rng(seed),order=Array.from({length:120},(_,i)=>({i,k:random()})).sort((a,b)=>a.k-b.k),trueIds=new Set(order.slice(0,24).map(x=>x.i)),decoys=new Set(order.slice(24,48).map(x=>x.i));
 const loci=Array.from({length:120},(_,i)=>{const truth=trueIds.has(i),decoy=decoys.has(i),known=random()<knownShare;
  const repeat=clamp(((truth||decoy) ? .75+.25*random() : .6*random())+(random()-.5)*2*noise);
  const partner=clamp((truth?.75+.25*random():.6*random())+(random()-.5)*2*noise);
  return {i,truth,known,repeat,partner,status:0};
 });
 // Exponential-race ranking: same random keys, only the label penalty differs.
 const ranked=loci.map(c=>({i:c.i,rank:-Math.log(Math.max(1e-9,random()))/((.1+c.repeat)*(labelsVisible&&c.known?Math.max(.001,1-bias):1))})).sort((a,b)=>a.rank-b.rank);
 let hits=0,falseFlags=0,knownHits=0;const knownTruth=loci.filter(c=>c.truth&&c.known).length,history=[];
 const frame=t=>({t,value:hits/24,recall:hits/24,hits,falseFlags,inspected:t,knownHits,knownTruth,cells:loci.map(c=>({...c}))});history.push(frame(0));
 for(let t=1;t<=budget;t++){const c=loci[ranked[t-1].i],flag=c.repeat>.65&&c.partner>.65;c.status=flag?(c.truth?2:3):1;if(flag){if(c.truth){hits++;if(c.known)knownHits++;}else falseFlags++;}history.push(frame(t));}
 return {id,seed,params:{bias,noise,knownShare,budget,labelsVisible},history,summary:{recall:hits/24,hits,falseFlags,inspected:budget,knownHits,knownTruth,knownRecall:knownTruth?knownHits/knownTruth:null,precision:hits+falseFlags?hits/(hits+falseFlags):null}};
}
