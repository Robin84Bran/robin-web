#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync, renameSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const config = JSON.parse(readFileSync(join(root, 'publisher.config.json'), 'utf8'));
const siteRoot = resolve(root, config.siteRoot);
const blogsRoot = resolve(root, config.blogsRoot);
const aiCircularLedger = resolve(root, config.aiCircularLedger);
const command = process.argv[2] ?? 'check';
const languageEditions = [
  { locale: 'zh-Hans', slug: 'zh-hans', archiveName: 'article.zh-Hans.md' },
  { locale: 'zh-Hant', slug: 'zh-hant', archiveName: 'article.zh-Hant.md' },
  { locale: 'ja', slug: 'ja', archiveName: 'article.ja.md' },
];

function args() {
  const parsed = {};
  for (let i = 3; i < process.argv.length; i += 1) {
    const key = process.argv[i];
    if (!key.startsWith('--')) continue;
    const value = process.argv[i + 1];
    parsed[key.slice(2)] = value && !value.startsWith('--') ? (i += 1, value) : true;
  }
  return parsed;
}

const options = args();

function hktParts(now = new Date()) {
  const values = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone: config.timezone,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
    }).formatToParts(now).filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]),
  );
  return values;
}

function currentDate(now = new Date()) {
  const p = hktParts(now);
  return `${p.year}-${p.month}-${p.day}`;
}

function compactDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(`Invalid date: ${date}`);
  return date.replaceAll('-', '');
}

function pathsFor(date) {
  const compact = compactDate(date);
  const month = compact.slice(0, 6);
  const archive = join(root, month, compact);
  const siteContent = join(siteRoot, 'src', 'content', 'daily-briefing', compact);
  const siteAssets = join(siteRoot, 'public', 'daily-briefing', compact);
  const paths = {
    compact, month, archive, siteContent, siteAssets,
    source: join(archive, 'source-response.md'),
    article: join(archive, 'article.md'),
    hero: join(archive, 'hero.webp'),
    og: join(archive, 'og.webp'),
    sources: join(archive, 'sources.yaml'),
    state: join(archive, 'publish-state.json'),
  };
  paths.translations = Object.fromEntries(languageEditions.map((edition) => [edition.locale, {
    ...edition,
    archive: join(archive, edition.archiveName),
    site: join(siteContent, `${edition.slug}.md`),
    canonicalUrl: `${config.canonicalBase}/${month}/${compact}/${edition.slug}/`,
  }]));
  return paths;
}

function actionPathsFor(date) {
  const compact = compactDate(date);
  const month = compact.slice(0, 6);
  const archive = join(blogsRoot, month, compact, 'action_item');
  const siteContent = join(siteRoot, 'src', 'content', 'action-item', compact);
  const siteAssets = join(siteRoot, 'public', 'action-item', compact);
  const paths = {
    compact,
    month,
    archive,
    siteContent,
    siteAssets,
    article: join(archive, 'article.md'),
    hero: join(archive, 'hero.webp'),
    og: join(archive, 'og.webp'),
    sources: join(archive, 'sources.yaml'),
    linkedin: join(archive, 'linkedin.md'),
    state: join(archive, 'publish-state.json'),
    canonicalUrl: `${config.canonicalBase}/${month}/${compact}/action_item/`,
  };
  paths.translations = Object.fromEntries(languageEditions.map((edition) => [edition.locale, {
    ...edition,
    archive: join(archive, edition.archiveName),
    site: join(siteContent, `${edition.slug}.md`),
    canonicalUrl: `${config.canonicalBase}/${month}/${compact}/action_item/${edition.slug}/`,
  }]));
  return paths;
}

function emptyActionItem(date) {
  const paths = actionPathsFor(date);
  return {
    status: 'PENDING',
    evidenceStatus: 'UNKNOWN',
    decisionStatus: 'HOLD',
    canonicalUrl: paths.canonicalUrl,
    ledgerId: null,
    notifications: { doneSent: false },
    gates: {
      ledger: false,
      article: false,
      wordCount: false,
      style: false,
      sources: false,
      languages: false,
      banner: false,
      schema: false,
      productionBuild: false,
      cloudflareDeploy: false,
      public200: false,
      linkedinArchived: false,
      telegramDelivered: false,
    },
    history: [],
  };
}

function nowIso() {
  return new Date().toISOString();
}

function readState(file, date) {
  const emptyAction = emptyActionItem(date);
  const emptyDailyGates = {
    article: false, date: false, banner: false, languages: false, schema: false,
    productionBuild: false, cloudflareDeploy: false, public200: false, telegramDelivered: false,
  };
  if (existsSync(file)) {
    const state = JSON.parse(readFileSync(file, 'utf8'));
    const actionItem = state.actionItem ?? emptyAction;
    return {
      ...state,
      notifications: { sourceRequested: false, waitingSent: false, doneSent: false, failedSent: false, ...(state.notifications ?? {}) },
      gates: { ...emptyDailyGates, ...(state.gates ?? {}) },
      actionItem: { ...emptyAction, ...actionItem, gates: { ...emptyAction.gates, ...(actionItem.gates ?? {}) } },
    };
  }
  return {
    runDate: date,
    status: 'NEW',
    evidenceStatus: 'UNKNOWN',
    decisionStatus: 'HOLD',
    sourceMode: null,
    fallbackReason: null,
    canonicalUrl: `${config.canonicalBase}/${compactDate(date).slice(0, 6)}/${compactDate(date)}/`,
    notifications: { sourceRequested: false, waitingSent: false, doneSent: false, failedSent: false },
    gates: emptyDailyGates,
    history: [],
    actionItem: emptyActionItem(date),
  };
}

function writeState(file, state, status, note, patch = {}) {
  const next = { ...state, ...patch, status, updatedAt: nowIso() };
  next.history = [...(state.history ?? []), { at: next.updatedAt, status, note }];
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(next, null, 2)}\n`);
  return next;
}

function yamlQuote(value) {
  return JSON.stringify(String(value));
}

function extractSources(markdown) {
  const seen = new Set();
  const sources = [];
  for (const match of markdown.matchAll(/(?<!!)\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)) {
    const [, label, url] = match;
    if (url.includes('images.openai.com') || seen.has(url)) continue;
    seen.add(url);
    sources.push({ label: label.trim(), url });
  }
  return sources;
}

function frontmatter(date, sourceMode, fallbackReason, publicAssets = false) {
  const compact = compactDate(date);
  const month = compact.slice(0, 6);
  const hero = publicAssets ? `/daily-briefing/${compact}/hero.webp` : './hero.webp';
  const og = publicAssets ? `/daily-briefing/${compact}/og.webp` : './og.webp';
  const fallback = fallbackReason ? `fallbackReason: ${yamlQuote(fallbackReason)}\n` : '';
  const displayDate = new Date(`${date}T12:00:00+08:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return `---\ntitle: ${yamlQuote(`🏹 Robin’s Daily Signal Brief, ${displayDate}`)}\ndate: ${date}\nupdated: ${date}\nsection: Ouroboros\nseries: Daily Briefing\ntags:\n  - Intelligence\n  - AI Infrastructure\n  - Bitcoin\n  - Stablecoins\nkeywords:\n  - AI infrastructure\n  - crypto market structure\n  - stablecoins\n  - physical AI\n  - robotics\nexcerpt: ${yamlQuote('Eight signals across frontier models, capital flows, payment rails, public markets, infrastructure, private capital, Physical AI, and robotics.')}\nhero: ${hero}\nogImage: ${og}\ncanonical: ${yamlQuote(`${config.canonicalBase}/${month}/${compact}/`)}\nauthor: https://iamrobin.ai/#person\ninLanguage: en\ndraft: false\nsourceMode: ${sourceMode}\n${fallback}sourceThread: ${yamlQuote(config.sourceThread)}\n---\n`;
}

