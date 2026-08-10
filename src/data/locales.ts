import { footerLinks, siteConfig, socialLinks } from './site';
import type { SiteLocale } from '../lib/i18n';

interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  blurb: string;
}

interface LocaleChrome {
  brandName: string;
  brandHref: string;
  brandSubline: string;
  navigation: readonly NavItem[];
  siteLinks: readonly NavItem[];
  blogCta: string;
  footerLinks: readonly FooterLink[];
  socialLinks: readonly SocialLink[];
  skipToContent: string;
  updatedLabel: string;
  booksLabel: string;
}

export const localeChrome: Record<SiteLocale, LocaleChrome> = {
  en: {
    brandName: siteConfig.name,
    brandHref: '/',
    brandSubline: 'iamrobin.ai',
    navigation: [
      { label: 'About', href: '/about/' },
      { label: 'Projects', href: '/projects/' },
      { label: 'Portfolio', href: '/portfolio/' },
      { label: 'Books', href: '/books/' },
      { label: 'Writing', href: '/writing/' },
      { label: 'Press', href: '/now/' },
      { label: 'Contact', href: '/contact/' },
      { label: 'GitHub', href: siteConfig.githubUrl, external: true },
    ],
    siteLinks: [
      { label: 'About', href: '/about/' },
      { label: 'Projects', href: '/projects/' },
      { label: 'Portfolio', href: '/portfolio/' },
      { label: 'Books', href: '/books/' },
      { label: 'Writing', href: '/writing/' },
      { label: 'Press', href: '/now/' },
      { label: 'Contact', href: '/contact/' },
    ],
    blogCta: 'Ghost',
    footerLinks,
    socialLinks,
    skipToContent: 'Skip to content',
    updatedLabel: 'Updated',
    booksLabel: 'Books',
  },
  cn: {
    brandName: '谢玢',
    brandHref: '/cn/',
    brandSubline: 'iamrobin.ai',
    navigation: [
      { label: '关于', href: '/cn/about/' },
      { label: '项目', href: '/cn/projects/' },
      { label: '作品', href: '/portfolio/' },
      { label: '书籍', href: '/cn/books/' },
      { label: '写作', href: '/cn/writing/' },
      { label: '报道', href: '/cn/now/' },
      { label: '联系', href: '/cn/contact/' },
      { label: 'GitHub', href: siteConfig.githubUrl, external: true },
    ],
    siteLinks: [
      { label: '关于', href: '/cn/about/' },
      { label: '项目', href: '/cn/projects/' },
      { label: '作品', href: '/portfolio/' },
      { label: '书籍', href: '/cn/books/' },
      { label: '写作', href: '/cn/writing/' },
      { label: '报道', href: '/cn/now/' },
      { label: '联系', href: '/cn/contact/' },
    ],
    blogCta: '博客',
    footerLinks,
    socialLinks: [
      {
        label: 'GitHub',
        href: siteConfig.githubUrl,
        blurb: '代码、实验与系统痕迹。',
      },
      {
        label: '博客',
        href: siteConfig.blogUrl,
        blurb: '长文、札记与主档所在。',
      },
      {
        label: 'Medium',
        href: siteConfig.mediumUrl,
        blurb: '择文外放之处。',
      },
      {
        label: 'X',
        href: siteConfig.xUrl,
        blurb: '短讯、碎片与即时信号。',
      },
      {
        label: 'LinkedIn',
        href: siteConfig.linkedinUrl,
        blurb: '正式来意与机构语境。',
      },
    ],
    skipToContent: '跳至内容',
    updatedLabel: '更新',
    booksLabel: '书籍',
  },
  tw: {
    brandName: '謝玢',
    brandHref: '/tw/',
    brandSubline: 'iamrobin.ai',
    navigation: [
      { label: '關於', href: '/tw/#about' },
      { label: '專案', href: '/tw/#projects' },
      { label: '作品', href: '/portfolio/' },
      { label: '書籍', href: '/tw/#books' },
      { label: '寫作', href: siteConfig.blogUrl, external: true },
      { label: '報導', href: '/tw/#press' },
      { label: '聯絡', href: '/contact/' },
      { label: 'GitHub', href: siteConfig.githubUrl, external: true },
    ],
    siteLinks: [
      { label: '關於', href: '/tw/#about' },
      { label: '專案', href: '/tw/#projects' },
      { label: '作品', href: '/portfolio/' },
      { label: '書籍', href: '/tw/#books' },
      { label: '報導', href: '/tw/#press' },
      { label: '聯絡', href: '/contact/' },
    ],
    blogCta: '部落格',
    footerLinks,
    socialLinks: [],
    skipToContent: '跳至內容',
    updatedLabel: '更新',
    booksLabel: '書籍',
  },
  jp: {
    brandName: 'ロビン・シエ',
    brandHref: '/jp/',
    brandSubline: 'iamrobin.ai',
    navigation: [
      { label: '紹介', href: '/jp/#about' },
      { label: 'プロジェクト', href: '/jp/#projects' },
      { label: 'ポートフォリオ', href: '/portfolio/' },
      { label: '書籍', href: '/jp/#books' },
      { label: '執筆', href: siteConfig.blogUrl, external: true },
      { label: 'プレス', href: '/jp/#press' },
      { label: '連絡', href: '/contact/' },
      { label: 'GitHub', href: siteConfig.githubUrl, external: true },
    ],
    siteLinks: [
      { label: '紹介', href: '/jp/#about' },
      { label: 'プロジェクト', href: '/jp/#projects' },
      { label: 'ポートフォリオ', href: '/portfolio/' },
      { label: '書籍', href: '/jp/#books' },
      { label: 'プレス', href: '/jp/#press' },
      { label: '連絡', href: '/contact/' },
    ],
    blogCta: 'ブログ',
    footerLinks,
    socialLinks: [],
    skipToContent: '本文へ',
    updatedLabel: '更新',
    booksLabel: '書籍',
  },
};
