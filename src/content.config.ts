import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const dailyBriefing = defineCollection({
  loader: glob({ pattern: '**/article.md', base: './src/content/daily-briefing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date(),
    section: z.literal('Ouroboros'),
    series: z.literal('Daily Briefing'),
    tags: z.array(z.string()),
    keywords: z.array(z.string()),
    excerpt: z.string(),
    hero: z.string(),
    ogImage: z.string(),
    canonical: z.url(),
    author: z.url(),
    inLanguage: z.string(),
    draft: z.boolean().default(false),
    sourceMode: z.enum(['scheduled_chatgpt', 'fallback_research']),
    fallbackReason: z.string().optional(),
    sourceThread: z.url(),
  }),
});

const dailyBriefingTranslation = defineCollection({
  loader: glob({ pattern: '**/{zh-hans,zh-hant,ja}.md', base: './src/content/daily-briefing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date(),
    section: z.literal('Ouroboros'),
    series: z.literal('Daily Briefing'),
    tags: z.array(z.string()),
    keywords: z.array(z.string()),
    excerpt: z.string(),
    hero: z.string(),
    ogImage: z.string(),
    canonical: z.url(),
    author: z.url(),
    inLanguage: z.enum(['zh-Hans', 'zh-Hant', 'ja']),
    languageSlug: z.enum(['zh-hans', 'zh-hant', 'ja']),
    translationOf: z.url(),
    draft: z.boolean().default(false),
    sourceMode: z.enum(['scheduled_chatgpt', 'fallback_research']),
    fallbackReason: z.string().optional(),
    sourceThread: z.url(),
  }),
});

const actionItem = defineCollection({
  loader: glob({ pattern: '**/article.md', base: './src/content/action-item' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date(),
    section: z.literal('Ouroboros'),
    series: z.literal('Daily Action Item'),
    tags: z.array(z.string()),
    keywords: z.array(z.string()),
    categories: z.array(z.string()),
    excerpt: z.string(),
    hero: z.string(),
    ogImage: z.string(),
    canonical: z.url(),
    author: z.url(),
    inLanguage: z.literal('en'),
    draft: z.boolean().default(false),
    sourceAction: z.string(),
    ledgerId: z.string(),
  }),
});

const actionItemTranslation = defineCollection({
  loader: glob({ pattern: '**/{zh-hans,zh-hant,ja}.md', base: './src/content/action-item' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date(),
    section: z.literal('Ouroboros'),
    series: z.literal('Daily Action Item'),
    tags: z.array(z.string()),
    keywords: z.array(z.string()),
    categories: z.array(z.string()),
    excerpt: z.string(),
    hero: z.string(),
    ogImage: z.string(),
    canonical: z.url(),
    author: z.url(),
    inLanguage: z.enum(['zh-Hans', 'zh-Hant', 'ja']),
    languageSlug: z.enum(['zh-hans', 'zh-hant', 'ja']),
    translationOf: z.url(),
    draft: z.boolean().default(false),
    sourceAction: z.string(),
    ledgerId: z.string(),
  }),
});

const blogFields = {
  title: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date(),
  section: z.literal('Ouroboros'),
  series: z.literal('Blog'),
  lane: z.enum(['BUILD', 'INVEST', 'JOY']),
  tags: z.array(z.string()),
  keywords: z.array(z.string()),
  categories: z.array(z.string()),
  excerpt: z.string(),
  hero: z.string(),
  ogImage: z.string(),
  canonical: z.url(),
  author: z.url(),
  draft: z.boolean().default(false),
  mediumUrl: z.url().nullable().optional(),
  linkedinUrl: z.url().nullable().optional(),
};

const blog = defineCollection({
  loader: glob({ pattern: '**/article.md', base: './src/content/blog' }),
  schema: z.object({
    ...blogFields,
    inLanguage: z.literal('en'),
    sourceDossier: z.string(),
    voiceCheck: z.literal('PASS'),
  }),
});

const blogTranslation = defineCollection({
  loader: glob({ pattern: '**/{zh-hans,zh-hant,ja}.md', base: './src/content/blog' }),
  schema: z.object({
    ...blogFields,
    inLanguage: z.enum(['zh-Hans', 'zh-Hant', 'ja']),
    languageSlug: z.enum(['zh-hans', 'zh-hant', 'ja']),
    translationOf: z.url(),
    sourceDossier: z.string(),
    voiceCheck: z.literal('PASS'),
  }),
});

const diary = defineCollection({
  loader: glob({ pattern: '**/article.md', base: './src/content/diary' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date(),
    section: z.literal('Meaning'),
    series: z.literal('Diary'),
    excerpt: z.string(),
    hero: z.string(),
    ogImage: z.string(),
    canonical: z.url(),
    author: z.url(),
    inLanguage: z.string(),
    source: z.literal('telegram'),
    sourceId: z.string(),
    bodySha256: z.string().regex(/^[a-f0-9]{64}$/),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  dailyBriefing,
  dailyBriefingTranslation,
  actionItem,
  actionItemTranslation,
  blog,
  blogTranslation,
  diary,
};
