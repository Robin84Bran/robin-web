import { books, portfolioOrbitNodes, socialLinks } from '../data/site';

export type SchemaNode = Record<string, unknown>;

export const SITE_URL = 'https://iamrobin.ai';
export const SITE_NAME = 'Robin Xie';
export const DEFAULT_IMAGE = '/photos/hero-watch.jpg';

const personId = `${SITE_URL}/#person`;
const websiteId = `${SITE_URL}/#website`;

export function absoluteUrl(path = '/') {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function createPersonSchema(): SchemaNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: SITE_NAME,
    honorificPrefix: 'Ms.',
    alternateName: ['Ms. Robin Xie', 'Bin “Robin” Xie', '谢玢', '謝玢', 'nanobin'],
    pronouns: 'she/her',
    description:
      'Robin Xie is an engineer, investor, writer, and builder working across intelligent systems, capital, and human meaning.',
    jobTitle: ['Engineer', 'Investor', 'Writer', 'Builder'],
    url: absoluteUrl('/'),
    image: absoluteUrl(DEFAULT_IMAGE),
    sameAs: [socialLinks.official, socialLinks.linkedin, socialLinks.github, socialLinks.medium],
  };
}

export function createWebsiteSchema(): SchemaNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    name: SITE_NAME,
    alternateName: 'I AM ROBIN',
    url: absoluteUrl('/'),
    description: 'The visual world of Robin Xie: identity, systems, capital, books, and becoming.',
    inLanguage: 'en',
    publisher: { '@id': personId },
  };
}

export function createHomeSchemas(): SchemaNode[] {
  return [
    createPersonSchema(),
    createWebsiteSchema(),
    {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${absoluteUrl('/')}#profile`,
      name: 'Robin Xie — Engineer, Investor & Builder',
      url: absoluteUrl('/'),
      mainEntity: { '@id': personId },
      isPartOf: { '@id': websiteId },
      inLanguage: 'en',
    },
  ];
}

export function createBreadcrumbSchema(items: Array<{ name: string; path: string }>): SchemaNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createPortfolioSchemas(): SchemaNode[] {
  const about = portfolioOrbitNodes.flatMap((node) =>
    node.links.map((link) => ({
      '@type': 'Thing',
      name: link.label,
      sameAs: link.href.startsWith('http') ? link.href : absoluteUrl(link.href),
    })),
  );

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${absoluteUrl('/portfolio/')}#page`,
      name: 'Portfolio — Robin Xie',
      description: "A visual field of the institutions, frontiers, capital, and systems that shape Robin Xie's attention.",
      url: absoluteUrl('/portfolio/'),
      isPartOf: { '@id': websiteId },
      about,
      inLanguage: 'en',
    },
    createBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Portfolio', path: '/portfolio/' },
    ]),
  ];
}

export function createBooksSchemas(): SchemaNode[] {
  const bookNodes = books.map((book) => ({
    '@context': 'https://schema.org',
    '@type': 'Book',
    '@id': `${absoluteUrl(`/books/#${book.slug}`)}-book`,
    name: book.title,
    description: book.question,
    image: absoluteUrl(book.cover),
    author: { '@id': personId },
    url: absoluteUrl(`/books/#${book.slug}`),
    inLanguage: 'en',
  }));

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${absoluteUrl('/books/')}#page`,
      name: 'Books — Robin Xie',
      description: 'Four living books by Robin Xie, presented as objects and questions.',
      url: absoluteUrl('/books/'),
      isPartOf: { '@id': websiteId },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: bookNodes.map((book, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: { '@id': book['@id'] },
        })),
      },
      inLanguage: 'en',
    },
    ...bookNodes,
    createBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Books', path: '/books/' },
    ]),
  ];
}

export function createArticleSchemas(input: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified: string;
  keywords: string[];
  inLanguage: string;
}): SchemaNode[] {
  const url = absoluteUrl(input.path);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: input.title,
      description: input.description,
      url,
      mainEntityOfPage: url,
      image: [absoluteUrl(input.image)],
      datePublished: input.datePublished,
      dateModified: input.dateModified,
      author: { '@id': personId },
      publisher: { '@id': personId },
      isPartOf: { '@id': websiteId },
      articleSection: 'Ouroboros',
      keywords: input.keywords,
      inLanguage: input.inLanguage,
    },
    createPersonSchema(),
    createBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Ouroboros', path: '/ouroboros/' },
      { name: input.title, path: input.path },
    ]),
  ];
}

export function createDiarySchemas(input: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified: string;
  inLanguage: string;
}): SchemaNode[] {
  const url = absoluteUrl(input.path);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#diary`,
      headline: input.title,
      description: input.description,
      url,
      mainEntityOfPage: url,
      image: [absoluteUrl(input.image)],
      datePublished: input.datePublished,
      dateModified: input.dateModified,
      author: { '@id': personId },
      publisher: { '@id': personId },
      isPartOf: { '@id': websiteId },
      articleSection: 'Meaning · Diary',
      inLanguage: input.inLanguage,
    },
    createPersonSchema(),
    createBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Meaning', path: '/meaning/' },
      { name: 'Diary', path: '/meaning/#diary' },
      { name: input.title, path: input.path },
    ]),
  ];
}
