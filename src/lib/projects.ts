import type { CollectionEntry } from 'astro:content';

export type ProjectEntry = CollectionEntry<'projects'>;

export function getProjectPath(slug: string) {
  return `/projects/${slug}/`;
}
