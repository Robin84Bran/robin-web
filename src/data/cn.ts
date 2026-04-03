import type { BookSlug } from './books';
import { siteConfig } from './site';

interface CnBookTheme {
  title: string;
  description: string;
}

interface CnBookSurface {
  title: string;
  description: string;
}

interface CnBookArchive {
  title: string;
  note: string;
}

interface CnBook {
  slug: BookSlug;
  titleCn: string;
  titleEn: string;
  status: string;
  theme: string;
  thesis: string;
  introLines: string[];
  themes: CnBookTheme[];
  surfaces: CnBookSurface[];
  archive: CnBookArchive[];
}

export const cnSeo = {
  home: {
    title: '谢玢 | 系统、资本与生成中的界面',
    description: '谢玢的个人站点。系统、资本、叙事与媒介，在此并流。',
  },
  about: {
    title: '关于 | 谢玢',
    description: '关于谢玢：在系统、资本、媒体与叙事之间工作。',
  },
  books: {
    title: '书稿 | 谢玢',
    description: '未竟之书，缓慢成形。',
  },
  writing: {
    title: '写作 | 谢玢',
    description: '边界之处，信号浮现。',
  },
  projects: {
    title: '项目 | 谢玢',
    description: '关键项目、系统实验与长期方向。',
  },
  now: {
    title: '此刻 | 谢玢',
    description: '此刻的重心、仍在移动的问题与长期方向。',
  },
  contact: {
    title: '联系 | 谢玢',
    description: '如有同频，可由此相遇。',
  },
} as const;

export const cnHome = {
  hero: {
    eyebrow: '谢玢',
    lineOne: '构形造势，执局行远，生养其间',
    lineTwo: '万物流转，资本为骨，代币为形',
    body: ['自成一界，有序而生', '择流而存，知者自知'],
  },
  lens: [
    {
      label: '乐在其中',
      value: '系统、资本、教育、媒体，并行不悖。',
    },
    {
      label: '行于其间',
      value: '中英双语，跨境来回，长线为先。',
    },
    {
      label: '正在生长',
      value: '操作系统，量化实验，瓦特通证，与子同行',
    },
  ],
  identityPillars: [
    { id: 'engineer', title: '构形', description: '格网成序，结构自明。' },
    { id: 'capital', title: '造势', description: '流转成势，复利成骨。' },
    { id: 'writer', title: '成文', description: '信号成句，余波自留。' },
    { id: 'builder', title: '成界', description: '诸元装配，界面自生。' },
  ],
  booksHeading: {
    eyebrow: '书稿',
    title: '未成之书，先有其意。',
    description: '一册一念，各自生长。',
  },
  projectsHeading: {
    eyebrow: '项目',
    title: '系统在动，实验仍新。',
    description: '有的建模，有的试错，有的只见其势。',
  },
  signal: {
    quote: '界面沉静，暗流自明。',
    description: '代码、资本、媒体与长线判断，在此同场。',
  },
  contact: {
    eyebrow: '联系',
    title: '若有同频，可由此入。',
    description: '来意清楚，语气真实，便已足够。',
  },
} as const;

export const cnAbout = {
  intro: {
    kicker: '关于',
    title: '关于',
    description: '系统、资本、媒体、叙事，在此同流。',
    updated: '2026年3月',
  },
  body: [
    '先识结构，再定动作。',
    '软件、资本、媒体与叙事，在这里并不分家。',
    '有些事在建，有些事在养，有些事只等时机显影。',
  ],
  pillars: [
    { title: '系统感', description: '先看结构，再看势能。' },
    { title: '长线观', description: '不急收口，只看复利。' },
    { title: '一身为界', description: '把写作、投资、构建收成同一界面。' },
  ],
  principles: ['宁静胜于喧哗。', '少即是多，留白的艺术。', '先让系统成立，再让叙事浮现。', '有人情味的代码是何种面貌？'],
} as const;

export const cnBooksPage = {
  intro: {
    kicker: '书稿',
    title: '书稿',
    description: '言未完成，意已成形',
    updated: '2026年3月',
  },
  body: ['一册一念，各自生长', '或深或浅，或缓或急', '不急结论，自会成书'],
} as const;

