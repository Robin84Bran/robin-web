import {rng,checked,seedOf} from '../shared.mjs';
export const id='taste-drift';
export function run(p={}){
 const seed=seedOf(p),bias=checked(p,'bias',.6,0,1),heretics=checked(p,'heretics',.25,0,1),blindSlots=checked(p,'blindSlots',0,0,1),protectedSlice=p.protectedSlice!==false;
 let taste=.5,cumulativeWeirdTrue=0;const history=[];
 const empty={t:0,value:0,weirdTrueKept:0,weirdTrueProposed:0,weirdProposed:0,falseKept:0,taste,cumulativeWeirdTrue,proposals:[]};history.push(empty);
 for(let t=1;t<=10;t++){
  const proposals=Array.from({length:120},(_,i)=>{const random=rng(seed+t*104729+i*7919),protectedAgent=protectedSlice&&i<Math.round(120*heretics),weird=random()<(protectedAgent?.5:taste),truth=random()<.35,evidence=(truth?.55:.1)+(truth?.4:.55)*random();return {i,weird,truth,evidence,score:evidence+(weird?0:bias*.45),selected:false};});
  const chosen=new Set([...proposals].sort((a,b)=>b.evidence-a.evidence||a.i-b.i).slice(0,Math.round(24*blindSlots)).map(x=>x.i));
  for(const c of [...proposals].sort((a,b)=>b.score-a.score||a.i-b.i)){if(chosen.size===24)break;chosen.add(c.i);}
  proposals.forEach(c=>c.selected=chosen.has(c.i));const kept=proposals.filter(c=>c.selected),weirdTrueKept=kept.filter(c=>c.weird&&c.truth).length;
  cumulativeWeirdTrue+=weirdTrueKept;taste=.6*taste+.4*kept.filter(c=>c.weird).length/24;
  history.push({t,value:weirdTrueKept,weirdTrueKept,weirdTrueProposed:proposals.filter(c=>c.weird&&c.truth).length,weirdProposed:proposals.filter(c=>c.weird).length,falseKept:kept.filter(c=>!c.truth).length,taste,cumulativeWeirdTrue,proposals});
 }
 const f=history.at(-1);return {id,seed,params:{bias,heretics,blindSlots,protectedSlice,rounds:10,proposalsPerRound:120,keptPerRound:24},history,summary:{weirdTrueKept:f.weirdTrueKept,weirdTrueProposed:f.weirdTrueProposed,weirdProposed:f.weirdProposed,falseKept:f.falseKept,cumulativeWeirdTrue,taste}};
}