function dailyTranslationFrontmatter(date, sourceMode, fallbackReason, edition, publicAssets = false) {
  const compact = compactDate(date);
  const month = compact.slice(0, 6);
  const hero = publicAssets ? `/daily-briefing/${compact}/hero.webp` : './hero.webp';
  const og = publicAssets ? `/daily-briefing/${compact}/og.webp` : './og.webp';
  const fallback = fallbackReason ? `fallbackReason: ${yamlQuote(fallbackReason)}\n` : '';
  const titles = {
    'zh-Hans': `🏹 Robin 每日信号简报，${date.slice(0, 4)}年${Number(date.slice(5, 7))}月${Number(date.slice(8, 10))}日`,
    'zh-Hant': `🏹 Robin 每日訊號簡報，${date.slice(0, 4)}年${Number(date.slice(5, 7))}月${Number(date.slice(8, 10))}日`,
    ja: `🏹 Robinのデイリー・シグナル・ブリーフ、${date.slice(0, 4)}年${Number(date.slice(5, 7))}月${Number(date.slice(8, 10))}日`,
  };
  const excerpts = {
    'zh-Hans': '八个信号，覆盖前沿模型、资本流动、支付轨道、公开市场、基础设施、一级市场、Physical AI 与机器人。',
    'zh-Hant': '八個訊號，涵蓋前沿模型、資本流動、支付軌道、公開市場、基礎設施、一級市場、Physical AI 與機器人。',
    ja: 'フロンティアモデル、資本フロー、決済、公開市場、インフラ、未公開市場、Physical AI、ロボティクスを追う8つのシグナル。',
  };
  return `---\ntitle: ${yamlQuote(titles[edition.locale])}\ndate: ${date}\nupdated: ${date}\nsection: Ouroboros\nseries: Daily Briefing\ntags:\n  - Intelligence\n  - AI Infrastructure\n  - Bitcoin\n  - Stablecoins\nkeywords:\n  - AI infrastructure\n  - crypto market structure\n  - stablecoins\n  - physical AI\n  - robotics\nexcerpt: ${yamlQuote(excerpts[edition.locale])}\nhero: ${hero}\nogImage: ${og}\ncanonical: ${yamlQuote(`${config.canonicalBase}/${month}/${compact}/${edition.slug}/`)}\nauthor: https://iamrobin.ai/#person\ninLanguage: ${edition.locale}\nlanguageSlug: ${edition.slug}\ntranslationOf: ${yamlQuote(`${config.canonicalBase}/${month}/${compact}/`)}\ndraft: false\nsourceMode: ${sourceMode}\n${fallback}sourceThread: ${yamlQuote(config.sourceThread)}\n---\n`;
}

function stripTransientImages(markdown) {
  return markdown
    .replace(/^!\[Image\]\(https:\/\/images\.openai\.com\/[^\n]+\)\s*$/gm, '')
    .replace(/^\[attached image\]\s*$/gim, '')
    .replace(/\n{3,}/g, '\n\n');
}

function normalizeVisibleCopy(markdown) {
  return normalizeDailyStructure(stripTransientImages(markdown)
    .replace(/\]\(([^)\s]+)\)/g, (_, target) => {
      const cleanTarget = target.replaceAll('$', '');
      return `](${/^(?:https?:\/\/|mailto:|\/|#)/i.test(cleanTarget) ? cleanTarget : `https://${cleanTarget}`})`;
    })
    // Signal headings always carry the bilingual category/title separator.
    // Requiring it prevents numbered evidence-spine items inside Signal 5
    // from being promoted into false top-level sections after Telegram strips
    // their indentation.
    .replace(/^(?:\*\*)?([1-8]\.\s+[^\n|｜]+[|｜].+?)(?:\*\*)?$/gm, (_, heading) => `## ${heading.replace(/\*\*$/, '').trim()}`)
  ).trim();
}

