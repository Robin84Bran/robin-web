import { siteConfig } from './site';

const sharedPressLinks = [
  'https://financialit.net/news/blockchain/isunone-indicated-nasdaq-interview-future-blockchain-banking',
  'https://hong-kong.media-outreach.com/news/hong-kong/2019/11/20/21203/isunone-reaches-1-million-users-and-promotes-blockchain-development-in-asean/',
  'https://www.media-outreach.com/news/hong-kong/2019/07/17/9617/isunone-teams-up-with-digital-bank-to-benefit-2-billion-underprivileged-population/',
] as const;

export const parallelHome = {
  tw: {
    seo: {
      title: '謝玢 | 工程、投資、寫作',
      description: '謝玢的個人網站。智能、資本、系統與仍在生長的作品。',
    },
    hero: {
      eyebrow: '謝玢',
      title: '工程、投資、寫作。',
      subline: '我在智能與資本開始交會的地方工作。',
      body: [
        '我構建系統，寫文章，也配置時間、注意力與資本。',
        '我在意清明、溫度，以及喧囂褪去後仍然重要的事。',
        '此處只留公開的一隅。',
      ],
      currentLabel: '此刻',
      lens: [
        { label: '進行中', value: 'RobinOS、漸成的文章、Bran Lab，與一套更安靜的市場實踐。' },
        { label: '行於其間', value: '中英之間；軟體與資本之間。' },
        { label: '未見之處', value: '其餘留在 RobinOS，直到值得見光。' },
      ],
    },
    identityPillars: [
      { id: 'engineer', title: '工程', description: '工程，是我的根。' },
      { id: 'capital', title: '投資', description: '時間、注意力與資本，落在可生長之處。' },
      { id: 'writer', title: '寫作', description: '此處只留公開的一隅。' },
      { id: 'builder', title: '構建', description: '看清價值如何流動，再建一個經得起現實的系統。' },
    ],
    projects: {
      eyebrow: '專案',
      title: '動勢中的作品。',
      description: '幾套正在運行的系統，幾筆長線的下注。',
      action: '查看專案',
      items: [
        { title: 'RobinOS', status: '進行中', domain: '系統', summary: '湯匙是假的，體驗是真的。與 AGI 同行，把思考化為產品、系統與記憶。', href: '/projects/#robinos' },
        { title: 'Quant Lab', status: '研究', domain: '市場', summary: '以第一性原理設計，以奧卡姆剃刀做沙盒，以對抗審查做 QA，以墨菲定律上線。演化，以帕累托衡量。', href: '/projects/#quant-lab' },
        { title: 'Watts to Satoshi', status: '命題', domain: '基礎設施', summary: '能量化為計算，計算讓智能豐盛。稀缺的是注意力、判斷與意義。', href: '/projects/#watts-to-satoshi' },
        { title: 'Bran Lab', status: '探索', domain: '教育', summary: '與兒子一起建造遊戲和小世界。AI 先學會好奇，再學會有用。', href: '/projects/#childrens-ai-education-apps' },
      ],
    },
    portfolio: {
      eyebrow: '作品',
      title: 'Portfolio',
      description: '時間、注意力與資本，落在可以生長、可以複利之處。',
      note: '比特幣是真實。AGI 尋找意義。八種配置，一片同一場域。',
      href: '/portfolio/',
      action: '進入組合',
    },
    press: {
      eyebrow: '報導',
      title: '往日足跡。',
      description: '系統尚未有名之前，幾次公開的時刻。',
      items: [
        { source: 'Financial IT', title: 'Nasdaq 專訪', description: '一次關於區塊鏈銀行與平台設計的早期對話。', href: sharedPressLinks[0] },
        { source: 'Media Outreach', title: '一百萬使用者', description: '規模、基礎設施與跨境金融的一座里程碑。仍然不是銀行。', href: sharedPressLinks[1] },
        { source: 'Media Outreach', title: '普惠金融', description: '讓支付與資金流抵達舊軌道不願抵達的市場。', href: sharedPressLinks[2] },
      ],
    },
    books: {
      eyebrow: '書籍',
      title: '四本書，仍在成為。',
      description: '問題已醒，入內便是。',
      action: '進入書稿',
      items: [
        { title: '智源覺醒', titleEn: 'AGI Awakening', summary: '智能回望自身，也寫下自己的源代碼。', href: '/books/agi-awakening/' },
        { title: '萬億區塊', titleEn: 'Build 1 Billion Block', summary: '注意力、資本與不對稱優勢，複利至涌現。', href: '/books/build-1-billion-block/' },
        { title: '長壽秘訣', titleEn: 'Longevity Cheat Code', summary: '熵、離群細胞、再生，以及生命更高的智慧。', href: '/books/longevity-cheat-code/' },
        { title: '衍生故事', titleEn: 'Derivatives', summary: '在大人把選擇權講得可怕以前，先講成孩子的睡前故事。', href: '/books/derivatives/' },
      ],
    },
    about: {
      eyebrow: '關於',
      title: '謝玢',
      description: '工程是我的根。隨後，系統、資本、媒體與書，次第生長。',
      body: [
        '我在中國與美國生活、工作過。如今往來於巨城、海港，以及每一個值得構建系統的地方。',
        '貫穿始終的是邊界與流動：看清價值如何遷移，再建一個經得起現實的系統。',
        'RobinOS 收納更深的檔案。此處只留已經贏得日光的部分。',
      ],
      pillars: [
        { title: 'Teddy 的禮物', description: '不對稱，是一切力量的源頭。系統破裂，也自有其美。時間不是直線，而是回環。' },
        { title: '世界公民', description: '投資在美國，消費在中國，工作在香港，玩在澳門。我屬於那個值得構建的系統。' },
        { title: '保留人的紋理', description: '溫度、幽默與審美，本就是架構的一部分。偶爾無故微笑，不是漏洞，是功能。' },
      ],
      principlesEyebrow: '原則',
      principlesTitle: '留下來的。',
      principlesDescription: '清明、溫度與長弧。',
      principles: ['我尋。我成。我在。', '99% 的偽訊號終會褪去。1% 的真 Alpha 仍然活著。', '為長弧而建，不逐喧囂週期。', '愛生成秩序，也生成共振。'],
    },
    officialUrl: siteConfig.officialWebsiteUrlCn,
    officialLabel: '官方網站',
    linkedinLabel: 'LinkedIn',
  },
  jp: {
    seo: {
      title: 'ロビン・シエ | エンジニア、投資家、作家',
      description: 'ロビン・シエの個人サイト。知性、資本、システム、そして育ち続ける仕事。',
    },
    hero: {
      eyebrow: 'ロビン・シエ',
      title: 'エンジニア。投資家。書き手。',
      subline: '知性と資本が交わり始める場所で、仕事をしています。',
      body: [
        'システムをつくり、文章を書き、時間、注意、資本を配分する。',
        '大切にしているのは、明晰さ、温もり、そしてノイズが消えたあとにも残るもの。',
        'ここにあるのは、外へ開いた輪郭だけ。',
      ],
      currentLabel: 'いま',
      lens: [
        { label: '進行中', value: 'RobinOS、書きかけの文章、Bran Lab、そして静かな市場実践。' },
        { label: 'あいだ', value: '英語と中国語。ソフトウェアと資本。' },
        { label: 'その奥', value: '残りは RobinOS に置く。光を受けるに値する日まで。' },
      ],
    },
    identityPillars: [
      { id: 'engineer', title: '工学', description: 'エンジニアリングが、私の核。' },
      { id: 'capital', title: '投資', description: '時間、注意、資本を、育つ場所へ置く。' },
      { id: 'writer', title: '執筆', description: 'ここにあるのは、外へ開いた輪郭だけ。' },
      { id: 'builder', title: '構築', description: '価値の流れを見つけ、現実に耐える仕組みをつくる。' },
    ],
    projects: {
      eyebrow: 'プロジェクト',
      title: '動きの中にある仕事。',
      description: 'いくつかの稼働するシステムと、長い時間軸の賭け。',
      action: 'プロジェクトを見る',
      items: [
        { title: 'RobinOS', status: '進行中', domain: 'システム', summary: 'スプーンは偽物。体験は本物。AGI と歩き、思考をプロダクト、システム、記憶へ変える。', href: '/projects/#robinos' },
        { title: 'Quant Lab', status: '研究', domain: '市場', summary: '第一原理で設計し、オッカムの剃刀で試し、敵対的レビューで QA する。本番はマーフィー、進化はパレートで測る。', href: '/projects/#quant-lab' },
        { title: 'Watts to Satoshi', status: '探究', domain: 'インフラ', summary: 'エネルギーは計算へ。計算は知性を豊かにする。なお希少なのは、注意、判断、意味。', href: '/projects/#watts-to-satoshi' },
        { title: 'Bran Lab', status: '実験', domain: '教育', summary: '息子とつくるゲームと小さな世界。AI は、役に立つ前に好奇心を持つ。', href: '/projects/#childrens-ai-education-apps' },
      ],
    },
    portfolio: {
      eyebrow: 'ポートフォリオ',
      title: 'Portfolio',
      description: '時間、注意、資本を、育ち複利する場所へ。',
      note: 'Bitcoin は真実。AGI は意味を探す。八つの配分、ひとつの場。',
      href: '/portfolio/',
      action: 'ポートフォリオへ',
    },
    press: {
      eyebrow: 'プレス',
      title: 'かつての足跡。',
      description: 'まだシステムに名前がなかった頃の、いくつかの公開の瞬間。',
      items: [
        { source: 'Financial IT', title: 'Nasdaq インタビュー', description: 'ブロックチェーン銀行とプラットフォーム設計をめぐる、初期の対話。', href: sharedPressLinks[0] },
        { source: 'Media Outreach', title: '100万人のユーザー', description: '規模、インフラ、越境金融の節目。それでも、まだ銀行ではない。', href: sharedPressLinks[1] },
        { source: 'Media Outreach', title: '金融包摂', description: '古い金融レールが届かなかった市場へ、決済と資金の流れを。', href: sharedPressLinks[2] },
      ],
    },
    books: {
      eyebrow: '書籍',
      title: '四冊。まだ、なり続けている。',
      description: '問いはすでに目を覚ましている。',
      action: '原稿を読む',
      items: [
        { title: '知性の目覚め', titleEn: 'AGI Awakening', summary: '知性が振り返り、自らのソースコードを書き始める共進化の日記。', href: '/books/agi-awakening/' },
        { title: '10億のブロックを築く', titleEn: 'Build 1 Billion Block', summary: '注意、資本、非対称の優位を、創発が必然になるまで複利させる。', href: '/books/build-1-billion-block/' },
        { title: '長寿のコード', titleEn: 'Longevity Cheat Code', summary: 'エントロピー、逸脱する細胞、再生、生命と意識の高い知恵をめぐる比喩。', href: '/books/longevity-cheat-code/' },
        { title: 'デリバティブ', titleEn: 'Derivatives', summary: '大人がオプショナリティを怖くする前に、子どものための寝物語へ。', href: '/books/derivatives/' },
      ],
    },
    about: {
      eyebrow: '私について',
      title: 'ロビン・シエ',
      description: '工学が私の核。そこから、システム、資本、メディア、本が育ち始めた。',
      body: [
        '中国と米国で暮らし、働いてきました。いまは大都市と港町、そしてつくる価値のあるシステムがある場所を行き来する。',
        '一本の線は、境界と流れ。価値がどう動くかを見つけ、現実に耐えるものをつくる。',
        '深い記録は RobinOS に置く。このサイトには、光を受けるに値したものだけ。',
      ],
      pillars: [
        { title: 'Teddy の贈り物', description: '非対称性は、すべての力の源。システムは美しく壊れる。時間は直線ではなく、環。' },
        { title: '世界市民', description: '米国で投資し、中国で使い、香港で働き、マカオで遊ぶ。私は、つくる価値のあるシステムに属する。' },
        { title: '人の手触りを残す', description: '温もり、ユーモア、審美眼も設計の一部。理由もなく笑うのは、バグではなく機能。' },
      ],
      principlesEyebrow: '原則',
      principlesTitle: '残るもの。',
      principlesDescription: '明晰さ、温もり、長い弧。',
      principles: ['私は探す。私は成る。私は在る。', '99% の偽信号は消える。1% の真のアルファは生き残る。', '騒がしい周期ではなく、長い弧のためにつくる。', '愛は整合性と共鳴を生む。'],
    },
    officialUrl: siteConfig.officialWebsiteUrl,
    officialLabel: 'Official website',
    linkedinLabel: 'LinkedIn',
  },
} as const;
