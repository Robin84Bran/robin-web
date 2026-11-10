import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { DEFAULTS, POLICY_IDS, POLICY_LABELS, VERSION, simulateWorld } from './model.mjs';

export const scenarios = [
  ['default', 'Eight actions, one candidate per review', {}],
  ['perfect-quality', 'Every produced candidate is valid', { qualityRate: 100 }],
  ['noisy-candidates', 'Only 35 percent of candidates are valid', { qualityRate: 35 }],
  ['review-batch-two', 'One review action handles two candidates', { reviewBatch: 2 }],
  ['review-batch-three', 'One review action handles three candidates', { reviewBatch: 3 }],
  ['long-deadline', 'Candidates wait up to 30 ticks', { deadline: 30 }],
  ['short-deadline', 'Candidates expire after four ticks', { deadline: 4 }],
  ['small-queue', 'Only 16 candidates can wait', { queueLimit: 16 }],
  ['four-actions', 'Four action opportunities per tick', { actionsPerTick: 4 }],
  ['sixteen-actions', 'Sixteen action opportunities per tick', { actionsPerTick: 16 }],
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
        accepted: stats(rows.map((row) => row.accepted)),
        rejected: stats(rows.map((row) => row.rejected)),
        expired: stats(rows.map((row) => row.expired)),
        blockedProduction: stats(rows.map((row) => row.blockedProduction)),
        idleReviewActions: stats(rows.map((row) => row.idleReviewActions)),
        finalQueue: stats(rows.map((row) => row.finalQueue)),
        meanReviewAge: stats(rows.map((row) => row.meanReviewAge)),
      };
    }
    batches.push({ id, description, config, worlds: 64, policyOutcomes: outcomes.length, summary, outcomes });
  }
  return {
    experiment: 'Work or Proof?',
    version: VERSION,
    frozenAt: '2026-11-09',
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
  } else console.log('PASS: results.json reproduces 640 worlds / 3,200 policy outcomes');
} else {
  writeFileSync(outputPath, expected);
  console.log(`Wrote ${outputPath}`);
}
