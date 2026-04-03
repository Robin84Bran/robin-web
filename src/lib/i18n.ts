export type SiteLocale = 'en' | 'cn';

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
  return normalizePath(pathname).startsWith('/cn/') ? 'cn' : 'en';
}

export function stripLocalePrefix(pathname: string) {
  const normalized = normalizePath(pathname);

  if (normalized === '/cn/') {
    return '/';
  }

  return normalized.startsWith('/cn/') ? normalized.slice(3) : normalized;
}

function hasMirroredRoute(pathname: string) {
  return mirroredBasePaths.has(stripLocalePrefix(pathname));
}

export function getLocalizedPath(pathname: string, targetLocale: SiteLocale) {
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
  };
}
