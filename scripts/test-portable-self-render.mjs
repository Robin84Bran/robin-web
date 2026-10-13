import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
const route = 'intelligence/portable-self/';
const html = read(`${route}index.html`);

assert.equal((html.match(/<h1\b/g) || []).length, 1);
for (const fragment of [
  `https://iamrobin.ai/${route}`,
  'application/ld+json',
  'LearningResource',
  '/portable-self/client.mjs',
  '640 matched seeded worlds',
  '3,200 policy outcomes',
  'Where the self stops',
  'name="seed"',
  'name="swapEvery"',
  'name="bodyCount"',
  'name="manifestFresh"',
  'id="download"',
  'id="tick"',
]) assert.ok(html.includes(fragment), fragment);

for (const name of ['source.zip', 'README.md', 'EXPERIMENT.md', 'model.mjs', 'client.mjs', 'tests.mjs', 'batch.mjs', 'results.json']) {
  assert.ok(existsSync(new URL(`../dist/portable-self/${name}`, import.meta.url)), name);
}

assert.ok(read('intelligence/index.html').includes(`href="/${route}"`));
assert.ok(read('sitemap-0.xml').includes(`https://iamrobin.ai/${route}`));
const results = JSON.parse(read('portable-self/results.json'));
assert.equal(results.worlds, 640);
assert.equal(results.policyOutcomes, 3200);
assert.equal(results.modelSha256, createHash('sha256').update(read('portable-self/model.mjs')).digest('hex'));
console.log('Portable Self: rendered controls, canonical/schema, discovery, sitemap and source assets verified.');
