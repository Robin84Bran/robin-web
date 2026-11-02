import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../dist/${path}`, import.meta.url), 'utf8');
const route = 'intelligence/bridge-or-bus/';
const html = read(`${route}index.html`);

assert.equal((html.match(/<h1\b/g) || []).length, 1);
for (const fragment of [
  `https://iamrobin.ai/${route}`,
  'application/ld+json',
  'LearningResource',
  '/bridge-or-bus/client.mjs',
  '640 matched seeded worlds',
  '2,560 policy outcomes',
  'Where the toy stops',
  'name="seed"',
  'name="services"',
  'name="routeLength"',
  'name="driftRate"',
  'name="hubOutageRate"',
  'name="repairsPerTick"',
  'name="routePoolSize"',
  'id="download"',
  'id="tick"',
  'id="bridge-world"',
]) assert.ok(html.includes(fragment), fragment);

for (const name of ['source.zip', 'README.md', 'EXPERIMENT.md', 'model.mjs', 'client.mjs', 'tests.mjs', 'batch.mjs', 'results.json']) {
  assert.ok(existsSync(new URL(`../dist/bridge-or-bus/${name}`, import.meta.url)), name);
}

assert.ok(read('intelligence/index.html').includes(`href="/${route}"`));
const sitemapIndex = read('sitemap-index.xml');
const sitemapFiles = [...sitemapIndex.matchAll(/<loc>https:\/\/iamrobin\.ai\/(sitemap-[^<]+)<\/loc>/g)].map((match) => match[1]);
assert.ok(sitemapFiles.some((name) => read(name).includes(`https://iamrobin.ai/${route}`)));
const results = JSON.parse(read('bridge-or-bus/results.json'));
assert.equal(results.worlds, 640);
assert.equal(results.policyOutcomes, 2560);
assert.equal(results.modelSha256, createHash('sha256').update(read('bridge-or-bus/model.mjs')).digest('hex'));
console.log('Bridge or Bus: rendered controls, canonical/schema, discovery, sitemap and source assets verified.');
