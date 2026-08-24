import { cp, mkdir, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../', import.meta.url);
const dist = new URL('../dist/', import.meta.url);
const client = new URL('../dist/client/', import.meta.url);
const server = new URL('../dist/server/', import.meta.url);

await mkdir(client, { recursive: true });

for (const entry of await readdir(dist, { withFileTypes: true })) {
  if (['.openai', 'client', 'server'].includes(entry.name)) continue;
  await cp(new URL(entry.name, dist), new URL(entry.name, client), {
    recursive: true,
  });
}

await mkdir(server, { recursive: true });

const worker = `function directoryIndexRequest(request) {
  const url = new URL(request.url);
  const tail = url.pathname.split('/').pop() ?? '';

  if (url.pathname.endsWith('/')) {
    url.pathname += 'index.html';
  } else if (!tail.includes('.')) {
    url.pathname += '/index.html';
  }

  return new Request(url, request);
}

export default {
  async fetch(request, env) {
    if (!env.ASSETS?.fetch) {
      return new Response('Site assets are unavailable.', { status: 503 });
    }

    const direct = await env.ASSETS.fetch(request);
    if (direct.status !== 404) return direct;

    return env.ASSETS.fetch(directoryIndexRequest(request));
  },
};
`;

await writeFile(new URL('index.js', server), worker);

console.log(`Prepared Sites bundle in ${join(root.pathname, 'dist')}`);
