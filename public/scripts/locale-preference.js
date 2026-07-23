document.querySelectorAll('[data-locale-choice]').forEach((link) => {
  link.addEventListener('click', () => {
    const locale = link.getAttribute('data-locale-choice');

    if (locale) {
      document.cookie = `robin_locale=${locale}; Path=/; Max-Age=31536000; SameSite=Lax`;
    }
  });
});
