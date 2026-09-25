// Additional source-hash-keyed stories never consume an owner's M/W/F slot.
export function appendDerivatives(slots, manifest, start, end, flavor) {
  const seen = new Set();
  const urls = new Set((manifest.articles ?? []).map(a => a.canonicalUrl).filter(Boolean));
  for (const article of manifest.derivatives ?? []) {
    const hash = article.sourceArtifactSha256;
    if (!/^[a-f0-9]{64}$/.test(hash ?? '')) throw new Error('Derivative needs its source Special SHA-256');
    if (seen.has(hash)) throw new Error('Duplicate derivative source Special');
    seen.add(hash);
    if (!article.canonicalUrl || urls.has(article.canonicalUrl)) throw new Error('Derivative URL duplicates an owner article or another derivative');
    urls.add(article.canonicalUrl);
    const key = article.date?.slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key ?? '') || !['BUILD', 'INVEST', 'JOY'].includes(article.lane)) throw new Error('Invalid derivative date/lane');
    if (key < start || key > end) continue;
    const date = new Date(`${key}T12:00:00`);
    const live = article.status === 'PUBLISHED' && article.archiveStatus === 'PRESENT';
    const base = {date, key, title: article.title, canonicalUrl: article.canonicalUrl ?? '', mediumUrl: article.mediumUrl ?? '', linkedinUrl: article.linkedinUrl ?? '', sourceArtifactSha256: hash};
    slots.push(flavor === 'calendar'
      ? {...base, day: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date.getDay()], lane: article.lane, state: live ? 'LIVE' : 'PLANNED', note: 'Additional Daily Special story; social links only after publication'}
      : {...base, weekday: ['Su','M','Tu','W','Th','F','Sa'][date.getDay()], category: article.lane[0] + article.lane.slice(1).toLowerCase(), status: live ? 'PRESENT' : 'PIPELINE'});
  }
  return slots.sort((a,b) => a.key.localeCompare(b.key));
}

export function rowsByDate(slots, firstRow) {
  const result = new Map();
  slots.forEach((slot, index) => result.set(slot.key, [...(result.get(slot.key) ?? []), firstRow + index]));
  return result;
}
