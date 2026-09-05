import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const origin = 'https://iamrobin.ai';
const failures = [];
const personId = `${origin}/#person`;
const identityAliases = ['Bin Xie', 'Bin “Robin” Xie', 'Bin Robin Xie', 'Xie Bin', '谢玢', '謝玢', 'nanobin'];
const proofAnchors = ['engineering-record', 'payments-record', 'tidebit-record'];
const portfolioDisclaimer = 'An attention field — subjects I study, not a record of affiliations or holdings.';
const indexableRoutes = new Set([
  '/', '/about/', '/network/',
  '/zh-hans/', '/zh-hans/about/', '/zh-hans/network/',
  '/zh-hant/', '/zh-hant/about/', '/zh-hant/network/',
  '/ja/', '/ja/about/', '/ja/network/',
  '/portfolio/', '/books/', '/meaning/', '/ouroboros/', '/ouroboros/execution-ledger/', '/binary/',
  '/intelligence/', '/intelligence/hardware/', '/intelligence/supply-chain/',
  '/intelligence/hardware/deliverable-megawatts/',
  '/intelligence/supply-chain-map/', '/intelligence/swarm/',
]);
const identityFamilies = [
  {
    en: '/',
    'zh-Hans': '/zh-hans/',
    'zh-Hant': '/zh-hant/',
    ja: '/ja/',
  },
  {
    en: '/about/',
    'zh-Hans': '/zh-hans/about/',
    'zh-Hant': '/zh-hant/about/',
    ja: '/ja/about/',
  },
  {
    en: '/network/',
    'zh-Hans': '/zh-hans/network/',
    'zh-Hant': '/zh-hant/network/',
    ja: '/ja/network/',
  },
];
const identityFamilyByRoute = new Map(identityFamilies.flatMap((family) =>
  Object.entries(family).map(([locale, route]) => [route, { family, locale }]),
));

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

function inspectIdentity(node, route) {
  if (!node || typeof node !== 'object') return;
  if (Array.isArray(node)) return node.forEach((item) => inspectIdentity(item, route));
  if (node['@type'] === 'Person' && node['@id'] === personId) {
    check(node.name === 'Robin Xie', `${route}: primary Person name must remain Robin Xie.`);
    check(node.url === `${origin}/about/`, `${route}: Person must link to the canonical About profile.`);
    check(!('additionalName' in node), `${route}: professional nickname must not become a middle name.`);
    for (const alias of identityAliases) check(node.alternateName?.includes(alias), `${route}: missing Person alias ${alias}.`);
  }
  if (node.author) {
    for (const author of [node.author].flat()) {
      check(author?.['@id'] === personId, `${route}: author must reference the existing shared Person entity.`);
    }
  }
  check(node['@id'] !== `${origin}/#robin-xie`, `${route}: shared Person identifier must not be replaced.`);
  Object.values(node).forEach((value) => inspectIdentity(value, route));
}

check(existsSync(dist), 'dist/ is missing; run the production build first.');

