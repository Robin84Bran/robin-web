import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import {
  DEFAULTS,
  POLICY_IDS,
  POLICY_LABELS,
  VERSION,
  simulatePolicy,
} from './model.mjs';

const scenarios = [
  ['default', 'Four recurring bodies; swap every 8; full remapping', {}],
  ['same-mapping', 'Every body exposes the same controls', { divergence: 0 }],
  ['mild-remapping', 'Each body swaps only two controls', { divergence: 1 }],
  ['slow-handoff', 'Swap every 24 ticks', { swapEvery: 24 }],
  ['rapid-handoff', 'Swap every 4 ticks', { swapEvery: 4 }],
  ['one-use-bodies', 'Twelve bodies, each used once', { bodyCount: 12 }],
  ['fresh-drift', 'Mappings change at tick 48; fingerprints update', { driftAt: 48, manifestFresh: true }],
  ['stale-drift', 'Mappings change at tick 48; labels do not', { driftAt: 48, manifestFresh: false }],
  ['short-run', 'Only 32 action ticks', { steps: 32, driftAt: 0 }],
  ['long-run', '192 action ticks', { steps: 192, driftAt: 0 }],
];

function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function stats(values) {
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  return { mean, min: Math.min(...values), max: Math.max(...values) };
}

export function buildResults() {
  const modelPath = new URL('./model.mjs', import.meta.url);
  const batches = [];
  for (const [id, description, overrides] of scenarios) {
    const config = { ...DEFAULTS, ...overrides };
    const outcomes = [];
    for (let seed = 1; seed <= 64; seed += 1) {
      for (const policy of POLICY_IDS) {
        const { summary } = simulatePolicy(config, policy, seed, false);
        outcomes.push({ seed, policy, ...summary });
      }
    }
    const summary = {};
    for (const policy of POLICY_IDS) {
      const rows = outcomes.filter((row) => row.policy === policy);
      summary[policy] = {
        label: POLICY_LABELS[policy],
        correct: stats(rows.map((row) => row.correct)),
        errors: stats(rows.map((row) => row.errors)),
        assemblies: stats(rows.map((row) => row.assemblies)),
        meanRecoveryErrors: stats(rows.map((row) => row.meanRecoveryErrors)),
        recalls: stats(rows.map((row) => row.recalls)),
        calibrations: stats(rows.map((row) => row.calibrations)),
        staleRecallErrors: stats(rows.map((row) => row.staleRecallErrors)),
      };
    }
    const paired = {};
    for (const policy of POLICY_IDS.filter((value) => value !== 'portable')) {
      paired[`portableMinus${policy[0].toUpperCase()}${policy.slice(1)}`] = stats(
        Array.from({ length: 64 }, (_, index) => {
          const seed = index + 1;
          const portable = outcomes.find((row) => row.seed === seed && row.policy === 'portable').correct;
          const other = outcomes.find((row) => row.seed === seed && row.policy === policy).correct;
          return portable - other;
        }),
      );
    }
    batches.push({ id, description, config, worlds: 64, policyOutcomes: outcomes.length, summary, paired, outcomes });
  }
  return {
    experiment: 'The Portable Self',
    version: VERSION,
    frozenAt: '2026-10-13',
    seeds: { first: 1, last: 64, count: 64 },
    modelSha256: sha256(modelPath),
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
    console.log('PASS: results.json reproduces all 640 worlds / 3,200 policy outcomes');
  }
} else {
  writeFileSync(outputPath, expected);
  console.log(`Wrote ${outputPath}`);
}

