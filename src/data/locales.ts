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
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about/' },
      { label: 'Books', href: '/books/' },
      { label: 'Writing', href: '/writing/' },
      { label: 'Projects', href: '/projects/' },
      { label: 'Now', href: '/now/' },
      { label: 'Contact', href: '/contact/' },
    ],
    blogCta: 'Read the blog',
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
      { label: '首页', href: '/cn/' },
      { label: '关于', href: '/cn/about/' },
      { label: '书籍', href: '/cn/books/' },
      { label: '写作', href: '/cn/writing/' },
      { label: '项目', href: '/cn/projects/' },
      { label: '此刻', href: '/cn/now/' },
      { label: '联系', href: '/cn/contact/' },
    ],
    blogCta: '读博客',
    footerLinks: [
      { label: '博客', href: siteConfig.blogUrl },
      { label: 'Medium', href: siteConfig.mediumUrl },
      { label: 'GitHub', href: siteConfig.githubUrl },
      { label: 'X', href: siteConfig.xUrl },
      { label: 'LinkedIn', href: siteConfig.linkedinUrl },
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
    booksLabel: '书稿',
  },
};
