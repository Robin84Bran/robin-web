import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { DEFAULTS, POLICY_IDS, POLICY_LABELS, VERSION, simulateWorld } from './model.mjs';

const scenarios = [
  ['default', 'Delay burst, 12% loss and a 40-tick outage', {}],
  ['clean-network', 'No loss, no delay burst', { dropRate: 0, burstDelay: 2 }],
  ['no-outage', 'The service remains up for the full observation window', { outageLength: 0 }],
  ['high-loss', 'Thirty percent of heartbeats disappear', { dropRate: 30 }],
  ['long-delay', 'Burst delay can reach 30 ticks', { burstDelay: 30 }],
  ['slow-heartbeat', 'Heartbeat every eight ticks', { heartbeatEvery: 8 }],
  ['short-outage', 'Outage lasts twelve ticks', { outageLength: 12 }],
  ['overlap', 'Delay burst overlaps the true outage', { burstStart: 120, burstEnd: 180 }],
  ['aggressive', 'Shorter fixed and UNKNOWN thresholds', { fixedTimeout: 6, unknownAfter: 6, downAfter: 18 }],
  ['patient', 'Longer fixed and UNKNOWN thresholds', { fixedTimeout: 14, unknownAfter: 14, downAfter: 34 }],
];

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function stats(values) {
  const numeric = values.filter((value) => value !== null);
  return {
    mean: numeric.length ? numeric.reduce((sum, value) => sum + value, 0) / numeric.length : null,
    min: numeric.length ? Math.min(...numeric) : null,
    max: numeric.length ? Math.max(...numeric) : null,
    valid: numeric.length,
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
        usefulRouting: stats(rows.map((row) => row.usefulRouting)),
        healthyFalseDown: stats(rows.map((row) => row.healthyFalseDown)),
        healthyUnknown: stats(rows.map((row) => row.healthyUnknown)),
        healthyUnavailability: stats(rows.map((row) => row.healthyUnavailability)),
        outageUnsafeUp: stats(rows.map((row) => row.outageUnsafeUp)),
        outageUnknown: stats(rows.map((row) => row.outageUnknown)),
        detectionDelay: stats(rows.map((row) => row.detectionDelay)),
        recoveryDelay: stats(rows.map((row) => row.recoveryDelay)),
        stateChanges: stats(rows.map((row) => row.stateChanges)),
      };
    }
    batches.push({ id, description, config, worlds: 64, policyOutcomes: outcomes.length, summary, outcomes });
  }
  return {
    experiment: 'Signal or Silence',
    version: VERSION,
    frozenAt: '2026-10-21',
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
    console.log('PASS: results.json reproduces 640 worlds / 1,920 policy outcomes');
  }
} else {
  writeFileSync(outputPath, expected);
  console.log(`Wrote ${outputPath}`);
}
