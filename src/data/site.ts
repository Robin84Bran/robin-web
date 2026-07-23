export const siteConfig = {
  name: 'Robin Xie',
  title: 'Robin Xie | Engineer, Capital Allocator, Writer',
  description:
    'Personal site of Robin Xie: engineer, capital allocator, writer, and builder across AI, markets, systems, and digital identity.',
  siteUrl: 'https://iamrobin.ai',
  blogUrl: 'https://iamrobin.ghost.io',
  officialWebsiteUrl: 'https://www.tideisun.com/en/robin',
  officialWebsiteUrlCn: 'https://www.tideisun.com/robin',
  ensUrl: 'https://app.ens.domains/iamrobin.eth',
  mediumUrl: 'https://medium.com/@iamrobin-ai',
  githubUrl: 'https://github.com/Robin84Bran/',
  xUrl: 'https://x.com/nanobin1984',
  linkedinUrl: 'https://www.linkedin.com/in/nanobin',
  portraitUrl: '/social/robin-portrait.jpg',
  releaseLabel: 'Website v1.2 · July 2026',
  releaseLabelCn: '网站 v1.2 · 2026年7月',
  heroEyebrow: 'Robin Xie',
  heroTitle: 'Engineer, investor, writer.',
  heroSubline: 'I work where intelligence and capital begin to converge.',
  heroBody: [
    'I build systems, write essays, and allocate time, attention, and capital.',
    'I care about clarity, warmth, and what still matters after the noise fades.',
    'Only the public edge lives here.',
  ],
  quote: 'What lasts usually arrives quietly.',
} as const;

export const navigation = [
  { label: 'Projects', href: '/projects/' },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Press', href: '/now/' },
  { label: 'Books', href: '/books/' },
] as const;

export const socialLinks = [
  {
    label: 'GitHub',
    href: siteConfig.githubUrl,
    blurb: 'Code and working systems.',
  },
  {
    label: 'Ghost blog',
    href: siteConfig.blogUrl,
    blurb: 'Longer essays and notes.',
  },
  {
    label: 'Medium',
    href: siteConfig.mediumUrl,
    blurb: 'Selective reposts.',
  },
  {
    label: 'X',
    href: siteConfig.xUrl,
    blurb: 'Short notes.',
  },
  {
    label: 'LinkedIn',
    href: siteConfig.linkedinUrl,
    blurb: 'Professional context.',
  },
] as const;

export const footerLinks = [
  { label: 'ENS', href: siteConfig.ensUrl },
  { label: 'LinkedIn', href: siteConfig.linkedinUrl },
  { label: 'Medium', href: siteConfig.mediumUrl },
  { label: 'Blog', href: siteConfig.blogUrl },
] as const;

export const identityPillars = [
  {
    id: 'engineer',
    title: 'Engineer',
    description: 'Engineering is my core.',
  },
  {
    id: 'capital',
    title: 'Investor',
    description: 'Time, attention, and capital, placed to grow and compound.',
  },
  {
    id: 'writer',
    title: 'Writer',
    description: 'Only the public edge lives here.',
  },
  {
    id: 'builder',
    title: 'Builder',
    description: 'Find how value moves, then build something that can survive reality.',
  },
] as const;

export const aboutPillars = [
  {
    title: 'Teddy’s gift',
    description: 'Asymmetry is the source of all power. Systems break beautifully. Time is not linear but a loop.',
  },
  {
    title: 'Global citizen',
    description: 'Invest in the United States. Spend in China. Work in Hong Kong. Play in Macau. I belong to the system worth building.',
  },
  {
    title: 'Keep the human texture',
    description: 'Warmth, humor, and taste are part of the architecture. Smiling randomly is not a bug, but a feature.',
  },
] as const;

export const operatingPrinciples = [
  'I seek. I become. I AM.',
  '99% false signal fades. 1% true alpha lives.',
  'Build for the long arc, not the loud cycle.',
  'Love creates coherence and resonance.',
] as const;

export const writingTracks = [
  {
    title: 'Ghost archive',
    description: 'Longer essays and ongoing arcs.',
    href: siteConfig.blogUrl,
  },
  {
    title: 'Medium reposts',
    description: 'A smaller secondary lane.',
    href: siteConfig.mediumUrl,
  },
  {
    title: 'Signal layer',
    description: 'Filtered notes closer to the system.',
    href: '/signal/',
  },
] as const;

export const heroLens = [
  {
    label: 'In motion',
    value: 'RobinOS, blogs in progress, Bran Lab, and a quieter market practice.',
  },
  {
    label: 'Between',
    value: 'English and Chinese; software and capital.',
  },
  {
    label: 'Elsewhere',
    value: 'The rest stays in RobinOS until it earns daylight.',
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
    label: 'Platform',
    value: 'Blockchain banking and platform design.',
  },
  {
    label: 'Scale',
    value: 'One million users across regional infrastructure.',
  },
  {
    label: 'Reach',
    value: 'Cross-border payments for markets the legacy rails did not care to reach.',
  },
] as const;

export const pressFeatures = [
  {
    title: 'Nasdaq interview',
    href: 'https://financialit.net/news/blockchain/isunone-indicated-nasdaq-interview-future-blockchain-banking',
    description: 'An early conversation about blockchain banking and platform design.',
    source: 'Financial IT',
  },
  {
    title: 'One million users',
    href: 'https://hong-kong.media-outreach.com/news/hong-kong/2019/11/20/21203/isunone-reaches-1-million-users-and-promotes-blockchain-development-in-asean/',
    description: 'A milestone in scale, infrastructure, and cross-border finance. Still not a bank.',
    source: 'Media Outreach',
  },
  {
    title: 'Financial inclusion',
    href: 'https://www.media-outreach.com/news/hong-kong/2019/07/17/9617/isunone-teams-up-with-digital-bank-to-benefit-2-billion-underprivileged-population/',
    description: 'Payments and money flow for markets the legacy rails did not care to reach.',
    source: 'Media Outreach',
  },
] as const;

export const contactPrompts = [
  {
    title: 'Thoughtful partnerships',
    description: 'AI, capital, media, and long-horizon work.',
  },
  {
    title: 'Sharp conversations',
    description: 'A real thesis and a little context go a long way.',
  },
  {
    title: 'Clear channels',
    description: 'Start in the channel that fits the work.',
  },
] as const;
