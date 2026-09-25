import fs from 'node:fs';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {simulate} from './model.mjs';
const scenarios={default:{},noSharing:{share:0},noRelocation:{shift:false},highExploration:{explore:0.5},eightWalkers:{agents:8},sixtyFourWalkers:{agents:64}};
const batches=Object.fromEntries(Object.entries(scenarios).map(([name,settings])=>{
 const runs=Array.from({length:32},(_,i)=>({seed:i+1,summary:simulate({...settings,seed:i+1}).summary}));
 const means=['swarm','solo','random'].map(name=>({name,...Object.fromEntries(['mean','before','after','coverage'].map(k=>[k,runs.reduce((s,r)=>s+r.summary.find(a=>a.name===name)[k],0)/runs.length]))}));
 return [name,{settings,runs,means}];
}));
const result={version:1,seeds:'1–32, all retained; no selection',modelSha256:crypto.createHash('sha256').update(fs.readFileSync(new URL('./model.mjs',import.meta.url))).digest('hex'),batches};
const path=new URL('./results.json',import.meta.url), bytes=JSON.stringify(result,null,2)+'\n';
if(process.argv.includes('--verify')) {if(fs.readFileSync(path,'utf8')!==bytes) throw new Error('Reproduction differs'); console.log('All 192 runs reproduced exactly.');}
else {fs.writeFileSync(path,bytes);console.log(JSON.stringify(Object.fromEntries(Object.entries(batches).map(([k,v])=>[k,v.means])),null,2));}
