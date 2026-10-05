import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import test from 'node:test';

const require = createRequire(import.meta.url);
const astroRoot = dirname(require.resolve('astro/package.json'));
const remotePath = join(astroRoot, 'dist/assets/build/remote.js');
const CachePolicy = createRequire(remotePath)('http-cache-semantics');
const { loadRemoteImage, revalidateRemoteImage } = await import(pathToFileURL(remotePath));
const url = 'https://example.invalid/synthetic.png';
const imageConfig = { domains: ['example.invalid'], remotePatterns: [] };

test('cache boundary checks use the dependency selected by the release lockfile', () => {
  const installed = createRequire(remotePath)('http-cache-semantics/package.json').version;
  const lock = readFileSync('pnpm-lock.yaml', 'utf8');
  assert.ok(lock.includes('  http-cache-semantics@' + installed + ':'),
    'Installed cache dependency differs from lockfile; install the governed candidate before testing');
});

test('production remains static and delegates assets without a server cache-policy dependency', () => {
  const config = readFileSync('astro.config.mjs', 'utf8');
  const worker = readFileSync('public/_worker.js', 'utf8');
  const wrangler = JSON.parse(readFileSync('wrangler.jsonc', 'utf8'));
  assert.match(config, /output: 'static'/);
  assert.equal(wrangler.main, './public/_worker.js');
  assert.match(worker, /env\.ASSETS\.fetch\(request\)/);
  assert.doesNotMatch(worker, /http-cache-semantics|CachePolicy|\bimport\b|\brequire\s*\(/);
});

test('Astro image TTL path never consumes requester max-stale or reuses personalized response headers', async () => {
  // This guards the actual site dependency boundary, not a claim that the
  // upstream generic stale-cache behavior is fixed in a particular version.
  const methods = ['evaluateRequest', 'satisfiesWithoutRevalidation'];
  const original = Object.fromEntries(methods.map(name => [name, CachePolicy.prototype[name]]));
  for (const name of methods) CachePolicy.prototype[name] = () => {
    throw new Error('Request-controlled cache reuse reached');
  };
  try {
    for (const [cc, extra, fresh] of [
      ['public, max-age=600', {}, true],
      ['private, max-age=600', {}, false],
      ['no-store, max-age=600', {}, false],
      ['no-cache, max-age=600', {}, false],
      ['max-age=600', {'set-cookie': 'synthetic=1'}, false],
      ['public, max-age=600', {'set-cookie': 'synthetic=1'}, true],
      ['max-age=600', {vary: '*'}, false],
    ]) {
      const start = Date.now();
      const result = await loadRemoteImage(url, async () => new Response('fixture', {
        headers: {'cache-control': cc, ...extra},
      }), imageConfig);
      assert.equal(result.data.toString(), 'fixture');
      assert.deepEqual(Object.keys(result).sort(), ['data', 'etag', 'expires', 'lastModified']);
      assert.ok(fresh ? result.expires - start > 590000 : result.expires - start < 1000);
    }
    for (const status of [200, 304]) {
      const result = await revalidateRemoteImage(url, {etag: '"old"'}, async request => {
        assert.equal(request.headers.get('if-none-match'), '"old"');
        assert.equal(request.headers.get('cache-control'), null);
        return new Response(status === 200 ? 'new' : null, {
          status, headers: {'cache-control': 'public, max-age=600', etag: '"new"'},
        });
      }, imageConfig);
      assert.equal(result.data === null, status === 304);
      assert.equal(result.etag, '"new"');
    }
    await assert.rejects(loadRemoteImage(url, async () => new Response(null, {status: 404}), imageConfig), /Failed to load/);
  } finally {
    for (const name of methods) CachePolicy.prototype[name] = original[name];
  }
});
