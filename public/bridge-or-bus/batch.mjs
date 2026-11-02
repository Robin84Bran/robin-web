import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { DEFAULTS, POLICY_IDS, POLICY_LABELS, VERSION, simulateWorld } from './model.mjs';

export const scenarios = [
  ['default', 'Eight services, moderate drift and a recoverable shared hub', {}],
  ['stable-schemas', 'Interfaces never change', { driftRate: 0 }],
  ['rapid-drift', 'Eight percent per-service schema drift', { driftRate: 8 }],
  ['four-services', 'A smaller integration surface', { services: 4 }],
  ['twelve-services', 'A larger integration surface and four-stage routes', { services: 12, routeLength: 4 }],
  ['stable-hub', 'The shared layer never goes offline', { hubOutageRate: 0 }],
  ['fragile-hub', 'Frequent outages and slow recovery', { hubOutageRate: 8, hubRecoveryRate: 15 }],
  ['no-repair', 'No adapter can be updated after drift', { repairsPerTick: 0 }],
  ['two-repairs', 'Two adapter updates per tick', { repairsPerTick: 2 }],
  ['repeated-routes', 'Jobs reuse two seeded service routes', { routePoolSize: 2 }],
];

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function stats(values) {
  const available = values.filter((value) => value !== null);
  return {
    mean: available.length ? available.reduce((sum, value) => sum + value, 0) / available.length : null,
    min: available.length ? Math.min(...available) : null,
    max: available.length ? Math.max(...available) : null,
    valid: available.length,
    total: values.length,
  };
}

export function buildResults() {
  const batches = [];
  for (const [id, description, overrides] of scenarios) {
    const config = { ...DEFAULTS, ...overrides };
    const outcomes = [];
    for (let seed = 1; seed <= 64; seed += 1) {
      const world = simulateWorld(config, seed, false);
      for (const policy of POLICY_IDS) outcomes.push({ seed, policy, ...world.policies[policy].summary });
    }
    const summary = {};
    for (const policy of POLICY_IDS) {
      const rows = outcomes.filter((row) => row.policy === policy);
      summary[policy] = {
        label: POLICY_LABELS[policy],
        delivered: stats(rows.map((row) => row.delivered)),
        expired: stats(rows.map((row) => row.expired)),
        overflowed: stats(rows.map((row) => row.overflowed)),
        blockedAttempts: stats(rows.map((row) => row.blockedAttempts)),
        hubBlockedAttempts: stats(rows.map((row) => row.hubBlockedAttempts)),
        repairs: stats(rows.map((row) => row.repairs)),
        finalQueue: stats(rows.map((row) => row.finalQueue)),
        meanLatency: stats(rows.map((row) => row.meanLatency)),
      };
    }
    batches.push({ id, description, config, worlds: 64, policyOutcomes: outcomes.length, summary, outcomes });
  }
  return {
    experiment: 'Bridge or Bus?',
    version: VERSION,
    frozenAt: '2026-11-02',
    seeds: { first: 1, last: 64, count: 64 },
    modelSha256: sha256(new URL('./model.mjs', import.meta.url)),
    scenarioCount: scenarios.length,
    worlds: scenarios.length * 64,
    policyOutcomes: scenarios.length * 64 * POLICY_IDS.length,
    batches,
  };
}

const outputPath = fileURLToPath(new URL('./results.json', import.meta.url));
const expected = `${JSON.stringify(buildResults(), null, 2)}\n`;
if (process.argv.includes('--verify')) {
  const actual = readFileSync(outputPath, 'utf8');
  if (actual !== expected) {
    console.error('results.json does not match a fresh frozen-batch replay');
    process.exitCode = 1;
  } else console.log('PASS: results.json reproduces 640 worlds / 2,560 policy outcomes');
} else {
  writeFileSync(outputPath, expected);
  console.log(`Wrote ${outputPath}`);
}
