export type BlogLanguage = 'en' | 'zh-Hans' | 'zh-Hant' | 'ja';
export type BlogArchiveStatus = 'PRESENT' | 'PIPELINE';

const titleOverrides: Record<string, Record<BlogLanguage, string>> = {
  '2026-08-17': {
    en: 'The Quant Lab Series * Flash Crash Lab 1',
    'zh-Hans': '量化实验室系列 * 闪崩实验室 1',
    'zh-Hant': '量化實驗室系列 * 閃崩實驗室 1',
    ja: 'Quant Labシリーズ * フラッシュクラッシュ・ラボ 1',
  },
  '2026-08-24': {
    en: 'The Quant Lab Series * Flash Crash Lab 2',
    'zh-Hans': '量化实验室系列 * 闪崩实验室 2',
    'zh-Hant': '量化實驗室系列 * 閃崩實驗室 2',
    ja: 'Quant Labシリーズ * フラッシュクラッシュ・ラボ 2',
  },
};

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function currentHongKongDate(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Hong_Kong',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(now);
}

export function blogArchiveStatus(date: Date, asOf = currentHongKongDate()): BlogArchiveStatus {
  return isoDate(date) <= asOf ? 'PRESENT' : 'PIPELINE';
}

export function blogTitle(date: Date, language: BlogLanguage, fallback: string) {
  return titleOverrides[isoDate(date)]?.[language] ?? fallback;
}
