import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const origin = 'https://iamrobin.ai';
const failures = [];
const indexableRoutes = new Set([
  '/',
  '/portfolio/',
  '/books/',
  '/meaning/',
  '/ouroboros/',
  '/intelligence/',
  '/intelligence/swarm/',
  '/intelligence/hardware/',
  '/intelligence/supply-chain/',
]);

function check(condition, message) {
  if (!condition) failures.push(message);
}

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

function routeFromHtml(file) {
  const path = relative(dist, file).split(sep).join('/');
  if (path === 'index.html') return '/';
  if (path.endsWith('/index.html')) return `/${path.slice(0, -'index.html'.length)}`;
  return `/${path}`;
}

function fileForPath(pathname) {
  const direct = join(dist, decodeURIComponent(pathname).replace(/^\//, ''));
  if (existsSync(direct) && !statSync(direct).isDirectory()) return direct;
  const index = join(direct, 'index.html');
  return existsSync(index) ? index : undefined;
}

function one(html, pattern) {
  return html.match(pattern)?.[1];
}

check(existsSync(dist), 'dist/ is missing; run the production build first.');

if (existsSync(dist)) {
  const embeddedMap = join(dist, 'intelligence', 'supply-chain-map', 'index.html');
  const htmlFiles = walk(dist).filter((file) => file.endsWith('.html') && file !== embeddedMap);
  const routes = new Map(htmlFiles.map((file) => [routeFromHtml(file), file]));
  const briefingRoutes = [...routes.keys()].filter((route) => /^\/ouroboros\/\d{6}\/\d{8}\/$/.test(route));
  const briefingTranslationRoutes = [...routes.keys()].filter((route) => /^\/ouroboros\/\d{6}\/\d{8}\/(?:zh-hans|zh-hant|ja)\/$/.test(route));
  const actionRoutes = [...routes.keys()].filter((route) => /^\/ouroboros\/\d{6}\/\d{8}\/action_item\/$/.test(route));
  const actionTranslationRoutes = [...routes.keys()].filter((route) => /^\/ouroboros\/\d{6}\/\d{8}\/action_item\/(?:zh-hans|zh-hant|ja)\/$/.test(route));
  const actionFlowRoutes = [...routes.keys()].filter((route) => /^\/ouroboros\/\d{6}\/\d{8}\/actions\/$/.test(route));
  const actionFlowTranslationRoutes = [...routes.keys()].filter((route) => /^\/ouroboros\/\d{6}\/\d{8}\/actions\/(?:zh-hans|zh-hant|ja)\/$/.test(route));
  const blogRoutes = [...routes.keys()].filter((route) => /^\/ouroboros\/\d{6}\/\d{8}\/blog\/$/.test(route));
  const blogTranslationRoutes = [...routes.keys()].filter((route) => /^\/ouroboros\/\d{6}\/\d{8}\/blog\/(?:zh-hans|zh-hant|ja)\/$/.test(route));
  const diaryRoutes = [...routes.keys()].filter((route) => /^\/meaning\/diary\/\d{6}\/\d{4}-\d{2}-\d{2}-[a-z0-9-]+\/$/.test(route));
  const articleRoutes = [...briefingRoutes, ...briefingTranslationRoutes, ...actionRoutes, ...actionTranslationRoutes];
  const actionFlowPublications = [...actionFlowRoutes, ...actionFlowTranslationRoutes];
  const blogPublications = [...blogRoutes, ...blogTranslationRoutes];
  const publicationRoutes = [...articleRoutes, ...actionFlowPublications, ...blogPublications];
  for (const route of [...publicationRoutes, ...diaryRoutes]) indexableRoutes.add(route);
  check(routes.size === 15 + publicationRoutes.length + diaryRoutes.length, `expected ${15 + publicationRoutes.length + diaryRoutes.length} HTML routes, found ${routes.size}.`);

  for (const [route, file] of routes) {
    const html = readFileSync(file, 'utf8');
    const expectedCanonical = new URL(route, `${origin}/`).toString();
    const canonical = one(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
    const robots = one(html, /<meta\s+name="robots"\s+content="([^"]+)"/i);
    check(canonical === expectedCanonical, `${route}: incorrect canonical.`);
    check(
      html.includes('rel="describedby" href="https://iamrobin.ai/llms.txt" type="text/plain"'),
      `${route}: llms.txt describedby discovery is missing.`,
    );
    check(Boolean(one(html, /<meta\s+name="description"\s+content="([^"]+)"/i)), `${route}: missing description.`);
    check(one(html, /<meta\s+property="og:url"\s+content="([^"]+)"/i) === expectedCanonical, `${route}: incorrect og:url.`);
    for (const property of ['og:title', 'og:description', 'og:image', 'og:image:alt']) {
      check(html.includes(`property="${property}"`), `${route}: missing ${property}.`);
    }
    for (const name of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']) {
      check(html.includes(`name="${name}"`), `${route}: missing ${name}.`);
    }

    if (indexableRoutes.has(route)) {
      check(robots === 'index, follow', `${route}: indexable route lacks index, follow.`);
      check(html.includes('application/ld+json'), `${route}: indexable route lacks JSON-LD.`);
    } else {
      check(robots === 'noindex, follow', `${route}: thin/hidden route must be noindex, follow.`);
    }

    if (publicationRoutes.includes(route)) {
      const slugMatch = route.match(/\/(zh-hans|zh-hant|ja)\/$/);
      const locale = slugMatch ? ({ 'zh-hans': 'zh-Hans', 'zh-hant': 'zh-Hant', ja: 'ja' })[slugMatch[1]] : 'en';
      const family = slugMatch ? route.slice(0, -`${slugMatch[1]}/`.length) : route;
      const expectedAlternates = {
        en: new URL(family, `${origin}/`).toString(),
        'zh-Hans': new URL(`${family}zh-hans/`, `${origin}/`).toString(),
        'zh-Hant': new URL(`${family}zh-hant/`, `${origin}/`).toString(),
        ja: new URL(`${family}ja/`, `${origin}/`).toString(),
      };
      check(html.includes(`<html lang="${locale}">`), `${route}: html lang must be ${locale}.`);
      for (const [hreflang, href] of Object.entries(expectedAlternates)) {
        check(html.includes(`rel="alternate" hreflang="${hreflang}" href="${href}"`), `${route}: missing reciprocal ${hreflang} alternate.`);
      }
      check(html.includes(`rel="alternate" hreflang="x-default" href="${expectedAlternates.en}"`), `${route}: x-default must point to English canon.`);
      check(html.includes(`"inLanguage":"${locale}"`), `${route}: Article schema language must be ${locale}.`);
    }

    for (const [, json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        JSON.parse(json);
      } catch (error) {
        failures.push(`${route}: invalid JSON-LD (${error.message}).`);
      }
    }

    for (const [, rawHref] of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
      if (/^(?:mailto:|tel:|javascript:|data:|#)/i.test(rawHref)) continue;
      const target = new URL(rawHref.replaceAll('&amp;', '&'), expectedCanonical);
      if (target.origin !== origin) continue;
      check(Boolean(fileForPath(target.pathname)), `${route}: broken internal link to ${target.pathname}`);
    }
  }

  const homepage = readFileSync(routes.get('/'), 'utf8');
  const books = readFileSync(routes.get('/books/'), 'utf8');
  const portfolio = readFileSync(routes.get('/portfolio/'), 'utf8');
  const ouroboros = readFileSync(routes.get('/ouroboros/'), 'utf8');
  const meaning = readFileSync(routes.get('/meaning/'), 'utf8');
  check(homepage.includes('"@type":"Person"'), 'homepage: Person schema missing.');
  check(homepage.includes('"@type":"WebSite"'), 'homepage: WebSite schema missing.');
  check(homepage.includes('"@type":"ProfilePage"'), 'homepage: ProfilePage schema missing.');
  check((books.match(/"@type":"Book"/g) ?? []).length === 4, 'books: expected four Book schemas.');
  check(portfolio.includes('"@type":"CollectionPage"'), 'portfolio: CollectionPage schema missing.');
  check(ouroboros.includes('"@type":"CollectionPage"'), 'ouroboros: CollectionPage schema missing.');
  check(meaning.includes('"@type":"CollectionPage"'), 'meaning: CollectionPage schema missing.');
  check(meaning.includes('id="diary"'), 'meaning: Diary archive is missing.');
  check((ouroboros.match(/<details class="ouroboros-shelf"/g) ?? []).length === 3, 'ouroboros: expected three expandable publication shelves.');
  check(ouroboros.includes('August 20, 2026') && ouroboros.includes('August 21, 2026'), 'ouroboros: archive must expose prior and current dates.');
  check(ouroboros.includes('/actions/'), 'ouroboros: Daily Action Flow shelf is missing.');
  for (const route of publicationRoutes) {
    const article = readFileSync(routes.get(route), 'utf8');
    check(article.includes('"@type":"Article"'), `${route}: Article schema missing.`);
    check(article.includes('"@type":"Person"'), `${route}: Person schema missing.`);
    check(/<meta\s+property="og:type"\s+content="article"/i.test(article), `${route}: og:type must be article.`);
  }
  for (const route of diaryRoutes) {
    const article = readFileSync(routes.get(route), 'utf8');
    check(article.includes('"@type":"BlogPosting"'), `${route}: BlogPosting schema missing.`);
    check(article.includes('"@type":"Person"'), `${route}: Person schema missing.`);
    check(/<meta\s+property="og:type"\s+content="article"/i.test(article), `${route}: og:type must be article.`);
  }
  for (const route of [...actionRoutes, ...actionTranslationRoutes]) {
    const article = readFileSync(routes.get(route), 'utf8');
    check(article.includes('>Action Item</span>'), `${route}: Action Item series marker missing.`);
    check(article.includes('AI Circularity'), `${route}: ledger framing missing.`);
  }

  for (const route of briefingRoutes) {
    const article = readFileSync(routes.get(route), 'utf8');
    const compact = route.match(/\/(\d{8})\/$/)?.[1];
    const date = compact ? `${compact.slice(0, 4)}-${compact.slice(4, 6)}-${compact.slice(6, 8)}` : null;
    const displayDate = date
      ? new Date(`${date}T12:00:00+08:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : null;
    check(Boolean(displayDate) && article.includes(`🏹 Robin’s Daily Signal Brief, ${displayDate}`), `${route}: canonical Daily Briefing title formula is missing.`);
    const countWord = compact === '20260820' ? 'Seven' : 'Eight';
    check(article.includes(`${countWord} signals. Four languages. One moving field.`), `${route}: source-true signal-count field line is missing.`);
    check(!article.includes('**</u>') && !article.includes('** •'), `${route}: malformed visible Markdown leaked into HTML.`);
    check(/<p>Date:[\s\S]*?<\/p>\s*<p><strong>Fact:<\/strong>/i.test(article), `${route}: Date and Fact must render as separate paragraphs.`);
  }

  check(actionFlowRoutes.length === briefingRoutes.length, 'action flows: every briefing date must have one English Action Flow.');
  check(actionFlowTranslationRoutes.length === actionFlowRoutes.length * 3, 'action flows: every English Action Flow must have three translations.');
  for (const route of actionFlowPublications) {
    const article = readFileSync(routes.get(route), 'utf8');
    check(article.includes('Daily Action Flow') || /每日(?:行动|行動)流|アクション・フロー/.test(article), `${route}: Daily Action Flow title is missing.`);
    check(article.includes('CIO') || /中心判断|核心判斷|核心判断/.test(article), `${route}: CIO decision framing is missing.`);
    check(article.includes('Definition of done') || /完成定義|完成定义|完了条件/.test(article), `${route}: definition-of-done field is missing.`);
    check(article.includes('/action_item/'), `${route}: signal-five canonical deep dive link is missing.`);
  }

  const publicationComponent = readFileSync(join(root, 'src', 'components', 'OuroborosPublication.astro'), 'utf8');
  check(publicationComponent.includes("kind: 'briefing' | 'action' | 'blog' | 'diary'"), 'publication H1: Blog and Diary must inherit the shared component.');
  check((publicationComponent.match(/clamp\(1\.75rem, 4vw, 2\.75rem\)/g) ?? []).length === 1, 'publication H1: one shared desktop scale is required.');
  check((publicationComponent.match(/clamp\(1\.6rem, 7vw, 2\.1rem\)/g) ?? []).length === 1, 'publication H1: one shared mobile scale is required.');
  check(!publicationComponent.includes('clamp(2.2rem, 8.67vw, 5.2rem)'), 'publication H1: legacy oversized Daily Briefing scale must be absent.');
  check(publicationComponent.includes('.publication-body :global(h2:first-child) { margin-top: 0; padding-top: 0; border-top: 0; }'), 'publication body: first section must not recreate the removed mobile hero gap.');

  const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
  check(robots.includes('Sitemap: https://iamrobin.ai/sitemap-index.xml'), 'robots.txt: sitemap declaration missing.');
  check(robots.includes('Dear robots, Robin has prepared snacks.'), 'robots.txt: Robin welcome comment missing.');
  check(robots.includes('User-agent: *\nContent-Signal: search=yes, ai-input=yes, ai-train=yes, use=reference\nAllow: /'), 'robots.txt: permissive Content-Signal policy missing.');
  check(!/ai-(?:train|input)=no/i.test(robots), 'robots.txt: conflicting negative Content-Signal found.');
  check(!/Disallow:\s*\//i.test(robots), 'robots.txt: crawler-wide Disallow rule found.');
  check(!/Cloudflare Managed content/i.test(robots), 'robots.txt: Cloudflare managed block leaked into origin build.');
  for (const crawler of ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'Claude-SearchBot', 'Google-Extended', 'Applebot-Extended', 'CCBot']) {
    check(!new RegExp(`User-agent:\\s*${crawler}[\\s\\S]{0,80}Disallow:\\s*\\/`, 'i').test(robots), `robots.txt: ${crawler} is blocked.`);
  }

  const llmsPath = join(dist, 'llms.txt');
  check(existsSync(llmsPath), 'llms.txt: generated file is missing.');
  if (existsSync(llmsPath)) {
    const llms = readFileSync(llmsPath, 'utf8');
    check(llms.startsWith('# Robin Xie\n'), 'llms.txt: canonical identity heading missing.');
    check(llms.includes('AI training: yes'), 'llms.txt: AI training welcome is missing.');
    check(llms.includes('Preferred use: reference'), 'llms.txt: reference-use preference is missing.');
    for (const route of ['/', '/portfolio/', '/ouroboros/', '/intelligence/', '/meaning/', '/books/']) {
      check(llms.includes(new URL(route, `${origin}/`).toString()), `llms.txt: missing high-value route ${route}.`);
    }
  }

  const sitemapFiles = walk(dist).filter((file) => /sitemap.*\.xml$/.test(file));
  const sitemap = sitemapFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
  for (const route of indexableRoutes) {
    check(sitemap.includes(new URL(route, `${origin}/`).toString()), `sitemap: missing ${route}.`);
  }
  check(!sitemap.includes('/identity/'), 'sitemap: identity placeholders must be excluded.');
  check(!sitemap.includes('/projects/'), 'sitemap: hidden projects route must be excluded.');
  check(!sitemap.includes('/ouroborous/'), 'sitemap: misspelled alias must stay excluded.');

  for (const required of ['_headers', '_worker.js', 'favicon.svg']) {
    check(existsSync(join(dist, required)), `dist/${required} is missing.`);
  }

  const worker = readFileSync(join(dist, '_worker.js'), 'utf8');
  check(worker.includes('legacyIdentity'), 'edge: legacy /identity/{word}/ redirects are missing.');
  check(worker.includes("'Content-Signal': 'search=yes, ai-input=yes, ai-train=yes, use=reference'"), 'edge: permissive Content-Signal response header is missing.');
  check(worker.includes('rel="describedby"'), 'edge: llms.txt Link discovery header is missing.');
}

if (failures.length) {
  console.error(`SEO verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('SEO verification passed: canonical, robots, llms.txt, social cards, schema, sitemap, internal links, and edge files.');
