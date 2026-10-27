import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { DEFAULTS, POLICY_IDS, POLICY_LABELS, VERSION, simulateWorld } from './model.mjs';

export const scenarios = [
  ['default', 'Routine faults, repair and a two-module shock every 30 ticks', {}],
  ['calm', 'No failures or shocks', { failureRate: 0, repairRate: 0, shockEvery: 0, shockSize: 0 }],
  ['rare-failure', 'One percent independent failure and no shock', { failureRate: 1, shockEvery: 0, shockSize: 0 }],
  ['harsh', 'Eight percent failure, slow repair and repeated shocks', { failureRate: 8, repairRate: 4 }],
  ['no-repair', 'Failed modules never return', { repairRate: 0 }],
  ['fast-repair', 'Twenty percent repair chance', { repairRate: 20 }],
  ['correlated', 'Low background failure with four-module shocks', { failureRate: 1, shockSize: 4 }],
  ['independent-only', 'Independent failures with no correlated shock', { shockEvery: 0, shockSize: 0 }],
  ['free-switch', 'Graceful mode changes have no switching cost', { switchCost: 0 }],
  ['expensive-switch', 'Graceful mode changes cost three work units', { switchCost: 3 }],
];

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function stats(values) {
  return {
    mean: values.reduce((sum, value) => sum + value, 0) / values.length,
    min: Math.min(...values),
    max: Math.max(...values),
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
        usefulWork: stats(rows.map((row) => row.usefulWork)),
        productiveTicks: stats(rows.map((row) => row.productiveTicks)),
        failedAttempts: stats(rows.map((row) => row.failedAttempts)),
        switches: stats(rows.map((row) => row.switches)),
        fullCompletions: stats(rows.map((row) => row.fullCompletions)),
        reducedCompletions: stats(rows.map((row) => row.reducedCompletions)),
        coreCompletions: stats(rows.map((row) => row.coreCompletions)),
      };
    }
    batches.push({ id, description, config, worlds: 64, policyOutcomes: outcomes.length, summary, outcomes });
  }
  return {
    experiment: 'The Useful Core',
    version: VERSION,
    frozenAt: '2026-10-27',
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
  } else {
    console.log('PASS: results.json reproduces 640 worlds / 2,560 policy outcomes');
  }
} else {
  writeFileSync(outputPath, expected);
  console.log(`Wrote ${outputPath}`);
}
