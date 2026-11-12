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

test('each research topic appears once with its playable and empirical destinations',()=>{
  const html=read('dist/research/index.html');
  const items=[...html.matchAll(/<li\b[^>]*data-research-topic="([^"]+)"[^>]*>[\s\S]*?<\/li>/g)].map(m=>({id:m[1],html:m[0]}));
  const distinctTitles=new Set([...programme.experiments,...programme.studies].map(x=>x.title));
  assert.equal(items.length,distinctTitles.size);
  for(const e of programme.experiments){
    const item=items.find(x=>x.id===e.id);assert.ok(item,e.id);
    assert.ok(item.html.includes(`href="/intelligence/${e.id}/"`),e.id+' playable seed');
    const study=e.href??programme.studies.find(s=>s.title===e.title)?.href;
    if(study){assert.ok(item.html.includes(`href="${study}"`),e.id+' empirical study');assert.ok(existsSync(new URL('../../dist'+study.split('#')[0]+'index.html',import.meta.url)));}
    else assert.ok(item.html.includes('Empirical study · upcoming'));
    assert.ok(item.html.includes('Playable seed'));
  }
  for(const [id,play,study] of [['honest-agent','work-or-proof','/research/honestagent/'],['obedient-rebel','receipt-gap','/research/honestagent/#next-title']]){
    const item=items.find(x=>x.id===id);assert.ok(item?.html.includes('Related play'));assert.ok(item.html.includes(`href="/intelligence/${play}/"`));assert.ok(item.html.includes(`href="${study}"`));
  }
  const schemas=[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(m=>{const x=JSON.parse(m[1]);return x['@graph']??[x];});
  const collection=schemas.find(x=>x['@type']==='CollectionPage');assert.ok(collection);
  const playable=collection.hasPart.filter(x=>x['@type']==='LearningResource');
  assert.deepEqual(playable.map(x=>x.url).sort(),programme.experiments.map(e=>`https://iamrobin.ai/intelligence/${e.id}/`).sort());
});

test('weekly library rows offer separate playable, empirical and Kid edition destinations',()=>{
  const html=read('dist/intelligence/index.html');
  const rows=[...html.matchAll(/<li\b[^>]*data-weekly-experiment="([^"]+)"[^>]*>([\s\S]*?)<\/li>/g)];
  assert.equal(rows.length,programme.experiments.length);
  const guide=read('dist/research/kid-edition/index.html');
  for(const e of programme.experiments){
    const row=rows.find(m=>m[1]===e.id)?.[2];assert.ok(row,e.id);
    const primary=row.match(/<a\b[^>]*class="experiment-row"[^>]*>([\s\S]*?)<\/a>/);
    assert.ok(primary);assert.doesNotMatch(primary[1],/<a\b/,'resource links cannot be nested in the game link');
    const study=e.href??programme.studies.find(s=>s.title===e.title)?.href;
    if(study)assert.match(row,new RegExp('data-experiment-study[^>]*href="'+study+'"'));
    assert.ok(row.includes(`href="/research/kid-edition/#${e.id}"`));
    assert.ok(guide.includes(`id="${e.id}"`),'Kid link must resolve to a section');
    const topic=[...read('dist/research/index.html').matchAll(/<li\b[^>]*data-research-topic="([^"]+)"[^>]*>([\s\S]*?)<\/li>/g)].find(m=>m[1]===e.id);
    assert.ok(topic?.[2].includes(`href="/research/kid-edition/#${e.id}"`));
  }
});

test('Kid edition keeps every named question discoverable and separates play from measured findings',()=>{
  const entries=JSON.parse(read('src/data/research-kid-edition.json'));
  const html=read('dist/research/kid-edition/index.html');
  const titles=new Set([...programme.studies,...programme.experiments].map(x=>x.title));
  assert.deepEqual(new Set(entries.map(x=>x.title)),titles);
  assert.equal(new Set(entries.map(x=>x.id)).size,entries.length);
  assert.equal((html.match(/data-kid-topic=/g)||[]).length,entries.length);
  const guide=html.match(/<main\b[^>]*class="shell kid-guide"[^>]*>([\s\S]*?)<\/main>/)?.[1];assert.ok(guide);
  assert.equal((guide.match(/<details\b/g)||[]).length,entries.length);
  assert.equal((guide.match(/<summary\b/g)||[]).length,entries.length);
  for(const q of entries){
    assert.ok(programme.directions.some(d=>d.id===q.direction));
    for(const href of [q.play,q.study]){
      const [path,fragment]=href.split('#');
      const target=read(`dist${path}index.html`);
      if(fragment)assert.ok(target.includes(`id="${fragment}"`),href);
      assert.ok(html.includes(`href="${href}"`),href);
    }
    assert.ok(q.imagine&&q.question&&q.finding&&q.wonder);
  }
  assert.equal((html.match(/<h1\b/g)||[]).length,1);
  assert.ok(html.includes('href="https://iamrobin.ai/research/kid-edition/"'));
  assert.ok(read('dist/sitemap-0.xml').includes('https://iamrobin.ai/research/kid-edition/'));
  assert.doesNotMatch(html,/\/Users\/|private_reviews|chatgpt\.com\/c\/|6af33178|ad8a673c/);
  assert.ok(html.includes('Real life can work differently.'));
});

test('Research Council counts Teddy as a main agent while preserving the historical study totals',()=>{
  const council=read('dist/research/council/index.html');
  const hub=read('dist/research/index.html');
  assert.doesNotMatch(council+hub,/one human and two agents|One human, two agents|guest reviewer/);
  assert.ok(council.includes('Teddy, Claude and Codex, with supporting sub-agents'));
  assert.ok(council.includes('research partner · critical reviewer'));
  assert.ok(council.includes('nine studies.')&&council.includes('$57.28'));
  assert.ok(hub.includes('three main AI agents, with supporting sub-agents'));
});
