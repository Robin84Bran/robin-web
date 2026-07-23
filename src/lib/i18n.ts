export type SiteLocale = 'en' | 'cn' | 'tw' | 'jp';

export interface SeoAlternate {
  hreflang: 'en' | 'zh-Hans' | 'zh-Hant' | 'ja';
  path: string;
}

const mirroredBasePaths = new Set([
  '/',
  '/about/',
  '/books/',
  '/writing/',
  '/projects/',
  '/now/',
  '/contact/',
  '/books/agi-awakening/',
  '/books/build-1-billion-block/',
  '/books/longevity-cheat-code/',
  '/books/derivatives/',
]);

export function normalizePath(pathname: string) {
  const basePath = pathname.split(/[?#]/, 1)[0] || '/';
  const ensuredLeadingSlash = basePath.startsWith('/') ? basePath : `/${basePath}`;
  const collapsed = ensuredLeadingSlash.replace(/\/{2,}/g, '/');

  if (collapsed === '/') {
    return '/';
  }

  return collapsed.endsWith('/') ? collapsed : `${collapsed}/`;
}

export function getLocaleFromPath(pathname: string): SiteLocale {
  const normalized = normalizePath(pathname);

  if (normalized.startsWith('/cn/')) {
    return 'cn';
  }

  if (normalized.startsWith('/tw/')) {
    return 'tw';
  }

  if (normalized.startsWith('/jp/')) {
    return 'jp';
  }

  return 'en';
}

export function stripLocalePrefix(pathname: string) {
  const normalized = normalizePath(pathname);
  const localePrefix = ['/cn/', '/tw/', '/jp/'].find((prefix) => normalized.startsWith(prefix));

  if (localePrefix && normalized === localePrefix) {
    return '/';
  }

  return localePrefix ? normalized.slice(3) : normalized;
}

function hasMirroredRoute(pathname: string) {
  return mirroredBasePaths.has(stripLocalePrefix(pathname));
}

export function getLocalizedPath(pathname: string, targetLocale: SiteLocale) {
  if (targetLocale === 'tw' || targetLocale === 'jp') {
    return `/${targetLocale}/`;
  }

  if (!hasMirroredRoute(pathname)) {
    return targetLocale === 'cn' ? '/cn/' : '/';
  }

  const basePath = stripLocalePrefix(pathname);

  if (targetLocale === 'en') {
    return basePath;
  }

  return basePath === '/' ? '/cn/' : `/cn${basePath}`;
}

export function getLanguageSwitchTargets(pathname: string) {
  const locale = getLocaleFromPath(pathname);

  return {
    locale,
    en: getLocalizedPath(pathname, 'en'),
    cn: getLocalizedPath(pathname, 'cn'),
    tw: getLocalizedPath(pathname, 'tw'),
    jp: getLocalizedPath(pathname, 'jp'),
  };
}

export function getSeoAlternates(pathname: string): SeoAlternate[] {
  const basePath = stripLocalePrefix(pathname);

  if (basePath === '/') {
    return [
      { hreflang: 'en', path: '/' },
      { hreflang: 'zh-Hans', path: '/cn/' },
      { hreflang: 'zh-Hant', path: '/tw/' },
      { hreflang: 'ja', path: '/jp/' },
    ];
  }

  if (mirroredBasePaths.has(basePath)) {
    return [
      { hreflang: 'en', path: basePath },
      { hreflang: 'zh-Hans', path: `/cn${basePath}` },
    ];
  }

  return [];
}
