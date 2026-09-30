const bareDomain = /^(?:www\.)?(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}(?:[/?#].*)?$/i;

export function normalizeDiaryLinks(html) {
  return html.replace(/href="([^"]+)"/g, (attribute, href) => (
    bareDomain.test(href) ? `href="https://${href}"` : attribute
  ));
}
