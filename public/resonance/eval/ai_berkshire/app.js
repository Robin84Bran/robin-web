const root = document.querySelector('#ai-berkshire');
const selector = document.querySelector('#ai-berkshire-language');

if (root instanceof HTMLElement && selector instanceof HTMLSelectElement) {
  const supported = new Set(['en', 'zh-Hans', 'zh-Hant', 'ja']);
  const panels = [...root.querySelectorAll('[data-lang-panel]')];

  const setLanguage = (requested) => {
    const language = supported.has(requested) ? requested : 'en';
    selector.value = language;
    root.lang = language;
    document.documentElement.lang = language;
    for (const panel of panels) {
      panel.hidden = panel.getAttribute('data-lang-panel') !== language;
    }
    try {
      window.localStorage.setItem('ai-berkshire-language', language);
    } catch {
      // Storage can be unavailable; the English-first page still works.
    }
  };

  selector.addEventListener('change', () => setLanguage(selector.value));

  let initial = 'en';
  try {
    const stored = window.localStorage.getItem('ai-berkshire-language');
    if (stored && supported.has(stored)) initial = stored;
  } catch {
    initial = 'en';
  }
  setLanguage(initial);
}
