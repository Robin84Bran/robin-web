import assert from 'node:assert/strict';
import test from 'node:test';
import { normalizeDiaryLinks } from '../../../src/lib/diaryLinks.mjs';

test('normalizes a rendered bare-domain link without changing its visible text', () => {
  assert.equal(
    normalizeDiaryLinks('<p><a href="iamrobin.ai">iamrobin.ai</a></p>'),
    '<p><a href="https://iamrobin.ai">iamrobin.ai</a></p>',
  );
});

test('preserves qualified, relative, fragment, mail, and telephone links', () => {
  const html = '<a href="https://example.com">a</a><a href="/about/">b</a><a href="#x">c</a><a href="mailto:a@example.com">d</a><a href="tel:+1">e</a>';
  assert.equal(normalizeDiaryLinks(html), html);
});
