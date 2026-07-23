import { footerLinks, siteConfig, socialLinks } from './site';
import type { SiteLocale } from '../lib/i18n';

interface NavItem {
  label: string;
  href: string;
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
      { label: 'Projects', href: '/projects/' },
      { label: 'Portfolio', href: '/portfolio/' },
      { label: 'Press', href: '/now/' },
      { label: 'Books', href: '/books/' },
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
      { label: '项目', href: '/cn/projects/' },
      { label: '作品', href: '/portfolio/' },
      { label: '报道', href: '/cn/now/' },
      { label: '书籍', href: '/cn/books/' },
    ],
    blogCta: '博客',
    footerLinks: [
      { label: 'ENS', href: siteConfig.ensUrl },
      { label: 'LinkedIn', href: siteConfig.linkedinUrl },
      { label: 'Medium', href: siteConfig.mediumUrl },
      { label: 'Blog', href: siteConfig.blogUrl },
    ],
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
      { label: '專案', href: '/tw/#projects' },
      { label: '作品', href: '/portfolio/' },
      { label: '報導', href: '/tw/#press' },
      { label: '書籍', href: '/tw/#books' },
    ],
    blogCta: '部落格',
    footerLinks: [
      { label: 'ENS', href: siteConfig.ensUrl },
      { label: 'LinkedIn', href: siteConfig.linkedinUrl },
      { label: 'Medium', href: siteConfig.mediumUrl },
      { label: 'Blog', href: siteConfig.blogUrl },
    ],
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
      { label: 'プロジェクト', href: '/jp/#projects' },
      { label: 'ポートフォリオ', href: '/portfolio/' },
      { label: 'プレス', href: '/jp/#press' },
      { label: '書籍', href: '/jp/#books' },
    ],
    blogCta: 'ブログ',
    footerLinks: [
      { label: 'ENS', href: siteConfig.ensUrl },
      { label: 'LinkedIn', href: siteConfig.linkedinUrl },
      { label: 'Medium', href: siteConfig.mediumUrl },
      { label: 'Blog', href: siteConfig.blogUrl },
    ],
    socialLinks: [],
    skipToContent: '本文へ',
    updatedLabel: '更新',
    booksLabel: '書籍',
  },
};
