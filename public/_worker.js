const canonicalHost = 'iamrobin.ai';

const countryLocales = {
  CN: '/cn/',
  HK: '/tw/',
  MO: '/tw/',
  TW: '/tw/',
  JP: '/jp/',
};

const securityHeaders = {
  'Content-Security-Policy':
    "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests",
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

function redirect(url, status) {
  return new Response(null, {
    status,
    headers: {
      ...securityHeaders,
      Location: url.toString(),
    },
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isProductionHost =
      url.hostname === canonicalHost || url.hostname === `www.${canonicalHost}`;

    if (isProductionHost && (url.protocol !== 'https:' || url.hostname !== canonicalHost)) {
      url.protocol = 'https:';
      url.hostname = canonicalHost;
      url.port = '';
      return redirect(url, 301);
    }

    if (url.pathname === '/') {
      const cookie = request.headers.get('cookie') ?? '';
      const hasPreference = /(?:^|;\s*)robin_locale=(?:en|cn|tw|jp)(?:;|$)/.test(cookie);
      const destination = hasPreference ? undefined : countryLocales[request.cf?.country];

      if (destination) {
        url.pathname = destination;
        return redirect(url, 302);
      }
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);

    for (const [name, value] of Object.entries(securityHeaders)) {
      headers.set(name, value);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