export const cnBooks: CnBook[] = [
  {
    slug: 'agi-awakening',
    titleCn: '智源觉醒',
    titleEn: 'AGI Awakening',
    status: '活稿',
    theme: '智能、镜像与生成',
    thesis: '大局未定，智源先启',
    introLines: ['大局未定，智源先启', '人与代码，互为镜像', '其形未成，其势已起'],
    themes: [
      { title: '镜中之智', description: '人与代码互照，界线开始松动。' },
      { title: '势起于前', description: '形未定时，系统已在移动。' },
      { title: '作者回身', description: '写作、构建与自我一起被改写。' },
    ],
    surfaces: [
      { title: '表层一', description: '几个段落先浮出，其余仍在回旋。' },
      { title: '表层二', description: '不急于公开全部，只让必要之物先见光。' },
    ],
    archive: [
      { title: '镜后回声', note: '尚在回旋。' },
      { title: '未命名节点', note: '先沉一层。' },
      { title: '旧稿残片', note: '留待再编。' },
    ],
  },
  {
    slug: 'build-1-billion-block',
    titleCn: '万亿区块',
    titleEn: 'Build 1 Billion Block',
    status: '活稿',
    theme: '结构、优势与复利',
    thesis: '系统成局，复利成势',
    introLines: ['结构先立，规模后至', '人心有波，系统要稳', '时间不是背景，而是杠杆'],
    themes: [
      { title: '结构复利', description: '把系统搭成会自行增益的形。' },
      { title: '状态管理', description: '人在不同状态下，资本也会换一种面孔。' },
      { title: '压力执行', description: '真正的结构，要经得起波动与迟疑。' },
    ],
    surfaces: [
      { title: '表层一', description: '先谈结构，再谈放大。' },
      { title: '表层二', description: '若系统不稳，规模只是幻觉。' },
    ],
    archive: [
      { title: '周期残卷', note: '仍在校准时序。' },
      { title: '心法旁注', note: '先留在边层。' },
      { title: '执行底稿', note: '待再压缩。' },
    ],
  },
  {
    slug: 'longevity-cheat-code',
    titleCn: '长寿秘诀',
    titleEn: 'Longevity Cheat Code',
    status: '活稿',
    theme: '生命、修复与再整合',
    thesis: '与其对抗熵增，不如借助爱、共振与生命的力量',
    introLines: ['与其对抗熵增，不如借助爱、共振与生命的力量', '失序未必是敌，或许只是信使', '真正的修复，常从理解开始'],
    themes: [
      { title: '生命学习', description: '身体不是静物，而是会学习的系统。' },
      { title: '时间窗口', description: '有些决定先是生物学，后来才变成策略。' },
      { title: '再整合', description: '理解偏离，才能让系统回身。' },
    ],
    surfaces: [
      { title: '表层一', description: '几个问题已露面，答案仍不急。' },
      { title: '表层二', description: '先让线索并存，再慢慢收束。' },
    ],
    archive: [
      { title: '边层笔记', note: '仍在聚拢。' },
      { title: '时间协议', note: '还未公开。' },
      { title: '修复残片', note: '先保留弹性。' },
    ],
  },
  {
    slug: 'derivatives',
    titleCn: '衍生故事',
    titleEn: 'Derivatives',
    status: '活稿',
    theme: '期权、期货与讲故事的方式',
    thesis: '把复杂金融，讲成孩子也能记住的故事',
    introLines: ['复杂未必要艰深', '不确定性也能被轻轻说明', '先让人愿意听，再让人慢慢懂'],
    themes: [
      { title: '先可读', description: '让风险先变得可看，再谈术语。' },
      { title: '物象解释', description: '用雨伞、约定与游戏去讲选择。' },
      { title: '先好玩', description: '好玩的入口，比严肃的定义更长久。' },
    ],
    surfaces: [
      { title: '表层一', description: '先放出几则故事，让概念自己站住。' },
      { title: '表层二', description: '不是教条，是可以带着笑意的金融。' },
    ],
    archive: [
      { title: '操场希腊字母', note: '先留作侧枝。' },
      { title: '午餐盒凸性', note: '还在找更轻的讲法。' },
      { title: '波动灯笼', note: '气氛先存着。' },
    ],
  },
];

