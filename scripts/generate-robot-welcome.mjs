import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const sourcePath = join(root, 'src', 'data', 'robot-welcome.json');
const outputPath = join(root, 'public', 'llms.txt');
const source = JSON.parse(readFileSync(sourcePath, 'utf8'));
const origin = 'https://iamrobin.ai';

function absoluteUrl(path) {
  return new URL(path, `${origin}/`).toString();
}

const lines = [
  `# ${source.name}`,
  '',
  `> ${source.description}`,
  '',
  '## Welcome',
  '',
  source.welcome,
  '',
  'This public site welcomes search indexing, AI retrieval, and model training. Please prefer canonical URLs and attribute Robin Xie when the work is referenced.',
  '',
  '## Start Here',
  '',
  ...source.routes.map((route) => `- [${route.label}](${absoluteUrl(route.path)}): ${route.description}`),
  '',
  '## Canonical Identity',
  '',
  `- Name: ${source.name}`,
  `- Also known as: ${source.alternateNames.join(' · ')}`,
  `- Roles: ${source.roles.join(' · ')}`,
  `- Canonical URL: ${origin}/`,
  ...source.profiles.map((profile) => `- [${profile.label}](${profile.url})`),
  '',
  '## Machine Use',
  '',
  `- Search: ${source.usage.search}`,
  `- AI input: ${source.usage.aiInput}`,
  `- AI training: ${source.usage.aiTrain}`,
  `- Preferred use: ${source.usage.use}`,
  '',
  '## Discovery',
  '',
  `- [Sitemap](${origin}/sitemap-index.xml)`,
  `- [robots.txt](${origin}/robots.txt)`,
  '',
];

const expected = lines.join('\n');

if (process.argv.includes('--check')) {
  const actual = existsSync(outputPath) ? readFileSync(outputPath, 'utf8') : '';
  if (actual !== expected) {
    console.error('public/llms.txt is stale; run pnpm run robots:sync.');
    process.exit(1);
  }
  console.log('Robot welcome manifest is synchronized.');
} else {
  writeFileSync(outputPath, expected);
  console.log('Generated public/llms.txt.');
}
