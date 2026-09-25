import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
const script=resolve('scripts/verify-binary-stories.mjs');
test('Binary publication gate rejects missing editions, bad PDFs and source drift',()=>{
 const root=mkdtempSync(join(tmpdir(),'binary-story-test-'));
 try {
  for(const p of ['src/content/binary-stories/test','public/carousels','public/daily-special/20260925'])mkdirSync(join(root,p),{recursive:true});
  const source='Synthetic research fixture only';const hash=createHash('sha256').update(source).digest('hex');
  writeFileSync(join(root,'public/daily-special/20260925/artifact.md'),source);
  writeFileSync(join(root,'public/carousels/test.pdf'),'%PDF-test-fixture\n'+('/Type /Page\n'.repeat(6)));
  writeFileSync(join(root,'public/carousels/test.txt'),'Synthetic caption for validation testing only; not published content.');
  const texts=[];
  for(const [file,locale,suffix] of [['article.md','en',''],['zh-hans.md','zh-Hans','zh-hans/'],['zh-hant.md','zh-Hant','zh-hant/'],['ja.md','ja','ja/']]) {
   const text=`---\nstorySlug: test\ncanonical: https://iamrobin.ai/binary/stories/test/${suffix}\ninLanguage: ${locale}\ntranslationReview: PASS\nsourceSpecial: https://iamrobin.ai/ouroboros/202609/20260925/special/\nsourceArtifactSha256: ${hash}\nlane: BUILD\ncarouselPdf: /carousels/test.pdf\ncarouselCaption: /carousels/test.txt\ncarouselPages: 6\n---\n${locale} ${'Synthetic body fixture. '.repeat(25)}`;
   texts.push([file,text]);writeFileSync(join(root,'src/content/binary-stories/test',file),text);
  }
  const run=()=>spawnSync(process.execPath,[script],{cwd:root,encoding:'utf8'});
  assert.equal(run().status,0);
  writeFileSync(join(root,'public/carousels/test.pdf'),'not a pdf');assert.notEqual(run().status,0);
  writeFileSync(join(root,'public/carousels/test.pdf'),'%PDF-test-fixture\n'+('/Type /Page\n'.repeat(6)));
  writeFileSync(join(root,'public/daily-special/20260925/artifact.md'),'changed');assert.notEqual(run().status,0);
  writeFileSync(join(root,'public/daily-special/20260925/artifact.md'),source);
  writeFileSync(join(root,'src/content/binary-stories/test/ja.md'),texts[3][1].replace('translationReview: PASS','translationReview: HOLD'));assert.notEqual(run().status,0);
 } finally {rmSync(root,{recursive:true,force:true});}
});