if (existsSync(dist)) {
  const htmlFiles = walk(dist).filter((file) => file.endsWith('.html'));
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
  check(routes.size === 29 + publicationRoutes.length + diaryRoutes.length, `expected ${29 + publicationRoutes.length + diaryRoutes.length} HTML routes, found ${routes.size}.`);

  for (const [route, file] of routes) {
    const html = readFileSync(file, 'utf8');
    const expectedCanonical = new URL(route, `${origin}/`).toString();
    const canonical = one(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
    const robots = one(html, /<meta\s+name="robots"\s+content="([^"]+)"/i);
    check(canonical === expectedCanonical, `${route}: incorrect canonical.`);
    check(html.includes('rel="describedby" href="https://iamrobin.ai/llms.txt" type="text/plain"'), `${route}: llms.txt describedby discovery is missing.`);
    check(Boolean(one(html, /<meta\s+name="description"\s+content="([^"]+)"/i)), `${route}: missing description.`);
    check(one(html, /<meta\s+property="og:url"\s+content="([^"]+)"/i) === expectedCanonical, `${route}: incorrect og:url.`);
    check((html.match(/<h1\b/gi) ?? []).length === 1, `${route}: expected exactly one visible H1.`);
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

    const identityFamily = identityFamilyByRoute.get(route);
    if (identityFamily) {
      check(html.includes(`<html lang="${identityFamily.locale}">`), `${route}: identity html lang must be ${identityFamily.locale}.`);
      for (const [hreflang, alternateRoute] of Object.entries(identityFamily.family)) {
        const href = new URL(alternateRoute, `${origin}/`).toString();
        check(html.includes(`rel="alternate" hreflang="${hreflang}" href="${href}"`), `${route}: missing reciprocal identity ${hreflang} alternate.`);
      }
      const defaultHref = new URL(identityFamily.family.en, `${origin}/`).toString();
      check(html.includes(`rel="alternate" hreflang="x-default" href="${defaultHref}"`), `${route}: identity x-default must point to English.`);
      check(html.includes('"@type":"Person"'), `${route}: identity Person schema missing.`);
      if (route.includes('/network/')) {
        check(html.includes('"@type":"CollectionPage"'), `${route}: Network CollectionPage schema missing.`);
        for (const anchor of proofAnchors) check(html.includes(`id="${anchor}"`), `${route}: missing public-record anchor ${anchor}.`);
      } else {
        check(html.includes('"@type":"ProfilePage"'), `${route}: identity ProfilePage schema missing.`);
      }
      if (route.endsWith('/about/')) {
        const body = html.split(/<body\b[^>]*>/i)[1]?.split('</body>')[0] ?? '';
        check(body.includes('Bin “Robin” Xie') && body.includes('Bin Xie'), `${route}: visible formal introduction missing.`);
        check(body.includes('id="work-with-robin"'), `${route}: quiet contact invitation missing.`);
        const networkPath = identityFamilies[2][identityFamily.locale];
        for (const anchor of proofAnchors) check(body.includes(`href="${networkPath}#${anchor}"`), `${route}: localized public-record link ${anchor} missing.`);
        for (const path of ['/projects/', '/intelligence/', '/binary/#binary-lane-invest', '/ouroboros/']) {
          check(body.includes(`href="${path}"`), `${route}: research/capability link ${path} missing.`);
        }
      }
      check(html.includes(`"inLanguage":"${identityFamily.locale}"`), `${route}: identity ProfilePage language must be ${identityFamily.locale}.`);
    }

    for (const [, json] of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
      try {
        inspectIdentity(JSON.parse(json), route);
      } catch (error) {
        failures.push(`${route}: invalid JSON-LD (${error.message}).`);
      }
    }

    for (const [, rawHref] of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
      if (/^(?:mailto:|tel:|javascript:|data:|#)/i.test(rawHref)) continue;
      const target = new URL(rawHref.replaceAll('&amp;', '&'), expectedCanonical);
      if (target.origin !== origin) continue;
      check(Boolean(fileForPath(target.pathname)), `${route}: broken internal link to ${target.pathname}`);
      if ([...proofAnchors, 'work-with-robin', 'binary-lane-invest'].includes(target.hash.slice(1))) {
        const targetFile = fileForPath(target.pathname);
        check(targetFile && readFileSync(targetFile, 'utf8').includes(`id="${target.hash.slice(1)}"`), `${route}: broken evidence/contact fragment ${target.pathname}${target.hash}`);
      }
    }
  }

  const homepage = readFileSync(routes.get('/'), 'utf8');
  const about = readFileSync(routes.get('/about/'), 'utf8');
  const simplifiedHome = readFileSync(routes.get('/zh-hans/'), 'utf8');
  const traditionalHome = readFileSync(routes.get('/zh-hant/'), 'utf8');
  const japaneseHome = readFileSync(routes.get('/ja/'), 'utf8');
  const network = readFileSync(routes.get('/network/'), 'utf8');
  const simplifiedNetwork = readFileSync(routes.get('/zh-hans/network/'), 'utf8');
  const traditionalNetwork = readFileSync(routes.get('/zh-hant/network/'), 'utf8');
  const japaneseNetwork = readFileSync(routes.get('/ja/network/'), 'utf8');
  const books = readFileSync(routes.get('/books/'), 'utf8');
  const portfolio = readFileSync(routes.get('/portfolio/'), 'utf8');
  const ouroboros = readFileSync(routes.get('/ouroboros/'), 'utf8');
  const binary = readFileSync(routes.get('/binary/'), 'utf8');
  const meaning = readFileSync(routes.get('/meaning/'), 'utf8');
  const infrastructure = readFileSync(routes.get('/intelligence/hardware/deliverable-megawatts/'), 'utf8');
  check(homepage.includes('"@type":"Person"'), 'homepage: Person schema missing.');
  check(homepage.includes('"@type":"WebSite"'), 'homepage: WebSite schema missing.');
  check(homepage.includes('"@type":"ProfilePage"'), 'homepage: ProfilePage schema missing.');
  check(homepage.includes('谢玢') && homepage.includes('謝玢'), 'homepage: visible and machine-readable Chinese identity aliases are missing.');
  const homepageDescription = one(homepage, /<meta\s+name="description"\s+content="([^"]+)"/i)?.toLowerCase() ?? '';
  for (const keyword of ['subsea engineering', 'fintech', 'capital allocation', 'artificial intelligence']) {
    check(homepageDescription.includes(keyword), `homepage: SEO description is missing ${keyword}.`);
  }
  const homepageSchemas = [...homepage.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => match[1])
    .join(' ')
    .toLowerCase();
  for (const keyword of ['professional engineer', 'accredited investor', 'ai-native system builder', 'subsea engineering', 'fintech', 'capital allocation', 'ai systems']) {
    check(homepageSchemas.includes(keyword), `homepage: JSON-LD is missing ${keyword}.`);
  }
  check(about.includes('subsea engineering') && about.includes('FinTech') && about.includes('AI systems'), 'about: resume-backed career spine is missing.');
  check(simplifiedHome.includes('谢玢 Robin Xie') && simplifiedHome.includes('资本配置'), 'zh-Hans home: canonical Chinese identity copy is missing.');
  check(traditionalHome.includes('謝玢 Robin Xie') && traditionalHome.includes('資本配置'), 'zh-Hant home: canonical Chinese identity copy is missing.');
  check(japaneseHome.includes('Robin Xie（謝玢）') && japaneseHome.includes('AIシステム'), 'ja home: canonical Japanese identity copy is missing.');
  check(network.includes('Projects came and went. The questions remained.') && network.includes('Global Token Limited'), 'Network: canonical English public record is missing.');
  check(simplifiedNetwork.includes('项目有聚散，所问未曾改。') && simplifiedNetwork.includes('香港上市公司'), 'zh-Hans Network: approved Chinese public record is missing.');
  check(traditionalNetwork.includes('項目有聚散，所問未曾改。') && traditionalNetwork.includes('香港上市公司'), 'zh-Hant Network: approved Traditional Chinese public record is missing.');
  check(japaneseNetwork.includes('プロジェクトは現れては去り') && japaneseNetwork.includes('香港上場企業'), 'ja Network: approved Japanese public record is missing.');
  for (const page of [network, simplifiedNetwork, traditionalNetwork, japaneseNetwork]) {
    check((page.match(/<h2\b/g) ?? []).length === 5, 'Network: every locale must expose the five canonical sections.');
    check(page.includes('https://www.hkexnews.hk/listedco/listconews/gem/2019/0509/gln20190509062_c.pdf'), 'Network: canonical HKEX source is missing.');
  }
  check((books.match(/"@type":"Book"/g) ?? []).length === 4, 'books: expected four Book schemas.');
  check(portfolio.includes('"@type":"CollectionPage"'), 'portfolio: CollectionPage schema missing.');
  check(portfolio.split(/<body\b[^>]*>/i)[1]?.includes(portfolioDisclaimer), 'portfolio: visible non-affiliation/holdings disclaimer missing.');
  check(one(portfolio, /<meta\s+name="description"\s+content="([^"]+)"/i) === portfolioDisclaimer, 'portfolio: metadata must match the visible disclaimer.');
  check(portfolio.includes(`"description":"${portfolioDisclaimer}"`), 'portfolio: schema must match the visible disclaimer.');
  check(ouroboros.includes('"@type":"CollectionPage"'), 'ouroboros: CollectionPage schema missing.');
  check(binary.includes('"@type":"CollectionPage"'), 'binary: CollectionPage schema missing.');
  check(meaning.includes('"@type":"CollectionPage"'), 'meaning: CollectionPage schema missing.');
  check(meaning.includes('id="diary"'), 'meaning: Diary archive is missing.');
  check(infrastructure.includes('From paper gigawatts to operating compute'), 'AI infrastructure field note: canonical thesis is missing.');
  check(infrastructure.includes('"@type":"Article"') && infrastructure.includes('"@type":"BreadcrumbList"'), 'AI infrastructure field note: Article and BreadcrumbList schema are required.');
  check(!infrastructure.includes('sourceThread') && !infrastructure.includes('source_thread') && !infrastructure.includes('chatgpt.com/c/'), 'AI infrastructure field note: private provenance pointer detected.');
  check((ouroboros.match(/<details class="ouroboros-shelf"/g) ?? []).length === 2, 'ouroboros: expected Daily Briefing and Daily Action Flow shelves only.');
  check((binary.match(/<section class="binary-lane"/g) ?? []).length === 3, 'binary: expected Build, Invest, and Joy lanes.');
  check((binary.match(/<nav class="ouroboros-shelf__list binary-present"/g) ?? []).length === 3, 'binary: every lane must expose its present titles.');
  check((binary.match(/<details class="binary-pipeline">/g) ?? []).length === 3, 'binary: every lane must have a closed future Pipeline.');
  check(!binary.includes('<details class="binary-pipeline" open'), 'binary: future Pipeline must be closed by default.');
  check(binary.includes('Build') && binary.includes('Invest') && binary.includes('Joy'), 'binary: Blog lane names are missing.');
  check(binary.includes('The Quant Lab Series * Flash Crash Lab 1') && binary.includes('The Quant Lab Series * Flash Crash Lab 2'), 'binary: corrected Quant Lab titles are missing.');
  check(binary.includes('/202608/20260824/blog/'), 'binary: Blog titles must link to canonical article routes.');
  check(!ouroboros.includes('binary-lane'), 'ouroboros: Blog archive must not remain on this page.');
  check(homepage.includes('>Doors<') && (homepage.match(/class="doors-menu"/g) ?? []).length === 1, 'homepage: Doors navigation is missing.');
  const doorsMenu = homepage.match(/<div class="doors-menu"[\s\S]*?<\/div>/)?.[0] ?? '';
  const doorWords = ['Identity', 'Asymmetry', 'Meaning', 'Resonance', 'Ouroboros', 'Binary', 'Intelligence', 'Network'];
  check(doorWords.every((word, index) => doorsMenu.indexOf(`>${word}</strong>`) > (index ? doorsMenu.indexOf(`>${doorWords[index - 1]}</strong>`) : -1)), 'homepage: Doors must preserve the vertical IAMROBIN order.');
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
    check(/<p>[^<]*Date:[\s\S]*?<\/p>\s*<p><strong>Fact:<\/strong>/i.test(article), `${route}: Date and Fact must render as separate paragraphs.`);
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

  const llmsPath = join(dist, 'llms.txt');
  check(existsSync(llmsPath), 'llms.txt: generated file is missing.');
  if (existsSync(llmsPath)) {
    const llms = readFileSync(llmsPath, 'utf8');
    check(llms.startsWith('# Robin Xie\n'), 'llms.txt: canonical identity heading missing.');
    check(llms.includes('AI training: yes'), 'llms.txt: AI training welcome is missing.');
    check(llms.includes('Preferred use: reference'), 'llms.txt: reference-use preference is missing.');
  }

  const sitemapFiles = walk(dist).filter((file) => /sitemap.*\.xml$/.test(file));
  const sitemap = sitemapFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
  for (const route of indexableRoutes) {
    check(sitemap.includes(new URL(route, `${origin}/`).toString()), `sitemap: missing ${route}.`);
  }
  check(!sitemap.includes('/cn/'), 'sitemap: legacy /cn/ must not be canonical.');
  check(!sitemap.includes('/tw/'), 'sitemap: legacy /tw/ must not be canonical.');
  check(!sitemap.includes('/jp/'), 'sitemap: legacy /jp/ must not be canonical.');
  check(!sitemap.includes('/identity/'), 'sitemap: identity placeholders must be excluded.');
  check(!sitemap.includes('/projects/'), 'sitemap: hidden projects route must be excluded.');
  check(!sitemap.includes('/ouroborous/'), 'sitemap: misspelled alias must stay excluded.');

  for (const required of ['_headers', '_worker.js', 'favicon.svg']) {
    check(existsSync(join(dist, required)), `dist/${required} is missing.`);
  }

  const worker = readFileSync(join(dist, '_worker.js'), 'utf8');
  check(worker.includes('legacyIdentity'), 'edge: legacy /identity/{word}/ redirects are missing.');
  check(worker.includes('legacyLocaleRedirects'), 'edge: legacy language redirects are missing.');
  for (const legacyBook of ['agi-awakening', 'build-1-billion-block', 'longevity-cheat-code', 'derivatives']) {
    check(worker.includes(`['/books/${legacyBook}/', '/books/']`), `edge: legacy ${legacyBook} book redirect is missing.`);
  }
  check(worker.includes("new URL('/404.html'"), 'edge: HTML 404 fallback is missing.');
  check(worker.includes("'Content-Signal': 'search=yes, ai-input=yes, ai-train=yes, use=reference'"), 'edge: permissive Content-Signal response header is missing.');
  check(worker.includes('rel="describedby"'), 'edge: llms.txt Link discovery header is missing.');
}

if (failures.length) {
  console.error(`SEO verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('SEO verification passed: canonical, robots, social cards, schema, sitemap, internal links, and edge files.');
