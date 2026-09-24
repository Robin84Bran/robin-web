import test from 'node:test';
import assert from 'node:assert/strict';
import {experiments,compare} from './lab.mjs';
import {run as city} from './01_cell_city/model.mjs';
import {run as assembly} from './02_self_assembly/model.mjs';
import {run as mars} from './03_mars_jar/model.mjs';
import {run as islands} from './04_memory_islands/model.mjs';
import {run as known} from './05_known_trap/model.mjs';
import {run as windows} from './06_attention_windows/model.mjs';
import {run as taste} from './07_taste_drift/model.mjs';
import {run as channel} from './08_shared_channel/model.mjs';
for(const e of experiments)test(`${e.id}: deterministic, finite, complete`,()=>{
 const a=compare(e.id,{seed:8});assert.deepEqual(a,compare(e.id,{seed:8}));
 for(const arm of a){assert.ok(arm.history.length>=11);for(const f of arm.history)assert.ok(Number.isFinite(f.value));}
 assert.notDeepEqual(a,compare(e.id,{seed:9}));
});
test('Cell city: zero treatment difference gives identical paths; conserved population',()=>{
 const [a,b]=compare('cell-city',{seed:4,mixing:0});assert.deepEqual(a,b);
 for(const x of city({seed:4}).history){assert.equal(x.cells.length,192);assert.ok(x.cells.every(v=>v===0||v===1));assert.ok(x.cooperation>=0&&x.cooperation<=1);}
});
test('Assembly: zero adhesion comparison identical; damage never creates survivors',()=>{
 const [a,b]=compare('self-assembly',{seed:2,adhesion:0});assert.deepEqual(a,b);
 for(const boundary of ['dish','square'])for(const damage of [true,false]){
 const r=assembly({boundary,damage});assert.equal(r.summary.survivors,damage?58:72);
 for(const f of r.history){assert.equal(f.survivors+f.removed,72);assert.ok(f.connected>=0&&f.connected<=1);for(const c of f.cells){assert.ok(c.x>=0&&c.x<=1&&c.y>=0&&c.y<=1);}}
 }
});
test('Mars: every stream conserves inventory and never spends more solar energy than received',()=>{
 for(const maintenance of [true,false])for(const leak of [0,.001,.01])for(const solar of [.5,1,1.5]){
 const r=mars({maintenance,leak,solar});for(const f of r.history){for(let i=0;i<3;i++){assert.ok(Math.abs(f.stock[i]+f.waste[i]+f.lost[i]-r.params.initial[i]-f.imports[i])<1e-7);assert.ok(f.stock[i]>=-1e-8&&f.waste[i]>=-1e-8&&f.lost[i]>=0);}assert.ok(f.energyUsed<=f.energyIn+1e-7);}
 if(r.summary.failedAt!==null)assert.equal(r.summary.survivedDays,r.summary.failedAt-1);
 }
});
test('Islands: equal test budgets, no fake LLM, no same-island repeated mistakes with failure memory',()=>{
 for(let seed=1;seed<=32;seed++)for(const strategy of ['fresh','skills','reflection']){
 const r=islands({seed,strategy});assert.equal(r.summary.successes+r.summary.failures,120);assert.equal(r.history.length,121);
 if(strategy==='reflection')assert.equal(r.summary.repeatMistakes,0);
 }
 assert.equal(islands({strategy:'skills',change:0}).summary.successes,120);
});
test('Input boundaries reject NaN, overflow and unknown options',()=>{
 for(const fn of [city,assembly,mars,islands,known,windows,taste,channel])assert.throws(()=>fn({seed:NaN}));
 assert.throws(()=>city({mixing:2}));assert.throws(()=>assembly({boundary:'space'}));assert.throws(()=>mars({leak:-1}));assert.throws(()=>islands({change:1.5}));assert.throws(()=>compare('nope'));
});
test('Known labels: zero discount and complete scan controls; no truth-dependent inspection',()=>{
 const [a,b]=compare('known-trap',{bias:0});assert.deepEqual(a.history,b.history);assert.deepEqual(a.summary,b.summary);
 const [c,d]=compare('known-trap',{budget:120});assert.equal(c.summary.hits,d.summary.hits);assert.equal(c.summary.falseFlags,d.summary.falseFlags);
 for(const arm of compare('known-trap')){assert.equal(arm.summary.inspected,60);assert.equal(arm.history.at(-1).cells.filter(c=>c.truth).length,24);assert.equal(arm.history.at(-1).cells.filter(c=>c.status>0).length,60);}
 assert.throws(()=>known({budget:30.5}));assert.throws(()=>known({bias:2}));
});
test('Attention: identical record-read budgets, short-window abstention, pooling and null trend',()=>{
 const a=compare('attention-windows');for(const r of a)assert.equal(r.summary.recordReads,12000);
 assert.equal(a[0].summary.globalAlarm,true);assert.equal(a[1].summary.globalAlarm,null);assert.equal(a[2].summary.globalAlarm,null);
 for(const r of compare('attention-windows',{pool:true}))assert.equal(r.summary.globalAlarm,true);
 for(const r of compare('attention-windows',{pool:true,drift:0,noise:0}))assert.equal(r.summary.globalAlarm,false);
 assert.throws(()=>windows({agents:999}));
});
test('Taste: fixed proposal and selection budgets; zero protected share gives identical paths',()=>{
 const [a,b]=compare('taste-drift',{heretics:0});assert.deepEqual(a.history,b.history);
 for(const r of compare('taste-drift'))for(const f of r.history.slice(1)){assert.equal(f.proposals.length,120);assert.equal(f.proposals.filter(c=>c.selected).length,24);assert.ok(f.weirdTrueKept<=f.weirdTrueProposed);assert.ok(f.taste>=0&&f.taste<=1);}
 assert.throws(()=>taste({blindSlots:2}));
});
test('Shared board: zero volume or trust gives identical paths; effort and population conserved',()=>{
 for(const params of [{volume:0},{trust:0}]){const[a,b]=compare('shared-channel',params);assert.deepEqual(a.history,b.history);assert.deepEqual(a.summary,b.summary);}
 for(const leadTrue of [true,false])for(const r of compare('shared-channel',{leadTrue})){assert.equal(r.summary.attempts,30000);for(const f of r.history.slice(1)){assert.equal(f.counts.reduce((a,b)=>a+b,0),1000);assert.equal(f.truth.filter(Boolean).length,16);assert.ok(f.value>0&&f.value<=1);assert.ok(f.trueFlags<=16);}}
 assert.throws(()=>channel({volume:-1}));
});
