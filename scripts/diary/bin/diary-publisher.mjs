#!/usr/bin/env node
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const ROOT = process.env.DIARY_PUBLISHING_ROOT
  ? path.resolve(process.env.DIARY_PUBLISHING_ROOT)
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INBOX = path.join(ROOT, 'inbox');
const DIARY = path.join(ROOT, 'diary');
const SITE = process.env.DIARY_SITE_ROOT
  ? path.resolve(process.env.DIARY_SITE_ROOT)
  : '/Users/headlessnick/RobinOS2/00_identity_output/website/v2/variants/zen-loop';
const SITE_CONTENT = path.join(SITE, 'src/content/diary');
const SITE_PUBLIC = path.join(SITE, 'public/diary');
const ALLOWED_STATES = new Set(['RECEIVED', 'MATERIALIZED', 'ART_READY', 'SYNCED', 'BUILD_VERIFIED', 'DEPLOYED', 'PUBLIC_VERIFIED', 'NOTIFIED', 'DONE', 'HOLD']);

function die(message) { throw new Error(message); }
function readJson(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }
function sha256(value) { return crypto.createHash('sha256').update(value).digest('hex'); }
function inside(candidate, parent) {
  const rel = path.relative(path.resolve(parent), path.resolve(candidate));
  return rel && !rel.startsWith('..') && !path.isAbsolute(rel);
}
function sourcePath(value) {
  const resolved = path.resolve(value);
  if (!inside(resolved, INBOX) || !resolved.endsWith('.json')) die('source must be one JSON record inside publishing/inbox');
  return resolved;
}
function writeJsonAtomic(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const temp = `${file}.tmp`;
  fs.writeFileSync(temp, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
  fs.renameSync(temp, file);
}
function validateRecord(record) {
  if (record.schemaVersion !== 1 || record.source !== 'telegram') die('unsupported diary queue record');
  if (!record.id || !record.date || !record.entrySlug || !record.title || typeof record.body !== 'string') die('incomplete diary queue record');
  if (record.bodySha256 !== sha256(record.body)) die('diary body hash mismatch');
  if (!['PUBLISH', 'DRAFT'].includes(record.intent)) die('unknown diary intent');
  return record;
}
function requireSealed(record) {
  if (record.intent !== 'PUBLISH') die('draft entries are never published');
  if (record.intake && record.intake.version !== 2) die('unsupported diary intake version');
  if (record.status === 'COLLECTING' || (record.intake && record.intake.sealed !== true)) die('diary is still collecting; /diary_done is required');
  if (record.intake?.version === 2) {
    if (!Array.isArray(record.parts) || !record.parts.length || !Number.isInteger(record.intake.sealedByUpdateId)) die('multipart diary has no completion proof');
    const ids = new Set();
    for (const part of record.parts) {
      if (typeof part.text !== 'string' || sha256(part.text) !== part.sha256 || ids.has(part.updateId)) die('diary part integrity mismatch');
      ids.add(part.updateId);
    }
    if (record.parts.map(part => part.text).join('\n\n') !== record.body) die('diary body does not include every saved part');
  }
}
function yaml(value) { return JSON.stringify(value); }
function excerpt(body) {
  const clean = body.replace(/\s+/g, ' ').trim();
  return clean.length > 180 ? `${clean.slice(0, 177).trimEnd()}…` : clean;
}
function formatBodyForMarkdown(body) {
  const formatted = body
    .replace(/\r\n?/g, '\n')
    .replace(/([^\n])\n(?=[ \t]*\S)/g, '$1\n\n');
  return formatted.endsWith('\n') ? formatted : `${formatted}\n`;
}
function entryDir(record) { return path.join(DIARY, record.date.slice(0, 4), record.date.slice(5, 7), record.entrySlug); }
function article(record) {
  return [
    '---',
    `title: ${yaml(record.title)}`,
    `date: ${record.date}`,
    `updated: ${record.date}`,
    'section: Meaning',
    'series: Diary',
    `excerpt: ${yaml(excerpt(record.body))}`,
    `hero: ${yaml(`/diary/${record.entrySlug}/hero.webp`)}`,
    `ogImage: ${yaml(`/diary/${record.entrySlug}/og.webp`)}`,
    `canonical: ${yaml(record.canonicalUrl)}`,
    'author: "https://iamrobin.ai/#person"',
    `inLanguage: ${yaml(record.language || 'und')}`,
    'source: telegram',
    `sourceId: ${yaml(record.id)}`,
    `bodySha256: ${record.bodySha256}`,
    'draft: false',
    '---',
    '',
    formatBodyForMarkdown(record.body),
  ].join('\n');
}
function updateState(file, record, status, detail = null) {
  if (!ALLOWED_STATES.has(status)) die(`invalid diary state ${status}`);
  const next = { ...record, status, history: [...(record.history || []), { at: new Date().toISOString(), status, ...(detail ? { detail } : {}) }] };
  writeJsonAtomic(file, next);
  return next;
}
function pending() {
  const todayHkt = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Hong_Kong', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const records = fs.existsSync(INBOX)
    ? fs.readdirSync(INBOX).filter((name) => name.endsWith('.json')).map((name) => {
        const file = path.join(INBOX, name);
        return { file, ...validateRecord(readJson(file)) };
      }).filter((record) => record.intent === 'PUBLISH' && !['DONE', 'HOLD', 'COLLECTING'].includes(record.status) && (!record.intake || record.intake.sealed === true)
        && (record.datePolicy !== 'first-message-hkt-1300-v1' || record.date <= todayHkt))
    : [];
  console.log(JSON.stringify(records, null, 2));
}
function materialize(file) {
  let record = validateRecord(readJson(file));
  if (record.intent !== 'PUBLISH') die('draft entries are never materialized for publication');
  requireSealed(record);
  const destination = entryDir(record);
  fs.mkdirSync(destination, { recursive: true });
  const articlePath = path.join(destination, 'article.md');
  const expected = article(record);
  if (fs.existsSync(articlePath) && fs.readFileSync(articlePath, 'utf8') !== expected) die('refusing to overwrite a changed diary article');
  fs.writeFileSync(articlePath, expected, 'utf8');
  const briefPath = path.join(destination, 'visual-brief.md');
  if (!fs.existsSync(briefPath)) {
    fs.writeFileSync(briefPath, [
      '# Diary visual brief', '', `Title: ${record.title}`, '',
      'Create one elegant, pale shoujo-manga banner rooted in the diary theme.',
      'Moon-white, sakura, mist, silver, fine ink line, human warmth, abundant negative space.',
      'No text, logos, corporate illustration, generic anime glamour, or synthetic perfume.',
      'Required outputs: hero.webp 1600x900 and og.webp 1200x630.', '',
      'The article body is private source material. Do not quote it into the image.', '',
    ].join('\n'), 'utf8');
  }
  record = updateState(file, record, 'MATERIALIZED');
  console.log(JSON.stringify({ status: record.status, entryDir: destination, visualBrief: briefPath }, null, 2));
}
function check(file) {
  const record = validateRecord(readJson(file));
  requireSealed(record);
  const destination = entryDir(record);
  const articlePath = path.join(destination, 'article.md');
  if (!fs.existsSync(articlePath)) die('materialized article is missing');
  const rendered = fs.readFileSync(articlePath, 'utf8');
  const bodyStart = rendered.indexOf('\n---\n\n');
  if (bodyStart < 0 || rendered.slice(bodyStart + 6) !== formatBodyForMarkdown(record.body)) die('materialized article does not preserve the source text and paragraph structure');
  for (const name of ['hero.webp', 'og.webp']) if (!fs.existsSync(path.join(destination, name))) die(`${name} is missing`);
  console.log(JSON.stringify({ status: 'PASS', source: file, entryDir: destination, bodySha256: record.bodySha256 }, null, 2));
}
function sync(file) {
  let record = validateRecord(readJson(file));
  checkQuiet(record);
  const destination = entryDir(record);
  const contentDir = path.join(SITE_CONTENT, record.entrySlug);
  const publicDir = path.join(SITE_PUBLIC, record.entrySlug);
  fs.mkdirSync(contentDir, { recursive: true });
  fs.mkdirSync(publicDir, { recursive: true });
  fs.copyFileSync(path.join(destination, 'article.md'), path.join(contentDir, 'article.md'));
  fs.copyFileSync(path.join(destination, 'hero.webp'), path.join(publicDir, 'hero.webp'));
  fs.copyFileSync(path.join(destination, 'og.webp'), path.join(publicDir, 'og.webp'));
  record = updateState(file, record, 'SYNCED');
  console.log(JSON.stringify({ status: record.status, contentDir, publicDir }, null, 2));
}
function checkQuiet(record) {
  requireSealed(record);
  const destination = entryDir(record);
  const rendered = fs.readFileSync(path.join(destination, 'article.md'), 'utf8');
  const bodyStart = rendered.indexOf('\n---\n\n');
  if (bodyStart < 0 || rendered.slice(bodyStart + 6) !== formatBodyForMarkdown(record.body)) die('materialized article does not preserve the source text and paragraph structure');
  for (const name of ['hero.webp', 'og.webp']) if (!fs.existsSync(path.join(destination, name))) die(`${name} is missing`);
}
function mark(file, status, detail) {
  const record = validateRecord(readJson(file));
  requireSealed(record);
  const next = updateState(file, record, status, detail);
  console.log(JSON.stringify({ id: next.id, status: next.status }, null, 2));
}

const [command, ...args] = process.argv.slice(2);
const option = (name) => { const index = args.indexOf(name); return index >= 0 ? args[index + 1] : null; };
try {
  if (command === 'pending') pending();
  else if (command === 'materialize') materialize(sourcePath(option('--source') || ''));
  else if (command === 'check') check(sourcePath(option('--source') || ''));
  else if (command === 'sync') sync(sourcePath(option('--source') || ''));
  else if (command === 'mark') mark(sourcePath(option('--source') || ''), option('--status') || '', option('--detail'));
  else die('usage: diary-publisher.mjs pending | materialize|check|sync --source FILE | mark --source FILE --status STATE');
} catch (error) {
  console.error(`diary-publisher: ${error.message}`);
  process.exitCode = 1;
}
