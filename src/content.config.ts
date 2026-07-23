import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const books = defineCollection({
  loader: glob({ base: './src/content/books/_shared_docs', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    status: z.string(),
    theme: z.string(),
    summary: z.string(),
    currentQuestion: z.string(),
    featured: z.boolean().default(false),
  }),
});

const bookChapters = defineCollection({
  loader: glob({ base: './src/content/book-chapters', pattern: '*/_shared_docs/*.md' }),
  schema: z.object({
    book: z.enum([
      'agi-awakening',
      'build-1-billion-block',
      'longevity-cheat-code',
      'derivatives',
    ]),
    title: z.string(),
    section: z.string(),
    sectionDescription: z.string(),
    sectionOrder: z.number(),
    order: z.number(),
    visibility: z.enum(['featured', 'selected']),
    summary: z.string(),
    updated: z.string(),
    readingTime: z.string(),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects/_shared_docs', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    status: z.string(),
    domain: z.string(),
    summary: z.string(),
    impact: z.string(),
    featured: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages/_shared_docs', pattern: '*.md' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    kicker: z.string(),
    updated: z.string().optional(),
  }),
});

const robinosLayerSchema = z.object({
  title: z.string(),
  description: z.string(),
  kicker: z.string().optional(),
  updated: z.string().optional(),
});

export const collections = {
  books,
  bookChapters,
  lab: defineCollection({
    loader: glob({ base: './src/content/lab', pattern: '**/*.md' }),
    schema: robinosLayerSchema,
  }),
  projects,
  pages,
  signal: defineCollection({
    loader: glob({ base: './src/content/signal', pattern: '**/*.md' }),
    schema: robinosLayerSchema,
  }),
  systems: defineCollection({
    loader: glob({ base: './src/content/systems', pattern: '**/*.md' }),
    schema: robinosLayerSchema,
  }),
  taste: defineCollection({
    loader: glob({ base: './src/content/taste', pattern: '**/*.md' }),
    schema: robinosLayerSchema,
  }),
};
