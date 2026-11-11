import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
const read=p=>readFileSync(new URL('../../'+p,import.meta.url),'utf8');
const discovery=JSON.parse(read('src/data/intelligence-discovery.json'));
const catalogue=JSON.parse(read('public/agent-swarm/catalog.json'));
const html=read('dist/intelligence/index.html');
test('five sections preserve the weekly collection and expose all discovery paths',()=>{
  const ids=['experiments','open-council','supply-chain','the-swarm','field-guides'];
  let previous=-1;
  for(const id of ids){const position=html.indexOf(`id="${id}"`);assert.ok(position>previous,id);previous=position;assert.ok(html.includes(`href="#${id}"`));}
  assert.equal((html.match(/data-weekly-experiment=/g)||[]).length,8);
  const worlds=discovery.themes.flatMap(t=>t.worlds);
  assert.equal(worlds.length,15);assert.equal(new Set(worlds.map(w=>w.id)).size,15);
  for(const item of [...worlds,...discovery.levels,...discovery.guides]){
    assert.ok(html.includes(`href="${item.href}"`));
    assert.ok(existsSync(new URL('../../dist'+item.href+'index.html',import.meta.url)),item.href);
  }
  assert.deepEqual(worlds.filter(w=>w.level==='301').map(w=>w.id).sort(),catalogue.map(w=>w.id).sort());
  assert.equal(discovery.guides.length,3);
  assert.match(html,/333-call model study/);assert.match(html,/three world seeds/);assert.match(html,/other worlds use scripted policies/);
  assert.match(html,/17 Aug 2026/);assert.match(html,/Unmapped relationships remain unknown/);
  assert.doesNotMatch(html,/private_reviews|\/Users\/|01a00dc2/);
});
