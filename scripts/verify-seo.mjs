import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = join(root, 'dist');
const origin = 'https://iamrobin.ai';
const stablePersonId = `${origin}/#person`;
const failures = [];

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
  const decoded = decodeURIComponent(pathname);
  const direct = join(dist, decoded.replace(/^\//, ''));
  if (existsSync(direct) && !statSync(direct).isDirectory()) return direct;
  const index = join(direct, 'index.html');
  return existsSync(index) ? index : undefined;
}

function attributeValues(html, attribute) {
  const pattern = new RegExp(`\\b${attribute}=["']([^"']+)["']`, 'gi');
  return [...html.matchAll(pattern)].map((match) => match[1].replaceAll('&amp;', '&'));
}

function anchorLinks(html) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].flatMap((match) => {
    const href = match[1].match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (!href) return [];

    return [
      {
        href: href.replaceAll('&amp;', '&'),
        label: match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
      },
    ];
  });
}

function schemaNodes(schema) {
  if (Array.isArray(schema)) return schema.flatMap(schemaNodes);
  if (!schema || typeof schema !== 'object') return [];
  if (Array.isArray(schema['@graph'])) return schema['@graph'].flatMap(schemaNodes);
  return [schema];
}

function visitObjects(value, callback) {
  if (!value || typeof value !== 'object') return;
  callback(value);
  for (const child of Object.values(value)) visitObjects(child, callback);
}

