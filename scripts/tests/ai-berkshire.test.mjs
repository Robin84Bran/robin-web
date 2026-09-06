import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const data = readFileSync(new URL('../../src/data/aiBerkshireEvaluation.ts', import.meta.url), 'utf8');
const component = readFileSync(new URL('../../src/components/resonance/AiBerkshireEvaluation.astro', import.meta.url), 'utf8');
const app = readFileSync(new URL('../../public/resonance/eval/ai_berkshire/app.js', import.meta.url), 'utf8');

test('the field test contains the ten-company cohort including NVDA', () => {
  for (const ticker of ['META', 'MU', 'GOOGL', 'AMZN', 'NVDA', 'QCOM', 'MSFT', 'PLTR', 'TSLA', 'AMD']) {
    assert.match(data, new RegExp(`ticker:\\s*['\"]${ticker}['\"]`));
  }
});

test('English is the safe default and all requested languages are available', () => {
  assert.match(component, /option value="en">English/);
  assert.match(component, /option value="zh-Hans">简体中文/);
  assert.match(component, /option value="zh-Hant">繁體中文/);
  assert.match(component, /option value="ja">日本語/);
  assert.match(app, /let initial = 'en'/);
  assert.match(app, /requested\) \? requested : 'en'/);
});

test('research and capital boundaries remain explicit', () => {
  assert.match(data, /Public research, not personalized investment advice/);
  assert.match(data, /No brokerage connection, order, position size, target price, or capital action/);
  assert.match(data, /QQQ remains the default technology exposure/);
  assert.match(data, /WAIT FOR PER-SHARE EARNINGS PROOF/);
  assert.match(data, /WAIT FOR UNIT-ECONOMICS PROOF/);
});

test('every company retains primary evidence links', () => {
  for (const ticker of ['META', 'MU', 'GOOGL', 'AMZN', 'NVDA', 'QCOM', 'MSFT', 'PLTR', 'TSLA', 'AMD']) {
    assert.match(data, new RegExp(`\\n\\s*${ticker}: \\[`));
  }
  assert.match(data, /https:\/\/www\.sec\.gov\/Archives\/edgar\/data\//);
});
