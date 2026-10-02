import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
const base=new URL('../',import.meta.url),read=p=>readFileSync(new URL(p,base),'utf8');
const catalog=JSON.parse(read('public/agent-swarm/catalog.json'));
const replayFailures=[];
assert.equal(catalog.length,6,'Six complete worlds must ship together');
const hub=read('dist/intelligence/agent-swarm/index.html'),directory=read('dist/intelligence/index.html'),sitemap=read('dist/sitemap-0.xml');
assert.ok(directory.includes('/intelligence/agent-swarm/'),'Intelligence discovery link');
assert.ok(sitemap.includes('https://iamrobin.ai/intelligence/agent-swarm/'),'Hub sitemap');
for(const item of catalog){
 const prefix='public/agent-swarm/'+item.id+'/',route='/intelligence/agent-swarm/'+item.id+'/',html=read('dist'+route+'index.html');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,item.id+' single heading');
 for(const fragment of ['https://iamrobin.ai'+route,'application/ld+json','LearningResource','data-swarm-model','data-timeline','data-scores','data-audit','data-summary','data-download','Recorded evidence'])assert.ok(html.includes(fragment),item.id+': '+fragment);
 assert.ok(hub.includes(route),item.id+' hub link');assert.ok(sitemap.includes('https://iamrobin.ai'+route),item.id+' sitemap');
 for(const file of ['source.zip','PUBLIC_MANIFEST.json','README.md','model.mjs','tests.mjs','batch.mjs','results.json','client.mjs','renderer.mjs','worker.mjs','lab.css'])assert.ok(existsSync(new URL(prefix+file,base)),item.id+': '+file);
 const manifest=JSON.parse(read(prefix+'PUBLIC_MANIFEST.json'));
 for(const row of manifest.files){if(row.path==='index.html')continue;const file=new URL(prefix+row.path,base);assert.ok(existsSync(file),item.id+': missing manifest asset '+row.path);assert.equal(createHash('sha256').update(readFileSync(file)).digest('hex'),row.sha256,item.id+': stale asset '+row.path);}
 assert.equal(createHash('sha256').update(readFileSync(new URL(prefix+'model.mjs',base))).digest('hex'),item.modelSha256,item.id+' catalog/model integrity');
 for(const args of [['--test',prefix+'tests.mjs'],[prefix+'batch.mjs','--verify']]){const r=spawnSync(process.execPath,args,{cwd:new URL('../',import.meta.url),encoding:'utf8',timeout:180000});if(r.status!==0)replayFailures.push(item.id+': '+args.join(' ')+'\n'+r.stdout+r.stderr+(r.error?.message||''));}
}
assert.equal(replayFailures.length,0,replayFailures.join('\n\n'));
const receipt=JSON.parse(read('public/agent-swarm/minimum-intelligence/MODEL_RECEIPT.json'));
assert.equal(receipt.status,'COMPLETED');assert.equal(receipt.successfulCalls,333);assert.equal(receipt.actualDollars,null);
console.log('Agent Swarm Lab: six routes, discovery, SEO, asset hashes, all model tests, declared-precision evidence replay, and 333 genuine model-call receipts verified.');
