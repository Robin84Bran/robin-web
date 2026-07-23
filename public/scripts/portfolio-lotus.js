document.querySelectorAll('[data-portfolio-lotus]').forEach((lotus) => {
  const toggle = lotus.querySelector('[data-portfolio-motion-toggle]');
  const symbol = lotus.querySelector('[data-portfolio-motion-symbol]');

  toggle?.addEventListener('click', () => {
    const paused = lotus.classList.toggle('is-paused');
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Resume portfolio motion' : 'Pause portfolio motion');
    toggle.setAttribute('title', paused ? 'Resume motion' : 'Pause motion');

    if (symbol) {
      symbol.textContent = paused ? '▶' : 'Ⅱ';
    }
  });
});
