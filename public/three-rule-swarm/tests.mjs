import test from 'node:test';
import assert from 'node:assert/strict';
import {simulate,DEFAULTS,WIDTH,HEIGHT} from './model.mjs';
test('seed replay is exact; other seeds change the world',()=>{
 assert.deepEqual(simulate(),simulate()); assert.notDeepEqual(simulate().frames,simulate({seed:2}).frames);
});
test('every arm pays the same observation budget with bounded outputs',()=>{
 for(const agents of [1,8,32,128]) {const r=simulate({agents,rounds:20}); for(const s of r.summary) {assert.equal(s.queries,agents*20); for(const k of ['mean','before','after','coverage']) assert.ok(s[k]>=0&&s[k]<=1);}
 for(const f of r.frames) for(const a of f.arms) {assert.equal(a.positions.length,agents); assert.ok(a.positions.every(x=>x>=0&&x<WIDTH*HEIGHT));}}
});
test('relocation occurs exactly once at the declared halfway point',()=>{
 const r=simulate(); assert.deepEqual(r.frames[0].centers,r.frames[r.changeAt-1].centers); assert.notDeepEqual(r.frames[0].centers,r.frames[r.changeAt].centers);
 const fixed=simulate({shift:false}); assert.deepEqual(fixed.frames[0].centers,fixed.frames.at(-1).centers);
});
test('random control is independent of swarm sharing and learned policy',()=>{
 const a=simulate(),b=simulate({share:0,explore:1}); assert.deepEqual(a.summary[2],b.summary[2]); assert.deepEqual(a.frames.map(f=>f.arms[2]),b.frames.map(f=>f.arms[2]));
});
test('reject NaN, unbounded work, and invalid parameters',()=>{
 for(const p of [{agents:0},{agents:100000},{seed:-1},{rounds:0},{share:NaN},{explore:2},{shift:'yes'}]) assert.throws(()=>simulate(p));
 assert.equal(simulate(DEFAULTS).summary.length,3);
});
