import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
const route = 'intelligence/useful-core/';
const html = read(`${route}index.html`);

assert.equal((html.match(/<h1\b/g) || []).length, 1);
for (const fragment of [
  `https://iamrobin.ai/${route}`,
  'application/ld+json',
  'LearningResource',
  '/useful-core/client.mjs',
  '640 matched seeded worlds',
  '2,560 policy outcomes',
  'Where the toy stops',
  'name="seed"',
  'name="failureRate"',
  'name="repairRate"',
  'name="shockSize"',
  'name="switchCost"',
  'id="download"',
  'id="tick"',
  'id="core-world"',
]) assert.ok(html.includes(fragment), fragment);

for (const name of ['source.zip', 'README.md', 'EXPERIMENT.md', 'model.mjs', 'client.mjs', 'tests.mjs', 'batch.mjs', 'results.json']) {
  assert.ok(existsSync(new URL(`../dist/useful-core/${name}`, import.meta.url)), name);
}

assert.ok(read('intelligence/index.html').includes(`href="/${route}"`));
assert.ok(read('sitemap-0.xml').includes(`https://iamrobin.ai/${route}`));
const results = JSON.parse(read('useful-core/results.json'));
assert.equal(results.worlds, 640);
assert.equal(results.policyOutcomes, 2560);
assert.equal(results.modelSha256, createHash('sha256').update(read('useful-core/model.mjs')).digest('hex'));
console.log('The Useful Core: rendered controls, canonical/schema, discovery, sitemap and source assets verified.');
