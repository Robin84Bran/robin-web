export function normalizeLanguage(lang) {
  return ({ 'zh-hans': 'zh-CN', 'zh-cn': 'zh-CN', 'zh-hant': 'zh-TW', 'zh-tw': 'zh-TW', 'ja-jp': 'ja', und: 'auto', '': 'auto' })[String(lang || '').toLowerCase()] || lang;
}
export function initialLanguage(source, saved, arcade = false) {
  if (arcade || saved === 'original') return source;
  return ['en', 'zh-CN', 'zh-TW', 'ja'].includes(saved) ? saved : 'en';
}
