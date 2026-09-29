import test from 'node:test';
import assert from 'node:assert/strict';
import {simulate,settings} from './model.mjs';
test('replay and seed validity',()=>{
 assert.deepEqual(simulate({seed:47}),simulate({seed:47}));
 for(const p of [{seed:-1},{seed:NaN},{slots:0},{slots:25},{failure:2},{common:-1},{cycle:4},{unknown:1}])assert.throws(()=>settings(p));
});
test('wide door, zero failure: exactly matched work and carrying budget',()=>{
 for(const cycle of [3,6,12]) for(const a of simulate({slots:24,failure:0,cycle}).summary) {
  assert.equal(a.n*a.capacity,24);assert.equal(a.total,120/cycle*24);assert.equal(a.post,60/cycle*24);assert.equal(a.blocked,0);
 }
});
test('one slot analytic throughput and no damage under zero probability',()=>{
 const s=simulate({slots:1,failure:0}).summary;
 assert.deepEqual(s.map(a=>a.total),[480,480,120]);
 assert.deepEqual(s.map(a=>a.survivors),[1,6,24]);
});
test('certain shock stops every fleet at tick 61',()=>{
 const run=simulate({failure:1});for(const a of run.summary) {assert.equal(a.post,0);assert.equal(a.survivors,0);assert.equal(a.outage,true);}
 for(const f of run.frames.slice(61)) for(const a of f.arms)assert.equal(a.delivered,0);
});
test('full common mode couples all-or-none failure across fleets',()=>{
 for(let seed=1;seed<=64;seed++) {const s=simulate({seed,common:1}).summary;assert.equal(new Set(s.map(a=>a.outage)).size,1);for(const a of s)assert.ok(a.survivors===0||a.survivors===a.n);}
});
test('capacity, door, cycle, accounting and irreversible failure invariants',()=>{
 for(let seed=1;seed<=64;seed++)for(const slots of [1,2,4,24]){
  const run=simulate({seed,slots});let prev=run.frames[0];
  for(const f of run.frames.slice(1)){
   for(let i=0;i<3;i++) {const a=f.arms[i],b=prev.arms[i];
    assert.ok(a.served.length<=slots);assert.equal(new Set(a.served).size,a.served.length);
    assert.equal(a.total-b.total,a.delivered);assert.equal(a.delivered,a.served.length*24/a.n);
    assert.ok(a.post<=a.total);assert.ok(a.blocked>=b.blocked);
    for(const id of a.served){assert.ok(a.units[id].alive);assert.ok(b.units[id].readyAt<=f.tick);assert.equal(a.units[id].readyAt,f.tick+6);}
    for(let j=0;j<a.n;j++)if(!b.units[j].alive)assert.equal(a.units[j].alive,false);
   }prev=f;
  }
 }
});
