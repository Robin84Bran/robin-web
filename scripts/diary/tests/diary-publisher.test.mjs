import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import test from 'node:test';

const script = path.resolve(import.meta.dirname, '../bin/diary-publisher.mjs');

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'diary-publisher-'));
  const site = path.join(root, 'site');
  fs.mkdirSync(path.join(root, 'inbox'), { recursive: true });
  const body = '第一段。\n第二段。\n\n  第三段原样。\n';
  const record = {
    schemaVersion: 1, id: 'telegram-1', source: 'telegram', intent: 'PUBLISH', status: 'RECEIVED',
    date: '2026-08-22', entrySlug: '2026-08-22-moon', title: 'Moon', body,
    bodySha256: crypto.createHash('sha256').update(body).digest('hex'), language: 'zh-Hans',
    canonicalUrl: 'https://iamrobin.ai/meaning/diary/202608/2026-08-22-moon/', history: [],
  };
  const source = path.join(root, 'inbox', 'telegram-1.json');
  fs.writeFileSync(source, JSON.stringify(record));
  return { root, site, source, record };
}

function run(f, ...args) {
  return spawnSync(process.execPath, [script, ...args], {
    encoding: 'utf8',
    env: { ...process.env, DIARY_PUBLISHING_ROOT: f.root, DIARY_SITE_ROOT: f.site },
  });
}

test('materialize preserves source text, paragraphizes Telegram lines, and sync requires art', () => {
  const f = fixture();
  const materialize = run(f, 'materialize', '--source', f.source);
  assert.equal(materialize.status, 0, materialize.stderr);
  const entry = path.join(f.root, 'diary', '2026', '08', f.record.entrySlug);
  const article = fs.readFileSync(path.join(entry, 'article.md'), 'utf8');
  assert.ok(article.endsWith('第一段。\n\n第二段。\n\n  第三段原样。\n'));

  const blocked = run(f, 'sync', '--source', f.source);
  assert.equal(blocked.status, 1);
  assert.match(blocked.stderr, /hero\.webp is missing/);

  fs.writeFileSync(path.join(entry, 'hero.webp'), 'hero');
  fs.writeFileSync(path.join(entry, 'og.webp'), 'og');
  assert.equal(run(f, 'check', '--source', f.source).status, 0);
  assert.equal(run(f, 'sync', '--source', f.source).status, 0);
  assert.equal(
    fs.readFileSync(path.join(f.site, 'src/content/diary', f.record.entrySlug, 'article.md'), 'utf8'),
    article,
  );
});

test('rejects source paths outside inbox', () => {
  const f = fixture();
  const outside = path.join(f.root, 'outside.json');
  fs.copyFileSync(f.source, outside);
  const result = run(f, 'materialize', '--source', outside);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /inside publishing\/inbox/);
});

test('unsealed multipart source cannot enter any publication step', () => {
  const f = fixture();
  f.record.status = 'COLLECTING';
  f.record.intake = { version: 2, sealed: false };
  fs.writeFileSync(f.source, JSON.stringify(f.record));
  assert.deepEqual(JSON.parse(run(f, 'pending').stdout), []);
  for (const command of ['materialize', 'check', 'sync', 'mark']) {
    const result = run(f, command, '--source', f.source, '--status', 'DONE');
    assert.equal(result.status, 1);
    assert.match(result.stderr, /still collecting/);
  }
});

test('private drafts cannot be synced or marked published', () => {
  const f = fixture();
  f.record.intent = 'DRAFT';
  fs.writeFileSync(f.source, JSON.stringify(f.record));
  for (const command of ['materialize', 'check', 'sync', 'mark']) {
    assert.equal(run(f, command, '--source', f.source, '--status', 'DONE').status, 1);
  }
});

test('sealed multipart body must contain every original part exactly once', () => {
  const f = fixture();
  const texts = ['🌸 Beginning\n' + 'a'.repeat(4096), '  Middle\n\n', 'Last paragraph.'];
  const hash = text => crypto.createHash('sha256').update(text).digest('hex');
  f.record.parts = texts.map((text, i) => ({text, updateId: i + 1, sha256: hash(text)}));
  f.record.intake = {version: 2, sealed: true, sealedByUpdateId: 4};
  f.record.body = texts.join('\n\n');
  f.record.bodySha256 = hash(f.record.body);
  fs.writeFileSync(f.source, JSON.stringify(f.record));
  assert.equal(run(f, 'materialize', '--source', f.source).status, 0);
  f.record.body = texts[0]; // Simulates the original first-batch-only defect.
  f.record.bodySha256 = hash(f.record.body);
  fs.writeFileSync(f.source, JSON.stringify(f.record));
  const rejected = run(f, 'materialize', '--source', f.source);
  assert.equal(rejected.status, 1);
  assert.match(rejected.stderr, /every saved part/);
});
