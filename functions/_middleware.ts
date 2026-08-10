interface PagesContext {
  request: Request;
  next: () => Promise<Response>;
}

const canonicalHost = 'iamrobin.ai';

export async function onRequest(context: PagesContext) {
  const url = new URL(context.request.url);

  if (
    (url.hostname === canonicalHost || url.hostname === `www.${canonicalHost}`) &&
    (url.protocol !== 'https:' || url.hostname !== canonicalHost)
  ) {
    url.protocol = 'https:';
    url.hostname = canonicalHost;
    url.port = '';
    return Response.redirect(url, 301);
  }

  return context.next();
}
