import type { CollectionEntry } from 'astro:content';
import { bookManuscripts, type BookSlug, type BookManuscript } from '../data/books';

export type BookEntry = CollectionEntry<'books'>;
export type BookChapterEntry = CollectionEntry<'bookChapters'>;

interface ChapterGroup {
  title: string;
  description: string;
  order: number;
  chapters: BookChapterEntry[];
}

export function getBookManuscript(slug: string): BookManuscript {
  const manuscript = bookManuscripts.find((book) => book.slug === slug);

  if (!manuscript) {
    throw new Error(`Missing manuscript metadata for book: ${slug}`);
  }

  return manuscript;
}

export function parseBookChapterId(id: string) {
  const [bookSlug, chapterSlug] = id.split('/');

  if (!bookSlug || !chapterSlug) {
    throw new Error(`Invalid book chapter id: ${id}`);
  }

  return {
    bookSlug: bookSlug as BookSlug,
    chapterSlug,
  };
}

export function getBookPath(slug: string) {
  return `/books/${slug}/`;
}

export function getBookChapterPath(entry: BookChapterEntry) {
  const { bookSlug, chapterSlug } = parseBookChapterId(entry.id);
  return `${getBookPath(bookSlug)}${chapterSlug}/`;
}

export function sortBookChapters(chapters: BookChapterEntry[]) {
  return [...chapters].sort((left, right) => {
    if (left.data.sectionOrder !== right.data.sectionOrder) {
      return left.data.sectionOrder - right.data.sectionOrder;
    }

    return left.data.order - right.data.order;
  });
}

export function groupBookChapters(chapters: BookChapterEntry[]) {
  const groups = new Map<string, ChapterGroup>();

  for (const chapter of sortBookChapters(chapters)) {
    const current = groups.get(chapter.data.section);

    if (current) {
      current.chapters.push(chapter);
      continue;
    }

    groups.set(chapter.data.section, {
      title: chapter.data.section,
      description: chapter.data.sectionDescription,
      order: chapter.data.sectionOrder,
      chapters: [chapter],
    });
  }

  return [...groups.values()].sort((left, right) => left.order - right.order);
}

export function getFeaturedChapter(chapters: BookChapterEntry[]) {
  return sortBookChapters(chapters).find((chapter) => chapter.data.visibility === 'featured');
}
