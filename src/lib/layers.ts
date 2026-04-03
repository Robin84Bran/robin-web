import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const layerCollections = ['signal', 'systems', 'lab', 'taste'] as const;
export type LayerCollection = (typeof layerCollections)[number];
export type LayerEntry =
  | CollectionEntry<'signal'>
  | CollectionEntry<'systems'>
  | CollectionEntry<'lab'>
  | CollectionEntry<'taste'>;

export type LayerEntryWithSlug = {
  entry: LayerEntry;
  slug: string;
};

export const layerMeta: Record<LayerCollection, { title: string; description: string; kicker: string }> = {
  signal: {
    title: 'Signal',
    description: 'Filtered notes and public traces that rise high enough to pass.',
    kicker: 'Signal layer',
  },
  systems: {
    title: 'Systems',
    description: 'Working structures, designed with enough pressure to reveal what holds.',
    kicker: 'Systems layer',
  },
  lab: {
    title: 'Lab',
    description: 'A deeper layer for experiments, tests, and unfinished thinking that still has charge.',
    kicker: 'Lab layer',
  },
  taste: {
    title: 'Taste',
    description: 'The filter underneath the interface.',
    kicker: 'Taste layer',
  },
};

export const normalizeLayerSlug = (id: string) => id.replace(/\.(md|mdx)$/i, '').toLowerCase();

export async function getLayerEntries(collection: LayerCollection): Promise<LayerEntry[]> {
  switch (collection) {
    case 'signal':
      return getCollection('signal');
    case 'systems':
      return getCollection('systems');
    case 'lab':
      return getCollection('lab');
    case 'taste':
      return getCollection('taste');
  }
}
