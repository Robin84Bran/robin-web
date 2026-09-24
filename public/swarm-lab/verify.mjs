import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {experiments,compare,VERSION} from './lab.mjs';
import {stats} from './shared.mjs';
const read=p=>readFileSync(new URL(p,import.meta.url),'utf8');
const batch=JSON.parse(read('results.json'));
assert.equal(batch.version,VERSION);assert.deepEqual(batch.seeds,Array.from({length:32},(_,i)=>i+1));
for(const[p,hash]of Object.entries(batch.sourceHashes))assert.equal(createHash('sha256').update(read(p)).digest('hex'),hash,p);
for(const e of experiments){
 const saved=batch.experiments.find(x=>x.id===e.id),runs=batch.seeds.map(seed=>({seed,arms:compare(e.id,{seed}).map(x=>({params:x.params,summary:x.summary}))}));
 assert.deepEqual(saved.runs,runs,e.id);
 assert.deepEqual(saved.arms,e.labels.map((label,i)=>({label,metric:e.metric,...stats(runs.map(r=>r.arms[i].summary[e.metric]))})));
 assert.deepEqual(saved.pairedDifference,stats(runs.map(r=>r.arms.at(-1).summary[e.metric]-r.arms[0].summary[e.metric])));
 assert.deepEqual(JSON.parse(read(e.folder+'/results.json')),{version:VERSION,protocol:batch.protocol,...saved});
 const csv=['seed,arm,metric,value',...runs.flatMap(r=>r.arms.map((x,i)=>`${r.seed},${e.labels[i]},${e.metric},${x.summary[e.metric]}`))].join('\n')+'\n';
 assert.equal(read(e.folder+'/results.csv'),csv);
}
assert.deepEqual(batch.sensitivities.map(s=>[s.id,s.controls]),[['cell-city',{benefit:0}],['mars-jar',{solar:.5}],['memory-islands',{change:0}]]);
for(const s of batch.sensitivities){const e=experiments.find(e=>e.id===s.id),runs=batch.seeds.map(seed=>({seed,arms:compare(s.id,{seed,...s.controls}).map(x=>({params:x.params,summary:x.summary}))}));assert.deepEqual(s.runs,runs);assert.deepEqual(s.arms,e.labels.map((label,i)=>({label,metric:e.metric,...stats(runs.map(r=>r.arms[i].summary[e.metric]))})));}
console.log('Swarm Lab: all 32-seed receipts, three sensitivity batches and model hashes reproduced exactly.');
