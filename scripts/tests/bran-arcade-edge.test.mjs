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

test('arcade casing aliases preserve game paths and query parameters', async () => {
  for (const spelling of ['bran_lab','Bran_lab','Bran_Lab']) {
    for (const tail of ['', '/', '/StarboundMath/?grade=4', '/shared/arcade.css?v=2']) {
      const url = new URL('https://iamrobin.ai/meaning/' + spelling + tail);
      const expected = new URL(url);
      expected.pathname = expected.pathname.replace('/'+spelling, '/Bran_lab');
      if (tail === '') expected.pathname += '/';
      const response = await worker.fetch(new Request(url), env);
      if (url.href === expected.href) assert.equal(response.status, 200);
      else { assert.equal(response.status, 301); assert.equal(response.headers.get('Location'),expected.href); }
    }
  }
  const unrelated = await worker.fetch(new Request('https://iamrobin.ai/meaning/bran_laboratory/'), env);
  assert.equal(unrelated.status, 200);
});
