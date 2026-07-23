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
    title: '报道 | 谢玢',
    description: '谢玢早期关于区块链银行、跨境金融与普惠支付的公开足迹。',
  },
  contact: {
    title: '联系 | 谢玢',
    description: '如有同频，可由此相遇。',
  },
} as const;

export const cnHome = {
  hero: {
    eyebrow: '谢玢',
    lineOne: '工程、投资、写作。',
    lineTwo: '我在智能与资本开始交汇的地方工作。',
    body: [
      '我构建系统，写文章，也配置时间、注意力与资本。',
      '我在意清晰、温度，以及喧嚣褪去后仍然重要的事。',
      '这里只留公开的边界。',
    ],
  },
  lens: [
    {
      label: '正进行',
      value: 'RobinOS、渐成的文章、Bran Lab，与一套更安静的市场实践。',
    },
    {
      label: '行于其间',
      value: '中英之间；软件与资本之间。',
    },
    {
      label: '未见之处',
      value: '其余留在 RobinOS，直到值得见光。',
    },
  ],
  identityPillars: [
    { id: 'engineer', title: '工程', description: '工程，是我的根。' },
    { id: 'capital', title: '投资', description: '时间、注意力与资本，落在可生长之处。' },
    { id: 'writer', title: '写作', description: '这里只留公开的边界。' },
    { id: 'builder', title: '构建', description: '看清价值如何流动，再建一个经得起现实的系统。' },
  ],
  booksHeading: {
    eyebrow: '书籍',
    title: '四本书，仍在成为。',
    description: '问题已醒，入内便是。',
  },
  projectsHeading: {
    eyebrow: '项目',
    title: '动势中的作品。',
    description: '几套正在运行的系统，几笔长线的下注。',
  },
  signal: {
    quote: '静一点，反而看得更久。',
    description: '代码、资本、书与长期工作，在此留一点痕迹。',
  },
  contact: {
    eyebrow: '联系',
    title: '若有同频，轻轻敲门。',
    description: '来意清楚，就很好。',
  },
} as const;

export const cnAbout = {
  intro: {
    kicker: '关于',
    title: '谢玢',
    description: '工程是我的根。随后，系统、资本、媒体与书，次第生长。',
    updated: '2026年7月',
  },
  body: [
    '工程是我的根。随后，系统、资本、媒体与书，次第生长。',
    '我在中国与美国生活、工作过。如今往来于巨城、海港，以及每一个值得构建系统的地方。',
    '贯穿始终的是边界与流动：看清价值如何迁移，再建一个经得起现实的系统。',
    'RobinOS 收纳更深的档案。这里只留已经赢得日光的部分。',
  ],
  pillars: [
    { title: 'Teddy 的礼物', description: '不对称，是一切力量的源头。系统破裂，也自有其美。时间不是直线，而是回环。' },
    { title: '世界公民', description: '投资在美国，消费在中国，工作在香港，玩在澳门。我属于那个值得构建的系统。' },
    { title: '保留人的纹理', description: '温度、幽默与审美，本就是架构的一部分。偶尔无故微笑，不是漏洞，是功能。' },
  ],
  principles: ['我寻。我成。我在。', '99% 的伪信号终会褪去。1% 的真阿尔法仍然活着。', '为长弧而建，不逐喧嚣周期。', '爱生成秩序，也生成共振。'],
} as const;

export const cnBooksPage = {
  intro: {
    kicker: '书籍',
    title: '四本书，仍在成为。',
    description: '问题已醒，入内便是。',
    updated: '2026年7月',
  },
  body: ['书未完成，问题已醒。', '各自生长，各自成形。'],
} as const;

