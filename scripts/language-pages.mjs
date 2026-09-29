import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { languageMenuMarkup } from '../public/language/menu.mjs';

// Static HTML games/maps do not pass through BaseLayout. Cover them (and any
// future standalone page) during the same Astro build; do not alter source art.
export default function languagePages() {
  return { name: 'same-page-language', hooks: {
    'astro:build:done': async ({ dir }) => {
      async function visit(folder) {
        for (const entry of await readdir(folder, { withFileTypes: true })) {
          const file = path.join(folder, entry.name);
          if (entry.isDirectory()) await visit(file);
          else if (entry.name.endsWith('.html')) {
            let html = await readFile(file, 'utf8');
            if (html.includes('src="/language/client.mjs"')) continue;
            html = html.replace(/<html\b([^>]*)>/i, (tag, attrs) => `${tag.slice(0, -1)} data-original-language="${attrs.match(/\blang=["']([^"']+)["']/i)?.[1] || 'en'}">`);
            html = html.replace(/<\/head>/i, '<link rel="stylesheet" href="/language/menu.css"><script type="module" src="/language/client.mjs"></script></head>');
            html = html.replace(/<\/body>/i, `${languageMenuMarkup().replace('class="site-language ', 'class="site-language site-language--floating ' )}</body>`);
            await writeFile(file, html);
          }
        }
      }
      await visit(fileURLToPath(dir));
    },
  } };
}
