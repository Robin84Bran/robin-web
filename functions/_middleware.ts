interface PagesContext {
  request: Request;
  next: () => Promise<Response>;
}

const countryLocales: Record<string, string> = {
  CN: '/cn/',
  HK: '/tw/',
  MO: '/tw/',
  TW: '/tw/',
  JP: '/jp/',
};

export async function onRequest(context: PagesContext) {
  const url = new URL(context.request.url);

  if (url.pathname !== '/') {
    return context.next();
  }

  const cookie = context.request.headers.get('cookie') ?? '';
  const hasPreference = /(?:^|;\s*)robin_locale=(?:en|cn|tw|jp)(?:;|$)/.test(cookie);

  if (hasPreference) {
    return context.next();
  }

  const country = (context.request as Request & { cf?: { country?: string } }).cf?.country;
  const destination = country ? countryLocales[country] : undefined;

  return destination ? Response.redirect(new URL(destination, url), 302) : context.next();
}
