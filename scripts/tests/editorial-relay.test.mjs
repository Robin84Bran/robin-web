import test from 'node:test';
import assert from 'node:assert/strict';
import {actionLengthOK, specialLengthOK, prompts, relayPlan} from '../publisher/bin/editorial-relay.mjs';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import {createHash} from 'node:crypto';

test('approved October 26 story and notes stay byte-identical with original ending', () => {
  const text = readFileSync(new URL('../../src/content/action-item/20261026/article.md', import.meta.url), 'utf8');
  const body = text.replace(/^---\n[\s\S]*?\n---\n\s*/, '');
  const boundary = body.indexOf('## Notes and sources');
  assert.ok(boundary > 0);
  const story = body.slice(0, boundary).trimEnd();
  const notes = body.slice(boundary).trimEnd() + '\n';
  const sha = value => createHash('sha256').update(value).digest('hex');
  assert.equal(sha(story), '82748b8ffad485fea1725d9dc8207015f3e088856f107f2f7dc063b4a595886f');
  assert.equal(sha(notes), 'da2ead4a38e5e7626cf7371bd58593b391350b36a3f584387f5c1bd97b5ff853');
  assert.ok(story.endsWith("software that doesn't just respond when you call it, but knows how to wait."));
});

test('light audit keeps expressive punctuation without weakening old gates', () => {
  const script = readFileSync(new URL('../publisher/bin/publisher.mjs', import.meta.url), 'utf8');
  const code = script.slice(script.indexOf('function actionStyle('), script.indexOf('\nasync function ingestAction('));
  const style = runInNewContext(code + '; actionStyle', {
    effectiveDate: '2026-10-24', articleBody: x=>x, frontmatterValue: ()=> 'Software That Knows How to Wait',
  });
  const prose = 'Not speed but patience. ' + 'Pause—then return. '.repeat(6);
  assert.equal(style(prose, '2026-10-25').restrainedEmDash, false);
  assert.equal(style(prose, '2026-10-25').forbiddenConstruction, false);
  assert.ok(Object.values(style(prose, '2026-10-26')).every(Boolean));
  assert.equal(style('', '2026-10-26').readerOpening, false);
  assert.equal(style('中文', '2026-10-26').englishOnly, false);
});

test('new article length has no padding minimum, exact 3000 ceiling, preserves old action gates', () => {
  for (const count of [1, 450, 1499, 2000, 3000]) assert.equal(actionLengthOK(count, '2026-10-24'), true);
  for (const count of [0, -1, NaN, 3001, 3500]) assert.equal(actionLengthOK(count, '2026-10-24'), false);
  assert.equal(actionLengthOK(2100, '2026-10-23'), true);
  assert.equal(actionLengthOK(3500, '2026-10-23'), true);
  assert.equal(actionLengthOK(500, '2026-10-23'), false);
  assert.equal(actionLengthOK(500, 'invalid'), false);
});
test('Specials retain historical length, new English body is capped at 3000', () => {
  assert.equal(specialLengthOK(4000, '2026-10-23'), true);
  assert.equal(specialLengthOK(500, '2026-10-24'), true);
  assert.equal(specialLengthOK(3000, '2026-10-24'), true);
  assert.equal(specialLengthOK(3001, '2026-10-24'), false);
  assert.equal(specialLengthOK(0, '2026-10-24'), false);
});
test('relay preserves all responsibilities under every provider availability combination', () => {
  for (let mask = 0; mask < 8; mask++) {
    const available = Object.fromEntries(['ChatGPT','Claude','Gemini'].map((p,i)=>[p, Boolean(mask & (1<<i))]));
    const plan = relayPlan(available);
    assert.deepEqual(plan.map(x=>x.role), ['brainstorm','hook','article']);
    for (const stage of plan) assert.ok(stage.provider === 'Codex' || available[stage.provider]);
  }
  assert.deepEqual(relayPlan().map(x=>x.provider), ['ChatGPT','Claude','Gemini']);
  assert.deepEqual(relayPlan({ChatGPT:false}).map(x=>x.provider), ['Claude','Claude','Gemini']);
  assert.deepEqual(relayPlan({ChatGPT:false,Claude:false}).map(x=>x.provider), ['Gemini','Gemini','Gemini']);
  assert.deepEqual(relayPlan({ChatGPT:false,Claude:false,Gemini:false}).map(x=>x.provider), ['Codex','Codex','Codex']);
  assert.equal(prompts.brainstorm, 'those are the facts and resources, brainstorm and diverge for council discussion');
  for (const prompt of Object.values(prompts)) assert.ok(prompt.length < 160);
});

test('publisher accepts natural openings without changing historical style checks', () => {
  const script = readFileSync(new URL('../publisher/bin/publisher.mjs', import.meta.url), 'utf8');
  const code = script.slice(script.indexOf('function actionStyle('), script.indexOf('\nasync function ingestAction('));
  const style = runInNewContext(code + '; actionStyle', {
    effectiveDate: '2026-10-24', articleBody: x=>x, frontmatterValue: ()=> 'An Overnight Discovery',
  });
  const prose = 'A developer woke up to a working experiment. What happened overnight deserves a closer look.';
  const current = style(prose, '2026-10-24');
  assert.ok(Object.values(current).every(Boolean));
  assert.equal(current.conclusionFirst, undefined);
  assert.equal(style(prose, '2026-10-23').conclusionFirst, false);
  assert.match(script, /actionStyle\(article, date\)/);
  assert.match(script, /actionLengthOK\(words, date\)/);
  const contract = readFileSync(new URL('../../docs/DAILY_EDITORIAL_RELAY.md', import.meta.url), 'utf8');
  for (const prompt of Object.values(prompts)) assert.ok(contract.includes(prompt));
  const special = readFileSync(new URL('../daily-special/special.py', import.meta.url), 'utf8');
  assert.ok(special.includes('DAILY_EDITORIAL_RELAY.md'));
});
