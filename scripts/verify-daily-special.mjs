import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const field = (text, key) => text.split('---')[1]?.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))?.[1]?.trim().replace(/^["']|["']$/g, '');
export function verifySpecial(root) {
  const errors = [];
  const directory = join(root, 'src/content/daily-special');
  const receipts = JSON.parse(readFileSync(join(root, 'src/data/daily-special-receipts.json'), 'utf8'));
  const seen = new Set();
  for (const receipt of receipts) {
    const date = String(receipt.date).replaceAll('-', '');
    if (seen.has(date)) errors.push(`${date}: only one Special per day`);
    seen.add(date);
    if (!/^\d{8}$/.test(date) || ![1, 2, 3, 4, 6, 7, 8].includes(receipt.signal)
        || !/^[a-f0-9]{40}$/.test(receipt.commit) || !/^[a-f0-9]{64}$/.test(receipt.artifactSha256)
        || !Number.isFinite(Date.parse(receipt.verifiedAt)) || receipt.scope !== 'RESEARCH_ARTIFACT_ONLY'
        || receipt.url !== `https://iamrobin.ai/ouroboros/${date.slice(0, 6)}/${date}/special/`) {
      errors.push(`${date}: invalid completion receipt`);
      continue;
    }
    const artifact = join(root, `public/daily-special/${date}/artifact.md`);
    if (!existsSync(artifact) || hash(readFileSync(artifact)) !== receipt.artifactSha256) errors.push(`${date}: completion needs matching artifact bytes`);
    if (!existsSync(join(directory, date, 'article.md'))) errors.push(`${date}: completion needs canonical article`);
  }
  if (!existsSync(directory)) return errors;
  for (const item of readdirSync(directory, { withFileTypes: true }).filter((item) => item.isDirectory())) {
    const date = item.name;
    if (!/^\d{8}$/.test(date)) { errors.push(`${date}: invalid date folder`); continue; }
    const artifact = join(root, `public/daily-special/${date}/artifact.md`);
    const sha = existsSync(artifact) ? hash(readFileSync(artifact)) : null;
    let signal;
    for (const [file, locale, suffix] of [['article', 'en', ''], ['zh-hans', 'zh-Hans', 'zh-hans/'], ['zh-hant', 'zh-Hant', 'zh-hant/'], ['ja', 'ja', 'ja/']]) {
      const path = join(directory, date, `${file}.md`);
      if (!existsSync(path)) { errors.push(`${date}: missing ${file}`); continue; }
      const text = readFileSync(path, 'utf8');
      const currentSignal = Number(field(text, 'sourceSignal'));
      signal ??= currentSignal;
      if (![1, 2, 3, 4, 6, 7, 8].includes(currentSignal) || currentSignal !== signal) errors.push(`${date}: invalid or inconsistent signal`);
      if (!sha || field(text, 'artifactSha256') !== sha) errors.push(`${date}/${file}: artifact digest mismatch`);
      if (field(text, 'inLanguage') !== locale || field(text, 'translationReview') !== 'PASS') errors.push(`${date}/${file}: unreviewed language`);
      if (field(text, 'canonical') !== `https://iamrobin.ai/ouroboros/${date.slice(0, 6)}/${date}/special/${suffix}`) errors.push(`${date}/${file}: canonical mismatch`);
    }
    const receipt = receipts.find((r) => r.date.replaceAll('-', '') === date);
    if (receipt && receipt.signal !== signal) errors.push(`${date}: receipt signal mismatch`);
    // An owner-authorized editorial companion is not a second selected action.
    // Keep the original completion receipt and its original bytes authoritative.
    for (const revision of readdirSync(join(directory, date), {withFileTypes:true}).filter((x)=>x.isDirectory())) {
      const slug = revision.name;
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || ['zh-hans','zh-hant','ja'].includes(slug)) { errors.push(`${date}: invalid companion slug`); continue; }
      const revisedArtifact = join(root, `public/daily-special/${date}/${slug}/artifact.md`);
      const revisedSha = existsSync(revisedArtifact) ? hash(readFileSync(revisedArtifact)) : null;
      for (const [file,locale,suffix] of [['article','en',''],['zh-hans','zh-Hans','zh-hans/'],['zh-hant','zh-Hant','zh-hant/'],['ja','ja','ja/']]) {
        const path = join(directory,date,slug,`${file}.md`);
        if (!existsSync(path)) { errors.push(`${date}/${slug}: missing ${file}`); continue; }
        const text = readFileSync(path,'utf8');
        if (field(text,'editionSlug')!==slug || field(text,'originalArticle')!==`https://iamrobin.ai/ouroboros/${date.slice(0,6)}/${date}/special/`) errors.push(`${date}/${slug}: missing original relationship`);
        if (Number(field(text,'sourceSignal'))!==signal || field(text,'artifactSha256')!==revisedSha || !revisedSha) errors.push(`${date}/${slug}: inconsistent signal or artifact`);
        if (field(text,'inLanguage')!==locale || field(text,'translationReview')!=='PASS') errors.push(`${date}/${slug}: unreviewed language`);
        if (field(text,'canonical')!==`https://iamrobin.ai/ouroboros/${date.slice(0,6)}/${date}/special/${slug}/${suffix}`) errors.push(`${date}/${slug}: canonical mismatch`);
      }
    }
  }
  return errors;
}
if (resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const errors = verifySpecial(process.cwd());
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log('Daily Special gates PASS: complete editions, artifact hashes, receipt boundaries.');
}
