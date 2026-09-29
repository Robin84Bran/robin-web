import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { normalizeLanguage, initialLanguage } from '../../public/language/policy.mjs';
import { languageMenuMarkup } from '../../public/language/menu.mjs';

test('four choices; English default; preserve explicit preference and original', () => {
  assert.equal(initialLanguage('auto', null), 'en');
  assert.equal(initialLanguage('zh-CN', null), 'en');
  assert.equal(initialLanguage('en', 'ja'), 'ja');
  assert.equal(initialLanguage('en', 'unsupported'), 'en');
  assert.equal(initialLanguage('zh-TW', 'original'), 'zh-TW');
  assert.equal(normalizeLanguage('und'), 'auto');
  assert.equal(normalizeLanguage('zh-Hans'), 'zh-CN');
  assert.equal(normalizeLanguage('zh-hant'), 'zh-TW');
  assert.equal(normalizeLanguage('ja-JP'), 'ja');
  assert.equal((languageMenuMarkup().match(/data-language=/g) || []).length, 4);
  assert.match(languageMenuMarkup(), /role="status" aria-live="polite"/);
  assert.doesNotMatch(languageMenuMarkup(), /href="\/(?:zh-hans|zh-hant|ja)/);
});

test('arcade never auto-loads a provider, even with a saved foreign language', () => {
  for (const choice of [null, 'en', 'ja', 'zh-CN', 'zh-TW', 'original']) {
    assert.equal(initialLanguage('en', choice, true), 'en');
  }
});

test('all built HTML pages have exactly one globe and same-page client', () => {
  const root = new URL('../../dist/', import.meta.url);
  let count = 0;
  function walk(folder) {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const path = join(folder, entry.name);
      if (entry.isDirectory()) walk(path);
      else if (entry.name.endsWith('.html')) {
        count++;
        const html = readFileSync(path, 'utf8');
        assert.equal((html.match(/id="site-language"/g) || []).length, 1, path);
        assert.equal((html.match(/src="\/language\/client.mjs"/g) || []).length, 1, path);
        assert.ok(html.includes('href="/language/menu.css"'), path);
      }
    }
  }
  walk(root.pathname);
  assert.ok(count > 600, 'check the whole built site, not a tiny fixture');
});

test('translation CSP is narrow and equal at edge and static fallback', () => {
  const read = path => readFileSync(new URL('../../'+path, import.meta.url), 'utf8');
  for (const file of ['public/_worker.js','public/_headers']) {
    const text = read(file);
    assert.match(text, /https:\/\/cdn\.gtranslate\.net/);
    assert.match(text, /https:\/\/translate-pa\.googleapis\.com/);
    assert.doesNotMatch(text, /unsafe-eval|\*\.google|translate_a\/element/);
  }
  const client = read('public/language/client.mjs');
  assert.doesNotMatch(client, /location\.(?:href\s*=|assign|replace)|fetch\(/);
  assert.match(client, /protectPrivateFields/);
  assert.match(client, /translator\.finished/);
  assert.match(client, /45000/);
});