function normalizeDailyStructure(markdown) {
  const source = markdown
    // Telegram can nest bold labels inside an already-bold text-link span.
    .replace(/\*\*\[\*\*([^\]\n]+)\*\*\]\(([^)]+)\)\*\*/g, '[$1]($2)')
    .replace(/\[\*\*([^\]\n]+)\*\*\]\(([^)]+)\)/g, '[$1]($2)')
    .replace(/\r\n?|\u2028|\u2029/g, '\n')
    // Copied editions can put several semantic fields in one paragraph.
    // Split only sentence-boundary labels, preserving their text and URLs.
    .replace(/([.!?。！？])[^\S\n]*(?=(?:\*\*)?(?:Inference|Why Robin should care|One Action|推断|推斷|推論|Robin\s*(?:为何|為何).*?(?:在意|关注|關心)|Robinへの意味)[:：])/g, '$1\n\n')
    // Bound bare URLs before adjacent prose punctuation so Markdown does not
    // turn a copied sentence into part of the destination. Existing links stay intact.
    .replace(/(?<![<("])(https?:\/\/[^\s<>()，。—–]+)(?=[，。—–])/g, '<$1>')
    .replace(/\*\*(<\/u>)/g, '$1');
  const output = [];
  let inEvidenceList = false;
  const fieldPattern = /^(?:\*\*)?(?:Fact|Inference|Why Robin should care|One Action|事实|推断|事實|推斷|事実|推論|Robin\s*(?:为何|為何).*?(?:在意|关注|關心)|Robin.*?意味|(?:唯一|一項|一项|一つ).*?(?:行動|行动|決策|决策))[^\n]*?(?:[:：—])/i;
  const fieldLabelPattern = /^(?:\*\*)?((?:Fact|Inference|Why Robin should care|One Action|事实|推断|事實|推斷|事実|推論|Robin\s*(?:为何|為何).*?(?:在意|关注|關心)|Robin.*?意味|(?:唯一|一項|一项|一つ).*?(?:行動|行动|決策|决策)))([:：—])(?:\*\*)?\s*(.*)$/i;
  const datePattern = /^(?:\*\*)?(?:Dates?:|日期：|日付：)/i;

  const blankBefore = () => {
    if (output.length && output.at(-1) !== '') output.push('');
  };

  for (const rawLine of source.split('\n')) {
    let line = rawLine.trimEnd();
    if (datePattern.test(line)) line = line.replaceAll('**', '');
    if (/^\*\*One Action[^:：]*[:：]/i.test(line)) line = line.replaceAll('**', '');
    const fieldLabel = line.match(fieldLabelPattern);
    if (fieldLabel) line = `**${fieldLabel[1]}${fieldLabel[2]}**${fieldLabel[3] ? ` ${fieldLabel[3].trim()}` : ''}`;

    const bullet = line.match(/^(?:\*\*)?\s*[•·]\s*(.+?[:：])(?:\*\*)?\s*(.*)$/);
    if (bullet) {
      if (!output.at(-1)?.startsWith('- **') && !/^\s{4}\d+\./.test(output.at(-1) ?? '')) blankBefore();
      const label = bullet[1].replaceAll('**', '').trim();
      line = `- **${label}**${bullet[2] ? ` ${bullet[2].trim()}` : ''}`;
      inEvidenceList = /Evidence spine|证据骨架|證據骨架|エビデンス/i.test(label);
      output.push(line);
      continue;
    }

    const numbered = inEvidenceList ? line.match(/^\s*([1-9])[.)]?\s+(.+)$/) : null;
    if (numbered) {
      output.push(`    ${numbered[1]}. ${numbered[2].trim()}`);
      continue;
    }

    if (!line.trim()) {
      if (output.at(-1) !== '') output.push('');
      continue;
    }

    if (datePattern.test(line) || fieldPattern.test(line)) blankBefore();
    output.push(line);
    if (!/^\s{4}\d+\./.test(line)) inEvidenceList = false;
  }

  return output.join('\n').replace(/\*{4}/g, '**').replace(/\n{3,}/g, '\n\n').trim();
}

function formatDailyPublication(markdown) {
  const match = markdown.match(/^(---\s*\n[\s\S]*?\n---\s*\n)([\s\S]*)$/);
  if (!match) return normalizeDailyStructure(markdown);
  return `${match[1]}${normalizeDailyStructure(match[2])}\n`;
}

function dailyFieldIdentity(line) {
  const visible = line.replaceAll('**', '').trim();
  if (/^(?:Dates?|日期|日付)[:：]/i.test(visible)) {
    return { kind: 'date', locale: /^(?:日期|日付)/.test(visible) ? 'simplified' : 'english' };
  }
  if (/^(?:Fact|事实|事實|事実)[:：]/i.test(visible)) {
    return { kind: 'fact', locale: /^(?:事实|事實|事実)/.test(visible) ? 'simplified' : 'english' };
  }
  if (/^(?:Inference|推断|推斷|推論)[:：]/i.test(visible)) {
    return { kind: 'inference', locale: /^(?:推断|推斷|推論)/.test(visible) ? 'simplified' : 'english' };
  }
  if (/^Why Robin should care[:：]/i.test(visible)) return { kind: 'why', locale: 'english' };
  if (/^Robin\s*(?:为何|為何).*?(?:在意|关注|關心)[:：]/i.test(visible)) return { kind: 'why', locale: 'simplified' };
  if (/^One Action(?:[:：—]|$)/i.test(visible)) {
    const remainder = visible.replace(/^One Action(?:[:：—]+)?/i, '');
    return { kind: 'action', locale: /[\u3400-\u9fff]/u.test(remainder) ? 'simplified' : 'english' };
  }
  return null;
}

function recoverFragmentedDailySource(clean) {
  const signals = {
    english: new Map(),
    simplified: new Map(),
  };
  const lastHeading = { english: null, simplified: null };
  const orphans = { english: [], simplified: [] };
  let record = null;

  const finishRecord = () => {
    if (!record) return;
    const target = record.number === null
      ? orphans[record.locale]
      : signals[record.locale].get(record.number).records;
    target.push(record);
    record = null;
  };

  for (const rawLine of clean.split('\n')) {
    const line = rawLine.trimEnd();
    const heading = line.match(/^##\s+([1-8])\.\s+(.+)$/);
    if (heading) {
      finishRecord();
      const number = Number(heading[1]);
      const locale = /[\u3400-\u9fff]/u.test(heading[2]) ? 'simplified' : 'english';
      if (!signals[locale].has(number)) signals[locale].set(number, { heading: line, records: [] });
      lastHeading[locale] = number;
      continue;
    }

    const field = dailyFieldIdentity(line);
    if (field) {
      finishRecord();
      record = {
        ...field,
        number: lastHeading[field.locale],
        lines: [line],
      };
      continue;
    }

    const transportMarker = /^(?:English Edition(?:\s*[|｜].*)?|中文版(?:\s*[|｜].*)?|简体中文版(?:\s*[|｜].*)?|簡體中文版(?:\s*[|｜].*)?|🏹.*|今日主线[:：].*|⸻)\s*$/i.test(line.trim());
    if (record && !transportMarker) {
      record.lines.push(line);
    }
  }
  finishRecord();

  for (const locale of ['english', 'simplified']) {
    if (!orphans[locale].length) continue;
    const incomplete = [...signals[locale].entries()].filter(([, signal]) => {
      const kinds = new Set(signal.records.map((item) => item.kind));
      return ['date', 'fact', 'inference', 'why', 'action'].some((kind) => !kinds.has(kind));
    });
    if (incomplete.length === 1) incomplete[0][1].records.push(...orphans[locale]);
  }

  const render = (locale) => {
    if (signals[locale].size !== 8) return '';
    const edition = Array.from({ length: 8 }, (_, index) => {
      const signal = signals[locale].get(index + 1);
      if (!signal) return '';
      const kinds = new Set(signal.records.map((item) => item.kind));
      if (['date', 'fact', 'inference', 'why', 'action'].some((kind) => !kinds.has(kind))) return '';
      const body = signal.records.map((item) => item.lines.join('\n').trim()).join('\n\n');
      return `${signal.heading}\n\n${body}`;
    }).filter(Boolean).join('\n\n');
    return locale === 'english'
      ? edition.replace(/^\s*(?:\*\*)?Chinese (?:working )?title:(?:\*\*)?[^\n]*(?:\n|$)/gim, '').trim()
      : edition;
  };

  return { english: render('english'), simplified: render('simplified') };
}

function splitDailySource(markdown) {
  const clean = normalizeVisibleCopy(markdown);
  // ChatGPT may append a harmless edition subtitle after a separator, for example
  // `中文版｜周一资本配置版` and
  // `English Edition | Monday Capital-Allocator Brief`.  The subtitle is
  // editorial metadata, not part of Signal 1, so consume the whole marker.
  const englishPattern = /^(?:#{1,3}\s*)?(?:\*\*)?English Edition(?:\*\*)?(?:\s*[|｜—–-]\s*[^\n]+)?\s*$/im;
  const simplifiedPattern = /^(?:#{1,3}\s*)?(?:\*\*)?(?:中文版|简体中文版|簡體中文版)(?:\*\*)?(?:\s*[|｜—–-]\s*[^\n]+)?\s*$/m;
  const englishMarker = clean.search(englishPattern);
  const simplifiedMarker = clean.search(simplifiedPattern);
  let english = '';
  let simplified = '';
  if (englishMarker >= 0) {
    english = clean.slice(englishMarker)
      .replace(englishPattern, '')
      .replace(/^\s*(?:[-*•]\s+)?(?:\*\*)?Chinese (?:working )?title:(?:\*\*)?[^\n]*$/gim, '')
      .trim();
    if (simplifiedMarker >= 0 && simplifiedMarker < englishMarker) {
      simplified = clean.slice(simplifiedMarker, englishMarker)
        .replace(simplifiedPattern, '')
        .trim();
    }
  } else if (!/[\u3400-\u9fff]/u.test(clean)) {
    english = clean;
  }
  // Preserve the authored Chinese introduction placed before its edition marker.
  if (simplifiedMarker > 0 && simplifiedMarker < englishMarker) {
    const preamble = clean.slice(0, simplifiedMarker).replace(/^#\s+[^\n]*(?:\n|$)/m, '').trim();
    if (preamble) simplified = `${preamble}\n\n${simplified}`;
  }
  const editions = { english, simplified };
  if (sectionCount(english) === 8 && sectionCount(simplified) === 8) return editions;

  // Telegram may preserve a complete multi-message envelope whose individual
  // chunks were pasted out of edition order. Reassemble the derived editions
  // by numbered signal and semantic field while keeping the immutable source
  // bytes untouched. Fail closed unless all five fields exist for all signals.
  const recovered = recoverFragmentedDailySource(clean);
  return sectionCount(recovered.english) === 8 && sectionCount(recovered.simplified) === 8
    ? recovered
    : editions;
}

function dailyFormattingContract(markdown) {
  const body = articleBody(markdown);
  const lines = body.replace(/\r\n?/g, '\n').split('\n');
  const sections = sectionCount(markdown);
  const fieldPattern = /^(?:\*\*)?(?:Date|日期|日付|Fact|Inference|Why Robin should care|One Action|事实|推断|事實|推斷|事実|推論|Robin\s*(?:为何|為何).*?(?:在意|关注|關心)|Robin.*?意味|(?:唯一|一項|一项|一つ).*?(?:行動|行动|決策|决策))[^\n]*?(?:[:：—])/i;
  const fieldIndexes = lines.flatMap((line, index) => fieldPattern.test(line) ? [index] : []);
  const checks = {
    noLeakedEmphasis: !body.includes('**</u>') && !/^\*\*\s*[•·]/m.test(body),
    // Briefings published before the per-signal `One Action` field use four
    // semantic fields per signal. Keep those archives valid while requiring
    // every available field to render as its own paragraph.
    separatedFields: sections > 0 && fieldIndexes.length >= sections * 4
      && fieldIndexes.every((index) => index === 0 || lines[index - 1] === ''),
    semanticLists: !/^\s*[•·]/m.test(body),
  };
  checks.ok = Object.values(checks).every(Boolean);
  return checks;
}

function captureValidation(source, date) {
  const normalized = normalizeVisibleCopy(source);
  const editions = splitDailySource(source);
  const englishSection8 = editions.english.split(/^## 8\.\s+/m)[1] ?? '';
  const simplifiedSection8 = editions.simplified.split(/^## 8\.\s+/m)[1] ?? '';
  const checks = {
    noRateProtection: !/(?:temporary rate (?:protection|limit)|temporarily unavailable|rate limit(?:ed|ing)?|too many requests|try again later|频率保护|請稍後再試|请稍后再试)/i.test(source),
    date: sourceDateConfirmed(source, date),
    englishEdition: Boolean(editions.english),
    simplifiedEdition: Boolean(editions.simplified),
    englishSections: sectionCount(editions.english) === 8,
    simplifiedSections: sectionCount(editions.simplified) === 8,
    itemFiveAction: /^## 5\./m.test(editions.english) && /One Action/i.test(editions.english.split(/^## 5\.\s+/m)[1]?.split(/^## 6\./m)[0] ?? ''),
    completeEnding: /One Action/i.test(englishSection8) && /One Action/i.test(simplifiedSection8),
    sourceLinks: extractSources(normalized).length >= 8,
    minimumLength: source.length >= 5000,
  };
  return {
    ok: Object.values(checks).every(Boolean),
    checks,
    sha256: createHash('sha256').update(source).digest('hex'),
    bytes: Buffer.byteLength(source),
    sourceLinks: extractSources(normalized).length,
  };
}

function sectionCount(markdown) {
  return (articleBody(markdown).match(/^##\s+/gm) ?? []).length;
}

function sourceUrls(markdown) {
  return [...new Set(extractSources(articleBody(markdown)).map((source) => source.url))].sort();
}

function sameValues(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function languageContract(paths) {
  const isDailyBriefing = paths.siteContent.includes('daily-briefing');
  const englishExists = existsSync(paths.article);
  const english = englishExists ? readFileSync(paths.article, 'utf8') : '';
  const englishSections = englishExists ? sectionCount(english) : 0;
  const englishSources = englishExists ? sourceUrls(english) : [];
  const editions = Object.fromEntries(languageEditions.map((edition) => {
    const target = paths.translations[edition.locale];
    const exists = existsSync(target.archive);
    const markdown = exists ? readFileSync(target.archive, 'utf8') : '';
    const body = articleBody(markdown);
    const scriptPresent = edition.locale === 'ja'
      ? /[\u3040-\u30ff]/u.test(body)
      : /[\u3400-\u9fff]/u.test(body);
    return [edition.locale, {
      exists,
      locale: exists && markdown.includes(`inLanguage: ${edition.locale}`),
      canonical: exists && markdown.includes(target.canonicalUrl),
      translated: exists && scriptPresent,
      editorialReview: exists && /^translationReview:\s*PASS\s*$/m.test(markdown),
      sameSections: exists && sectionCount(markdown) === englishSections,
      sameSources: exists && sameValues(sourceUrls(markdown), englishSources),
      formatting: exists && (!isDailyBriefing || dailyFormattingContract(markdown).ok),
    }];
  }));
  const checks = {
    englishExists,
    englishOnly: englishExists && !/[\u3400-\u9fff\u3040-\u30ff]/u.test(articleBody(english)),
    englishCanonical: englishExists && english.includes(`canonical: ${yamlQuote(paths.canonicalUrl ?? `${config.canonicalBase}/${paths.month}/${paths.compact}/`)}`),
    englishFormatting: englishExists && (!isDailyBriefing || dailyFormattingContract(english).ok),
    editions,
  };
  checks.ok = checks.englishExists && checks.englishOnly && checks.englishCanonical && checks.englishFormatting
    && Object.values(editions).every((edition) => Object.values(edition).every(Boolean));
  return checks;
}

function publicArticle(markdown, assetKind, compact) {
  // The site supplies the Daily Briefing title from frontmatter. Telegram may
  // repeat that publication title in the edition body; omit only that duplicate.
  const source = assetKind === 'daily-briefing'
    ? markdown.replace(/^#\s+(?:\*\*)?🏹\s*Robin[^\n]*(?:\n|$)/m, '')
    : markdown;
  return source
    .replace(/^sourceThread:\s*.*(?:\r?\n|$)/gm, '')
    .replace(/^source_thread:\s*.*(?:\r?\n|$)/gm, '')
    .replace(/^hero:\s*\.\/hero\.webp$/m, `hero: /${assetKind}/${compact}/hero.webp`)
    .replace(/^ogImage:\s*\.\/og\.webp$/m, `ogImage: /${assetKind}/${compact}/og.webp`);
}

function syncLanguageFiles(paths, assetKind) {
  if (assetKind === 'daily-briefing') {
    for (const file of [paths.article, ...languageEditions.map((edition) => paths.translations[edition.locale].archive)]) {
      if (existsSync(file)) writeFileSync(file, formatDailyPublication(readFileSync(file, 'utf8')));
    }
  }
  const contract = languageContract(paths);
  if (!contract.ok) throw new Error(`Four-language publication contract failed: ${JSON.stringify(contract)}`);
  mkdirSync(paths.siteContent, { recursive: true });
  writeFileSync(join(paths.siteContent, 'article.md'), publicArticle(readFileSync(paths.article, 'utf8'), assetKind, paths.compact));
  for (const edition of languageEditions) {
    const target = paths.translations[edition.locale];
    writeFileSync(target.site, publicArticle(readFileSync(target.archive, 'utf8'), assetKind, paths.compact));
  }
  return contract;
}

async function sharpModule() {
  const candidates = [
    process.env.SHARP_MODULE,
    '/Users/headlessnick/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.mjs',
    '/Users/headlessnick/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/lib/index.js',
    join(siteRoot, 'node_modules', 'sharp', 'dist', 'index.mjs'),
    join(siteRoot, 'node_modules', 'sharp', 'lib', 'index.js'),
  ].filter(Boolean);
  for (const candidate of candidates) {
    if (existsSync(candidate)) return (await import(pathToFileURL(candidate).href)).default;
  }
  throw new Error('Sharp is unavailable. Set SHARP_MODULE to sharp/lib/index.js.');
}

function visualSvg(width, height, date, title) {
  const cx = Math.round(width * 0.72);
  const cy = Math.round(height * 0.48);
  const ring = Math.round(Math.min(width, height) * 0.26);
  const seed = Number.parseInt(createHash('sha256').update(`${date}:${title}`).digest('hex').slice(0, 8), 16);
  const petals = Array.from({ length: 13 }, (_, index) => {
    const angle = ((seed % 360) + index * 137.5) * Math.PI / 180;
    const radius = ring * (0.75 + ((seed >> (index % 12)) & 7) / 18);
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius * 0.64;
    return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${Math.max(3, width / 310)}" ry="${Math.max(2, height / 330)}" fill="#dfb7c4" opacity="${(0.22 + (index % 4) * 0.08).toFixed(2)}" transform="rotate(${index * 31} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <radialGradient id="mist" cx="72%" cy="46%" r="58%"><stop offset="0" stop-color="#ffffff"/><stop offset="0.56" stop-color="#f6f2eb"/><stop offset="1" stop-color="#ece7df"/></radialGradient>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#dfb7c4"/><stop offset=".46" stop-color="#aab6bf"/><stop offset="1" stop-color="#b4915d"/></linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#mist)"/>
  <path d="M0 ${Math.round(height * .82)} C ${Math.round(width * .24)} ${Math.round(height * .70)}, ${Math.round(width * .45)} ${Math.round(height * .94)}, ${width} ${Math.round(height * .73)}" fill="none" stroke="#aab6bf" stroke-width="1" opacity=".22"/>
  <g fill="none" transform="rotate(-8 ${cx} ${cy})">
    <ellipse cx="${cx}" cy="${cy}" rx="${ring * 1.36}" ry="${ring * .46}" stroke="#aab6bf" stroke-width="1" opacity=".38"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${ring * 1.02}" ry="${ring * .72}" stroke="#b4915d" stroke-width="1" opacity=".42"/>
    <circle cx="${cx}" cy="${cy}" r="${ring * .72}" stroke="url(#ring)" stroke-width="2" opacity=".62" stroke-dasharray="${ring * 2.8} ${ring * 1.7}"/>
    <path d="M ${cx - ring * .44} ${cy + ring * .36} C ${cx - ring * .9} ${cy - ring * .3}, ${cx + ring * .12} ${cy - ring * .82}, ${cx + ring * .55} ${cy - ring * .22} C ${cx + ring * .86} ${cy + ring * .22}, ${cx + ring * .08} ${cy + ring * .74}, ${cx - ring * .44} ${cy + ring * .36}" stroke="#2e2a26" stroke-width="${Math.max(1.3, width / 1100)}" opacity=".54"/>
  </g>
  ${petals}
  <circle cx="${cx}" cy="${cy}" r="${Math.max(3, width / 260)}" fill="#dfb7c4" opacity=".84"/>
  <g fill="#2e2a26">
    <text x="${Math.round(width * .075)}" y="${Math.round(height * .18)}" font-family="Avenir Next,Arial,sans-serif" font-size="${Math.round(width * .014)}" letter-spacing="${Math.round(width * .0045)}" opacity=".66">DAILY BRIEFING</text>
    <text x="${Math.round(width * .075)}" y="${Math.round(height * .29)}" font-family="Iowan Old Style,Georgia,serif" font-size="${Math.round(width * .048)}" font-weight="400">Signals in motion.</text>
    <text x="${Math.round(width * .078)}" y="${Math.round(height * .36)}" font-family="Avenir Next,Arial,sans-serif" font-size="${Math.round(width * .012)}" letter-spacing="${Math.round(width * .002)}" opacity=".58">${date} · OUROBOROS</text>
  </g>
</svg>`;
}

function escapeXml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function frontmatterValue(markdown, key) {
  const match = markdown.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!match) return null;
  const raw = match[1].trim();
  try { return JSON.parse(raw); } catch { return raw; }
}

function actionVisualSvg(width, height, date, metadata) {
  const cx = Math.round(width * 0.72);
  const cy = Math.round(height * 0.49);
  const rx = Math.round(width * 0.19);
  const ry = Math.round(height * 0.24);
  const labels = String(metadata.visualNodes ?? 'SOURCE|CAPITAL|PROOF|ACTION').split('|').map((label) => label.trim()).slice(0, 4);
  while (labels.length < 4) labels.push('SIGNAL');
  const nodes = [
    { x: cx, y: cy - ry, label: labels[0], color: '#b4915d' },
    { x: cx + rx, y: cy, label: labels[1], color: '#aab6bf' },
    { x: cx, y: cy + ry, label: labels[2], color: '#dfb7c4' },
    { x: cx - rx, y: cy, label: labels[3], color: '#2e2a26' },
  ];
  const nodeSvg = nodes.map((node) => `
    <circle cx="${node.x}" cy="${node.y}" r="${Math.max(5, width / 170)}" fill="${node.color}" opacity=".82"/>
    <text x="${node.x}" y="${node.y + Math.max(22, height / 25)}" text-anchor="middle" font-family="Avenir Next,Arial,sans-serif" font-size="${Math.round(width * .0105)}" letter-spacing="${Math.round(width * .0018)}" fill="#504943" opacity=".67">${node.label}</text>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <radialGradient id="mist" cx="70%" cy="48%" r="62%"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#f6f2eb"/><stop offset="1" stop-color="#ebe6df"/></radialGradient>
    <linearGradient id="flow" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#dfb7c4"/><stop offset=".48" stop-color="#aab6bf"/><stop offset="1" stop-color="#b4915d"/></linearGradient>
    <marker id="arrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,0 L6,3.5 L0,7" fill="none" stroke="#8b8278" stroke-width="1"/></marker>
  </defs>
  <rect width="100%" height="100%" fill="url(#mist)"/>
  <g fill="none" opacity=".54" transform="rotate(-7 ${cx} ${cy})">
    <ellipse cx="${cx}" cy="${cy}" rx="${rx * 1.3}" ry="${ry * 1.42}" stroke="#aab6bf" stroke-width="1"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx * .88}" ry="${ry * .96}" stroke="#b4915d" stroke-width="1" stroke-dasharray="4 10"/>
  </g>
  <path d="M ${cx} ${cy - ry} C ${cx + rx * 1.2} ${cy - ry}, ${cx + rx * 1.2} ${cy}, ${cx + rx} ${cy}" fill="none" stroke="url(#flow)" stroke-width="2" marker-end="url(#arrow)"/>
  <path d="M ${cx + rx} ${cy} C ${cx + rx * 1.1} ${cy + ry}, ${cx + rx * .2} ${cy + ry * 1.2}, ${cx} ${cy + ry}" fill="none" stroke="url(#flow)" stroke-width="2" marker-end="url(#arrow)"/>
  <path d="M ${cx} ${cy + ry} C ${cx - rx * 1.2} ${cy + ry}, ${cx - rx * 1.2} ${cy}, ${cx - rx} ${cy}" fill="none" stroke="url(#flow)" stroke-width="2" marker-end="url(#arrow)"/>
  <path d="M ${cx - rx} ${cy} C ${cx - rx * 1.1} ${cy - ry}, ${cx - rx * .2} ${cy - ry * 1.2}, ${cx} ${cy - ry}" fill="none" stroke="url(#flow)" stroke-width="2" marker-end="url(#arrow)"/>
  ${nodeSvg}
  <circle cx="${cx}" cy="${cy}" r="${Math.max(4, width / 240)}" fill="#dfb7c4" opacity=".78"/>
  <g fill="#2e2a26">
    <text x="${Math.round(width * .075)}" y="${Math.round(height * .17)}" font-family="Avenir Next,Arial,sans-serif" font-size="${Math.round(width * .013)}" letter-spacing="${Math.round(width * .0042)}" opacity=".65">OUROBOROS · ACTION ITEM</text>
    <text x="${Math.round(width * .075)}" y="${Math.round(height * .31)}" font-family="Iowan Old Style,Georgia,serif" font-size="${Math.round(width * .055)}" font-weight="400">${escapeXml(metadata.visualHeadline ?? 'Signal into action.')}</text>
    <text x="${Math.round(width * .078)}" y="${Math.round(height * .39)}" font-family="Iowan Old Style,Georgia,serif" font-size="${Math.round(width * .028)}" font-style="italic" opacity=".72">${escapeXml(metadata.visualSubhead ?? 'Evidence, topology, decision.')}</text>
    <text x="${Math.round(width * .078)}" y="${Math.round(height * .78)}" font-family="Avenir Next,Arial,sans-serif" font-size="${Math.round(width * .0115)}" letter-spacing="${Math.round(width * .002)}" opacity=".56">${date} · ${escapeXml(metadata.visualFooter ?? 'OUROBOROS')}</text>
  </g>
</svg>`;
}

async function generateVisuals(paths, date, title) {
  const sharp = await sharpModule();
  await sharp(Buffer.from(visualSvg(1600, 900, date, title))).webp({ quality: 91 }).toFile(paths.hero);
  await sharp(Buffer.from(visualSvg(1200, 630, date, title))).webp({ quality: 91 }).toFile(paths.og);
}

async function generateActionVisuals(paths, date, metadata) {
  const sharp = await sharpModule();
  await sharp(Buffer.from(actionVisualSvg(1600, 900, date, metadata))).webp({ quality: 91 }).toFile(paths.hero);
  await sharp(Buffer.from(actionVisualSvg(1200, 630, date, metadata))).webp({ quality: 91 }).toFile(paths.og);
}

function articleBody(markdown) {
  return markdown.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
}

function articleWordCount(markdown) {
  return (articleBody(markdown).match(/\b[\w’'-]+\b/g) ?? []).length;
}

function actionStyle(markdown) {
  const body = articleBody(markdown);
  const title = frontmatterValue(markdown, 'title') ?? '';
  const titleWords = (String(title).match(/\b[\w’']+\b/g) ?? []).length;
  return {
    englishOnly: !/[\u3400-\u9fff]/u.test(body),
    forbiddenConstruction: !/\bnot\b[^.!?\n]{0,180}\bbut\b/iu.test(body),
    restrainedEmDash: (body.match(/—/g) ?? []).length <= 5,
    conclusionFirst: body.slice(0, 1200).includes('The conclusion'),
    requiredClose: body.includes('## Categories and keywords') && body.includes('**Hashtags:**'),
    shortTitle: titleWords > 0 && titleWords <= 10,
    directTitle: !/[:—–]/.test(String(title)),
  };
}

async function ingestAction(date) {
  const paths = actionPathsFor(date);
  mkdirSync(paths.archive, { recursive: true });
  const dailyPaths = pathsFor(date);
  let state = readState(dailyPaths.state, date);
  state = writeState(dailyPaths.state, state, 'PROCESSING_ACTION_ITEM', 'Daily action item publication started.', {
    evidenceStatus: 'CONFIRMED', decisionStatus: 'HOLD',
  });
  for (const file of [paths.article, ...languageEditions.map((edition) => paths.translations[edition.locale].archive), paths.sources, paths.linkedin, aiCircularLedger]) {
    if (!existsSync(file)) throw new Error(`Required action item artifact is missing: ${file}`);
  }
  const article = readFileSync(paths.article, 'utf8');
  const metadata = {
    title: frontmatterValue(article, 'title'),
    sourceAction: frontmatterValue(article, 'sourceAction'),
    ledgerId: frontmatterValue(article, 'ledgerId'),
    visualHeadline: frontmatterValue(article, 'visualHeadline'),
    visualSubhead: frontmatterValue(article, 'visualSubhead'),
    visualFooter: frontmatterValue(article, 'visualFooter'),
    visualNodes: frontmatterValue(article, 'visualNodes'),
  };
  const words = articleWordCount(article);
  const style = actionStyle(article);
  if (words < 2000 || words > 3500) throw new Error(`Action item word count ${words} is outside 2000–3500.`);
  if (!Object.values(style).every(Boolean)) throw new Error(`Action item style contract failed: ${JSON.stringify(style)}`);
  if (!metadata.ledgerId || !metadata.sourceAction || !/item\s*5/i.test(metadata.sourceAction)) throw new Error('Action item source or ledger linkage is missing.');
  if (!readFileSync(aiCircularLedger, 'utf8').includes(`## ${metadata.ledgerId} `)) throw new Error(`Ledger entry ${metadata.ledgerId} is missing.`);
  const sources = readFileSync(paths.sources, 'utf8');
  if ((sources.match(/^  - id:/gm) ?? []).length < 5) throw new Error('Action item requires at least five source records.');

  await generateActionVisuals(paths, date, metadata);
  mkdirSync(paths.siteContent, { recursive: true });
  mkdirSync(paths.siteAssets, { recursive: true });
  const languages = syncLanguageFiles(paths, 'action-item');
  copyFileSync(paths.hero, join(paths.siteAssets, 'hero.webp'));
  copyFileSync(paths.og, join(paths.siteAssets, 'og.webp'));

  const nextAction = {
    ...state.actionItem,
    status: 'READY_FOR_ACTION_BUILD',
    evidenceStatus: 'CONFIRMED',
    decisionStatus: 'HOLD',
    ledgerId: metadata.ledgerId,
    wordCount: words,
    style,
    gates: {
      ...state.actionItem.gates,
      ledger: true,
      article: true,
      wordCount: true,
      style: true,
      sources: true,
      languages: true,
      banner: true,
      schema: false,
      productionBuild: false,
      cloudflareDeploy: false,
      public200: false,
      linkedinArchived: true,
    },
    languages,
    history: [...state.actionItem.history, { at: nowIso(), status: 'READY_FOR_ACTION_BUILD', note: `${words} English words, four complete language editions, primary sources, ledger, visuals, and LinkedIn derivative confirmed.` }],
  };
  state = writeState(dailyPaths.state, state, 'READY_FOR_ACTION_BUILD', 'Daily action item archive and public source created.', { actionItem: nextAction });
  writeFileSync(paths.state, `${JSON.stringify({ runDate: date, ...nextAction }, null, 2)}\n`);
  console.log(JSON.stringify({ status: state.status, date, canonicalUrl: paths.canonicalUrl, words, style, languages }, null, 2));
}

function actionCheck(date) {
  const paths = actionPathsFor(date);
  const dailyState = readState(pathsFor(date).state, date);
  const checks = {
    ledger: existsSync(aiCircularLedger),
    article: existsSync(paths.article),
    sources: existsSync(paths.sources),
    linkedin: existsSync(paths.linkedin),
    hero: existsSync(paths.hero),
    og: existsSync(paths.og),
    siteArticle: existsSync(join(paths.siteContent, 'article.md')),
    siteHero: existsSync(join(paths.siteAssets, 'hero.webp')),
    siteOg: existsSync(join(paths.siteAssets, 'og.webp')),
  };
  for (const edition of languageEditions) {
    checks[`archive:${edition.locale}`] = existsSync(paths.translations[edition.locale].archive);
    checks[`site:${edition.locale}`] = existsSync(paths.translations[edition.locale].site);
  }
  const article = checks.article ? readFileSync(paths.article, 'utf8') : '';
  const words = articleWordCount(article);
  const style = actionStyle(article);
  const languages = languageContract(paths);
  const ok = Object.values(checks).every(Boolean) && words >= 2000 && words <= 3500 && Object.values(style).every(Boolean) && languages.ok;
  console.log(JSON.stringify({ ok, date, status: dailyState.actionItem.status, checks, words, style, languages }, null, 2));
  if (!ok) process.exitCode = 1;
}

function sourceDateConfirmed(source, date) {
  const compactChinese = `${date.slice(0, 4)}年${Number(date.slice(5, 7))}月${Number(date.slice(8, 10))}日`;
  const english = new Date(`${date}T12:00:00+08:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  return source.includes(compactChinese) || source.includes(english) || source.includes(date);
}

async function ingest(date, sourceFile, sourceMode = 'telegram_robin_source', fallbackReason = null) {
  const paths = pathsFor(date);
  mkdirSync(paths.archive, { recursive: true });
  let state = readState(paths.state, date);
  const source = readFileSync(sourceFile, 'utf8').trimEnd();
  if (existsSync(paths.source) && resolve(sourceFile) !== resolve(paths.source)) {
    const existing = readFileSync(paths.source, 'utf8').trimEnd();
    if (captureValidation(existing, date).ok && existing !== source) {
      throw new Error('A valid immutable source already exists; reuse it, never overwrite it.');
    }
  }
  const capture = captureValidation(source, date);
  if (!capture.ok) {
    writeState(paths.state, state, 'RETRYING_CAPTURE', `Submitted source failed structural validation: ${JSON.stringify(capture.checks)}`, {
      evidenceStatus: 'UNKNOWN', decisionStatus: 'HOLD', sourceMode, fallbackReason, capture,
    });
    throw new Error('Submitted source is incomplete or malformed; keep the Telegram intake open and resend the missing content.');
  }
  state = writeState(paths.state, state, 'PROCESSING', 'Source was structurally validated; deterministic publication started.', {
    evidenceStatus: 'CONFIRMED', decisionStatus: 'HOLD', sourceMode, fallbackReason,
    capture: {
      ...capture,
      method: String(options['capture-method'] ?? (sourceMode === 'autonomous_research' ? 'primary_source_research' : 'telegram_robin_copy')),
      attempt: Number(options['capture-attempt'] ?? 1),
      capturedAt: nowIso(),
    },
  });
  if (!sourceDateConfirmed(source, date)) {
    writeState(paths.state, state, 'BLOCKED', 'Source date does not match run date.', { evidenceStatus: 'CONFLICTED', decisionStatus: 'BLOCKED' });
    throw new Error(`Source does not visibly contain ${date}.`);
  }
  if (resolve(sourceFile) !== resolve(paths.source)) writeFileSync(paths.source, `${source}\n`);
  const editions = splitDailySource(source);
  if (!editions.english) throw new Error('English canonical edition is missing from the Daily Briefing source.');
  const title = `🏹 Robin’s Daily Signal Brief, ${new Date(`${date}T12:00:00+08:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
  writeFileSync(paths.article, `${frontmatter(date, sourceMode, fallbackReason)}\n${editions.english}\n`);
  if (editions.simplified) {
    const edition = languageEditions.find((item) => item.locale === 'zh-Hans');
    const simplifiedPath = paths.translations['zh-Hans'].archive;
    const existingSimplified = existsSync(simplifiedPath) ? readFileSync(simplifiedPath, 'utf8') : '';
    const preserveEditorialPass = /^translationReview:\s*PASS\s*$/m.test(existingSimplified)
      && normalizeDailyStructure(articleBody(existingSimplified)).trim() === normalizeDailyStructure(editions.simplified).trim();
    const simplifiedFrontmatter = dailyTranslationFrontmatter(date, sourceMode, fallbackReason, edition)
      .replace('draft: false', `${preserveEditorialPass ? 'translationReview: PASS\n' : ''}draft: false`);
    writeFileSync(simplifiedPath, `${simplifiedFrontmatter}\n${editions.simplified}\n`);
  }
  const sources = extractSources(normalizeVisibleCopy(source));
  writeFileSync(paths.sources, `date: ${date}\nsource_mode: ${sourceMode}\nsource_thread: ${yamlQuote(config.sourceThread)}\nsources:\n${sources.map((item) => `  - label: ${yamlQuote(item.label)}\n    url: ${yamlQuote(item.url)}`).join('\n')}\n`);
  await generateVisuals(paths, date, title);

  mkdirSync(paths.siteContent, { recursive: true });
  mkdirSync(paths.siteAssets, { recursive: true });
  writeFileSync(join(paths.siteContent, 'article.md'), publicArticle(readFileSync(paths.article, 'utf8'), 'daily-briefing', paths.compact));
  copyFileSync(paths.hero, join(paths.siteAssets, 'hero.webp'));
  copyFileSync(paths.og, join(paths.siteAssets, 'og.webp'));

  const hasAllTranslations = languageEditions.every((edition) => existsSync(paths.translations[edition.locale].archive));
  const languages = hasAllTranslations ? syncLanguageFiles(paths, 'daily-briefing') : languageContract(paths);

  state = writeState(paths.state, state, hasAllTranslations ? 'READY_FOR_BUILD' : 'AWAITING_TRANSLATIONS', `English canonical, ${sources.length} source links, visual assets, and language state created.`, {
    gates: {
      ...state.gates,
      article: true,
      date: true,
      banner: true,
      languages: languages.ok,
      schema: false,
      productionBuild: false,
      cloudflareDeploy: false,
      public200: false,
    },
    languages,
  });
  console.log(JSON.stringify({ status: state.status, date, canonicalUrl: state.canonicalUrl, sources: sources.length, languages }, null, 2));
}

function syncDailyLanguages(date) {
  const paths = pathsFor(date);
  const state = readState(paths.state, date);
  const languages = syncLanguageFiles(paths, 'daily-briefing');
  const next = writeState(paths.state, state, 'READY_FOR_BUILD', 'Four complete Daily Briefing language editions synchronized to the site.', {
    gates: {
      ...state.gates,
      languages: true,
      schema: false,
      productionBuild: false,
      cloudflareDeploy: false,
      public200: false,
    },
    languages,
  });
  console.log(JSON.stringify({ status: next.status, date, languages }, null, 2));
}

function check(date) {
  const paths = pathsFor(date);
  const state = readState(paths.state, date);
  const checks = {
    source: existsSync(paths.source), article: existsSync(paths.article), hero: existsSync(paths.hero),
    og: existsSync(paths.og), sources: existsSync(paths.sources), siteArticle: existsSync(join(paths.siteContent, 'article.md')),
    siteHero: existsSync(join(paths.siteAssets, 'hero.webp')), siteOg: existsSync(join(paths.siteAssets, 'og.webp')),
  };
  for (const edition of languageEditions) {
    checks[`archive:${edition.locale}`] = existsSync(paths.translations[edition.locale].archive);
    checks[`site:${edition.locale}`] = existsSync(paths.translations[edition.locale].site);
  }
  const languages = languageContract(paths);
  const ok = Object.values(checks).every(Boolean) && sourceDateConfirmed(readFileSync(paths.article, 'utf8'), date) && languages.ok;
  console.log(JSON.stringify({ ok, date, status: state.status, checks, languages }, null, 2));
  if (!ok) process.exitCode = 1;
}

function atomicWriteJson(file, value) {
  mkdirSync(dirname(file), { recursive: true });
  const temporary = `${file}.tmp`;
  writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`);
  renameSync(temporary, file);
}

function recoverValidatedTelegramSource(date) {
  const paths = pathsFor(date);
  const sessionFile = join(root, 'telegram-intake', 'session.json');
  if (existsSync(paths.source) || !existsSync(sessionFile)) return { recovered: false };

  const session = JSON.parse(readFileSync(sessionFile, 'utf8'));
  // ACTIVE means Robin may still be pasting.  Automatic replay is allowed
  // only after /daily_publish_done already froze a failed validation attempt.
  if (session.status !== 'VALIDATION_FAILED' || session.date !== date) return { recovered: false };

  const candidate = join(root, 'telegram-intake', compactDate(date), 'candidate.md');
  if (resolve(session.candidatePath ?? '') !== resolve(candidate)
    || resolve(session.sourcePath ?? '') !== resolve(paths.source)
    || !existsSync(candidate)) return { recovered: false };

  const raw = readFileSync(candidate, 'utf8');
  const candidateSha256 = createHash('sha256').update(raw).digest('hex');
  if (session.candidateSha256 && session.candidateSha256 !== candidateSha256) {
    return { recovered: false, evidenceStatus: 'CONFLICTED', reason: 'candidate_hash_changed' };
  }

  const normalizedCandidate = raw.trimEnd();
  const validation = captureValidation(normalizedCandidate, date);
  if (!validation.ok) return { recovered: false, evidenceStatus: 'UNKNOWN', failedChecks: Object.entries(validation.checks).filter(([, passed]) => !passed).map(([name]) => name) };

  const sourceText = `${normalizedCandidate}\n`;
  const sourceSha256 = createHash('sha256').update(sourceText).digest('hex');
  mkdirSync(dirname(paths.source), { recursive: true });
  const temporary = `${paths.source}.telegram.tmp`;
  writeFileSync(temporary, sourceText);
  renameSync(temporary, paths.source);

  const acceptedAt = nowIso();
  atomicWriteJson(sessionFile, {
    ...session,
    status: 'ACCEPTED',
    sourceSha256,
    acceptedAt,
    updatedAt: acceptedAt,
    validation: { ok: true, checks: validation.checks, checkedAt: acceptedAt },
    recovery: { method: 'validator_replay', recoveredAt: acceptedAt },
  });
  return {
    recovered: true,
    method: 'validator_replay',
    candidateSha256,
    sourceSha256,
    bytes: Buffer.byteLength(sourceText),
  };
}

function deadlineDecision(date, now = new Date()) {
  const paths = pathsFor(date);
  mkdirSync(paths.archive, { recursive: true });
  let state = readState(paths.state, date);
  const p = hktParts(now);
  const minutes = Number(p.hour) * 60 + Number(p.minute);
  const autonomous = config.sourceIngress === 'autonomous_research' && date >= config.autonomousFrom;
  if (autonomous && minutes < 8 * 60) return { action: 'NOT_DUE', status: state.status };
  if (state.status === 'DONE' && Object.values(state.actionItem.gates).every(Boolean)) return { action: 'NOOP', status: 'DONE' };
  if (Object.values(state.gates).every(Boolean) && !Object.values(state.actionItem.gates).every(Boolean)) {
    return { action: 'ACTION_ITEM_REQUIRED', status: state.actionItem.status };
  }
  if (!existsSync(paths.source)) {
    const recovery = recoverValidatedTelegramSource(date);
    if (recovery.recovered) {
      state = writeState(paths.state, state, 'SOURCE_ACCEPTED', 'A previously completed authenticated Telegram candidate passed validator replay and was promoted atomically.', {
        evidenceStatus: 'CONFIRMED', decisionStatus: 'CONDITIONAL', sourceMode: 'telegram_robin_source',
        sourceCapture: recovery,
      });
    }
  }
  if (existsSync(paths.source)) return { action: 'INGEST', status: state.status, source: paths.source };
  if (autonomous) {
    if (state.status !== 'RESEARCH_REQUIRED') {
      state = writeState(paths.state, state, 'RESEARCH_REQUIRED', '08:00 HKT autonomous primary-source research; no Telegram submission required.', {
        evidenceStatus: 'UNKNOWN', decisionStatus: 'CONDITIONAL', sourceMode: 'autonomous_research',
      });
    }
    return { action: 'AUTONOMOUS_RESEARCH', status: state.status, sourceMode: 'autonomous_research' };
  }
  const [checkHour, checkMinute] = config.sourceCheckTime.split(':').map(Number);
  const [fallbackHour, fallbackMinute] = config.fallbackTime.split(':').map(Number);
  if (minutes < checkHour * 60 + checkMinute) return { action: 'NOT_DUE', status: state.status };
  if (minutes >= fallbackHour * 60 + fallbackMinute) {
    state = writeState(paths.state, state, 'FALLBACK_REQUIRED', 'No valid Robin-supplied Telegram source was available at the 13:00 HKT deadline.', {
      evidenceStatus: 'UNKNOWN', decisionStatus: 'CONDITIONAL', sourceMode: 'fallback_research',
      fallbackReason: 'Robin-supplied Telegram briefing unavailable by 13:00 HKT',
    });
    return { action: 'FALLBACK_RESEARCH', status: state.status };
  }
  if (state.status !== 'WAITING_FOR_TELEGRAM_SOURCE') {
    state = writeState(paths.state, state, 'WAITING_FOR_TELEGRAM_SOURCE', 'Awaiting Robin’s authenticated Telegram copy inside the active 09:00 publisher run.', {
      evidenceStatus: 'UNKNOWN', decisionStatus: 'HOLD',
    });
  }
  return { action: state.notifications.sourceRequested ? 'POLL' : 'REQUEST_SOURCE', status: state.status };
}

function deadline(date, now = new Date()) {
  console.log(JSON.stringify(deadlineDecision(date, now)));
}

function wait(milliseconds) {
  return new Promise((resolveWait) => setTimeout(resolveWait, milliseconds));
}

async function waitSource(date) {
  const rawConfiguredPollMs = Number(config.waitSourcePollSeconds ?? 15) * 1000;
  const configuredPollMs = Number.isFinite(rawConfiguredPollMs)
    ? Math.max(1000, Math.min(60000, rawConfiguredPollMs))
    : 15000;
  const requestedPollMs = Number(options['poll-ms'] ?? configuredPollMs);
  const pollMs = Number.isFinite(requestedPollMs)
    ? Math.max(1000, Math.min(60000, requestedPollMs))
    : configuredPollMs;
  const requestedMaxWaitMs = options['max-wait-ms'] === undefined ? null : Number(options['max-wait-ms']);
  if (requestedMaxWaitMs !== null && (!Number.isFinite(requestedMaxWaitMs) || requestedMaxWaitMs < 0)) {
    throw new Error('max-wait-ms must be a non-negative number.');
  }

  const startedAt = Date.now();
  while (true) {
    const decision = deadlineDecision(date);
    if (!['REQUEST_SOURCE', 'POLL'].includes(decision.action)) {
      console.log(JSON.stringify({ ...decision, waitedMs: Date.now() - startedAt }));
      return;
    }
    if (requestedMaxWaitMs !== null && Date.now() - startedAt >= requestedMaxWaitMs) {
      console.log(JSON.stringify({ action: 'WAIT_TIMEOUT', status: decision.status, waitedMs: Date.now() - startedAt }));
      return;
    }
    const remainingMs = requestedMaxWaitMs === null
      ? pollMs
      : Math.max(0, Math.min(pollMs, requestedMaxWaitMs - (Date.now() - startedAt)));
    await wait(remainingMs);
  }
}

function setState(date, status, note) {
  const paths = pathsFor(date);
  const state = readState(paths.state, date);
  const gateMap = {
    SCHEMA_VERIFIED: 'schema', BUILD_VERIFIED: 'productionBuild',
    CLOUDFLARE_DEPLOYED: 'cloudflareDeploy', PUBLIC_VERIFIED: 'public200', TELEGRAM_DELIVERED: 'telegramDelivered',
  };
  const gate = gateMap[status];
  const gates = gate ? { ...state.gates, [gate]: true } : state.gates;
  const next = writeState(paths.state, state, status, note ?? status, { gates });
  let reportedStatus = status;
  if (status === 'TELEGRAM_DELIVERED' && Object.values(next.gates).every(Boolean)) {
    const actionComplete = Object.values(next.actionItem.gates).every(Boolean);
    reportedStatus = actionComplete ? 'DONE' : 'AWAITING_ACTION_ITEM';
    writeState(paths.state, next, reportedStatus, actionComplete
      ? 'Daily Briefing and Daily Action Item publication gates are confirmed.'
      : 'All Daily Briefing gates are confirmed; Daily Action Item remains in progress.', {
      evidenceStatus: 'CONFIRMED', decisionStatus: actionComplete ? 'PASS' : 'HOLD',
    });
  }
  console.log(JSON.stringify({ status: reportedStatus, gates }, null, 2));
}

function setActionState(date, status, note) {
  const dailyPaths = pathsFor(date);
  const paths = actionPathsFor(date);
  let state = readState(dailyPaths.state, date);
  const gateMap = {
    ACTION_SCHEMA_VERIFIED: 'schema',
    ACTION_BUILD_VERIFIED: 'productionBuild',
    ACTION_CLOUDFLARE_DEPLOYED: 'cloudflareDeploy',
    ACTION_PUBLIC_VERIFIED: 'public200',
    ACTION_TELEGRAM_DELIVERED: 'telegramDelivered',
  };
  const gate = gateMap[status];
  const gates = gate ? { ...state.actionItem.gates, [gate]: true } : state.actionItem.gates;
  const actionItem = {
    ...state.actionItem,
    status,
    gates,
    history: [...state.actionItem.history, { at: nowIso(), status, note: note ?? status }],
  };
  const allDaily = Object.values(state.gates).every(Boolean);
  const allAction = Object.values(gates).every(Boolean);
  const finalStatus = allDaily && allAction ? 'DONE' : status;
  actionItem.status = finalStatus === 'DONE' ? 'DONE' : status;
  actionItem.evidenceStatus = allAction ? 'CONFIRMED' : actionItem.evidenceStatus;
  actionItem.decisionStatus = allAction ? 'PASS' : 'HOLD';
  state = writeState(dailyPaths.state, state, finalStatus, allDaily && allAction
    ? 'Daily Briefing and Daily Action Item publication gates are confirmed.'
    : (note ?? status), {
    actionItem,
    evidenceStatus: allDaily && allAction ? 'CONFIRMED' : state.evidenceStatus,
    decisionStatus: allDaily && allAction ? 'PASS' : 'HOLD',
  });
  writeFileSync(paths.state, `${JSON.stringify({ runDate: date, ...actionItem }, null, 2)}\n`);
  console.log(JSON.stringify({ status: state.status, actionStatus: actionItem.status, gates }, null, 2));
}

function readEnv(file) {
  if (!existsSync(file)) return {};
  return Object.fromEntries(
    readFileSync(file, 'utf8').split(/\r?\n/).flatMap((line) => {
      const clean = line.trim();
      if (!clean || clean.startsWith('#') || !clean.includes('=')) return [];
      const index = clean.indexOf('=');
      const key = clean.slice(0, index).trim();
      const value = clean.slice(index + 1).trim().replace(/^(['"])(.*)\1$/, '$2');
      return [[key, value]];
    }),
  );
}

async function notify(date, kind) {
  const paths = pathsFor(date);
  let state = readState(paths.state, date);
  const notificationKeys = {
    'source-request': 'sourceRequested',
    waiting: 'waitingSent',
    done: 'doneSent',
    failed: 'failedSent',
  };
  const notificationKey = notificationKeys[kind];
  if (!notificationKey) throw new Error(`Unknown notification kind: ${kind}`);
  if (state.notifications?.[notificationKey] && (kind !== 'done' || state.gates.telegramDelivered)) {
    console.log(JSON.stringify({ delivered: true, kind, idempotent: true }));
    return;
  }
  const authorizedEnv = config.telegramEnvFile ? readEnv(config.telegramEnvFile) : {};
  const localEnv = readEnv(join(root, '.env'));
  const env = { ...authorizedEnv, ...localEnv, ...process.env };
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    writeState(paths.state, state, 'BLOCKED', 'Authorized publisher Telegram identity is not configured.', {
      evidenceStatus: 'UNKNOWN', decisionStatus: 'BLOCKED',
    });
    throw new Error('Authorized TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are required via the configured environment file.');
  }
  const configuredBotName = env.TELEGRAM_BOT_NAME ?? env.BOT_NAME;
  if (config.telegramBotName && configuredBotName !== config.telegramBotName) {
    writeState(paths.state, state, 'BLOCKED', 'Authorized Telegram bot identity does not match publisher configuration.', {
      evidenceStatus: 'CONFLICTED', decisionStatus: 'BLOCKED',
    });
    throw new Error('Authorized Telegram bot identity mismatch.');
  }
  const messages = {
    'source-request': `🏹 Daily Briefing source request · ${date}\n\n1. Send /daily_publish\n2. Paste the complete ChatGPT Daily Briefing. Multiple messages are fine. Keep Simplified Chinese first and English second.\n3. Send /daily_publish_done\n\nI will validate it, confirm receipt, publish English plus 简中 / 繁中 / 日本語, and return the verified URLs here. If no valid source arrives, fallback research begins at 13:00 HKT.`,
    waiting: `Daily Briefing source is still processing.\nNo action is needed; the publisher will retry automatically.`,
    done: `🌸 Daily Briefing published\n${date}\n${state.canonicalUrl}`,
    failed: `Daily Briefing publisher needs attention\n${date}\nState: ${state.status}`,
  };
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: messages[kind], disable_web_page_preview: false }),
  });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error(`Telegram delivery failed with HTTP ${response.status}.`);
  state = writeState(paths.state, state, state.status, `Telegram ${kind} notification delivered.`, {
    notifications: { ...state.notifications, [notificationKey]: true },
    telegram: { messageId: result.result?.message_id ?? null, deliveredAt: nowIso() },
  });
  if (kind === 'done') setState(date, 'TELEGRAM_DELIVERED', 'Telegram success message delivered.');
  else console.log(JSON.stringify({ delivered: true, kind, messageId: result.result?.message_id ?? null }));
}

async function notifyAction(date) {
  const dailyPaths = pathsFor(date);
  const paths = actionPathsFor(date);
  let state = readState(dailyPaths.state, date);
  if (state.actionItem.notifications?.doneSent && state.actionItem.gates.telegramDelivered) {
    console.log(JSON.stringify({ delivered: true, kind: 'action-done', idempotent: true }));
    return;
  }
  const authorizedEnv = config.telegramEnvFile ? readEnv(config.telegramEnvFile) : {};
  const localEnv = readEnv(join(root, '.env'));
  const env = { ...authorizedEnv, ...localEnv, ...process.env };
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) throw new Error('Authorized TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are required via the configured environment file.');
  const configuredBotName = env.TELEGRAM_BOT_NAME ?? env.BOT_NAME;
  if (config.telegramBotName && configuredBotName !== config.telegramBotName) throw new Error('Authorized Telegram bot identity mismatch.');
  const message = `♾️ Daily Action Item published\n${date}\n${paths.canonicalUrl}`;
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, disable_web_page_preview: false }),
  });
  const result = await response.json();
  if (!response.ok || !result.ok) throw new Error(`Telegram delivery failed with HTTP ${response.status}.`);
  state.actionItem.notifications = { ...state.actionItem.notifications, doneSent: true };
  state.actionItem.telegram = { messageId: result.result?.message_id ?? null, deliveredAt: nowIso() };
  writeFileSync(dailyPaths.state, `${JSON.stringify(state, null, 2)}\n`);
  setActionState(date, 'ACTION_TELEGRAM_DELIVERED', 'Daily Action Item Telegram success message delivered.');
}

async function verifyPublic(date) {
  const paths = pathsFor(date);
  const editions = [
    { locale: 'en', url: `${config.canonicalBase}/${paths.month}/${paths.compact}/` },
    ...languageEditions.map((edition) => ({ locale: edition.locale, url: paths.translations[edition.locale].canonicalUrl })),
  ];
  for (const edition of editions) {
    const response = await fetch(edition.url, { redirect: 'follow' });
    const body = await response.text();
    const alternateCount = (body.match(/rel="alternate"/g) ?? []).length;
    if (response.status !== 200 || !body.includes(date) || !body.includes('application/ld+json')
      || !body.includes(`lang="${edition.locale}"`) || alternateCount < 5) {
      throw new Error(`Public language verification failed for ${edition.locale}: HTTP ${response.status}.`);
    }
  }
  setState(date, 'PUBLIC_VERIFIED', 'English canonical plus Simplified Chinese, Traditional Chinese, and Japanese Daily Briefing URLs returned HTTP 200 with schema and reciprocal hreflang.');
}

async function verifyActionPublic(date) {
  const paths = actionPathsFor(date);
  const editions = [
    { locale: 'en', url: paths.canonicalUrl },
    ...languageEditions.map((edition) => ({ locale: edition.locale, url: paths.translations[edition.locale].canonicalUrl })),
  ];
  for (const edition of editions) {
    const response = await fetch(edition.url, { redirect: 'follow' });
    const body = await response.text();
    const alternateCount = (body.match(/rel="alternate"/g) ?? []).length;
    if (response.status !== 200 || !body.includes(date) || !body.includes(edition.url)
      || !body.includes('application/ld+json') || !body.includes(`lang="${edition.locale}"`) || alternateCount < 5) {
      throw new Error(`Action item language verification failed for ${edition.locale}: HTTP ${response.status}.`);
    }
  }
  setActionState(date, 'ACTION_PUBLIC_VERIFIED', 'English canonical plus Simplified Chinese, Traditional Chinese, and Japanese Action Item URLs returned HTTP 200 with schema and reciprocal hreflang.');
}

const date = options.date ?? currentDate();

try {
  if (command === 'ingest') {
    const source = resolve(options.source ?? pathsFor(date).source);
    await ingest(date, source, options['source-mode'] ?? 'telegram_robin_source', options['fallback-reason'] ?? null);
  } else if (command === 'check') check(date);
  else if (command === 'capture-check') {
    const sourceFile = resolve(options.source ?? pathsFor(date).source);
    const source = readFileSync(sourceFile, 'utf8').trimEnd();
    const validation = captureValidation(source, date);
    console.log(JSON.stringify({ date, source: sourceFile, ...validation }, null, 2));
    if (!validation.ok) process.exitCode = 1;
  }
  else if (command === 'sync-languages') syncDailyLanguages(date);
  else if (command === 'action-ingest') await ingestAction(date);
  else if (command === 'action-check') actionCheck(date);
  else if (command === 'deadline') deadline(date);
  else if (command === 'wait-source') await waitSource(date);
  else if (command === 'state') setState(date, String(options.status), String(options.note ?? options.status));
  else if (command === 'action-state') setActionState(date, String(options.status), String(options.note ?? options.status));
  else if (command === 'verify-public') await verifyPublic(date);
  else if (command === 'verify-action-public') await verifyActionPublic(date);
  else if (command === 'notify') await notify(date, String(options.kind ?? 'done'));
  else if (command === 'notify-action') await notifyAction(date);
  else throw new Error(`Unknown command: ${command}`);
} catch (error) {
  const paths = pathsFor(date);
  const state = readState(paths.state, date);
  if (!['BLOCKED', 'RETRYING_CAPTURE'].includes(state.status)) {
    writeState(paths.state, state, 'RETRYING', error.message, { decisionStatus: 'HOLD' });
  }
  console.error(error.message);
  process.exitCode = 1;
}
