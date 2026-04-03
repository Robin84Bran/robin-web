/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_BLOG_URL: string;
  readonly GHOST_CONTENT_API_URL?: string;
  readonly GHOST_CONTENT_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
