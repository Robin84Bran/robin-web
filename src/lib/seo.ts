import type { CollectionEntry } from 'astro:content';
import { siteConfig, socialLinks } from '../data/site';

type SchemaObject = Record<string, unknown>;

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
    name: siteConfig.name,
    description: siteConfig.description,
    jobTitle: 'Engineer, Capital Allocator, Writer',
    url: absoluteUrl('/'),
    homeLocation: {
      '@type': 'Place',
      name: siteConfig.location,
    },
    sameAs: socialLinks.map((link) => link.href),
  };
}

export function createWebsiteSchema(): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: absoluteUrl('/'),
    description: siteConfig.description,
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
    },
  };
}

export function createBookSchemas(books: CollectionEntry<'books'>[]): SchemaObject[] {
  return books.map((book) => ({
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.data.title,
    description: book.data.summary,
    inLanguage: 'en',
    author: {
      '@type': 'Person',
      name: siteConfig.name,
    },
    url: absoluteUrl(`/books/${book.id}/`),
    genre: book.data.theme,
  }));
}

export function createArticleSchema({
  title,
  description,
  path,
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  dateModified?: string;
}): SchemaObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: absoluteUrl(path),
    author: {
      '@type': 'Person',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
    },
    inLanguage: 'en',
    ...(dateModified ? { dateModified } : {}),
  };
}
