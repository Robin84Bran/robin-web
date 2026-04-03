export const siteConfig = {
  name: 'Robin Xie',
  title: 'Robin Xie | Engineer, Capital Allocator, Writer',
  description:
    'Personal site of Robin Xie: engineer, capital allocator, writer, and builder across AI, markets, systems, and digital identity.',
  siteUrl: 'https://www.iamrobin.ai',
  blogUrl: 'https://iamrobin.ghost.io',
  officialWebsiteUrl: 'https://www.tideisun.com/en/robin',
  ensUrl: 'https://app.ens.domains/iamrobin.eth',
  mediumUrl: 'https://medium.com/@iamrobin-ai',
  githubUrl: 'https://github.com/Robin84Bran/',
  xUrl: 'https://x.com/nanobin1984',
  linkedinUrl: 'https://www.linkedin.com/in/nanobin',
  location: 'Hong Kong',
  portraitUrl: '/social/robin-portrait.jpg',
  heroEyebrow: 'Ms. Robin Xie',
  heroTitle: 'Engineer. Executive. Mother.',
  heroSubline: 'Flow. Capital. Token. ♾️',
  heroBody: [
    'This is a living system. A system that filters.',
    'The attuned understand. Most will not.',
  ],
  quote: 'Where capital, consciousness, and curiosity converge.',
} as const;

export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Books', href: '/books/' },
  { label: 'Writing', href: '/writing/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Now', href: '/now/' },
  { label: 'Contact', href: '/contact/' },
] as const;

export const socialLinks = [
  {
    label: 'GitHub',
    href: siteConfig.githubUrl,
    blurb: 'Source code, experiments, and systems work in public.',
  },
  {
    label: 'Ghost blog',
    href: siteConfig.blogUrl,
    blurb: 'Canonical home for essays, notes, and longer arcs.',
  },
  {
    label: 'Medium',
    href: siteConfig.mediumUrl,
    blurb: 'Selective syndication for chosen essays.',
  },
  {
    label: 'X',
    href: siteConfig.xUrl,
    blurb: 'Short-form signals and running commentary.',
  },
  {
    label: 'LinkedIn',
    href: siteConfig.linkedinUrl,
    blurb: 'Professional context and institutional outreach.',
  },
] as const;

export const footerLinks = [
  { label: 'Ghost blog', href: siteConfig.blogUrl },
  { label: 'Medium', href: siteConfig.mediumUrl },
  { label: 'GitHub', href: siteConfig.githubUrl },
  { label: 'X', href: siteConfig.xUrl },
  { label: 'LinkedIn', href: siteConfig.linkedinUrl },
] as const;

export const identityPillars = [
  {
    id: 'engineer',
    title: 'Engineer',
    description: 'Systems that hold their shape.',
  },
  {
    id: 'capital',
    title: 'Capital Allocator',
    description: 'Flows that compound under pressure.',
  },
  {
    id: 'writer',
    title: 'Writer',
    description: 'Signal shaped into language.',
  },
  {
    id: 'builder',
    title: 'Builder',
    description: 'Form assembled into operating reality.',
  },
] as const;

export const aboutPillars = [
  {
    title: 'Operator turned allocator',
    description:
      'Robin moves from shipping systems to reading incentives, structures, and second-order effects.',
  },
  {
    title: 'Physical flow to capital flow',
    description: 'Understand how value moves, then design better interfaces for it.',
  },
  {
    title: 'A personal operating system',
    description:
      'RobinOS is an attempt to make thinking, writing, investing, and building feel coherent under one roof.',
  },
] as const;

export const operatingPrinciples = [
  'Prefer clarity over cleverness, signal over noise, and systems over slogans.',
  'Design for longevity: calmer interfaces, stronger ideas, less disposable content.',
  'Treat books, products, and essays as living artifacts that can keep compounding.',
  'Keep technology humane by making room for judgment, humor, and texture.',
] as const;

export const writingTracks = [
  {
    title: 'Archive signal on Ghost',
    description:
      'The deepest published signal lives on Ghost, where longer arcs stay legible.',
    href: siteConfig.blogUrl,
  },
  {
    title: 'Relay selected signal on Medium',
    description:
      'Some pieces travel through Medium without flattening the archive.',
    href: siteConfig.mediumUrl,
  },
  {
    title: 'Enter the signal layer',
    description:
      'A quieter RobinOS layer for filtered notes and traces.',
    href: '/signal/',
  },
] as const;

export const heroLens = [
  {
    label: 'Focus',
    value: 'AI-native operating systems, agentic architecture, tokenized capital and media with real alpha.',
  },
  {
    label: 'Operating across',
    value: 'English and Chinese, capital and intelligence, markets and media.',
  },
  {
    label: 'Building',
    value: 'RobinOS, Quant Lab, Watts to Satoshi, and children’s AI labs.',
  },
] as const;

export const systemLayers = [
  { label: 'Signal', href: '/signal/' },
  { label: 'Systems', href: '/systems/' },
  { label: 'Lab', href: '/lab/' },
  { label: 'Taste', href: '/taste/' },
] as const;

export const nowSignals = [
  {
    label: 'Focus',
    value: 'AI-native operating systems, tokenized capital, and media surfaces with real signal.',
  },
  {
    label: 'Operating across',
    value: 'Cross-border systems, long-horizon infrastructure, and work between software, capital, and narrative.',
  },
  {
    label: 'Building',
    value: 'RobinOS, Quant Lab, Watts to Satoshi, and children’s AI labs.',
  },
] as const;

export const pressFeatures = [
  {
    title: 'Nasdaq Interview on Robin Xie',
    href: 'https://financialit.net/news/blockchain/isunone-indicated-nasdaq-interview-future-blockchain-banking',
    description: 'A Nasdaq-linked interview moment around blockchain banking, platform design, and global ambition.',
    source: 'Financial IT',
  },
  {
    title: 'What does blockchain banking look like in ASEAN',
    href: 'https://hong-kong.media-outreach.com/news/hong-kong/2019/11/20/21203/isunone-reaches-1-million-users-and-promotes-blockchain-development-in-asean/',
    description: 'A milestone around scale, user growth, and the shape of blockchain banking across ASEAN.',
    source: 'Media Outreach',
  },
  {
    title: 'Financial inclusion and cross-border payment for 2 billion unbanked population',
    href: 'https://www.media-outreach.com/news/hong-kong/2019/07/17/9617/isunone-teams-up-with-digital-bank-to-benefit-2-billion-underprivileged-population/',
    description: 'A public marker on financial inclusion, cross-border payments, and the unbanked population.',
    source: 'Media Outreach',
  },
] as const;

export const contactPrompts = [
  {
    title: 'Thoughtful partnerships',
    description: 'Early-stage AI, capital formation, media systems, and long-horizon internet work.',
  },
  {
    title: 'Sharp conversations',
    description:
      'If you have a real thesis or a serious build in motion, context helps more than pitch decks.',
  },
  {
    title: 'Clear channels',
    description:
      'Start where the conversation belongs: GitHub for work, Ghost for writing, LinkedIn or X for outreach.',
  },
] as const;
