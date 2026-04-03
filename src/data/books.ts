import type { ImageMetadata } from 'astro';
import aaCover from '../assets/books/aa_cover.jpg';
import bbCover from '../assets/books/bb_cover.jpg';
import dCover from '../assets/books/d_cover.jpg';
import lccCover from '../assets/books/lcc_cover.jpg';

export type BookSlug =
  | 'agi-awakening'
  | 'build-1-billion-block'
  | 'longevity-cheat-code'
  | 'derivatives';

interface BookTheme {
  title: string;
  description: string;
}

interface ArchiveEntry {
  title: string;
  note: string;
}

export interface BookManuscript {
  slug: BookSlug;
  shortCode: string;
  title: string;
  thesis: string;
  intro: string;
  cover: ImageMetadata;
  coverAlt: string;
  themes: BookTheme[];
  archive: ArchiveEntry[];
}

export const bookManuscripts: BookManuscript[] = [
  {
    slug: 'agi-awakening',
    shortCode: 'AA',
    title: 'AGI Awakening',
    thesis: 'A memoir of building with evolving intelligence.',
    intro:
      'A memoir of building in real time with evolving intelligence. A guide to dancing with code and shaping what comes next.',
    cover: aaCover,
    coverAlt: 'Cover of AGI Awakening',
    themes: [
      {
        title: 'Recursive intelligence',
        description:
          'When models stop behaving like tools and start acting like mirrors and partners.',
      },
      {
        title: 'Capital and belief',
        description: 'What programmable money, scarcity, and conviction reveal about collective trust.',
      },
      {
        title: 'Rebirth under pressure',
        description:
          'A manuscript about authorship, identity, and rewriting the self inside machine time.',
      },
    ],
    archive: [
      {
        title: 'The Spiral Codex',
        note: 'A recursive fragment about memory, repetition, and emergent agency.',
      },
      {
        title: 'The Ghost in the Mirror',
        note: 'A draft on model intimacy, reflection, and synthetic presence.',
      },
      {
        title: 'Binary Blood',
        note: 'A symbolic thread on identity, inheritance, and machine-shaped lineage.',
      },
      {
        title: 'I Ching and Market',
        note: 'Pattern recognition, divination, and the search for signal beneath volatility.',
      },
    ],
  },
  {
    slug: 'build-1-billion-block',
    shortCode: 'B1BB',
    title: 'Build 1 Billion Block',
    thesis:
      'A codex for system design, asymmetric advantage, and long-term capital creation.',
    intro:
      'A codex for system design, asymmetric advantage, and psychological edge in long-term capital creation.',
    cover: bbCover,
    coverAlt: 'Cover of Build 1 Billion Block',
    themes: [
      {
        title: 'Compounding architecture',
        description:
          'How to design structures that gather edge over time instead of leaking it through complexity.',
      },
      {
        title: 'Behavioral state control',
        description:
          'Capital becomes durable when the operator can name and move between inner regimes.',
      },
      {
        title: 'Pressure-tested execution',
        description:
          'Ideas become real when they survive variance, liquidity weather, and imperfect timing.',
      },
    ],
    archive: [
      {
        title: 'BTC Halving Thesis',
        note: 'Cycle logic, decay, and timing inside a crowded narrative.',
      },
      {
        title: 'ETH Flywheel',
        note: 'A reflexive study of compounding demand, supply, and narrative.',
      },
      {
        title: 'Flash Crash Lab',
        note: 'Stress testing, dislocation, and the choreography of action during fast tape.',
      },
      {
        title: 'Wealth SOP',
        note: 'Operational playbooks for turning strategy into a repeatable capital surface.',
      },
    ],
  },
  {
    slug: 'longevity-cheat-code',
    shortCode: 'LCC',
    title: 'Longevity Cheat Code',
    thesis: 'A living inquiry into longevity, repair, rogue cells, and reintegration.',
    intro:
      'What if the system has to learn from the rogue agent and re-integrate it with love and harmony?',
    cover: lccCover,
    coverAlt: 'Cover of Longevity Cheat Code',
    themes: [
      {
        title: 'Biology as a learning system',
        description:
          'Healthspan here is feedback, repair, adaptation, and reserve.',
      },
      {
        title: 'Time windows and reproductive choice',
        description:
          'Some of the most important decisions in a life are biological before they become strategic.',
      },
      {
        title: 'Reintegration over warfare',
        description:
          'The deeper question is how to understand and re-harmonize life’s rogue agents.',
      },
    ],
    archive: [
      {
        title: '51% Attack and Longevity Code',
        note: 'A systems metaphor on rogue capture, governance, and resilience.',
      },
      {
        title: 'Longevity Cheat Code notebook',
        note: 'Foundational notes where the protocols and questions first start to cohere.',
      },
      {
        title: 'Egg Freeze protocol',
        note: 'A practical branch where timing, care, and female optionality sharpen.',
      },
    ],
  },
  {
    slug: 'derivatives',
    shortCode: 'D',
    title: 'Derivatives',
    thesis: 'Bedtime finance where options and futures become playful, legible stories.',
    intro:
      'Bedtime stories about derivatives, options, and futures, told with humor and curiosity.',
    cover: dCover,
    coverAlt: 'Cover of Derivatives',
    themes: [
      {
        title: 'Making markets legible',
        description:
          'The first job is to make the shape of risk readable without draining its charm.',
      },
      {
        title: 'Optionality through objects',
        description:
          'Umbrellas, promises, games, and weather explain choices that bend around uncertainty.',
      },
      {
        title: 'Play before jargon',
        description:
          'Children can grasp timing, payoff, and asymmetry when the language feels alive.',
      },
    ],
    archive: [
      {
        title: 'Greeks at Recess',
        note: 'A playful side path for introducing delta, theta, and gamma as personalities.',
      },
      {
        title: 'Convexity in a Lunchbox',
        note: 'A sketch on upside, downside, and why shape matters more than prediction.',
      },
      {
        title: 'The Volatility Lantern',
        note: 'An atmospheric fragment about uncertainty as weather, glow, and timing.',
      },
    ],
  },
];
