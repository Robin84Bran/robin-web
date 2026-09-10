(function () {
  'use strict';
  const kind = document.body.dataset.game, maze = kind === 'maze';
  const { settings, storage } = Bran3D;
  const nav = document.createElement('nav');
  nav.className = 'arcade-nav'; nav.setAttribute('aria-label', 'Bran Lab games');
  nav.innerHTML = '<a class="brand" href="../index.html"><span class="brand-mark">B</span> BRAN<span>LAB</span></a><div class="nav-games"><a href="../SuperRun/index.html">SuperRun</a><a href="../GeoDash/index.html">GeoDash</a><a href="../PacMan/index.html">Pac-Man</a></div><span class="lab-tag">THE PLAY LAB · 01</span>';
  document.body.prepend(nav);
  nav.querySelectorAll('.nav-games a').forEach(a => { if (a.href === location.href.split('?')[0]) a.setAttribute('aria-current', 'page'); });
  const options = document.createElement('div'); options.className = 'arcade-options';
  options.innerHTML = `${maze ? '' : '<label class="mode-field">YOUR PACE<select id="arcadeMode"><option value="explorer">Explorer · extra shields</option><option value="challenge">Challenge · original rules</option></select></label><fieldset class="color-field"><legend>YOUR BOT</legend><label style="--swatch:#38bdf8"><input type="radio" name="botColor" value="#38bdf8" aria-label="Blue robot"></label><label style="--swatch:#41cda8"><input type="radio" name="botColor" value="#41cda8" aria-label="Mint robot"></label><label style="--swatch:#fb927d"><input type="radio" name="botColor" value="#fb927d" aria-label="Coral robot"></label></fieldset>'}<label class="motion-field"><input id="arcadeMotion" type="checkbox"> Calm motion</label>`;
  const host = maze ? document.querySelector('.toolbar-actions') : document.querySelector('#startScreen .hero-actions');
  if (maze) host.append(options); else host.before(options);
  const mode = document.getElementById('arcadeMode');
  if (mode) {
    mode.value = settings.explorer ? 'explorer' : 'challenge';
    mode.addEventListener('change', () => { settings.explorer = mode.value === 'explorer'; storage.set('bran-mode', mode.value); });
  }
  options.querySelectorAll('[name="botColor"]').forEach(input => {
    input.checked = input.value === settings.color;
    input.addEventListener('change', () => { settings.color = input.value; storage.set('bran-color', input.value); });
  });
  const motion = document.getElementById('arcadeMotion'); motion.checked = !settings.motion;
  document.body.classList.toggle('calm', !settings.motion);
  motion.addEventListener('change', () => { settings.motion = !motion.checked; storage.set('bran-motion', settings.motion ? 'on' : 'off'); document.body.classList.toggle('calm', !settings.motion); });
  if (maze && !document.getElementById('modal').classList.contains('hidden')) nav.inert = true;
  if (!maze) {
    const hud = document.getElementById('hud');
    const pad = document.createElement('div'); pad.className = 'play-controls';
    pad.innerHTML = '<div class="move-buttons"><button data-key="ArrowLeft" aria-label="Move left">←</button><button data-key="ArrowRight" aria-label="Move right">→</button></div><span class="key-hint">A / D move <i>·</i> SPACE jump <i>·</i> X blast <i>·</i> ESC pause</span><div class="action-buttons"><button data-key="ArrowDown" class="blast-control" aria-label="Blast">◎ <small>BLAST</small></button><button data-key="ArrowUp" class="jump-control" aria-label="Jump">↑ <small>JUMP</small></button></div>';
    document.querySelector('.app-shell').append(pad);
    const mission = document.createElement('div'); mission.className = 'run-mission';
    mission.innerHTML = `<span class="mission-icon">${kind === 'run' ? '★' : '◎'}</span><div><small>YOUR MISSION</small><strong id="missionText">${kind === 'run' ? 'Collect stars. Find the rescue portal.' : 'Outsmart the bots. Reach the portal.'}</strong><div class="mission-track"><i id="missionFill"></i></div></div>`;
    document.querySelector('.app-shell').append(mission);
    let held = new Map();
    function send(key, down) { window.dispatchEvent(new KeyboardEvent(down ? 'keydown' : 'keyup', { key, bubbles: true, cancelable: true })); }
    pad.querySelectorAll('[data-key]').forEach(button => {
      button.addEventListener('pointerdown', e => { e.preventDefault(); button.setPointerCapture(e.pointerId); held.set(e.pointerId, button.dataset.key); button.classList.add('pressed'); send(button.dataset.key, true); });
      const release = e => { const key = held.get(e.pointerId); if (key) send(key, false); held.delete(e.pointerId); button.classList.remove('pressed'); };
      button.addEventListener('pointerup', release); button.addEventListener('pointercancel', release); button.addEventListener('lostpointercapture', release);
      button.addEventListener('click', e => { if (e.detail === 0) { send(button.dataset.key, true); send(button.dataset.key, false); } });
    });
    window.addEventListener('blur', () => { held.forEach(key => send(key, false)); held.clear(); pad.querySelectorAll('.pressed').forEach(b => b.classList.remove('pressed')); });
    const sync = () => { document.body.classList.toggle('in-game', !hud.classList.contains('hidden')); };
    new MutationObserver(sync).observe(hud, { attributes: true, attributeFilter: ['class'] }); sync();
    document.querySelectorAll('.panel').forEach(panel => { panel.inert = !panel.classList.contains('active'); });
    const panels = document.querySelectorAll('.panel');
    panels.forEach(panel => new MutationObserver(() => {
      panel.inert = !panel.classList.contains('active');
      if (!panel.inert) panel.querySelector('button:not(:disabled)')?.focus({ preventScroll: true });
    }).observe(panel, { attributes: true, attributeFilter: ['class'] }));
  }
  document.addEventListener('keydown', event => {
    const panel = maze ? document.querySelector('.modal:not(.hidden)') : document.querySelector('.panel.active');
    if (event.key !== 'Tab' || !panel) return;
    const elements = [...panel.querySelectorAll('button:not(:disabled), select, input, a[href]')].filter(e => e.getClientRects().length && !e.closest('.hidden'));
    if (!elements.length) return;
    if (event.shiftKey && document.activeElement === elements[0]) { event.preventDefault(); elements.at(-1).focus(); }
    else if (!event.shiftKey && document.activeElement === elements.at(-1)) { event.preventDefault(); elements[0].focus(); }
  });
})();
