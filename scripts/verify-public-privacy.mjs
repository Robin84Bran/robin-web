import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { extname, join, relative, resolve } from 'node:path';

const root = resolve(new URL('..', import.meta.url).pathname);
const publicRoots = ['src/content', 'src/data', 'public'];
const textExtensions = new Set(['.astro', '.html', '.json', '.md', '.mdx', '.txt', '.yaml', '.yml']);
const forbidden = [
  { label: 'private sourceThread field', pattern: /^sourceThread:\s*.+$/m },
  { label: 'private source_thread field', pattern: /^source_thread:\s*.+$/m },
  { label: 'private ChatGPT conversation URL', pattern: /https?:\/\/(?:chatgpt\.com|chat\.openai\.com)\/c\//i },
];

function filesBelow(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = join(directory, entry.name);
    return entry.isDirectory() ? filesBelow(target) : [target];
  });
}

const violations = [];
const olympicsPath = join(root, 'src', 'data', 'model-olympics.json');
if (existsSync(olympicsPath)) {
  const payload = readFileSync(olympicsPath, 'utf8').toLowerCase();
  for (const token of ['chat_url', 'codex_thread_id', 'spot_target_nav_pct', 'perpetual_target_notional_pct', 'holdings', 'orders', 'rationale', 'robin']) {
    if (payload.includes(token)) violations.push(`src/data/model-olympics.json: forbidden ${token}`);
  }
}
for (const publicRoot of publicRoots) {
  for (const file of filesBelow(join(root, publicRoot))) {
    if (!textExtensions.has(extname(file).toLowerCase())) continue;
    const contents = readFileSync(file, 'utf8');
    for (const rule of forbidden) {
      if (rule.pattern.test(contents)) violations.push(`${relative(root, file)}: ${rule.label}`);
    }
  }
}

if (violations.length > 0) {
  console.error(`Public privacy check failed:\n${violations.map((item) => `- ${item}`).join('\n')}`);
  process.exit(1);
}

console.log('Public privacy check PASS: no private conversation pointers in publishable sources.');
