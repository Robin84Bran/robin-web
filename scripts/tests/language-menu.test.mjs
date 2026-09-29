import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { normalizeLanguage, initialLanguage } from '../../public/language/policy.mjs';
import { languageMenuMarkup } from '../../public/language/menu.mjs';
import { normalizeRobinName } from '../../public/language/editorial.mjs';

test('Chinese transliterations use the owner-specified name without changing English brands', () => {
  assert.equal(normalizeRobinName('罗宾与羅賓；罗宾·谢；羅賓 謝伊'), '谢玢与谢玢；谢玢；谢玢');
  assert.equal(normalizeRobinName('Robin Xie, RobinOS, 谢玢, 謝玢'), 'Robin Xie, RobinOS, 谢玢, 謝玢');
});

test('About uses one structure, all approved paragraphs and intact public links', () => {
  const read = p => readFileSync(new URL('../../dist/'+p+'/index.html',import.meta.url),'utf8');
  const pages = ['about','zh-hans/about','zh-hant/about'].map(read);
  const links = html => [...html.matchAll(/href="([^"]+)"/g)].map(m=>m[1]);
  const destinations = ['/network/#engineering-record','/network/#payments-record','/network/#tidebit-record',
    '/network/#02--hkex-public-company','/binary/#binary-lane-invest','/ouroboros/','/projects/','/intelligence/',
    'https://www.isuntv.com','https://isun1.com','https://isunmedia.com','https://isuntvmall.com','https://isun1.news',
    '/meaning/diary/202609/2026-09-07-american-in-hong-kong/'];
  for (const [index, html] of pages.entries()) {
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    assert.equal((html.match(/<p data-about-copy="(?:roots\d|p\d_\d|core\d)"/g)||[]).length,24);
    for (const dest of destinations) {
      const localized = index && /#(?:engineering|payments|tidebit)-record$/.test(dest)
        ? dest.replace('/network/',index === 1 ? '/zh-hans/network/' : '/zh-hant/network/') : dest;
      assert.ok(links(html).includes(localized),localized);
    }
    const packet = JSON.parse(html.match(/id="about-owner-copy"[^>]*>(.*?)<\/script>/s)[1]);
    assert.deepEqual(Object.keys(packet['zh-CN']),Object.keys(packet['zh-TW']));
    assert.ok(packet['zh-CN'].roots0.startsWith('年方十三半'));
    assert.equal(packet['zh-CN'].core2,'何须预言未来？当下的我，正亲手将其缔造与雕琢。');
  }
  assert.match(pages[1],/<p data-about-copy="roots0"[^>]*>年方十三半/);
  assert.match(pages[2],/<p data-about-copy="roots0"[^>]*>年方十三半，正值豆蔻年華/);
});

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
