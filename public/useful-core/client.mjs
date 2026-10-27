import { DEFAULTS, MODULES, POLICY_IDS, POLICY_LABELS, simulateWorld } from './model.mjs';

const form = document.querySelector('#core-controls');
const canvas = document.querySelector('#core-world');
const status = document.querySelector('#lab-status');
const range = document.querySelector('#tick');
const panels = Object.fromEntries(POLICY_IDS.map((id) => [id, document.querySelector(`[data-policy="${id}"]`)]));
const buttons = Object.fromEntries(['play', 'step', 'end', 'reset', 'next-seed', 'defaults', 'share', 'download'].map((id) => [id, document.querySelector(`#${id}`)]));

let world;
let tick = 0;
let timer = null;
const number = (name) => Number.parseInt(form.elements[name].value, 10);

function readControls() {
  let shockEvery = number('shockEvery');
  let shockSize = number('shockSize');
  if (shockEvery === 0 || shockSize === 0) {
    shockEvery = 0;
    shockSize = 0;
  }
  return { seed: number('seed') >>> 0, config: { ...DEFAULTS, failureRate: number('failureRate'), repairRate: number('repairRate'), shockEvery, shockSize, switchCost: number('switchCost') } };
}

function stop() {
  if (timer) window.clearInterval(timer);
  timer = null;
  buttons.play.textContent = 'Play';
}

function fitCanvas() {
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(320, Math.round(rect.width * ratio));
  canvas.height = Math.round(250 * ratio);
  return { ctx: canvas.getContext('2d'), width: canvas.width, height: canvas.height, ratio };
}

function draw() {
  const { ctx, width, height, ratio } = fitCanvas();
  const frame = world.evidence.frames[tick];
  const s = (value) => value * ratio;
  ctx.fillStyle = '#f3efe5';
  ctx.fillRect(0, 0, width, height);
  const gap = s(10);
  const margin = s(22);
  const cellWidth = (width - margin * 2 - gap * 3) / 4;
  MODULES.forEach((module, index) => {
    const col = index % 4;
    const row = Math.floor(index / 4);
    const x = margin + col * (cellWidth + gap);
    const y = s(28 + row * 72);
    ctx.fillStyle = frame.health[index] ? '#557b70' : '#b96b4c';
    ctx.fillRect(x, y, cellWidth, s(48));
    ctx.fillStyle = '#fff';
    ctx.font = `${s(11)}px ui-monospace, SFMono-Regular, monospace`;
    ctx.textAlign = 'center';
    ctx.fillText(module.label.toUpperCase(), x + cellWidth / 2, y + s(21));
    ctx.fillText(frame.health[index] ? 'READY' : 'DOWN', x + cellWidth / 2, y + s(37));
  });
  ctx.fillStyle = '#4e504a';
  ctx.font = `${s(11)}px ui-monospace, SFMono-Regular, monospace`;
  ctx.textAlign = 'left';
  const eventText = frame.events.length ? frame.events.map((event) => `${event.type}: ${event.module}`).join(' · ') : 'no component event';
  ctx.fillText(`TICK ${tick + 1} · ${eventText}`.slice(0, 90), margin, s(190));
  ctx.fillStyle = '#d6d0c1';
  ctx.fillRect(margin, s(212), width - margin * 2, s(12));
  ctx.fillStyle = '#2f6f63';
  ctx.fillRect(margin, s(212), (width - margin * 2) * ((tick + 1) / world.config.steps), s(12));
}

function render() {
  range.value = String(tick);
  draw();
  for (const id of POLICY_IDS) {
    const run = world.policies[id];
    const frame = run.frames[tick];
    const panel = panels[id];
    panel.querySelector('.mode').textContent = frame.mode.toUpperCase();
    panel.querySelector('.mode').dataset.feasible = String(frame.feasible || frame.mode === 'idle');
    panel.querySelector('.counts').textContent = `${frame.cumulativeWork} work · ${run.summary.failedAttempts} failed attempts · ${run.summary.switches} switches`;
    panel.querySelector('.bar span').style.width = `${Math.min(100, (frame.cumulativeWork / Math.max(1, run.summary.ceilingWork)) * 100)}%`;
  }
  const ready = world.evidence.frames[tick].health.filter(Boolean).length;
  status.textContent = `Tick ${tick + 1} of ${world.config.steps}. ${ready} of 8 modules ready. ${POLICY_IDS.map((id) => `${POLICY_LABELS[id]} ${world.policies[id].frames[tick].work}`).join('; ')} work this tick.`;
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
  for (const name of ['seed', 'failureRate', 'repairRate', 'shockEvery', 'shockSize', 'switchCost']) if (params.has(name)) form.elements[name].value = params.get(name);
}

form.addEventListener('change', () => rebuild());
form.addEventListener('submit', (event) => event.preventDefault());
range.addEventListener('input', () => { stop(); tick = Number.parseInt(range.value, 10); render(); });
buttons.play.addEventListener('click', () => {
  if (timer) return stop();
  buttons.play.textContent = 'Pause';
  timer = window.setInterval(() => { if (tick >= world.config.steps - 1) return stop(); tick += 1; render(); }, 120);
});
buttons.step.addEventListener('click', () => { stop(); tick = Math.min(world.config.steps - 1, tick + 1); render(); });
buttons.end.addEventListener('click', () => { stop(); tick = world.config.steps - 1; render(); });
buttons.reset.addEventListener('click', () => { stop(); tick = 0; render(); });
buttons['next-seed'].addEventListener('click', () => { form.elements.seed.value = String((number('seed') + 1) >>> 0); rebuild(); });
buttons.defaults.addEventListener('click', () => { form.reset(); rebuild(); });
buttons.share.addEventListener('click', async () => {
  const { seed, config } = readControls();
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries({ seed, failureRate: config.failureRate, repairRate: config.repairRate, shockEvery: config.shockEvery, shockSize: config.shockSize, switchCost: config.switchCost })) url.searchParams.set(key, String(value));
  await navigator.clipboard?.writeText(url.toString());
  status.textContent = navigator.clipboard ? 'Replay link copied.' : url.toString();
});
buttons.download.addEventListener('click', () => {
  const blob = new Blob([`${JSON.stringify(world, null, 2)}\n`], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `useful-core-seed-${world.seed}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
});
window.addEventListener('resize', () => render());
setFromUrl();
rebuild();
