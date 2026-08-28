const canonicalHost = 'iamrobin.ai';
const cloudflareWebAnalyticsToken = 'efadc722a7644992b696edf324783531';
const robotWelcomeHeaders = {
  'Content-Signal': 'search=yes, ai-input=yes, ai-train=yes, use=reference',
  Link: '<https://iamrobin.ai/llms.txt>; rel="describedby"',
};

const securityHeaders = {
  'Content-Security-Policy':
    "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self' https://cloudflareinsights.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests",
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=()',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Strict-Transport-Security': 'max-age=31536000',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

const embeddedMapSecurityHeaders = {
  ...securityHeaders,
  'Content-Security-Policy': securityHeaders['Content-Security-Policy'].replace(
    "frame-ancestors 'none'",
    "frame-ancestors 'self'",
  ),
  'X-Frame-Options': 'SAMEORIGIN',
};

class CloudflareWebAnalytics {
  element(element) {
    element.append(
      `<script id="cf-web-analytics" type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"${cloudflareWebAnalyticsToken}"}'></script>`,
      { html: true },
    );
  }
}

function redirect(url, status) {
  return new Response(null, {
    status,
    headers: { ...securityHeaders, Location: url.toString() },
  });
}

const legacyLocaleRedirects = new Map([
  ['/cn/', '/zh-hans/'],
  ['/cn/about/', '/zh-hans/about/'],
  ['/tw/', '/zh-hant/'],
  ['/tw/about/', '/zh-hant/about/'],
  ['/jp/', '/ja/'],
  ['/jp/about/', '/ja/about/'],
  ['/cn/books/', '/books/'],
  ['/cn/projects/', '/projects/'],
  ['/cn/writing/', '/binary/'],
  ['/cn/now/', '/network/'],
  ['/cn/contact/', '/network/'],
]);

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

    if (/^\/ouroborous\//.test(url.pathname)) {
      url.pathname = url.pathname.replace(/^\/ouroborous\//, '/ouroboros/');
      return redirect(url, 301);
    }

    const normalizedLegacyPath = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
    const localizedDestination = legacyLocaleRedirects.get(normalizedLegacyPath);
    if (localizedDestination) {
      url.pathname = localizedDestination;
      return redirect(url, 301);
    }

    if (/^\/cn\/books\/[^/]+\/?$/.test(url.pathname)) {
      url.pathname = '/books/';
      return redirect(url, 301);
    }

    if (/^\/cn\/projects\/[^/]+\/?$/.test(url.pathname)) {
      url.pathname = '/projects/';
      return redirect(url, 301);
    }

    const legacyIdentity = url.pathname.match(/^\/identity\/(identity|asymmetry|meaning|resonance|ouroboros|binary|intelligence|network)\/?$/);
    if (legacyIdentity) {
      url.pathname = `/${legacyIdentity[1]}/`;
      return redirect(url, 301);
    }

    let response = await env.ASSETS.fetch(request);
    if (response.status === 404 && url.pathname !== '/404.html') {
      const notFoundUrl = new URL('/404.html', url);
      const notFound = await env.ASSETS.fetch(new Request(notFoundUrl, {
        method: request.method === 'HEAD' ? 'HEAD' : 'GET',
        headers: request.headers,
      }));
      if (notFound.ok) {
        response = new Response(request.method === 'HEAD' ? null : notFound.body, {
          status: 404,
          headers: notFound.headers,
        });
      }
    }
    const headers = new Headers(response.headers);
    const responseSecurityHeaders = url.pathname === '/intelligence/supply-chain-map/'
      ? embeddedMapSecurityHeaders
      : securityHeaders;
    for (const [name, value] of Object.entries(responseSecurityHeaders)) headers.set(name, value);
    const contentType = headers.get('Content-Type') ?? '';
    if (/^(?:text\/html|text\/markdown|text\/plain)/i.test(contentType)) {
      for (const [name, value] of Object.entries(robotWelcomeHeaders)) headers.set(name, value);
    }

    const securedResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });

    if (request.method === 'GET' && /^text\/html/i.test(contentType) && response.body) {
      return new HTMLRewriter()
        .on('body', new CloudflareWebAnalytics())
        .transform(securedResponse);
    }

    return securedResponse;
  },
};
