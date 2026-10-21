import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
const route = 'intelligence/signal-or-silence/';
const html = read(`${route}index.html`);

assert.equal((html.match(/<h1\b/g) || []).length, 1);
for (const fragment of [
  `https://iamrobin.ai/${route}`,
  'application/ld+json',
  'LearningResource',
  '/signal-or-silence/client.mjs',
  '640 matched seeded worlds',
  '1,920 policy outcomes',
  'Where the signal stops',
  'name="seed"',
  'name="dropRate"',
  'name="outageLength"',
  'name="decisionTempo"',
  'id="download"',
  'id="tick"',
  'id="signal-world"',
]) assert.ok(html.includes(fragment), fragment);

for (const name of ['source.zip', 'README.md', 'EXPERIMENT.md', 'model.mjs', 'client.mjs', 'tests.mjs', 'batch.mjs', 'results.json']) {
  assert.ok(existsSync(new URL(`../dist/signal-or-silence/${name}`, import.meta.url)), name);
}

assert.ok(read('intelligence/index.html').includes(`href="/${route}"`));
assert.ok(read('sitemap-0.xml').includes(`https://iamrobin.ai/${route}`));
const results = JSON.parse(read('signal-or-silence/results.json'));
assert.equal(results.worlds, 640);
assert.equal(results.policyOutcomes, 1920);
assert.equal(results.modelSha256, createHash('sha256').update(read('signal-or-silence/model.mjs')).digest('hex'));
console.log('Signal or Silence: rendered controls, canonical/schema, discovery, sitemap and source assets verified.');