export const cnBooks: CnBook[] = [
  {
    slug: 'agi-awakening',
    titleCn: '智源觉醒',
    titleEn: 'AGI Awakening',
    status: '活稿',
    theme: '智能、镜像与生成',
    thesis: '一部共同演化的日记：智能回望自身，也写下自己的源代码。',
    introLines: ['智能开始回望', '人与代码，互为镜像', '源代码，也在写自己'],
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
    thesis: '让注意力、资本与不对称优势持续复利，直到涌现成为必然。',
    introLines: ['注意力先聚，资本随后', '不对称优势，缓慢复利', '直到涌现成为必然'],
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
    thesis: '关于熵、离群细胞、再生，以及生命与意识更高智慧的隐喻探问。',
    introLines: ['熵在增长，生命仍会回身', '离群者未必是敌', '再生，也许始于理解'],
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
    thesis: '在大人把选择权讲得可怕以前，先把它讲成孩子的睡前故事。',
    introLines: ['复杂未必要艰深', '选择，可以先成为故事', '孩子先懂，大人再别害怕'],
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
    description: '文字在边界处慢慢聚拢',
    updated: '2026年7月',
  },
  body: ['不急完整，只留方向', '有的成文，有的未定', '够用的那部分，先留下'],
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
    title: '动势中的作品。',
    description: '几套正在运行的系统，几笔长线的下注。',
    updated: '2026年7月',
  },
  body: ['小而关键。只留正在发生的部分。'],
  items: [
    {
      slug: 'robinos',
      title: 'RobinOS',
      status: '系统进行中',
      domain: '身份与操作界面',
      summary: '汤匙是假的，体验是真的。与 AGI 同行，把思考化为产品、系统与记忆。',
      impact: '思考，成为产品、系统与记忆。',
    },
    {
      slug: 'quant-lab',
      title: 'Quant Lab',
      status: '研究引擎',
      domain: '市场与智能',
      summary: '以第一性原理设计，以奥卡姆剃刀做沙盒，以对抗审查做 QA，以墨菲定律上生产。演化，由帕累托衡量。',
      impact: '以墨菲定律上生产，以帕累托衡量演化。',
    },
    {
      slug: 'watts-to-satoshi',
      title: 'Watts to Satoshi',
      status: '命题进行中',
      domain: '能源、基础设施与数字资产',
      summary: '能量化为计算，计算让智能丰盛。还剩什么稀缺？注意力、判断与意义。',
      impact: '注意力、判断与意义，依然稀缺。',
    },
    {
      slug: 'childrens-ai-education-apps',
      title: 'Bran Lab',
      status: '产品探索',
      domain: '教育与成长',
      summary: '与儿子一起建造游戏和小世界。AI 先学会好奇，再学会有用。',
      impact: 'AI 先学会好奇，再学会有用。',
    },
  ],
} as const;

export const cnNow = {
  intro: {
    kicker: '报道',
    title: '往日足迹。',
    description: '系统尚未有名之前，几次公开的时刻。',
    updated: '2026年7月',
  },
  body: ['系统尚未有名，路径已经留下。'],
  snapshot: [
    { label: '平台', value: '区块链银行与平台设计。' },
    { label: '规模', value: '一百万用户，与区域基础设施。' },
    { label: '抵达', value: '让跨境支付抵达旧轨道忽略的市场。' },
  ],
  loops: ['银行，不只是一张牌照。', '规模，不只是一个数字。', '支付，先要抵达。'],
  press: [
    {
      source: 'Financial IT',
      title: 'Nasdaq 采访',
      description: '一次关于区块链银行与平台设计的早期对话。',
      href: 'https://financialit.net/news/blockchain/isunone-indicated-nasdaq-interview-future-blockchain-banking',
    },
    {
      source: 'Media Outreach',
      title: '一百万用户',
      description: '规模、基础设施与跨境金融的一座里程碑。仍然不是银行。',
      href: 'https://hong-kong.media-outreach.com/news/hong-kong/2019/11/20/21203/isunone-reaches-1-million-users-and-promotes-blockchain-development-in-asean/',
    },
    {
      source: 'Media Outreach',
      title: '普惠金融',
      description: '让支付与资金流抵达旧轨道不愿抵达的市场。',
      href: 'https://www.media-outreach.com/news/hong-kong/2019/07/17/9617/isunone-teams-up-with-digital-bank-to-benefit-2-billion-underprivileged-population/',
    },
  ],
} as const;

export const cnContact = {
  intro: {
    kicker: '联系',
    title: '联系',
    description: '不设入口，自有来路',
    updated: '2026年7月',
  },
  body: ['若有缘份，自会相遇', '不急回应，重在真实', '有话直说，就很好'],
  prompts: [
    { title: '合作', description: '若方向同频，慢慢说也来得及。' },
    { title: '来意', description: '不必铺陈，先说真正关心什么。' },
    { title: '渠道', description: '选一条最贴近事情本身的路。' },
  ],
} as const;
