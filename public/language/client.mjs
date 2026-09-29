import { languageMenuMarkup, languages } from './menu.mjs';
import { normalizeLanguage, initialLanguage } from './policy.mjs';
import { createEditorialLayer } from './editorial.mjs';

// GTranslate's current same-page engine, reviewed 2026-09-29. The vendor CDN
// does not provide CORS headers for SRI. Load only on translation, from the
// narrowly allowed CSP host; never use the retiring Google Website Translator.
const LIBRARY = 'https://cdn.gtranslate.net/widgets/latest/lib.min.js';
const KEY = 'iamrobin-language';
const providerKey = '__GT_TRANSLATE_LANGS';
const supported = new Set(languages.map(([code]) => code));
const sourceHtmlLang = document.querySelector('meta[name="source-language"]')?.content || document.documentElement.lang;
const source = normalizeLanguage(sourceHtmlLang);
const arcade = location.pathname.startsWith('/meaning/Bran_lab/');
const atlas = location.pathname.startsWith('/asymmetry/btc_probability_atlas/');
let menu = document.querySelector('#site-language');
if (!menu) {
  document.body.insertAdjacentHTML('beforeend', languageMenuMarkup());
  menu = document.querySelector('#site-language');
  menu.classList.add('site-language--floating');
}
const status = menu.querySelector('[role="status"]');
const buttons = [...menu.querySelectorAll('[data-language]')];
const original = menu.querySelector('[data-original]');
const summary = menu.querySelector('summary');
const badge = document.createElement('div');
badge.className = 'language-auto-note notranslate';
badge.translate = false;
badge.hidden = true;
document.body.append(badge);
const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* Private browsing still works. */ } },
  remove(key) { try { localStorage.removeItem(key); } catch { /* No persistence available. */ } },
};
let loading;
let busy = false;
let active = source;
const editorial = createEditorialLayer(document);
function restoreTranslator() {
  editorial.restore();
  if (window.__GT?.translator?.libReady) window.__GT.translator.revert();
  editorial.restore();
}
function setStatus(message, state = 'ready') {
  status.textContent = message;
  menu.dataset.state = state;
}
function selected(lang) {
  active = lang;
  buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === lang)));
}
function protectPrivateFields(root = document) {
  // Never translate form values, editable notes, code, or game progress. The
  // translator can observe dynamic DOM, so protect these before loading it.
  root.querySelectorAll('input, textarea, [contenteditable], code, pre, [data-private], .notranslate, .passport, .hud, .stats, .world-map, #journal, #resumeSave, [data-game-progress], #aidc-build, #aidc-factory-lesson, #ai-berkshire, .site-header, .zen-name h1, .wordmark, .identity-bridge__copy > .eyebrow').forEach((node) => {
    node.classList.add('notranslate');
    node.setAttribute('translate', 'no');
  });
}
function loadTranslator() {
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    protectPrivateFields();
    // Our preference, not the provider's stale state, owns navigation behavior.
    storage.remove(providerKey);
    const script = document.createElement('script');
    script.src = LIBRARY;
    script.referrerPolicy = 'no-referrer';
    const timer = setTimeout(() => { loading = null; script.remove(); reject(new Error('Translation service timed out.')); }, 15000);
    script.onerror = () => { clearTimeout(timer); script.remove(); loading = null; reject(new Error('Translation service unavailable.')); };
    script.onload = () => {
      const translator = window.__GT?.translator;
      const ready = () => {
        clearTimeout(timer);
        if (translator?.libReady) resolve(translator);
        else { loading = null; reject(new Error('Translation service unavailable.')); }
      };
      if (translator?.libReady) ready();
      else if (translator) translator.readyCallback = ready;
      else ready();
    };
    document.head.append(script);
  });
  return loading;
}
function nativeSimulationLanguage(lang) {
  // Professional names and navigation meanings should not become e.g. "Ms."
  // -> "multiple sclerosis", "Portfolio" -> "folder", or TideiSun -> a noun.
  const chrome = {
    en: ['Home', 'Portfolio', 'Books', 'Doors', 'Identity', 'Asymmetry', 'Meaning', 'Resonance', 'Ouroboros', 'Binary', 'Intelligence', 'Network'],
    'zh-CN': ['首页', '项目', '书籍', '八扇门', '身份', '不对称', '意义', '共鸣', '衔尾蛇', '二进制', '智能', '连接'],
    'zh-TW': ['首頁', '項目', '書籍', '八扇門', '身份', '不對稱', '意義', '共鳴', '銜尾蛇', '二進制', '智慧', '連結'],
    ja: ['ホーム', 'プロジェクト', '書籍', '八つの扉', 'アイデンティティ', '非対称性', '意味', '共鳴', 'ウロボロス', 'バイナリー', '知性', 'つながり'],
  }[lang] || [];
  document.querySelectorAll('.site-header .nav-list > li > a').forEach((node, i) => { if (chrome[i]) node.textContent = chrome[i]; });
  const doors = document.querySelector('.site-header .doors-nav summary');
  if (doors && chrome[3]) doors.textContent = chrome[3];
  document.querySelectorAll('.site-header .doors-menu strong').forEach((node, i) => { if (chrome[i + 4]) node.textContent = chrome[i + 4]; });
  const locale = ({ 'zh-CN': 'zh-Hans', 'zh-TW': 'zh-Hant' })[lang] || lang;
  for (const id of ['ab-language', 'af-language', 'ai-berkshire-language', ...(atlas ? ['language'] : [])]) {
    const control = document.getElementById(id);
    if (control) { control.value = id === 'language' ? lang : locale; control.dispatchEvent(new Event('change')); }
  }
}
async function translate(lang) {
  if (busy || !supported.has(lang)) return;
  const wasOpen = menu.open;
  busy = true;
  buttons.forEach((button) => { button.disabled = true; });
  original.disabled = true;
  setStatus('Translating this page…', 'loading');
  try {
    restoreTranslator();
    const authored = editorial.apply(lang);
    editorial.protectNames(lang);
    nativeSimulationLanguage(lang);
    if (lang === source || atlas) {
      // The original or built-in tool needs no third-party translation.
    } else {
      const translator = await loadTranslator();
      // Always translate from the original, never compound machine translations.
      await new Promise((resolve, reject) => {
        if (!translator.translate(source, lang)) { reject(new Error('Translation could not start.')); return; }
        const start = performance.now();
        const timer = setInterval(() => {
          if (translator.error || performance.now() - start > 45000) {
            clearInterval(timer); reject(new Error('Translation unavailable. Please retry.'));
          } else if (translator.finished) { clearInterval(timer); resolve(); }
        }, 100);
      });
    }
    selected(lang);
    editorial.apply(lang);
    editorial.names(lang);
    storage.set(KEY, lang);
    storage.remove(providerKey);
    document.documentElement.lang = ({ 'zh-CN': 'zh-Hans', 'zh-TW': 'zh-Hant' })[lang] || lang;
    nativeSimulationLanguage(lang);
    setStatus(authored ? 'Owner-approved About copy · navigation may be automatically translated.' : lang === source ? 'Original page.' : atlas ? 'Built-in translation · same page.' : 'Automatic translation · same page.');
    badge.textContent = ({ en: 'Automatic translation', 'zh-CN': '自动翻译 · 查看原文请点 🌐', 'zh-TW': '自動翻譯 · 查看原文請點 🌐', ja: '自動翻訳 · 原文は 🌐 から' })[lang];
    if (authored && lang === 'zh-CN') badge.textContent = '正文为谢玢定稿 · 导航可能自动翻译';
    if (authored && lang === 'zh-TW') badge.textContent = '正文為谢玢定稿 · 導覽可能自動翻譯';
    badge.hidden = lang === source || atlas;
    menu.open = false;
    if (wasOpen) summary.focus({ preventScroll: true });
  } catch (error) {
    restoreTranslator();
    nativeSimulationLanguage('en');
    storage.remove(providerKey);
    document.documentElement.lang = sourceHtmlLang;
    selected(source);
    badge.hidden = true;
    setStatus(`${error.message} Original text is still available.`, 'error');
    menu.open = true;
  } finally {
    busy = false;
    buttons.forEach((button) => { button.disabled = false; });
    original.disabled = false;
  }
}
buttons.forEach((button) => button.addEventListener('click', () => translate(button.dataset.language)));
original.addEventListener('click', () => {
  restoreTranslator();
  nativeSimulationLanguage('en');
  storage.remove(providerKey);
  storage.set(KEY, 'original');
  document.documentElement.lang = sourceHtmlLang;
  selected(source);
  editorial.names(source);
  badge.hidden = true;
  setStatus('Original page.');
});
document.addEventListener('click', (event) => { if (!menu.contains(event.target)) menu.open = false; });
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.open) { menu.open = false; summary.focus(); }
});
selected(source);
const saved = storage.get(KEY);
const preferred = initialLanguage(source, saved, arcade);
// Some native tools initialize after asynchronous evidence loads. The same
// global choice owns their initial locale as well as subsequent menu changes.
window.addEventListener('load', () => nativeSimulationLanguage(active === 'auto' ? 'en' : active), { once: true });
// The arcade is always local-only on arrival, even with a stored preference.
// Its language choices are an explicit opt-in, not background third-party calls.
if (arcade) {
  setStatus('Game translation is opt-in on each page.');
} else if (saved !== 'original' && preferred !== source) {
  translate(preferred);
} else {
  setStatus('Original page.');
  editorial.names(source);
}
// A restored back/forward-cache page must not claim a translation after the
// provider restores its source on pagehide.
window.addEventListener('pageshow', (event) => {
  if (event.persisted && !arcade && active !== source) translate(active);
});
