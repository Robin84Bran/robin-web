import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
const route = 'intelligence/work-or-proof/';
const html = read(`${route}index.html`);

assert.equal((html.match(/<h1\b/g) || []).length, 1);
for (const fragment of [
  `https://iamrobin.ai/${route}`,
  'application/ld+json',
  'LearningResource',
  '/work-or-proof/client.mjs',
  '640 matched seeded worlds',
  '3,200 policy outcomes',
  'Where the toy stops',
  'name="seed"',
  'name="actionsPerTick"',
  'name="qualityRate"',
  'name="reviewBatch"',
  'name="deadline"',
  'name="queueLimit"',
  'name="adaptiveTarget"',
  'id="download"',
  'id="tick"',
  'id="proof-world"',
]) assert.ok(html.includes(fragment), fragment);

for (const name of ['source.zip', 'README.md', 'EXPERIMENT.md', 'model.mjs', 'client.mjs', 'tests.mjs', 'batch.mjs', 'results.json']) {
  assert.ok(existsSync(new URL(`../dist/work-or-proof/${name}`, import.meta.url)), name);
}

assert.ok(read('intelligence/index.html').includes(`href="/${route}"`));
const sitemapIndex = read('sitemap-index.xml');
const sitemapFiles = [...sitemapIndex.matchAll(/<loc>https:\/\/iamrobin\.ai\/(sitemap-[^<]+)<\/loc>/g)].map((match) => match[1]);
assert.ok(sitemapFiles.some((name) => read(name).includes(`https://iamrobin.ai/${route}`)));
const results = JSON.parse(read('work-or-proof/results.json'));
assert.equal(results.worlds, 640);
assert.equal(results.policyOutcomes, 3200);
assert.equal(results.modelSha256, createHash('sha256').update(read('work-or-proof/model.mjs')).digest('hex'));
console.log('Work or Proof: rendered controls, canonical/schema, discovery, sitemap and source assets verified.');
