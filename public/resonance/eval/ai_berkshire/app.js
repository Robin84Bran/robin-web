const root = document.querySelector('#ai-berkshire');
const selector = document.querySelector('#ai-berkshire-language');

if (root instanceof HTMLElement && selector instanceof HTMLSelectElement) {
  const supported = new Set(['en', 'zh-Hans', 'zh-Hant', 'ja']);
  const panels = [...root.querySelectorAll('[data-lang-panel]')];
  const heroFields = {
    eyebrow: root.querySelector('#ai-berkshire-eyebrow'),
    title: root.querySelector('#ai-berkshire-title'),
    deck: root.querySelector('#ai-berkshire-deck'),
    frozen: root.querySelector('#ai-berkshire-frozen'),
    researchOnly: root.querySelector('#ai-berkshire-research-only'),
    languageLabel: root.querySelector('#ai-berkshire-language-label'),
  };

  const setLanguage = (requested) => {
    const language = supported.has(requested) ? requested : 'en';
    selector.value = language;
    root.lang = language;
    document.documentElement.lang = language;
    const option = selector.selectedOptions[0];
    if (option) {
      for (const [key, element] of Object.entries(heroFields)) {
        if (element && option.dataset[key]) element.textContent = option.dataset[key];
      }
    }
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
