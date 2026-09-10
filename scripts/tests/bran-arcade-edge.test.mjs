import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../../public/_worker.js';

let rewrites = 0;
globalThis.HTMLRewriter = class {
  on() { return this; }
  transform(response) { rewrites++; return response; }
};
const env = { ASSETS: { fetch: async () => new Response('<html><body>Play</body></html>', { headers: { 'Content-Type': 'text/html' } }) } };
test('arcade pages avoid the external beacon; other site pages retain it', async () => {
  for (const path of ['/meaning/Bran_lab/', '/meaning/Bran_lab/SuperRun/', '/meaning/Bran_lab/StarboundMath/']) {
    rewrites = 0;
    const response = await worker.fetch(new Request('https://iamrobin.ai' + path), env);
    assert.equal(response.status, 200);
    assert.equal(rewrites, 0);
    assert.match(response.headers.get('Content-Security-Policy'), /default-src 'self'/);
  }
  rewrites = 0;
  await worker.fetch(new Request('https://iamrobin.ai/meaning/'), env);
  assert.equal(rewrites, 1);
});