export const cnWriting = {
  intro: {
    kicker: '写作',
    title: '写作',
    description: '边界之处，信号浮现',
    updated: '2026年3月',
  },
  body: ['不求完整，只留方向', '有的成文，有的未定', '所及之处，亦已足够'],
  tracks: [
    {
      label: '外部',
      title: '主档在 Ghost',
      description: '长文、札记与持续线索，在那里汇流。',
      href: siteConfig.blogUrl,
    },
    {
      label: '外部',
      title: '择文分发至 Medium',
      description: '少量文章外放，主档不移。',
      href: siteConfig.mediumUrl,
    },
    {
      label: '内部',
      title: '回到主界面',
      description: '有些信号尚未成文，只在系统里回流。',
      href: '/cn/',
    },
  ],
  themes: ['智能与人之间。', '资本与叙事之间。', '身份与媒介之间。'],
} as const;

export const cnProjects = {
  intro: {
    kicker: '项目',
    title: '项目',
    description: '不求齐全，只留关键',
    updated: '2026年3月',
  },
  body: ['系统成形，实验进行', '有的建模，有的探索', '方向在前，路径自生'],
  items: [
    {
      slug: 'robinos',
      title: 'RobinOS',
      status: '系统进行中',
      domain: '身份与操作界面',
      summary: '时间复利，集思考、投资、写作为一体的操作系统',
      impact: '让身份成为基础设施。',
    },
    {
      slug: 'quant-lab',
      title: 'Quant Lab',
      status: '研究引擎',
      domain: '市场与智能',
      summary: '市场研究、信号提炼、建模迭代之“量化”实验室',
      impact: '让判断更可验证。',
    },
    {
      slug: 'watts-to-satoshi',
      title: 'Watts to Satoshi',
      status: '命题进行中',
      domain: '能源、基础设施与数字资产',
      summary: '能源、算力、通证和资本放在多维框架的诠释',
      impact: '把挖矿重看为协调层。',
    },
    {
      slug: 'childrens-ai-education-apps',
      title: 'Bran Lab',
      status: '产品探索',
      domain: '教育与成长',
      summary: '执子之手，与子同行，给孩子的游戏',
      impact: '让好奇心有更好的载体。',
    },
  ],
} as const;

export const cnNow = {
  intro: {
    kicker: '此刻',
    title: '此刻',
    description: '重心所在，缓慢移动',
    updated: '2026年4月2日',
  },
  body: ['有的在做，有的在想', '尚未成形，已在路上'],
  snapshot: [
    { label: '所重', value: '系统、资本、写作与教育界面。' },
    { label: '所行', value: '有些在推进，有些仍在沉淀。' },
    { label: '所向', value: '方向已现，形体还在慢慢长出。' },
  ],
  loops: ['何为结构', '何为流动', '何为长期'],
  press: [
    {
      source: 'Financial IT',
      title: 'Robin Xie 的 Nasdaq 采访',
      description: '一次与区块链银行、平台想象与全球路径有关的公开坐标。',
      href: 'https://financialit.net/news/blockchain/isunone-indicated-nasdaq-interview-future-blockchain-banking',
    },
    {
      source: 'Media Outreach',
      title: '区块链银行在东盟会是什么样子',
      description: '关于用户增长、区域扩张与东盟区块链发展的一次公开记录。',
      href: 'https://hong-kong.media-outreach.com/news/hong-kong/2019/11/20/21203/isunone-reaches-1-million-users-and-promotes-blockchain-development-in-asean/',
    },
    {
      source: 'Media Outreach',
      title: '面向二十亿未被服务人群的跨境支付与普惠金融',
      description: '一条关于跨境支付、数字银行与普惠金融的公开线索。',
      href: 'https://www.media-outreach.com/news/hong-kong/2019/07/17/9617/isunone-teams-up-with-digital-bank-to-benefit-2-billion-underprivileged-population/',
    },
  ],
} as const;

export const cnContact = {
  intro: {
    kicker: '联系',
    title: '联系',
    description: '不设入口，自有来路',
    updated: '2026年3月',
  },
  body: ['若有缘份，自会相遇', '不急回应，重在真实', '言之有物，便可继续'],
  prompts: [
    { title: '合作', description: '若方向同频，慢慢说也来得及。' },
    { title: '来意', description: '不必铺陈，先说真正关心什么。' },
    { title: '渠道', description: '选一条最贴近事情本身的路。' },
  ],
} as const;
