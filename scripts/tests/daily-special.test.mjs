import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { verifySpecial } from '../verify-daily-special.mjs';
import { resolveActionOutcome } from '../../src/lib/resolveActionOutcome.ts';
import {createHash} from 'node:crypto';

test('new Special English articles enforce 3000 ceiling without imposing a minimum', () => {
  const root = mkdtempSync(join(tmpdir(), 'special-length-'));
  try {
    mkdirSync(join(root, 'src/data'), {recursive:true});
    writeFileSync(join(root, 'src/data/daily-special-receipts.json'), '[]');
    const date = '20261024';
    const dir = join(root, 'src/content/daily-special', date);
    const assets = join(root, 'public/daily-special', date);
    mkdirSync(dir, {recursive:true}); mkdirSync(assets, {recursive:true});
    const artifact = 'Public research artifact.';
    writeFileSync(join(assets, 'artifact.md'), artifact);
    const sha = createHash('sha256').update(artifact).digest('hex');
    function write(count) {
      for (const [file, locale, suffix] of [['article','en',''],['zh-hans','zh-Hans','zh-hans/'],['zh-hant','zh-Hant','zh-hant/'],['ja','ja','ja/']]) {
        writeFileSync(join(dir,file+'.md'), `---\nsourceSignal: 1\nartifactSha256: ${sha}\ninLanguage: ${locale}\ntranslationReview: PASS\ncanonical: https://iamrobin.ai/ouroboros/202610/${date}/special/${suffix}\n---\n` + (locale==='en' ? 'word '.repeat(count) : '完整的本地语言版本'));
      }
    }
    for (const count of [25, 3000]) { write(count); assert.deepEqual(verifySpecial(root), []); }
    write(3001); assert.match(verifySpecial(root).join('\n'), /at most 3000 words/);
  } finally { rmSync(root, {recursive:true, force:true}); }
});

test('proposals and unsupported status claims never become completed', () => {
  const flow = {date:'2026-09-23', actionItemPath:'/ouroboros/202609/20260923/action/'};
  assert.equal(resolveActionOutcome(flow, {signal:4,status:'READY'}, []).status, 'queued');
  assert.equal(resolveActionOutcome(flow, {signal:4,status:'WATCHING'}, []).status, 'watch only');
  assert.equal(resolveActionOutcome(flow, {signal:4,status:'COMPLETE'}, []).status, 'watch only');
  assert.equal(resolveActionOutcome(flow, {signal:5,status:'COMPLETE'}, []).artifact, flow.actionItemPath);
  const receipt = {date:flow.date, signal:4, url:'/special/', commit:'a'.repeat(40), artifactSha256:'b'.repeat(64), verifiedAt:'2026-09-23T09:00:00Z', scope:'RESEARCH_ARTIFACT_ONLY'};
  assert.deepEqual(resolveActionOutcome(flow, {signal:4,status:'READY'}, [receipt]), {status:'completed',artifact:'/special/',researchOnly:true});
  assert.equal(resolveActionOutcome(flow, {signal:4,status:'READY'}, [{...receipt,commit:''}]).status, 'queued');
});

test('An empty archive is valid; a claimed completion without proof is not', () => {
  const root = mkdtempSync(join(tmpdir(), 'special-test-'));
  try {
    mkdirSync(join(root, 'src/data'), {recursive:true});
    const path = join(root, 'src/data/daily-special-receipts.json');
    writeFileSync(path, '[]');
    assert.deepEqual(verifySpecial(root), []);
    writeFileSync(path, JSON.stringify([{date:'2026-09-23', signal:4, url:'https://iamrobin.ai/ouroboros/202609/20260923/special/', commit:'a'.repeat(40), artifactSha256:'b'.repeat(64), verifiedAt:'2026-09-23T09:00:00Z', scope:'RESEARCH_ARTIFACT_ONLY'}]));
    assert.match(verifySpecial(root).join('\n'), /matching artifact bytes/);
    assert.match(verifySpecial(root).join('\n'), /canonical article/);
    writeFileSync(path, JSON.stringify([{date:'2026-09-23', signal:5}]));
    assert.match(verifySpecial(root).join('\n'), /invalid completion receipt/);
  } finally { rmSync(root, {recursive:true, force:true}); }
});
