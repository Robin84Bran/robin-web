import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../../public/_worker.js';

test('old research bookmarks redirect once with query preserved', async () => {
  for (const [old, next] of [
    ['/resonance/', '/research/'],
    ['/identity/resonance/', '/research/'],
    ['/identity/research/', '/research/'],
    ['/resonance/btc_probability_atlas/', '/asymmetry/btc_probability_atlas/'],
    ['/binary/joy/hkipoblindbox/', '/asymmetry/hkipoblindbox/'],
  ]) {
    for (const path of [old, old.slice(0, -1)]) {
      const result = await worker.fetch(new Request('https://iamrobin.ai' + path + '?source=bookmark'), {});
      assert.equal(result.status, 301);
      assert.equal(result.headers.get('Location'), 'https://iamrobin.ai' + next + '?source=bookmark');
    }
  }
});

test('Atlas data URLs retain compatibility and are not redirected as pages', async () => {
  let path;
  const env = { ASSETS: { fetch: async request => {
    path = new URL(request.url).pathname;
    return new Response('{}', { headers: { 'Content-Type': 'application/json' } });
  } } };
  const response = await worker.fetch(new Request('https://iamrobin.ai/resonance/btc_probability_atlas/data/BTC.json'), env);
  assert.equal(response.status, 200);
  assert.equal(path, '/resonance/btc_probability_atlas/data/BTC.json');
});


test('Honest Agent source stays unchanged apart from route, imports and back link', async () => {
  const { readFileSync } = await import('node:fs');
  const { createHash } = await import('node:crypto');
  const original = readFileSync(new URL('../../src/pages/research/honestagent/index.astro', import.meta.url), 'utf8')
    .replaceAll("from '../../../", "from '../../")
    .replace("const path = '/research/honestagent/';", "const path = '/research/';")
    .replace('href="/research/">← Research', 'href="/intelligence/">← Intelligence');
  assert.equal(createHash('sha256').update(original).digest('hex'), '8d98801bbd806b3c89e059c9c868fb35fd7647c7a4be5cfb1461b42e293d9b4e');
});
