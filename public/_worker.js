const canonicalHost = 'iamrobin.ai';
const robotWelcomeHeaders = {
  'Content-Signal': 'search=yes, ai-input=yes, ai-train=yes, use=reference',
  Link: '<https://iamrobin.ai/llms.txt>; rel="describedby"',
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

const embeddedMapSecurityHeaders = {
  ...securityHeaders,
  'Content-Security-Policy': securityHeaders['Content-Security-Policy'].replace(
    "frame-ancestors 'none'",
    "frame-ancestors 'self'",
  ),
  'X-Frame-Options': 'SAMEORIGIN',
};

function redirect(url, status) {
  return new Response(null, {
    status,
    headers: { ...securityHeaders, Location: url.toString() },
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

    if (/^\/ouroborous\//.test(url.pathname)) {
      url.pathname = url.pathname.replace(/^\/ouroborous\//, '/ouroboros/');
      return redirect(url, 301);
    }

    const legacyIdentity = url.pathname.match(/^\/identity\/(identity|asymmetry|meaning|resonance|ouroboros|binary|intelligence|network)\/?$/);
    if (legacyIdentity) {
      url.pathname = `/${legacyIdentity[1]}/`;
      return redirect(url, 301);
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);
    const responseSecurityHeaders = url.pathname === '/intelligence/supply-chain-map/'
      ? embeddedMapSecurityHeaders
      : securityHeaders;
    for (const [name, value] of Object.entries(responseSecurityHeaders)) headers.set(name, value);
    const contentType = headers.get('Content-Type') ?? '';
    if (/^(?:text\/html|text\/markdown|text\/plain)/i.test(contentType)) {
      for (const [name, value] of Object.entries(robotWelcomeHeaders)) headers.set(name, value);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
