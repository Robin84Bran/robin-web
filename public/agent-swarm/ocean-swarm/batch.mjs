import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { simulate, presets, defaults, keyed } from './model.mjs';

const path = name => fileURLToPath(new URL(name, import.meta.url));
const hash = text => createHash('sha256').update(text).digest('hex');
const mean = values => values.length ? values.reduce((a, b) => a + b, 0) / values.length : null;
const rounded = value => value === null ? null : Number(value.toFixed(6));
const q = (values, quantile) => {
  const sorted = values.slice().sort((a, b) => a - b);
  return sorted.length ? sorted[Math.floor((sorted.length - 1) * quantile)] : null;
};
function bootstrap(values, key) {
  const draws = [];
  for (let b = 0; b < 2000; b++) {
    let sum = 0;
    for (let i = 0; i < values.length; i++) sum += values[Math.floor(keyed(20261002, key, b, i) * values.length)];
    draws.push(sum / values.length);
  }
  return [rounded(q(draws, 0.025)), rounded(q(draws, 0.975))];
}
const seeds = Array.from({ length: 24 }, (_, i) => i + 1);
export async function buildBatch() {
  const results = {
    schema: 'ocean-swarm-batch-v1', modelVersion: '1.0.0',
    modelSha256: hash(await readFile(path('model.mjs'))),
    frozenExperimentSha256: hash(await readFile(path('EXPERIMENT.md'))),
    seedPlan: seeds, defaults: { ...defaults, record: false },
    comparison: 'Paired exogenous seeds within each regime. Coverage delta is percentage points against provisioned stations; 95% percentile bootstrap intervals use 2000 paired resamples. These are simulator estimates, not real ocean uncertainty.',
    regimes: [],
  };
  for (const preset of presets) {
    const runs = seeds.map(seed => {
      const result = simulate({ ...preset.params, seed, record: false });
      return { seed, arms: result.arms.map(({ id, summary }) => ({ id, summary })) };
    });
    const aggregate = runs[0].arms.map(({ id }) => {
      const summaries = runs.map(r => r.arms.find(a => a.id === id).summary);
      const keys = Object.keys(summaries[0]);
      return { id,
        means: Object.fromEntries(keys.map(key => [key, rounded(mean(summaries.map(s => s[key]).filter(v => v !== null)))])),
        nonNullCount: Object.fromEntries(keys.map(key => [key, summaries.filter(s => s[key] !== null).length])),
        coverageP10: rounded(q(summaries.map(s => s.coverage), 0.1)),
        coverageP90: rounded(q(summaries.map(s => s.coverage), 0.9)),
        censoredRecoveries: summaries.filter(s => s.recoveryCensored === 1).length,
      };
    });
    const paired = ['local', 'assisted'].map(id => {
      const delta = key => runs.map(r => {
        const arm = r.arms.find(a => a.id === id).summary[key], baseline = r.arms[0].summary[key];
        return arm === null || baseline === null ? null : arm - baseline;
      }).filter(v => v !== null);
      const values = delta('coverage');
      return {
        id, coverageDelta: rounded(mean(values)), coverageDelta95: bootstrap(values, `${preset.id}:${id}`),
        wins: values.filter(v => v > 0).length, ties: values.filter(v => v === 0).length, losses: values.filter(v => v < 0).length,
        postFaultCoverageDelta: rounded(mean(delta('postFaultCoverage'))), energyDelta: rounded(mean(delta('energyUsed'))), bytesDelta: rounded(mean(delta('bytes'))),
      };
    });
    results.regimes.push({ id: preset.id, label: preset.label, params: preset.params, runs, aggregate, paired });
  }
  return results;
}
const result = await buildBatch();
const text = JSON.stringify(result, null, 2) + '\n';
if (process.argv.includes('--verify')) {
  const saved = await readFile(path('results.json'), 'utf8');
  if (saved !== text) throw new Error('Saved results differ from deterministic replay. No files were modified.');
  console.log(`Verified ${seeds.length * presets.length} paired worlds, ${seeds.length * presets.length * 3} arm outcomes. SHA-256 ${hash(text)}`);
} else {
  await writeFile(path('results.json'), text);
  console.log(`Saved ${seeds.length * presets.length} paired worlds, ${seeds.length * presets.length * 3} arm outcomes. SHA-256 ${hash(text)}`);
}
for (const regime of result.regimes) console.log(`${regime.id}: ${regime.aggregate.map(a => `${a.id} ${a.means.coverage.toFixed(2)}%`).join(' | ')}`);
