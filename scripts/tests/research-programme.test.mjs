import './intelligence-discovery.test.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read=p=>readFileSync(new URL('../../'+p,import.meta.url),'utf8');
const programme=JSON.parse(read('src/data/research-programme.json'));
test('both hubs expose every registered weekly experiment without a hidden archive',()=>{
  const intelligence=read('dist/intelligence/index.html'),research=read('dist/research/index.html');
  assert.ok(programme.experiments.length>=8);
  assert.equal(new Set(programme.experiments.map(e=>e.id)).size,programme.experiments.length);
  assert.equal((intelligence.match(/data-weekly-experiment=/g)||[]).length,programme.experiments.length);
  assert.equal((research.match(/data-research-seed=/g)||[]).length,programme.experiments.length);
  for(const e of programme.experiments){
    const route=`/intelligence/${e.id}/`;
    assert.ok(intelligence.includes(`href="${route}"`),route+' missing from library');
    const researchRoute=e.href??route;
    assert.ok(research.includes(`href="${researchRoute}"`),researchRoute+' missing from programme');
    assert.ok(existsSync(new URL('../../dist'+researchRoute+'index.html',import.meta.url)),researchRoute+' must resolve');
    assert.ok(existsSync(new URL('../../dist'+route+'index.html',import.meta.url)),route+' must remain playable');
    assert.ok(programme.directions.some(d=>d.id===e.direction));
    assert.match(e.week,/^\d{4}-W\d{2}$/);
  }
  for(const route of ['/intelligence/','/research/']){const html=read('dist'+route+'index.html');assert.equal((html.match(/<h1\b/g)||[]).length,1);assert.ok(html.includes(`href="https://iamrobin.ai${route}"`));assert.ok(html.includes('"@type":"CollectionPage"'));}
  for(const label of ['Experiments','Open Council','Field Guides'])assert.ok(intelligence.includes(label));
  for(const council of programme.councils)assert.ok(intelligence.includes(`/intelligence/council/${council.slug}/`));
  assert.ok(programme.councils.length>=3);
  assert.ok(research.includes('Protocol drafted'));
  assert.ok(research.includes('/research/honestagent/#next-title'));
  assert.doesNotMatch(intelligence+research,/\/Users\/|private_reviews|PROTOCOL\.md|receipt\.json/);
});
test('Research replaces the door name in English and native translated navigation',()=>{
  const site=read('src/data/site.ts'),chrome=read('public/language/client.mjs'),home=read('src/data/homeChinese.ts');
  assert.ok(site.includes("word: 'Research', slug: 'research'"));
  assert.doesNotMatch(site+chrome,/\bResonance\b/);
  assert.doesNotMatch(home,/door3: '共[鸣鳴]/);
  assert.ok(chrome.includes("'Meaning', 'Research', 'Ouroboros'"));
});
