import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {experiments} from '../public/swarm-lab/lab.mjs';
const read=p=>readFileSync(new URL('../dist/'+p,import.meta.url),'utf8');
const sitemap=read('sitemap-0.xml');
for(const e of experiments){
 const route=`intelligence/swarm-lab/${e.id}/`,html=read(route+'index.html');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,route);
 for(const fragment of ['data-swarm-lab','/swarm-lab/ui.mjs','Where the analogy stops','32 matched seeds',`/swarm-lab/${e.folder}/results.csv`,e.title])assert.ok(html.includes(fragment),route+': '+fragment);
 assert.ok(sitemap.includes('https://iamrobin.ai/'+route));
}
for(const suffix of ['', 'en/', 'zh-hant/', 'ja/'])assert.ok(read(`meaning/diary/202609/2026-09-24-from-art-to-immortal-cells/${suffix}index.html`).includes('href="/intelligence/swarm-lab/"'));
assert.ok(read('intelligence/index.html').includes('Ideas you can'));
assert.ok(read('intelligence/swarm/index.html').includes('/intelligence/swarm-lab/'));
console.log('Swarm Lab: five new SEO routes, controls, static evidence, four diary links and existing swarm link verified.');
