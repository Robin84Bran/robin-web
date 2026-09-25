import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { verifySpecial } from '../verify-daily-special.mjs';
const root = process.cwd();
const hash = (x) => createHash('sha256').update(x).digest('hex');
const diary='src/content/diary/2026-09-24-from-art-to-immortal-cells';
test('September 24 diary has the approved sakura title without a date prefix',()=>{
  for (const edition of ['article', 'en']) {
    assert.match(readFileSync(`${diary}/${edition}.md`,'utf8'),/^title: "🌸 From ART to Immortal Cells"$/m);
  }
});
const body=(text)=>text.split(/^---\s*$/m).slice(2).join('---').replace(/^\n+/,'');
test('All four diary editions preserve complete block and table structure and valid body hashes',()=>{
  let expected;
  for(const file of ['article','en','zh-hant','ja']) {
    const source=readFileSync(`${diary}/${file}.md`,'utf8'), content=body(source);
    assert.match(source,/^translationReview: "PASS"$/m);
    const ids=[...content.matchAll(/data-source-block="([^"]+)"/g)].map(x=>x[1]);
    expected ??= ids;
    assert.deepEqual(ids,expected); assert.equal(new Set(ids).size,ids.length); assert.equal(ids.length,250);
    assert.equal((content.match(/<table>/g)||[]).length,4);
    assert.equal((content.match(/class="diary-speaker"/g)||[]).length,30);
    for(const color of ['0000ff','9900ff','b45f06']) assert.match(content.toLowerCase(),new RegExp(`color:#${color}`));
    assert.ok(!/<script|onerror=|javascript:|chatgpt\.com\/c\//i.test(content));
    assert.equal(JSON.parse(source.match(/^bodySha256: (.+)$/m)[1]),hash(content));
  }
});
test('Companion preserves one original completion receipt and requires every reviewed edition',()=>{
  assert.deepEqual(verifySpecial(root),[]);
  const temp=mkdtempSync(join(tmpdir(),'special-companion-'));
  try {
    for(const part of ['src/content/daily-special','public/daily-special']) {mkdirSync(join(temp,part),{recursive:true});cpSync(join(root,part),join(temp,part),{recursive:true});}
    mkdirSync(join(temp,'src/data'),{recursive:true});
    cpSync(join(root,'src/data/daily-special-receipts.json'),join(temp,'src/data/daily-special-receipts.json'));
    const file=join(temp,'src/content/daily-special/20260924/who-did-the-homework/ja.md');
    writeFileSync(file,readFileSync(file,'utf8').replace('translationReview: "PASS"','translationReview: "MACHINE_DRAFT"'));
    assert.match(verifySpecial(temp).join('\n'),/unreviewed language/);
    writeFileSync(join(temp,'public/daily-special/20260924/who-did-the-homework/artifact.md'),'altered');
    assert.match(verifySpecial(temp).join('\n'),/inconsistent signal or artifact/);
  } finally {rmSync(temp,{recursive:true,force:true});}
});
test('New Special prose has no audit token and keeps proposed-test and original links',()=>{
  for(const file of ['article','zh-hans','zh-hant','ja']) {
    const text=body(readFileSync(`src/content/daily-special/20260924/who-did-the-homework/${file}.md`,'utf8'));
    assert.ok(!/\bUNKNOWN\b|\bHOLD\b|\bPASS\b/.test(text));
    assert.ok(text.includes('/ouroboros/202609/20260924/special/'));
    assert.ok(text.includes('https://openai.com/index/ringg/'));
    const source=readFileSync(`src/content/daily-special/20260924/who-did-the-homework/${file}.md`,'utf8');
    assert.match(source,/hero: "\/daily-special\/20260924\/who-did-the-homework\/hero.webp"/);
  }
});
