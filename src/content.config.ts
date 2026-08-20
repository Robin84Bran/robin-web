import { defineCollection, z } from 'astro:content';
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
    canonical: z.string().url(),
    author: z.string().url(),
    inLanguage: z.string(),
    draft: z.boolean().default(false),
    sourceMode: z.enum(['scheduled_chatgpt', 'fallback_research']),
    fallbackReason: z.string().optional(),
    sourceThread: z.string().url(),
  }),
});

export const collections = { dailyBriefing };
