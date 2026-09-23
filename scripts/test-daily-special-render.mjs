// Build synthetic content only in a disposable tree. Never publish this fixture.
import { mkdtempSync, realpathSync, cpSync, symlinkSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
import { verifySpecial } from './verify-daily-special.mjs';

const source = process.cwd();
const root = realpathSync(mkdtempSync(join(tmpdir(), 'daily-special-render-')));
try {
  for (const path of ['src', 'public', 'scripts', 'package.json', 'astro.config.mjs', 'tsconfig.json']) cpSync(join(source, path), join(root, path), {recursive: true});
  symlinkSync(join(source, 'node_modules'), join(root, 'node_modules'), 'dir');
  // Shared dependencies are read-only; all Astro/Vite caches must be local.
  const config = join(root, 'astro.config.mjs');
  writeFileSync(config, readFileSync(config, 'utf8')
    .replace("output: 'static',", "output: 'static', cacheDir: './.fixture-cache/',")
    .replace('vite: {', "vite: { cacheDir: './.fixture-vite/',"));
  const date = '20260923';
  writeFileSync(join(root, 'src/data/daily-special-receipts.json'), '[]');
  const dir = join(root, 'src/content/daily-special', date);
  const asset = join(root, 'public/daily-special', date);
  mkdirSync(dir, {recursive:true}); mkdirSync(asset, {recursive:true});
  const body = '# Synthetic fixture\n\nLocal test only. No claim of completed research.\n';
  const sha = createHash('sha256').update(body).digest('hex');
  writeFileSync(join(asset, 'artifact.md'), body);
  for (const [file, locale, slug] of [['article','en',''],['zh-hans','zh-Hans','zh-hans/'],['zh-hant','zh-Hant','zh-hant/'],['ja','ja','ja/']]) {
    writeFileSync(join(dir, `${file}.md`), `---
title: "Synthetic Special fixture"
date: 2026-09-23
updated: 2026-09-23
section: Ouroboros
series: Daily Special
lane: RESEARCH
tags: [Research]
keywords: [Research]
categories: [Research]
excerpt: "Synthetic rendering fixture, not a published research finding."
hero: /action-item/20260923/hero.webp
ogImage: /action-item/20260923/og.webp
canonical: https://iamrobin.ai/ouroboros/202609/20260923/special/${slug}
author: https://iamrobin.ai/#person
inLanguage: ${locale}
draft: false
translationReview: PASS
sourceSignal: 4
researchScope: "Synthetic test only, not an actual research completion."
artifactSha256: ${sha}
evidenceSources: ["https://example.com/"]
---
## Test boundary

${body.replace('# Synthetic fixture\n','')}`);
  }
  assert.deepEqual(verifySpecial(root), []);
  execFileSync(process.execPath, [resolve('node_modules/astro/bin/astro.mjs'), 'build', '--root', root], {cwd:root, stdio:'pipe'});
  execFileSync(process.execPath, ['scripts/verify-seo.mjs'], {cwd:root, stdio:'pipe'});
  for (const slug of ['', 'zh-hans/', 'zh-hant/', 'ja/']) {
    const route = `/ouroboros/202609/20260923/special/${slug}`;
    const html = readFileSync(join(root, 'dist', route, 'index.html'), 'utf8');
    assert.match(html, /03 · Daily Special · Signal 4/);
    assert.match(html, /artifact\.md/);
    assert.match(html, /"@type":"Article"/);
    assert.ok(readFileSync(join(root, 'dist/sitemap-0.xml'), 'utf8').includes(route));
  }
  // Test tomorrow's follow-through independently of any fabricated daily brief.
  writeFileSync(join(root, 'src/pages/follow-through-fixture.astro'), `---
import PreviousActionProgress from '../components/PreviousActionProgress.astro';
---
<html><body><PreviousActionProgress date="2026-09-24" language="en" /></body></html>`);
  execFileSync(process.execPath, [resolve('node_modules/astro/bin/astro.mjs'), 'build', '--root', root], {cwd:root, stdio:'pipe'});
  const html = readFileSync(join(root, 'dist/follow-through-fixture/index.html'), 'utf8');
  assert.match(html, /Previous brief · action follow-through/);
  assert.equal((html.match(/<li(?:\s[^>]*)?>/g) ?? []).length, 8);
  assert.match(html, /05 · completed/);
  assert.match(html, /queued/);
  assert.match(html, /action_item\//);
  console.log('Daily Special render PASS: four routes, full SEO/sitemap gate and next-brief evidence panel; fixtures never published.');
} catch (error) {
  if (error.stdout) process.stderr.write(error.stdout);
  if (error.stderr) process.stderr.write(error.stderr);
  throw error;
} finally {
  rmSync(root, {recursive:true, force:true});
}