function relativeLuminance(hex) {
  const channels = [1, 3, 5]
    .map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(foreground, background) {
  const values = [relativeLuminance(foreground), relativeLuminance(background)].sort(
    (left, right) => right - left,
  );
  return (values[0] + 0.05) / (values[1] + 0.05);
}

check(existsSync(dist), 'dist/ is missing; run the production build first.');

if (existsSync(dist)) {
  const files = walk(dist);
  const htmlFiles = files.filter((file) => file.endsWith('.html') && relative(dist, file) !== '404.html');
  const pageByRoute = new Map(htmlFiles.map((file) => [routeFromHtml(file), file]));
  const graph = new Map();
  const schemasByRoute = new Map();

  for (const [route, file] of pageByRoute) {
    const html = readFileSync(file, 'utf8');
    const canonicals = [...html.matchAll(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/gi)].map(
      (match) => match[1],
    );
    const expectedCanonical = new URL(route, `${origin}/`).toString();
    check(canonicals.length === 1, `${route}: expected exactly one canonical link.`);
    check(canonicals[0] === expectedCanonical, `${route}: canonical is not self-referential and absolute.`);
    check(
      /<meta\s+name=["']robots["']\s+content=["']index, follow["']/i.test(html),
      `${route}: expected index, follow metadata.`,
    );

    const jsonLdBlocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    const routeSchemas = [];
    for (const [, json] of jsonLdBlocks) {
      try {
        routeSchemas.push(...schemaNodes(JSON.parse(json)));
      } catch (error) {
        failures.push(`${route}: invalid JSON-LD (${error.message}).`);
      }
    }
    schemasByRoute.set(route, routeSchemas);

    const linkedRoutes = new Set();
    for (const href of attributeValues(html, 'href')) {
      if (/^(?:mailto:|tel:|javascript:|data:)/i.test(href)) continue;

      let target;
      try {
        target = new URL(href, new URL(route, `${origin}/`));
      } catch {
        failures.push(`${route}: invalid href ${href}`);
        continue;
      }

      if (target.origin !== origin) continue;
      const targetFile = fileForPath(target.pathname);
      check(Boolean(targetFile), `${route}: broken internal link to ${target.pathname}`);

      if (targetFile?.endsWith('.html')) {
        linkedRoutes.add(routeFromHtml(targetFile));
      }
    }
    graph.set(route, linkedRoutes);
  }

  const expectedProjects = [
    '/projects/robinos/',
    '/projects/quant-lab/',
    '/projects/watts-to-satoshi/',
    '/projects/childrens-ai-education-apps/',
  ];
  for (const route of expectedProjects) {
    check(pageByRoute.has(route), `${route}: expected project detail page is missing.`);
  }

  const homepageLocales = ['/', '/cn/', '/tw/', '/jp/'];
  const requiredAlternates = new Map([
    ['en', `${origin}/`],
    ['zh-Hans', `${origin}/cn/`],
    ['zh-Hant', `${origin}/tw/`],
    ['ja', `${origin}/jp/`],
    ['x-default', `${origin}/`],
  ]);
  for (const route of homepageLocales) {
    const html = readFileSync(pageByRoute.get(route), 'utf8');
    const alternates = new Map(
      [...html.matchAll(/<link\s+rel=["']alternate["']\s+hreflang=["']([^"']+)["']\s+href=["']([^"']+)["']/gi)].map(
        (match) => [match[1], match[2]],
      ),
    );
    for (const [language, href] of requiredAlternates) {
      check(alternates.get(language) === href, `${route}: missing or incorrect ${language} alternate.`);
    }
  }

  const expectedPrimaryLinks = new Map([
    ['/', [
      { label: 'Projects', href: '/projects/' },
      { label: 'Portfolio', href: '/portfolio/' },
      { label: 'Press', href: '/now/' },
      { label: 'Books', href: '/books/' },
    ]],
    ['/cn/', [
      { label: '项目', href: '/cn/projects/' },
      { label: '作品', href: '/portfolio/' },
      { label: '报道', href: '/cn/now/' },
      { label: '书籍', href: '/cn/books/' },
    ]],
    ['/tw/', [
      { label: '專案', href: '/tw/#projects' },
      { label: '作品', href: '/portfolio/' },
      { label: '報導', href: '/tw/#press' },
      { label: '書籍', href: '/tw/#books' },
    ]],
    ['/jp/', [
      { label: 'プロジェクト', href: '/jp/#projects' },
      { label: 'ポートフォリオ', href: '/portfolio/' },
      { label: 'プレス', href: '/jp/#press' },
      { label: '書籍', href: '/jp/#books' },
    ]],
  ]);
  const requiredFooterLinks = new Map([
    ['/', ['/about/', '/writing/', '/contact/', 'https://github.com/Robin84Bran/']],
    ['/cn/', ['/cn/about/', '/cn/writing/', '/cn/contact/', 'https://github.com/Robin84Bran/']],
    ['/tw/', ['/tw/#about', '/writing/', '/contact/', 'https://github.com/Robin84Bran/']],
    ['/jp/', ['/jp/#about', '/writing/', '/contact/', 'https://github.com/Robin84Bran/']],
  ]);

  for (const route of homepageLocales) {
    const html = readFileSync(pageByRoute.get(route), 'utf8');
    const header = html.match(/<header\b[\s\S]*?<\/header>/i)?.[0] ?? '';
    const primaryNav = header.match(/<nav\b[^>]*aria-label=["']Primary["'][^>]*>[\s\S]*?<\/nav>/i)?.[0] ?? '';
    const primaryLinks = anchorLinks(primaryNav);
    const expectedLinks = expectedPrimaryLinks.get(route);
    check(
      primaryLinks.length === expectedLinks.length &&
        primaryLinks.every(
          (link, index) => link.label === expectedLinks[index].label && link.href === expectedLinks[index].href,
        ),
      `${route}: primary navigation is not the required four-link set in the required order.`,
    );

    const footer = html.match(/<footer\b[\s\S]*?<\/footer>/i)?.[0] ?? '';
    const footerHrefs = new Set(anchorLinks(footer).map((link) => link.href));
    for (const href of requiredFooterLinks.get(route)) {
      check(footerHrefs.has(href), `${route}: visible footer/site index is missing ${href}.`);
    }
    check(
      !/\bhidden(?:\s|=|>)|\bsr-only\b|display\s*:\s*none|visibility\s*:\s*hidden/i.test(footer),
      `${route}: footer/site index contains hidden-link styling or attributes.`,
    );
  }

  const expectedAlternateNames = [
    'Ms. Robin Xie',
    'Bin “Robin” Xie',
    '谢玢',
    '謝玢',
    'nanobin',
    'ロビン・シエ',
  ];
  const expectedSameAs = [
    'https://www.tideisun.com/en/robin',
    'https://www.linkedin.com/in/nanobin',
    'https://github.com/Robin84Bran/',
    'https://x.com/nanobin1984',
    'https://medium.com/@iamrobin-ai',
    'https://app.ens.domains/iamrobin.eth',
  ];
  const allSchemas = [...schemasByRoute.values()].flat();
  const personSchemas = allSchemas.filter((schema) => schema['@type'] === 'Person');
  check(personSchemas.length > 0, 'No canonical Person schema was emitted.');
  for (const person of personSchemas) {
    check(person['@id'] === stablePersonId, 'A Person schema does not use the stable Person @id.');
    check(person.name === 'Robin Xie', 'Person name is not Robin Xie.');
    check(person.honorificPrefix === 'Ms.', 'Person honorificPrefix is not Ms.');
    check(
      JSON.stringify(person.alternateName) === JSON.stringify(expectedAlternateNames),
      'Person alternateName values are incomplete or out of order.',
    );
    check(person.pronouns === 'she/her', 'Person pronouns are not she/her.');
    check(
      typeof person.disambiguatingDescription === 'string' && person.disambiguatingDescription.length > 40,
      'Person disambiguatingDescription is missing or too short.',
    );
    check(
      JSON.stringify(person.sameAs) === JSON.stringify(expectedSameAs),
      'Person sameAs links are incomplete or out of order.',
    );
  }
  for (const schema of allSchemas) {
    visitObjects(schema, (node) => {
      if (typeof node['@id'] === 'string' && node['@id'].endsWith('#person')) {
        check(node['@id'] === stablePersonId, `Schema reference ${node['@id']} does not use the stable Person @id.`);
      }
    });
  }

  const reached = new Set(['/']);
  const queue = ['/'];
  while (queue.length) {
    const current = queue.shift();
    for (const linked of graph.get(current) ?? []) {
      if (!reached.has(linked)) {
        reached.add(linked);
        queue.push(linked);
      }
    }
  }

  const sitemap = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
  const sitemapRoutes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => new URL(match[1]).pathname,
  );
  for (const route of sitemapRoutes) {
    check(pageByRoute.has(route), `${route}: sitemap URL has no generated HTML page.`);
    check(reached.has(route), `${route}: sitemap page is not reachable from the homepage link graph.`);
  }

  const robots = readFileSync(join(dist, 'robots.txt'), 'utf8');
  for (const required of [
    'User-agent: OAI-SearchBot\nAllow: /',
    'User-agent: GPTBot\nDisallow: /',
    'User-agent: Google-Extended\nDisallow: /',
    `Sitemap: ${origin}/sitemap-index.xml`,
  ]) {
    check(robots.includes(required), `robots.txt is missing policy block: ${required.split('\n')[0]}`);
  }

  check(!existsSync(join(dist, 'scripts', 'locale-preference.js')), 'Removed locale redirect script still exists in dist/.');

  for (const source of ['functions/_middleware.ts', 'public/_worker.js']) {
    const content = readFileSync(join(root, source), 'utf8');
    check(!content.includes('request.cf?.country'), `${source}: country-based locale routing remains.`);
    check(!content.includes('countryLocales'), `${source}: country locale map remains.`);
  }

  const worker = (await import(pathToFileURL(join(root, 'public/_worker.js')).href)).default;
  const assetEnvironment = {
    ASSETS: {
      fetch: async () => new Response('ok', { status: 200 }),
    },
  };
  for (const country of ['CN', 'HK', 'MO', 'TW', 'JP', 'US', undefined]) {
    const request = new Request(`${origin}/`);
    request.cf = country ? { country } : {};
    const response = await worker.fetch(request, assetEnvironment);
    check(response.status === 200, `Homepage redirected for country context ${country ?? 'none'}.`);
    check(!response.headers.has('location'), `Homepage emitted a location header for ${country ?? 'none'}.`);
  }
  const wwwRedirect = await worker.fetch(new Request('https://www.iamrobin.ai/projects/'), assetEnvironment);
  check(wwwRedirect.status === 301, 'www host no longer redirects permanently to the apex host.');
  check(
    wwwRedirect.headers.get('location') === `${origin}/projects/`,
    'www redirect no longer preserves the path on the apex host.',
  );

  const css = readFileSync(join(root, 'src/styles/global.css'), 'utf8');
  const token = (name) => css.match(new RegExp(`--${name}:\\s*(#[0-9a-f]{6})`, 'i'))?.[1];
  const canvas = token('color-canvas');
  for (const name of ['color-muted', 'color-accent-text']) {
    const color = token(name);
    check(Boolean(color && canvas), `${name}: missing six-digit text or canvas color token.`);
    if (color && canvas) {
      check(
        contrastRatio(color, canvas) >= 4.5,
        `${name}: text contrast against the canvas is below 4.5:1.`,
      );
    }
  }
  check(
    css.includes(':where(a, button, summary):focus-visible'),
    'Global visible keyboard focus rule is missing.',
  );

  const identityStrip = readFileSync(join(root, 'src/components/home/IdentityStrip.astro'), 'utf8');
  check(!identityStrip.includes('tabindex='), 'Non-interactive identity tiles remain in the tab order.');
  check(identityStrip.includes('<h2'), 'Identity tiles no longer expose persistent visible headings.');

  for (const route of ['/', '/about/']) {
    const html = readFileSync(pageByRoute.get(route), 'utf8');
    const phrase = 'Engineering is my core. Then systems, capital, media, and books began to grow.';
    check(html.split(phrase).length - 1 <= 1, `${route}: duplicated About opening remains.`);
  }
}

if (failures.length) {
  console.error(`SEO verification failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('SEO verification passed: routes, visible navigation, links, canonicals, hreflang, Person JSON-LD, sitemap, edge routing, crawler policy, contrast, and semantics.');
}
