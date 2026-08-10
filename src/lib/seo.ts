import type { CollectionEntry } from 'astro:content';
import { bookManuscripts } from '../data/books';
import { siteConfig } from '../data/site';

type SchemaObject = Record<string, unknown>;

const personId = () => `${absoluteUrl('/')}#person`;
const websiteId = () => `${absoluteUrl('/')}#website`;

export function resolveSiteUrl() {
  return (import.meta.env.PUBLIC_SITE_URL || siteConfig.siteUrl).replace(/\/$/, '');
}

export function absoluteUrl(path = '/') {
  return new URL(path, `${resolveSiteUrl()}/`).toString();
}

export function createPersonSchema(): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId(),
    name: siteConfig.name,
    honorificPrefix: 'Ms.',
    alternateName: [
      'Ms. Robin Xie',
      'Bin “Robin” Xie',
      '谢玢',
      '謝玢',
      'nanobin',
      'ロビン・シエ',
    ],
    pronouns: 'she/her',
    disambiguatingDescription:
      'Ms. Robin Xie, also known as Bin “Robin” Xie and nanobin, is the engineer, investor, and writer represented by iamrobin.ai.',
    description: siteConfig.description,
    jobTitle: 'Engineer, Capital Allocator, Writer',
    url: absoluteUrl('/'),
    image: absoluteUrl(siteConfig.portraitUrl),
    mainEntityOfPage: {
      '@id': `${absoluteUrl('/about/')}#profile`,
    },
    sameAs: [
      siteConfig.officialWebsiteUrl,
      siteConfig.linkedinUrl,
      siteConfig.githubUrl,
      siteConfig.xUrl,
      siteConfig.mediumUrl,
      siteConfig.ensUrl,
    ],
  };
}

export function createWebsiteSchema(): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId(),
    name: siteConfig.name,
    url: absoluteUrl('/'),
    description: siteConfig.description,
    inLanguage: ['en', 'zh-CN', 'zh-TW', 'ja'],
    publisher: {
      '@id': personId(),
    },
  };
}

export function createBookSchemas(books: CollectionEntry<'books'>[]): SchemaObject[] {
  return books.map((book) => {
    const path = `/books/${book.id}/`;
    const manuscript = bookManuscripts.find((item) => item.slug === book.id);

    return {
      '@context': 'https://schema.org',
      '@type': 'Book',
      '@id': `${absoluteUrl(path)}#book`,
      name: book.data.title,
      description: book.data.summary,
      inLanguage: 'en',
      author: {
        '@id': personId(),
      },
      url: absoluteUrl(path),
      mainEntityOfPage: absoluteUrl(path),
      isPartOf: {
        '@id': websiteId(),
      },
      ...(manuscript ? { image: absoluteUrl(manuscript.coverPublic) } : {}),
      genre: book.data.theme,
    };
  });
}

export function createArticleSchema({
  title,
  description,
  path,
  dateModified,
  image,
  bookPath,
}: {
  title: string;
  description: string;
  path: string;
  dateModified?: string;
  image?: string;
  bookPath?: string;
}): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${absoluteUrl(path)}#article`,
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    author: {
      '@id': personId(),
    },
    publisher: {
      '@id': personId(),
    },
    isPartOf: {
      '@id': bookPath ? `${absoluteUrl(bookPath)}#book` : websiteId(),
    },
    inLanguage: 'en',
    ...(image ? { image: absoluteUrl(image) } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
}

export function createProfilePageSchema(
  path: string,
  inLanguage = 'en',
  name = `About ${siteConfig.name}`,
): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${absoluteUrl(path)}#profile`,
    name,
    url: absoluteUrl(path),
    inLanguage,
    mainEntity: {
      '@id': personId(),
    },
    isPartOf: {
      '@id': websiteId(),
    },
  };
}

export function createProjectSchema(project: CollectionEntry<'projects'>): SchemaObject {
  const path = `/projects/${project.id}/`;

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${absoluteUrl(path)}#project`,
    name: project.data.title,
    description: project.data.summary,
    abstract: project.data.impact,
    keywords: project.data.domain,
    creativeWorkStatus: project.data.status,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    creator: {
      '@id': personId(),
    },
    isPartOf: {
      '@id': websiteId(),
    },
  };
}

export function createBreadcrumbSchema(
  items: Array<{ name: string; path: string }>,
): SchemaObject {
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
