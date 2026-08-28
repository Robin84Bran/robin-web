export type IdentityLocale = 'en' | 'zh-Hans' | 'zh-Hant' | 'ja';

export interface IdentityProfile {
  locale: IdentityLocale;
  languageLabel: string;
  homePath: string;
  aboutPath: string;
  name: string;
  nativeName: string;
  title: string;
  description: string;
  aboutTitle: string;
  aboutDescription: string;
  eyebrow: string;
  subtitle: string;
  homeIntro: string[];
  axis: string[];
  orbitLabel: string;
  spine: string;
  aboutLead: string;
  aboutParagraphs: string[];
  questionsTitle: string;
  questions: string[];
  principlesTitle: string;
  principles: string[];
  aboutLinkLabel: string;
  homeLinkLabel: string;
  languageNavLabel: string;
}

export const identityProfiles: Record<IdentityLocale, IdentityProfile> = {
  en: {
    locale: 'en',
    languageLabel: 'English',
    homePath: '/',
    aboutPath: '/about/',
    name: 'Robin Xie',
    nativeName: '谢玢 · 謝玢',
    title: 'Robin Xie (谢玢) — Engineer · Investor · AI System Builder',
    description: 'Robin Xie, also known as 谢玢 and 謝玢, is an engineer, investor, and AI system builder working across subsea engineering, FinTech, capital allocation, artificial intelligence, energy, robotics, and programmable finance.',
    aboutTitle: 'About Robin Xie (谢玢) — Engineering, Investing & AI Systems',
    aboutDescription: 'About Robin Xie (谢玢): an engineer, investor, and system builder whose work connects subsea engineering, FinTech, capital allocation, and AI systems.',
    eyebrow: 'Engineering · Investing · Artificial Intelligence',
    subtitle: 'Professional Engineer · Investor · AI-Native System Builder',
    homeIntro: [
      'I work at the intersection of intelligence and capital, bits and atoms.',
      'From subsea engineering to FinTech, capital allocation, and AI systems, the subject has remained the same: systems under uncertainty.',
    ],
    axis: ['Subsea engineering', 'FinTech', 'Capital', 'AI systems'],
    orbitLabel: 'One thread',
    spine: 'From subsea engineering to FinTech; from entrepreneurship to capital allocation; and now to AI systems. The path bends. The thread does not.',
    aboutLead: 'I am an engineer, investor, and system builder working at the intersection of intelligence and capital, bits and atoms.',
    aboutParagraphs: [
      'My career began far from financial markets and artificial intelligence, in subsea engineering. I worked with complex offshore systems, autonomous machines, and environments where elegant theories eventually had to survive contact with physics. That experience left me with a habit I have never quite lost: understand the system, find its constraints, and design for reality rather than appearance.',
      'From engineering, I moved into entrepreneurship and financial technology, working across payments, digital assets, and financial infrastructure. Over time, my attention shifted from building individual businesses toward a broader question: where should capital, technology, and human attention be placed if the horizon is measured in decades rather than quarters?',
      'Today, much of my work sits at that intersection. I study AI infrastructure, energy and power systems, robotics and Physical AI, stablecoins and programmable finance, and the companies building the next layer of technological infrastructure. I invest across public and private markets, while continuing to build experimental systems of my own.',
      'My AI work follows the same philosophy. RobinOS, quantitative research laboratories, and AI-assisted research workflows are attempts to iterate and automate intent into product, while I keep the final judgment and authority. They separate probabilistic exploration from deterministic controls, make decisions observable and reproducible, and allow humans and machines to work together without pretending either is infallible.',
      'Across subsea engineering, FinTech, investing, and AI, the subject has remained surprisingly constant: systems under uncertainty.',
      'iamrobin.ai is where I think in public. I write about engineering, investing, artificial intelligence, markets, and the occasional strange connection between them. Some ideas become investments. Some become experiments. Some simply remain questions worth carrying.',
      'There is no need to predict the future while I can literally build and shape it today.',
    ],
    questionsTitle: 'What I Ask',
    questions: ['How does it fail?', 'What constrains it?', 'Where should capital go?', 'What deserves ten years?'],
    principlesTitle: 'What I Keep',
    principles: ['See the system.', 'Find the constraint.', 'Design for reality.', 'Let time compound.'],
    aboutLinkLabel: 'Read About Robin',
    homeLinkLabel: 'Return home',
    languageNavLabel: 'Identity languages',
  },
  'zh-Hans': {
    locale: 'zh-Hans',
    languageLabel: '简体中文',
    homePath: '/zh-hans/',
    aboutPath: '/zh-hans/about/',
    name: '谢玢 Robin Xie',
    nativeName: '谢玢',
    title: '谢玢 Robin Xie｜工程、投资、人工智能与资本配置',
    description: '谢玢（Robin Xie）是工程师、投资人与 AI 系统构建者，职业经历横跨深海工程、金融科技、数字资产、资本配置与人工智能。长期研究 AI 基础设施、机器人、能源、电力、稳定币，以及公开与私人市场中的长期投资机会。',
    aboutTitle: '关于谢玢 Robin Xie｜工程、投资、人工智能与系统构建',
    aboutDescription: '关于谢玢（Robin Xie）：从深海工程、金融科技与创业实践，走向资本配置与 AI 系统建设。',
    eyebrow: '工程 · 投资 · 人工智能',
    subtitle: '专业工程师 · 投资人 · AI 原生系统构建者',
    homeIntro: [
      '我在智能与资本、比特与原子的交汇处工作。',
      '从深海工程，到金融科技；从创业实践，到资本配置；再到 AI 系统建设，看似峰回路转，实则一脉相承。',
    ],
    axis: ['海洋与海底工程', '金融科技', '资本配置', 'AI 系统'],
    orbitLabel: '一脉相承',
    spine: '从海洋与海底工程，到金融科技；从创业实践，到资本配置；再到 AI 系统建设。道路虽有转折，主线从未断。',
    aboutLead: '我是谢玢，工程师、投资人，系统构建者。我在智能与资本、比特与原子的交汇处工作。',
    aboutParagraphs: [
      '我的职业生涯始于深海工程。早年从事海洋与深海工程，接触复杂装备、自动化系统与海上作业。深海教给我的第一件事，不是如何追求完美，而是如何面对现实：环境瞬息万变，系统环环相扣，任何漂亮的理论，最终都要接受物理世界的检验。',
      '由此养成的思维方式，此后始终未变：追本溯源，审时度势；洞察约束，因势利导。',
      '后来，我从工程走向创业，从实体系统走入金融科技，先后关注跨境支付、数字资产与金融基础设施。随着时间推移，我的问题也逐渐发生变化：一个系统如何建成？什么样的系统值得建立？什么样的机会值得投入数十年？资本、技术与时间，又应当如何配置？',
      '于是，从创业走向投资，从执行走向资本配置，并非另起炉灶，而是水到渠成。今天，我长期关注人工智能基础设施、能源与电力系统、机器人与具身智能、稳定币与可编程金融，以及孕育这些变化的公开市场与私人市场。',
      '这些领域看似纵横交错，在我眼中却殊途同归。人工智能需要算力，算力需要电力；智能若要走出屏幕，便进入机器人与现实世界；机器与机器之间若要交易，则需要新的支付与金融协议；而所有技术浪潮最终都要面对同一个问题：谁来配置资本，资本为何而来，又将在何处沉淀。',
      '与此同时，我也在构建自己的 AI 系统与量化实验室。RobinOS、Quant Lab 与 AI 协作工作流，并非为了将人的判断拱手让给机器，而是探索一种新的协作方式：让机器广闻博采，让系统层层验证，让风险有迹可循，让决策有据可查。',
      '大道至简，知行合一。我更相信小规模实验、持续观测与长期复利，而非一次性的完美设计。',
      'iamrobin.ai 是我公开思考的地方。这里记录工程、投资、人工智能与市场，也记录它们彼此之间那些藕断丝连的联系。有些思考最终成为投资，有些成为实验，有些则暂且留作问题。',
      '我并不执着于预测未来。相比之下，我更希望见微知著、守正出奇，在未来到来之时，有能力认出并且参与它。',
    ],
    questionsTitle: '所问',
    questions: ['系统何以失效。', '瓶颈藏于何处。', '资本应往何方。', '何者值得十年。'],
    principlesTitle: '所守',
    principles: ['追本溯源。', '洞察约束。', '因势而为。', '与时间为友。'],
    aboutLinkLabel: '关于谢玢',
    homeLinkLabel: '返回首页',
    languageNavLabel: '身份语言',
  },
  'zh-Hant': {
    locale: 'zh-Hant',
    languageLabel: '繁體中文',
    homePath: '/zh-hant/',
    aboutPath: '/zh-hant/about/',
    name: '謝玢 Robin Xie',
    nativeName: '謝玢',
    title: '謝玢 Robin Xie｜工程、投資、人工智能與資本配置',
    description: '謝玢（Robin Xie）是工程師、投資人與 AI 系統構建者，職業經歷橫跨深海工程、金融科技、數位資產、資本配置與人工智能。長期研究 AI 基礎設施、機器人、能源、電力、穩定幣，以及公開與私人市場中的長期投資機會。',
    aboutTitle: '關於謝玢 Robin Xie｜工程、投資、人工智能與系統構建',
    aboutDescription: '關於謝玢（Robin Xie）：從深海工程、金融科技與創業實踐，走向資本配置與 AI 系統建設。',
    eyebrow: '工程 · 投資 · 人工智能',
    subtitle: '專業工程師 · 投資人 · AI 原生系統構建者',
    homeIntro: ['我在智能與資本、比特與原子的交會處工作。', '從海洋與海底工程到金融科技；從創業實踐到資本配置；再到 AI 系統建設，看似峰迴路轉，實則一脈相承。'],
    axis: ['海洋與海底工程', '金融科技', '資本配置', 'AI 系統'],
    orbitLabel: '一脈相承',
    spine: '從海洋與海底工程到金融科技；從創業實踐到資本配置；再到 AI 系統建設。道路雖有轉折，主線從未斷。',
    aboutLead: '我是謝玢，工程師、投資人，系統構建者。我在智能與資本、比特與原子的交會處工作。',
    aboutParagraphs: [
      '我的職業生涯始於深海工程。早年從事海洋與深海工程，接觸複雜裝備、自動化系統與海上作業。深海教給我的第一件事，不是如何追求完美，而是如何面對現實：環境瞬息萬變，系統環環相扣，任何漂亮的理論，最終都要接受物理世界的檢驗。',
      '由此養成的思維方式，此後始終未變：追本溯源，審時度勢；洞察約束，因勢利導。',
      '後來，我從工程走向創業，從實體系統走入金融科技，先後關注跨境支付、數位資產與金融基礎設施。隨著時間推移，我的問題逐漸變成：什麼樣的系統值得建立？什麼樣的機會值得投入數十年？資本、技術與時間，又應當如何配置？',
      '於是，從創業走向投資，從執行走向資本配置，並非另起爐灶，而是水到渠成。今天，我長期關注人工智能基礎設施、能源與電力系統、機器人與具身智能、穩定幣與可編程金融，以及孕育這些變化的公開市場與私人市場。',
      '這些領域看似縱橫交錯，在我眼中卻殊途同歸。人工智能需要算力，算力需要電力；智能若要走出螢幕，便進入機器人與現實世界；機器與機器之間若要交易，則需要新的支付與金融協議；而所有技術浪潮最終都要面對同一個問題：誰來配置資本，資本為何而來，又將在何處沉澱。',
      '與此同時，我也在構建自己的 AI 系統與量化實驗室。RobinOS、Quant Lab 與 AI 協作工作流，並非為了將人的判斷拱手讓給機器，而是探索一種新的協作方式：讓機器廣聞博採，讓系統層層驗證，讓風險有跡可循，讓決策有據可查。',
      '大道至簡，知行合一。我更相信小規模實驗、持續觀測與長期複利，而非一次性的完美設計。',
      'iamrobin.ai 是我公開思考的地方。這裡記錄工程、投資、人工智能與市場，也記錄它們彼此之間那些若即若離的聯繫。有些思考最終成為投資，有些成為實驗，有些則暫且留作問題。',
      '我並不執著於預測未來。相比之下，我更希望見微知著、守正出奇，在未來到來之時，有能力認出並且參與它。',
    ],
    questionsTitle: '所問',
    questions: ['系統何以失效。', '瓶頸藏於何處。', '資本應往何方。', '何者值得十年。'],
    principlesTitle: '所守',
    principles: ['追本溯源。', '洞察約束。', '因勢而為。', '與時間為友。'],
    aboutLinkLabel: '關於謝玢',
    homeLinkLabel: '返回首頁',
    languageNavLabel: '身份語言',
  },
  ja: {
    locale: 'ja',
    languageLabel: '日本語',
    homePath: '/ja/',
    aboutPath: '/ja/about/',
    name: 'Robin Xie（謝玢）',
    nativeName: 'ロビン・シエ',
    title: 'Robin Xie（謝玢）｜エンジニアリング、投資、AIシステム',
    description: 'Robin Xie（謝玢）は、海洋・海底エンジニアリング、FinTech、デジタル資産、資本配分、人工知能を横断するプロフェッショナル・エンジニア、投資家、AIネイティブ・システムビルダーです。',
    aboutTitle: 'Robin Xie（謝玢）について｜工学、投資、AIシステム',
    aboutDescription: 'Robin Xie（謝玢）の歩み。海洋・海底エンジニアリングからFinTech、起業、資本配分、そしてAIシステム構築へ。',
    eyebrow: '工学 · 投資 · 人工知能',
    subtitle: 'プロフェッショナル・エンジニア｜投資家｜AIネイティブ・システムビルダー',
    homeIntro: ['知性と資本、デジタルと物理世界の交点で仕事をしています。', '海洋・海底エンジニアリングからFinTechへ。起業から資本配分へ。そしてAIシステムへ。道は曲がっても、流れはひとつ。'],
    axis: ['海洋・海底エンジニアリング', 'FinTech', '資本配分', 'AIシステム'],
    orbitLabel: '流れはひとつ',
    spine: '海洋・海底エンジニアリングからFinTechへ。起業から資本配分へ。そしてAIシステムへ。道は曲がっても、流れはひとつ。',
    aboutLead: 'Robin Xie（謝玢）、ロビン・シエです。プロフェッショナル・エンジニア、投資家、AIネイティブ・システムビルダーとして、知性と資本、デジタルと物理世界の交点で仕事をしています。',
    aboutParagraphs: [
      '私のキャリアは深海工学から始まりました。複雑な海洋設備、自動化システム、海上作業に携わるなかで学んだのは、完璧さを追うことよりも現実と向き合うことでした。環境は変化し、システムは連鎖し、美しい理論も最後には物理世界の検証を受けます。',
      'そこで身についた姿勢は変わっていません。根本をたどり、制約を見つけ、状況に即して設計することです。',
      'その後、工学から起業へ、物理システムからFinTechへと進み、国際決済、デジタル資産、金融インフラに取り組みました。やがて問いは、システムをどう作るかだけでなく、何を作る価値があるのか、何に数十年を投じるべきか、資本・技術・時間をどこへ置くべきかへ変わりました。',
      '現在は、AIインフラ、エネルギーと電力、ロボティクスとPhysical AI、ステーブルコインとプログラマブル・ファイナンス、そしてそれらを育てる公開・非公開市場を長期的に見ています。',
      'これらは別々の領域に見えて、私には同じ流れです。AIには計算資源が必要で、計算資源には電力が必要です。知性が画面の外へ出ればロボットと現実世界に入り、機械同士が取引するなら新しい決済と金融のプロトコルが必要になります。最後に残る問いは、誰が資本を配分し、資本がどこに定着するのかです。',
      'RobinOS、Quant Lab、AI協働ワークフローも同じ哲学から生まれました。判断を機械へ明け渡すのではなく、機械に広く探索させ、システムで検証し、リスクと意思決定を追跡可能にするための実験です。',
      '小さく試し、観測を続け、長期で複利させる。私は一度きりの完璧な設計より、その方法を信じています。',
      'iamrobin.ai は、私が公開の場で考える場所です。工学、投資、人工知能、市場、そしてその間にある少し不思議なつながりを書いています。投資になる考えも、実験になる考えも、問いのまま持ち続けるものもあります。',
      '未来を言い当てることより、今日できることをつくる。未来が姿を現したとき、それを見分けられるように。',
    ],
    questionsTitle: '問い続けること',
    questions: ['システムはなぜ壊れるのか。', '制約はどこにあるのか。', '資本はどこへ向かうべきか。', '何に十年を託すのか。'],
    principlesTitle: '変わらないこと',
    principles: ['本質を見る。', '制約を見つける。', '現実に合わせて設計する。', '時間を味方につける。'],
    aboutLinkLabel: 'プロフィールを読む',
    homeLinkLabel: 'ホームへ戻る',
    languageNavLabel: '言語',
  },
};

export const identityHomeAlternates = (Object.values(identityProfiles) as IdentityProfile[]).map((profile) => ({
  hreflang: profile.locale,
  path: profile.homePath,
}));

export const identityAboutAlternates = (Object.values(identityProfiles) as IdentityProfile[]).map((profile) => ({
  hreflang: profile.locale,
  path: profile.aboutPath,
}));

export const identityKnowledge = [
  'Artificial Intelligence', 'AI Infrastructure', 'Physical AI', 'Robotics', 'Energy', 'Power Infrastructure',
  'FinTech', 'Stablecoins', 'Digital Assets', 'Capital Allocation', 'Public Markets', 'Private Markets',
  'Quantitative Research', 'Systems Engineering',
];
