#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');
const worker = read('public/_worker.js');
const headers = read('public/_headers');
const wrangler = read('wrangler.jsonc');

const requiredWorkerFragments = [
  'cloudflareWebAnalyticsToken',
  'https://static.cloudflareinsights.com/beacon.min.js',
  'https://cloudflareinsights.com',
  'new HTMLRewriter()',
  "request.method === 'GET'",
];

for (const fragment of requiredWorkerFragments) {
  if (!worker.includes(fragment)) throw new Error(`Worker observability contract is missing: ${fragment}`);
}

for (const fragment of ['https://static.cloudflareinsights.com', 'https://cloudflareinsights.com']) {
  if (!headers.includes(fragment)) throw new Error(`Static security headers are missing: ${fragment}`);
}

if (!/"invocation_logs"\s*:\s*false/.test(wrangler)) {
  throw new Error('Per-request Worker invocation logs must remain disabled.');
}

const forbiddenVisitorIdentifiers = [
  /console\.(?:log|info|debug)\s*\(/,
  /request\.headers\.get\(['"](?:cookie|cf-connecting-ip|x-forwarded-for|user-agent)['"]\)/i,
  /visitor[_-]?id/i,
];

for (const pattern of forbiddenVisitorIdentifiers) {
  if (pattern.test(worker)) throw new Error(`Visitor-identifying telemetry is forbidden: ${pattern}`);
}

process.stdout.write('Observability contract verified: aggregate Web Analytics, aggregate AI Crawl Control, no request-level visitor logging.\n');
