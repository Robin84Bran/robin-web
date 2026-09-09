import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Resolve the build directory from scripts/tests rather than the process's cwd.
const html = (route) => readFileSync(new URL(`../../dist/${route}/index.html`, import.meta.url), 'utf8');
const main = (route) => html(route).match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
const links = (route) => [...main(route).matchAll(/href="([^"]+)"/g)].map((m) => m[1]);

test('founders can follow Identity to Asymmetry to a real Network contact', () => {
  assert.ok(links('identity').includes('/asymmetry/'));
  assert.ok(links('identity').includes('/about/'));
  assert.ok(links('about').includes('/identity/'));
  assert.ok(links('asymmetry').includes('/network/#contact'));
  assert.match(main('network'), /id="contact"/);
  assert.ok(links('network').includes('https://www.linkedin.com/in/nanobin'));
  assert.ok(links('network').includes('/asymmetry/#founders'));
});

test('Identity and About have distinct canonical URLs and the same Person entity', () => {
  for (const route of ['identity', 'about']) {
    assert.ok(html(route).includes(`rel="canonical" href="https://iamrobin.ai/${route}/"`));
    const blocks = [...html(route).matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    const nodes = blocks.flatMap((block) => block['@graph'] ?? [block]);
    assert.equal(nodes.find((node) => node['@type'] === 'Person')['@id'], 'https://iamrobin.ai/#person');
    assert.equal(nodes.find((node) => node['@type'] === 'ProfilePage').mainEntity['@id'], 'https://iamrobin.ai/#person');
  }
});

test('investor learning and evaluation paths lead to substantive destinations', () => {
  for (const id of ['agentic-ai', 'ai-infrastructure']) assert.ok(main('intelligence').includes(`id="${id}"`));
  for (const route of ['intelligence', 'resonance']) assert.ok(links(route).includes('/asymmetry/#scorecard'));
  assert.ok(links('resonance').includes('/resonance/eval/ai_berkshire/'));
  assert.ok(links('resonance').includes('/resonance/btc_probability_atlas/'));
  assert.match(main('resonance'), /No model Olympics results are published here yet/);
  assert.ok(main('asymmetry').includes('id="scorecard"'));
});

test('monthly Binary curation keeps individual dated article destinations', () => {
  assert.match(main('binary'), /collected here monthly/);
  assert.ok(links('binary').includes('/ouroboros/202608/20260824/blog/'));
  assert.ok(html('ouroboros/202608/20260824/blog').includes('rel="canonical" href="https://iamrobin.ai/ouroboros/202608/20260824/blog/"'));
  assert.ok(links('ouroboros').includes('/intelligence/'));
});
