import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { join } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('/Users/headlessnick/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const baseUrl = process.argv[2] ?? 'http://127.0.0.1:4325';
const route = process.argv[3] ?? '/ouroboros/202608/20260820/action_item/';
const evidenceName = process.argv[4] ?? route.replace(/^\/+|\/+$/g, '').replaceAll('/', '-');
const output = join(process.cwd(), 'evidence', evidenceName);
mkdirSync(output, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
});
const results = [];
for (const viewport of [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => consoleErrors.push(error.message));
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
  for (const image of await page.locator('img').all()) await image.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => [...document.images].every((image) => image.complete), null, { timeout: 10_000 });
  await page.screenshot({ path: join(output, `${viewport.name}.png`), fullPage: true });
  const facts = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector('h1')?.textContent?.replace(/\s+/g, ' ').trim(),
    articleSchemas: [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((node) => JSON.parse(node.textContent ?? 'null'))
      .flatMap((node) => node?.['@graph'] ?? (Array.isArray(node) ? node : [node]))
      .filter((node) => node?.['@type'] === 'Article').length,
    personSchemas: [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((node) => JSON.parse(node.textContent ?? 'null'))
      .flatMap((node) => node?.['@graph'] ?? (Array.isArray(node) ? node : [node]))
      .filter((node) => node?.['@type'] === 'Person').length,
    canonical: document.querySelector('link[rel="canonical"]')?.href,
    viewportWidth: document.documentElement.clientWidth,
    contentWidth: document.documentElement.scrollWidth,
    imageComplete: [...document.images].every((image) => image.complete && image.naturalWidth > 0),
  }));
  results.push({
    viewport,
    httpStatus: response?.status() ?? null,
    consoleErrors,
    ...facts,
    noHorizontalOverflow: facts.contentWidth <= facts.viewportWidth,
  });
  await page.close();
}
await browser.close();

const report = { route, checkedAt: new Date().toISOString(), results };
writeFileSync(join(output, 'qa.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));

if (results.some((result) =>
  result.httpStatus !== 200
  || result.consoleErrors.length
  || !result.noHorizontalOverflow
  || !result.imageComplete
  || result.articleSchemas !== 1
  || result.personSchemas !== 1
)) process.exitCode = 1;
