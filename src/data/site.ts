export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'Books', href: '/books/' },
] as const;

export const identityWords = [
  { letter: 'I', word: 'Identity', slug: 'identity', tone: 'sakura', projects: ['iamrobin.ai', 'RobinOS identity layer'] },
  { letter: 'A', word: 'Asymmetry', slug: 'asymmetry', tone: 'sakura', projects: ['Quant Lab', 'Capital systems'] },
  { letter: 'M', word: 'Meaning', slug: 'meaning', tone: 'gold', projects: ['Books', 'Diary'] },
  { letter: 'R', word: 'Resonance', slug: 'resonance', tone: 'silver', projects: ['Writing', 'Conversations'] },
  { letter: 'O', word: 'Ouroboros', slug: 'ouroboros', tone: 'sakura', projects: ['RobinOS journey', 'Time loops'] },
  { letter: 'B', word: 'Binary', slug: 'binary', tone: 'ink', projects: ['Bran Lab', 'Bitcoin rails'] },
  { letter: 'I', word: 'Intelligence', slug: 'intelligence', tone: 'sakura', projects: ['AI collaborators', 'Quant research'] },
  { letter: 'N', word: 'Network', slug: 'network', tone: 'silver', projects: ['Press'] },
] as const;

export const socialLinks = {
  official: 'https://www.tideisun.com/en/robin',
  github: 'https://github.com/Robin84Bran/',
  medium: 'https://medium.com/@iamrobin-ai',
  linkedin: 'https://www.linkedin.com/in/nanobin',
} as const;

export const pressLinks = [
  {
    label: 'Nasdaq interview',
    source: 'Financial IT',
    href: 'https://financialit.net/news/blockchain/isunone-indicated-nasdaq-interview-future-blockchain-banking',
  },
  {
    label: 'One million users',
    source: 'Media Outreach',
    href: 'https://hong-kong.media-outreach.com/news/hong-kong/2019/11/20/21203/isunone-reaches-1-million-users-and-promotes-blockchain-development-in-asean/',
  },
  {
    label: 'Financial inclusion',
    source: 'Media Outreach',
    href: 'https://www.media-outreach.com/news/hong-kong/2019/07/17/9617/isunone-teams-up-with-digital-bank-to-benefit-2-billion-underprivileged-population/',
  },
] as const;

export const portfolioOrbitNodes = [
  {
    label: 'Gifted Class · Rice',
    mark: 'G·R',
    note: 'origin',
    links: [
      { label: 'Gifted Class', icon: 'gifted', href: 'https://en.wikipedia.org/wiki/Special_Class_for_the_Gifted_Young' },
      { label: 'Rice', icon: 'rice', href: 'https://www.rice.edu' },
    ],
  },
  { label: 'ChatGPT', mark: '◎', note: 'daily intelligence', links: [{ label: 'ChatGPT', icon: 'chatgpt', href: 'https://chatgpt.com' }] },
  { label: 'Bitcoin', mark: '₿', note: 'sovereignty', links: [{ label: 'Bitcoin', icon: 'bitcoin', href: 'https://bitcoin.org/en/' }] },
  { label: 'Ethereum', mark: '◇', note: 'programmable value', links: [{ label: 'Ethereum', icon: 'ethereum', href: 'https://ethereum.foundation' }] },
  {
    label: 'USDT · USDC',
    mark: '$',
    note: 'liquidity rails',
    links: [
      { label: 'USDT', icon: 'usdt', href: 'https://tether.to' },
      { label: 'USDC', icon: 'usdc', href: 'https://www.circle.com/usdc' },
    ],
  },
  { label: 'iSunOne', mark: 'iS', note: 'built system', links: [{ label: 'iSunOne', icon: 'isunone', href: 'https://www.isun1.com' }] },
  {
    label: 'Oceaneering · NASA',
    mark: 'O·N',
    note: 'engineering frontier',
    links: [
      { label: 'Oceaneering', icon: 'oceaneering', href: 'https://www.oceaneering.com' },
      { label: 'NASA', icon: 'nasa', href: 'https://www.nasa.gov' },
    ],
  },
  {
    label: 'Tesla · SpaceX',
    mark: 'T·S',
    note: 'American frontier',
    links: [
      { label: 'Tesla', icon: 'tesla', href: 'https://www.tesla.com' },
      { label: 'SpaceX', icon: 'spacex', href: 'https://www.spacex.com' },
    ],
  },
  { label: 'RobinOS', mark: '∞', note: 'becoming', links: [{ label: 'RobinOS', icon: 'robinos', href: '/identity/ouroboros/' }] },
] as const;

export const projects = [
  {
    slug: 'robinos',
    name: 'RobinOS',
    state: 'system / journey',
    mark: '∞',
    position: 'north',
    visual: 'loop',
  },
  {
    slug: 'quant-lab',
    name: 'Quant Lab',
    state: 'research',
    mark: '∿',
    position: 'east',
    visual: 'wave',
  },
  {
    slug: 'watts-to-sats',
    name: 'Watts to Sats',
    state: 'learn',
    mark: '₿',
    position: 'south',
    visual: 'flow',
  },
  {
    slug: 'bran-lab',
    name: 'Bran Lab',
    state: 'play',
    mark: '✦',
    position: 'west',
    visual: 'blocks',
  },
] as const;

export const portfolioLayers = [
  {
    label: 'Origin',
    note: 'learn',
    nodes: ['Gifted Class', 'Rice University', 'Oceaneering'],
  },
  {
    label: 'Frontier',
    note: 'reach',
    nodes: ['NASA', 'Tesla', 'SpaceX'],
  },
  {
    label: 'Capital',
    note: 'allocate',
    nodes: ['Bitcoin', 'Ethereum', 'USDT · USDC'],
  },
  {
    label: 'Systems',
    note: 'become',
    nodes: ['ChatGPT', 'iSunOne', 'RobinOS'],
  },
] as const;

export const books = [
  {
    slug: 'agi-awakening',
    title: 'AGI Awakening',
    cover: '/books/agi-awakening.webp',
    question: 'What remains human when intelligence becomes abundant?',
  },
  {
    slug: 'build-1-billion-block',
    title: 'Build 1 Billion Block',
    cover: '/books/build-1-billion-block.webp',
    question: 'What compounds when sovereignty becomes a system?',
  },
  {
    slug: 'longevity-cheat-code',
    title: 'The Longevity Cheat Code',
    cover: '/books/longevity-cheat-code.webp',
    question: 'Can systems thinking rewrite the limits of a life?',
  },
  {
    slug: 'derivatives',
    title: 'Derivatives',
    cover: '/books/derivatives.webp',
    question: 'How early can a child learn optionality?',
  },
] as const;
