import { DEFAULTS, POLICY_IDS, POLICY_LABELS, simulateWorld } from './model.mjs';

const form = document.querySelector('#portable-controls');
const status = document.querySelector('#lab-status');
const range = document.querySelector('#tick');
const panels = Object.fromEntries(POLICY_IDS.map((id) => [id, document.querySelector(`[data-policy="${id}"]`)]));
const buttons = Object.fromEntries(
  ['play', 'step', 'end', 'reset', 'next-seed', 'defaults', 'share', 'download'].map((id) => [id, document.querySelector(`#${id}`)]),
);

let world;
let tick = 0;
let timer = null;

function integer(name) {
  return Number.parseInt(form.elements[name].value, 10);
}

function readControls() {
  return {
    seed: integer('seed') >>> 0,
    config: {
      ...DEFAULTS,
      swapEvery: integer('swapEvery'),
      bodyCount: integer('bodyCount'),
      divergence: integer('divergence'),
      driftAt: integer('driftAt'),
      manifestFresh: form.elements.manifestFresh.value === 'true',
    },
  };
}

function stop() {
  if (timer) window.clearInterval(timer);
  timer = null;
  buttons.play.textContent = 'Play';
}

function dot(frame, index) {
  const state = frame.correct ? 'correct' : 'wrong';
  const label = `Tick ${index + 1}: ${frame.body}, target ${frame.target}, control ${frame.action}, produced ${frame.actual}, ${state}`;
  return `<span class="dot ${state}" title="${label}" aria-label="${label}"></span>`;
}

function render() {
  range.value = String(tick);
  for (const id of POLICY_IDS) {
    const run = world.policies[id];
    const frame = run.frames[Math.min(tick, run.frames.length - 1)];
    const visible = run.frames.slice(0, tick + 1);
    const correct = visible.filter((item) => item.correct).length;
    const errors = visible.length - correct;
    const panel = panels[id];
    panel.querySelector('.body').textContent = `${frame.body.replace('-', ' ')} · ${frame.fingerprint}`;
    panel.querySelector('.instruction').innerHTML = `<b>${frame.target.toUpperCase()}</b> → control ${frame.action} → ${frame.actual.toUpperCase()}`;
    panel.querySelector('.verdict').textContent = frame.correct ? 'matched' : 'mismatch';
    panel.querySelector('.verdict').dataset.state = frame.correct ? 'correct' : 'wrong';
    panel.querySelector('.counts').textContent = `${correct} correct · ${errors} errors · ${Math.floor(correct / 4)} assemblies`;
    panel.querySelector('.trace').innerHTML = visible.slice(-32).map(dot).join('');
  }
  const current = world.policies.portable.frames[Math.min(tick, world.config.steps - 1)];
  status.textContent = `Tick ${tick + 1} of ${world.config.steps}. Target: ${current.target}. Body: ${current.body}.`;
}

function rebuild({ preserveTick = false } = {}) {
  stop();
  try {
    const { seed, config } = readControls();
    world = simulateWorld(config, seed, true);
    range.max = String(config.steps - 1);
    if (!preserveTick) tick = 0;
    tick = Math.min(tick, config.steps - 1);
    render();
  } catch (error) {
    status.textContent = error.message;
  }
}

function setFromUrl() {
  const params = new URLSearchParams(window.location.search);
  for (const name of ['seed', 'swapEvery', 'bodyCount', 'divergence', 'driftAt', 'manifestFresh']) {
    if (params.has(name) && form.elements[name]) form.elements[name].value = params.get(name);
  }
}

form.addEventListener('change', () => rebuild());
form.addEventListener('submit', (event) => event.preventDefault());
range.addEventListener('input', () => {
  stop();
  tick = Number.parseInt(range.value, 10);
  render();
});

buttons.play.addEventListener('click', () => {
  if (timer) return stop();
  if (tick >= world.config.steps - 1) tick = 0;
  buttons.play.textContent = 'Pause';
  timer = window.setInterval(() => {
    tick += 1;
    render();
    if (tick >= world.config.steps - 1) stop();
  }, 180);
});
buttons.step.addEventListener('click', () => {
  stop();
  tick = Math.min(tick + 1, world.config.steps - 1);
  render();
});
buttons.end.addEventListener('click', () => {
  stop();
  tick = world.config.steps - 1;
  render();
});
buttons.reset.addEventListener('click', () => rebuild());
buttons['next-seed'].addEventListener('click', () => {
  form.elements.seed.value = String((integer('seed') + 1) >>> 0);
  rebuild();
});
buttons.defaults.addEventListener('click', () => {
  form.reset();
  rebuild();
});
buttons.share.addEventListener('click', async () => {
  const { seed, config } = readControls();
  const params = new URLSearchParams({ seed: String(seed) });
  for (const [key, value] of Object.entries(config)) {
    if (value !== DEFAULTS[key]) params.set(key, String(value));
  }
  const url = `${window.location.origin}${window.location.pathname}?${params}`;
  window.history.replaceState({}, '', url);
  try {
    await navigator.clipboard.writeText(url);
    status.textContent = 'Link copied. The URL now holds this seeded world.';
  } catch {
    status.textContent = 'The URL now holds this seeded world.';
  }
});
buttons.download.addEventListener('click', () => {
  const blob = new Blob([`${JSON.stringify(world, null, 2)}\n`], { type: 'application/json' });
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(blob);
  anchor.download = `portable-self-seed-${world.seed}.json`;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(anchor.href), 500);
});

for (const id of POLICY_IDS) {
  panels[id].querySelector('h2').textContent = POLICY_LABELS[id];
}
setFromUrl();
rebuild();
