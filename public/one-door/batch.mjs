import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {simulate,VERSION,DEFAULTS,FLEETS} from './model.mjs';
const cases=[['default',{}],['one-slot',{slots:1}],['four-slots',{slots:4}],['wide-door',{slots:24}],['no-failure',{failure:0}],['high-failure',{failure:.7}],['half-common',{common:.5}],['all-common',{common:1}],['short-cycle',{cycle:3}],['long-cycle',{cycle:12}]];
const mean=xs=>xs.reduce((a,b)=>a+b,0)/xs.length;
const results={version:VERSION,modelSha256:createHash('sha256').update(readFileSync(new URL('./model.mjs',import.meta.url))).digest('hex'),seeds:'1–64, none omitted',defaults:DEFAULTS,
 cases:cases.map(([name,controls])=>{
  const runs=Array.from({length:64},(_,i)=>{const r=simulate({...controls,seed:i+1});return {seed:i+1,shock:r.shock,summary:r.summary};});
  const summary=FLEETS.map(n=>{const all=runs.map(r=>r.summary.find(a=>a.n===n));return {n,meanPost:mean(all.map(a=>a.post)),minPost:Math.min(...all.map(a=>a.post)),maxPost:Math.max(...all.map(a=>a.post)),outages:all.filter(a=>a.outage).length,meanTotal:mean(all.map(a=>a.total)),meanBlocked:mean(all.map(a=>a.blocked))};});
  return {name,controls,runs,summary};
 })};
const url=new URL('./results.json',import.meta.url), bytes=JSON.stringify(results,null,2)+'\n';
if(process.argv.includes('--verify'))assert.equal(readFileSync(url,'utf8'),bytes,'Saved results must reproduce exactly');else writeFileSync(url,bytes);
console.log(JSON.stringify({verified:process.argv.includes('--verify'),runs:640,arms:1920,cases:results.cases.map(c=>({name:c.name,summary:c.summary}))},null,2));
