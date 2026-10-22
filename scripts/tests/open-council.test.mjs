import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { prepareReply } from '../../public/council/reply.mjs';
const read = path => readFileSync(new URL('../../' + path, import.meta.url), 'utf8');
const path = '/intelligence/council/autonomous-engineering/';

test('approved council transcripts preserve original words, ignoring terminal whitespace only', () => {
  const expected = {
    teddy: '7a60357808d276d9c4022429e143c29a5c72460b8907059d4dc776fb2f46fdc2',
    followup: 'e30da5c8adebb04b392f73d6294273d51738dc5987c28c400be7a0dc9fb7ec02',
    claude: 'b49c8debf513e46fc81c5e2ced8ec37c675e472e03f0a1bb6c3f6f212529b726',
    grok: 'e1185a7a7c938a7af25303622c627f44c772cbf05ec4bcbd581a26d1d5eb4fb1',
  };
  for (const [id, hash] of Object.entries(expected)) {
    const text = read(`src/data/open-council/${id}.md`);
    assert.equal(createHash('sha256').update(text.trimEnd()).digest('hex'), hash);
    assert.doesNotMatch(text, /https?:\/\/(?:chatgpt|claude|gemini|grok)\.[^\s]+|\/Users\/|sourceThread|source_thread/);
  }
});

test('reply supports empty, partial and complete choices without inventing votes', () => {
  assert.match(prepareReply([], ''), /1: not chosen; 2: not chosen; 3: not chosen; 4: not chosen/);
  const reply = prepareReply(['Uncertain','Agree','Agree','Agree'], '  What would change your mind?  ');
  assert.match(reply, /1: Uncertain; 2: Agree; 3: Agree; 4: Agree/);
  assert.ok(reply.endsWith('My question: What would change your mind?'));
  assert.match(prepareReply(['unknown'], ''), /1: not chosen/);
  const script = read('public/council/reply.mjs');
  assert.doesNotMatch(script, /fetch\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|innerHTML|\.submit\(/);
});

test('reply button preserves user input as text and announces no submission', async () => {
  let handler;
  const question = {value:'<img src=x onerror=alert(1)> 中文 😘'};
  const output = {value:'',focus(){this.focused=true;},select(){this.selected=true;}};
  const status = {textContent:''};
  const previous = globalThis.document;
  globalThis.document = {
    getElementById: id => ({'prepare-council':{addEventListener:(_,fn)=>{handler=fn;}},'council-question':question,'council-reply':output,'council-status':status}[id]),
    querySelector: selector => selector.includes('m1') ? {value:'Agree'} : null,
  };
  try {
    await import('../../public/council/reply.mjs?interaction-test');
    handler();
    assert.ok(output.value.includes(question.value));
    assert.ok(output.focused && output.selected);
    assert.match(status.textContent, /Nothing has been submitted or saved/);
  } finally {globalThis.document=previous;}
});

test('public council is discoverable, accessible, open-ended and free of private provenance', () => {
  const html = read('dist' + path + 'index.html');
  assert.equal((html.match(/<h1\b/g)||[]).length, 1);
  for (const id of ['teddy','votes','claude','gemini','grok','your-turn']) assert.ok(html.includes(`id="${id}"`));
  assert.ok(html.indexOf('id="teddy"') < html.indexOf('id="claude"'));
  assert.ok(html.indexOf('id="claude"') < html.indexOf('id="gemini"'));
  assert.ok(html.indexOf('id="gemini"') < html.indexOf('id="grok"'));
  assert.equal((html.match(/type="radio"/g)||[]).length, 12);
  assert.doesNotMatch(html, /type="radio"[^>]*\bchecked\b/);
  assert.equal((html.match(/<fieldset>/g)||[]).length,4);
  assert.ok(html.includes('No council response has been received.'));
  assert.ok(html.includes('No winner and no closing verdict.'));
  assert.ok(html.includes('no votes are submitted, tallied or saved'));
  assert.ok(html.includes('src="/council/reply.mjs"'));
  assert.ok(html.includes('id="site-language"'));
  assert.ok(html.includes('rel="canonical" href="https://iamrobin.ai'+path+'"'));
  assert.doesNotMatch(html, /https?:\/\/(?:chatgpt|claude|gemini|grok)\.[^\s"<]+|\/Users\/|private_reviews|receipt\.json|sourceThread|source_thread/);
  assert.ok(read('dist/intelligence/index.html').includes(`href="${path}"`));
  assert.ok(read('dist/sitemap-0.xml').includes('https://iamrobin.ai'+path));
});
