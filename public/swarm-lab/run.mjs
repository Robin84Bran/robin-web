import {writeFileSync,readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {dirname,join} from 'node:path';
import {experiments,compare,VERSION,sensitivityCases} from './lab.mjs';
import {stats,csvCell} from './shared.mjs';
const root=dirname(fileURLToPath(import.meta.url));
const seeds=Array.from({length:32},(_,i)=>i+1);
const results={version:VERSION,seeds,protocol:'Matched seeds 1–32. Defaults frozen before batch. All runs retained. Simulation only; no real-world calibration.',experiments:[]};
const files=['shared.mjs','lab.mjs',...experiments.map(x=>x.folder+'/model.mjs')];
results.sourceHashes=Object.fromEntries(files.map(p=>[p,createHash('sha256').update(readFileSync(join(root,p))).digest('hex')]));
for(const e of experiments){
 const runs=seeds.map(seed=>({seed,arms:compare(e.id,{seed}).map(x=>({params:x.params,summary:x.summary}))}));
 const arms=e.labels.map((label,i)=>({label,metric:e.metric,...stats(runs.map(r=>r.arms[i].summary[e.metric]))}));
 const paired=stats(runs.map(r=>r.arms.at(-1).summary[e.metric]-r.arms[0].summary[e.metric]));
 const result={id:e.id,title:e.title,metric:e.metric,arms,pairedDifference:paired,runs};
 results.experiments.push(result);
 writeFileSync(join(root,e.folder,'results.json'),JSON.stringify({version:VERSION,protocol:results.protocol,...result},null,2)+'\n');
 const csv=['seed,arm,metric,value',...runs.flatMap(r=>r.arms.map((x,i)=>[r.seed,e.labels[i],e.metric,x.summary[e.metric]].map(csvCell).join(',')))].join('\n')+'\n';
 writeFileSync(join(root,e.folder,'results.csv'),csv);
}
results.sensitivities=sensitivityCases.map(([id,controls])=>{
 const e=experiments.find(e=>e.id===id),runs=seeds.map(seed=>({seed,arms:compare(id,{seed,...controls}).map(x=>({params:x.params,summary:x.summary}))}));
 return {id,controls,runs,arms:e.labels.map((label,i)=>({label,metric:e.metric,...stats(runs.map(r=>r.arms[i].summary[e.metric]))}))};
});
writeFileSync(join(root,'results.json'),JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify(results.experiments.map(({id,arms,pairedDifference})=>({id,arms:arms.map(a=>({label:a.label,mean:a.mean,min:a.min,max:a.max})),pairedDifference:pairedDifference.mean})),null,2));
