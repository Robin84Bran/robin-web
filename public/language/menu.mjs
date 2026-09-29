// One markup source for Astro pages and standalone HTML tools.
export const languages = [
  ['en', 'English'], ['zh-CN', '简体中文'], ['zh-TW', '繁體中文'], ['ja', '日本語'],
];
export function languageMenuMarkup() {
  return `<details id="site-language" class="site-language notranslate" translate="no">
    <summary aria-label="Choose page language" title="Language / 语言 / 言語"><span aria-hidden="true">🌐</span></summary>
    <div class="site-language__panel">
      <p class="site-language__heading">Language · 语言 · 言語</p>
      <div class="site-language__options" role="group" aria-label="Page language">
        ${languages.map(([code, label]) => `<button type="button" data-language="${code}" lang="${code}" aria-pressed="false">${label}<span aria-hidden="true">✓</span></button>`).join('')}
      </div>
      <p class="site-language__status" role="status" aria-live="polite">English by default.</p>
      <p class="site-language__note">Same page, automatic translation. Text is sent to <a href="https://gtranslate.io/privacy-policy" target="_blank" rel="noopener noreferrer">GTranslate / Google</a> when translating; wording may vary from the original.</p>
      <button type="button" class="site-language__original" data-original>View original / 查看原文</button>
      <noscript>Enable JavaScript for automatic translation.</noscript>
    </div>
  </details>`;
}
