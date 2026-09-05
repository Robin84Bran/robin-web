import assert from 'node:assert/strict';
import { test } from 'node:test';
import { schedule } from '../../public/intelligence/aidc101/model.js';

test('baseline opens in month 11 after transformer installation and integrated tests', () => {
  assert.equal(schedule().tx, 10);
  assert.equal(schedule().finish, 11);
});
test('three-month earlier delivery advances opening by only one month', () => {
  assert.equal(schedule(9, 6, 9).finish, 10);
});
test('late grid makes accelerating the transformer ineffective', () => {
  assert.equal(schedule(12, 9, 9).finish, 13);
  assert.equal(schedule(12, 6, 9).finish, 13);
});
test('site access constrains installation even when equipment arrives early', () => {
  assert.equal(schedule(6, 4, 8).tx, 7);
  assert.equal(schedule(6, 4, 8).finish, 10);
});
test('cooling delay becomes the binding constraint and ties remain visible', () => {
  assert.equal(schedule(9, 6, 14).finish, 15);
  assert.deepEqual(schedule(9, 6, 9).ends.map((v,i)=>v===9?i:null).filter(v=>v!==null), [0,4,5]);
});
test('all slider combinations preserve the original model and one-month acceptance gate', () => {
  for(let g=6;g<=14;g++) for(let a=4;a<=13;a++) for(let c=8;c<=14;c++) {
    const m=schedule(g,a,c);
    assert.equal(m.finish, Math.max(g,Math.max(6,a)+1,8,8,c,9)+1);
    assert.ok(m.finish<=16);
  }
});
