import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const dist = join(root, 'dist');
const origin = 'https://iamrobin.ai';
const failures = [];
const indexableRoutes = new Set(['/', '/portfolio/', '/books/']);

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
  const htmlFiles = walk(dist).filter((file) => file.endsWith('.html'));
  const routes = new Map(htmlFiles.map((file) => [routeFromHtml(file), file]));
  const articleRoutes = [...routes.keys()].filter((route) => /^\/ouroboros\/\d{6}\/\d{8}\/$/.test(route));
  for (const route of articleRoutes) indexableRoutes.add(route);
  check(routes.size === 12 + articleRoutes.length, `expected ${12 + articleRoutes.length} HTML routes, found ${routes.size}.`);

  for (const [route, file] of routes) {
    const html = readFileSync(file, 'utf8');
    const expectedCanonical = new URL(route, `${origin}/`).toString();
    const canonical = one(html, /<link\s+rel="canonical"\s+href="([^"]+)"/i);
    const robots = one(html, /<meta\s+name="robots"\s+content="([^"]+)"/i);
    check(canonical === expectedCanonical, `${route}: incorrect canonical.`);
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
  check(homepage.includes('"@type":"Person"'), 'homepage: Person schema missing.');
  check(homepage.includes('"@type":"WebSite"'), 'homepage: WebSite schema missing.');
  check(homepage.includes('"@type":"ProfilePage"'), 'homepage: ProfilePage schema missing.');
  check((books.match(/"@type":"Book"/g) ?? []).length === 4, 'books: expected four Book schemas.');
  check(portfolio.includes('"@type":"CollectionPage"'), 'portfolio: CollectionPage schema missing.');
  for (const route of articleRoutes) {
    const article = readFileSync(routes.get(route), 'utf8');
    check(article.includes('"@type":"Article"'), `${route}: Article schema missing.`);
    check(article.includes('"@type":"Person"'), `${route}: Person schema missing.`);
    check(/<meta\s+property="og:type"\s+content="article"/i.test(article), `${route}: og:type must be article.`);
  }

  const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
  check(robots.includes('Sitemap: https://iamrobin.ai/sitemap-index.xml'), 'robots.txt: sitemap declaration missing.');
  check(robots.includes('User-agent: OAI-SearchBot\nAllow: /'), 'robots.txt: OAI-SearchBot policy missing.');
  check(robots.includes('User-agent: GPTBot\nDisallow: /'), 'robots.txt: GPTBot policy missing.');

  const sitemapFiles = walk(dist).filter((file) => /sitemap.*\.xml$/.test(file));
  const sitemap = sitemapFiles.map((file) => readFileSync(file, 'utf8')).join('\n');
  for (const route of indexableRoutes) {
    check(sitemap.includes(new URL(route, `${origin}/`).toString()), `sitemap: missing ${route}.`);
  }
  check(!sitemap.includes('/identity/'), 'sitemap: identity placeholders must be excluded.');
  check(!sitemap.includes('/projects/'), 'sitemap: hidden projects route must be excluded.');

  for (const required of ['_headers', '_worker.js', 'favicon.svg']) {
    check(existsSync(join(dist, required)), `dist/${required} is missing.`);
  }
}

if (failures.length) {
  console.error(`SEO verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('SEO verification passed: canonical, robots, social cards, schema, sitemap, internal links, and edge files.');
