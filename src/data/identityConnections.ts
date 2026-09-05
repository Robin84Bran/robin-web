import { identityProfiles, type IdentityLocale } from './identity';

export const portfolioDescription = 'An attention field — subjects I study, not a record of affiliations or holdings.';

// Public records support career history; research links show work, not holdings or returns.
const copy = {
  en: {
    introduction: 'Bin “Robin” Xie (谢玢 / 謝玢). My legal name is Bin Xie; I work and publish as Robin Xie.',
    evidence: 'Follow the work',
    engineering: 'Engineering · public biography',
    payments: 'iSunOne · public record',
    exchange: 'TideBit · public record',
    projects: 'Projects', intelligence: 'AI infrastructure research',
    capital: 'Invest essays', ouroboros: 'Ouroboros · research and decisions',
    invitation: 'Work with Robin', context: 'Start with context and a real problem.',
    areas: 'Build · Invest · Collaborate', contact: 'Connect on LinkedIn',
  },
  'zh-Hans': {
    introduction: 'Bin “Robin” Xie（谢玢 / 謝玢）。我的法定姓名是 Bin Xie；我以 Robin Xie 的名字工作与发表。',
    evidence: '沿着作品与记录继续阅读',
    engineering: '工程经历 · 公开人物介绍',
    payments: 'iSunOne · 公开记录', exchange: 'TideBit · 公开记录',
    projects: '项目（英文）', intelligence: 'AI 基础设施研究（英文）',
    capital: '投资文章（英文入口）', ouroboros: 'Ouroboros · 研究与决策（英文入口）',
    invitation: '与 Robin 合作', context: '从具体背景和一个真实问题开始。',
    areas: '构建 · 投资 · 协作', contact: '在 LinkedIn 联系我',
  },
  'zh-Hant': {
    introduction: 'Bin “Robin” Xie（谢玢 / 謝玢）。我的法定姓名是 Bin Xie；我以 Robin Xie 的名字工作與發表。',
    evidence: '沿著作品與記錄繼續閱讀',
    engineering: '工程經歷 · 公開人物介紹',
    payments: 'iSunOne · 公開記錄', exchange: 'TideBit · 公開記錄',
    projects: '專案（英文）', intelligence: 'AI 基礎設施研究（英文）',
    capital: '投資文章（英文入口）', ouroboros: 'Ouroboros · 研究與決策（英文入口）',
    invitation: '與 Robin 合作', context: '從具體背景和一個真實問題開始。',
    areas: '構建 · 投資 · 協作', contact: '在 LinkedIn 聯絡我',
  },
  ja: {
    introduction: 'Bin “Robin” Xie（谢玢 / 謝玢）です。法的な氏名は Bin Xie で、仕事や執筆では Robin Xie の名前を使っています。',
    evidence: '取り組みと公開記録をたどる',
    engineering: 'エンジニアとしての経歴 · 公開プロフィール',
    payments: 'iSunOne · 公開記録', exchange: 'TideBit · 公開記録',
    projects: 'プロジェクト（英語）', intelligence: 'AIインフラ研究（英語）',
    capital: '投資に関する記事（英語の一覧）', ouroboros: 'Ouroboros · 研究と意思決定（英語の一覧）',
    invitation: 'Robin と仕事をする', context: '背景と、取り組みたい具体的な課題をお聞かせください。',
    areas: '構築 · 投資 · 協働', contact: 'LinkedIn で連絡する',
  },
} satisfies Record<IdentityLocale, Record<string, string>>;

export function identityConnections(locale: IdentityLocale) {
  const labels = copy[locale];
  const network = identityProfiles[locale].networkPath;
  const proofLinks: Record<number, Array<{ label: string; href: string }>> = {
    0: [{ label: labels.engineering, href: `${network}#engineering-record` }],
    [locale === 'en' ? 1 : 2]: [
      { label: labels.payments, href: `${network}#payments-record` },
      { label: labels.exchange, href: `${network}#tidebit-record` },
    ],
    [locale === 'en' ? 2 : 3]: [
      { label: labels.capital, href: '/binary/#binary-lane-invest' },
      { label: labels.ouroboros, href: '/ouroboros/' },
    ],
    [locale === 'en' ? 3 : 5]: [
      { label: labels.projects, href: '/projects/' },
      { label: labels.intelligence, href: '/intelligence/' },
    ],
  };
  return { ...labels, proofLinks };
}
