import './intelligence-discovery.test.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read=p=>readFileSync(new URL('../../'+p,import.meta.url),'utf8');
const programme=JSON.parse(read('src/data/research-programme.json'));
test('the Research Council workflow is published and linked without becoming a study',()=>{
  const route='/research/council/';
  assert.ok(existsSync(new URL('../../dist'+route+'index.html',import.meta.url)));
  const council=read('dist'+route+'index.html');
  const research=read('dist/research/index.html');
  assert.match(research, /<section\b[^>]*class="council-workflow"[\s\S]*?href="\/research\/council\/"/);
  assert.match(research, /<nav\b[^>]*class="research-outlinks"[\s\S]*?href="\/research\/council\/"/);
  assert.equal((council.match(/<h1\b/g)||[]).length,1);
  assert.ok(council.includes('"@type":"Article"'));
  assert.ok(council.includes(`href="https://iamrobin.ai${route}"`));
  for(const href of ['/research/','/research/work-or-proof/','/research/useful-core/'])assert.ok(council.includes(`href="${href}"`));
  assert.ok(read('dist/sitemap-0.xml').includes(`https://iamrobin.ai${route}`));
  assert.equal(programme.studies.some(s=>s.href===route),false);
  assert.equal(programme.experiments.some(e=>e.href===route),false);
});
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
test('the three new empirical studies stay discoverable with accessible results and their playable seeds',()=>{
  for(const [id,slug] of [['useful-core','useful-core'],['portable-self','portable-self'],['one-door','one-door-many-hands']]){
    const route=`/research/${slug}/`;
    const card=programme.experiments.find(e=>e.id===id);
    assert.equal(card?.maturity,'Empirical study');
    assert.equal(card?.href,route);
    const html=read(`dist${route}index.html`);
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    assert.ok(html.includes(`href="https://iamrobin.ai${route}"`));
    assert.ok(html.includes('"@type":"Article"'));
    assert.ok(html.includes('id="hypothesis-title"'));
    assert.ok(html.includes('id="predictions-title"'));
    assert.ok(html.includes('id="limits-title"'));
    assert.ok(html.includes('<table')&&html.includes('<figure'));
    assert.ok(html.includes('tabindex="0"'));
    const figures=[...html.matchAll(/<svg\b[^>]*role="img"[^>]*>[\s\S]*?<\/svg>/g)].map(m=>m[0]);
    assert.ok(figures.length>=4,`${route}: model and baseline panels`);
    for(const svg of figures){
      assert.match(svg,/aria-labelledby=/);
      assert.match(svg,/<title\b[^>]*>[^<]+<\/title>/);
      assert.match(svg,/<desc\b[^>]*>[^<]+<\/desc>/);
    }
    assert.ok(html.includes(`href="/intelligence/${id}/"`));
    assert.ok(html.includes('https://github.com/Robin84Bran/research'));
    assert.doesNotMatch(html,/\d+\.\d+%|\b(?:NaN|Infinity|undefined)\b/);
    assert.ok(read('dist/sitemap-0.xml').includes(`https://iamrobin.ai${route}`));
  }
  const useful=read('dist/research/useful-core/index.html');
  assert.ok(useful.includes('104/400')&&useful.includes('USD 4.92'));
  const portable=read('dist/research/portable-self/index.html');
  assert.ok(portable.includes('v0.1')&&portable.includes('constrained decoding')&&portable.includes('USD 4.78'));
  const door=read('dist/research/one-door-many-hands/index.html');
  assert.ok(door.includes('The rehearsal adds no information beyond the rules.')&&door.includes('USD 1.93'));
});
