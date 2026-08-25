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
