import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../../public/_worker.js';

test('old research bookmarks redirect once with query preserved', async () => {
  for (const [old, next] of [
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
