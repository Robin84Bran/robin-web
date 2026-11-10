import { DEFAULTS, POLICY_IDS, POLICY_LABELS, simulateWorld } from './model.mjs';

const form = document.querySelector('#proof-controls');
const canvas = document.querySelector('#proof-world');
const status = document.querySelector('#lab-status');
const range = document.querySelector('#tick');
const panels = Object.fromEntries(POLICY_IDS.map((id) => [id, document.querySelector(`[data-policy="${id}"]`)]));
const buttons = Object.fromEntries(['play', 'step', 'end', 'reset', 'next-seed', 'defaults', 'share', 'download'].map((id) => [id, document.querySelector(`#${id}`)]));

let world;
let tick = 0;
let timer = null;
const number = (name) => Number.parseInt(form.elements[name].value, 10);

function readControls() {
  return {
    seed: number('seed') >>> 0,
    config: {
      ...DEFAULTS,
      actionsPerTick: number('actionsPerTick'),
      qualityRate: number('qualityRate'),
      reviewBatch: number('reviewBatch'),
      deadline: number('deadline'),
      queueLimit: number('queueLimit'),
      adaptiveTarget: number('adaptiveTarget'),
    },
  };
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
  canvas.height = Math.round(300 * ratio);
  return { ctx: canvas.getContext('2d'), width: canvas.width, height: canvas.height, ratio };
}

function draw() {
  const { ctx, width, height, ratio } = fitCanvas();
  const s = (value) => value * ratio;
  ctx.fillStyle = '#f3efe5';
  ctx.fillRect(0, 0, width, height);
  ctx.font = `${s(10)}px ui-monospace, SFMono-Regular, monospace`;
  ctx.textAlign = 'left';

  POLICY_IDS.forEach((id, index) => {
    const frame = world.policies[id].frames[tick];
    const y = s(34 + index * 48);
    ctx.fillStyle = '#4e504a';
    ctx.fillText(POLICY_LABELS[id].toUpperCase(), s(16), y);
    const x = Math.min(s(170), width * 0.44);
    const barWidth = Math.max(s(80), width - x - s(18));
    ctx.fillStyle = '#ddd6c8';
    ctx.fillRect(x, y - s(12), barWidth, s(14));
    const queueShare = Math.min(1, frame.queue / world.config.queueLimit);
    ctx.fillStyle = frame.queue >= world.config.adaptiveTarget ? '#b96b4c' : '#557b70';
    ctx.fillRect(x, y - s(12), barWidth * queueShare, s(14));
    ctx.fillStyle = '#4e504a';
    ctx.fillText(`${frame.queue} waiting`, x, y + s(15));
  });

  ctx.fillStyle = '#4e504a';
  ctx.fillText(`TICK ${tick + 1} / ${world.config.steps} · bar = unreviewed queue`, s(16), height - s(25));
  ctx.fillStyle = '#d6d0c1';
  ctx.fillRect(s(16), height - s(15), width - s(32), s(6));
  ctx.fillStyle = '#2f6f63';
  ctx.fillRect(s(16), height - s(15), (width - s(32)) * ((tick + 1) / world.config.steps), s(6));
}

function render() {
  range.value = String(tick);
  draw();
  for (const id of POLICY_IDS) {
    const frame = world.policies[id].frames[tick];
    const panel = panels[id];
    panel.querySelector('.mode').textContent = `${frame.cumulativeAccepted} ACCEPTED`;
    panel.querySelector('.mode').dataset.feasible = String(frame.queue < world.config.queueLimit);
    panel.querySelector('.counts').textContent = `${frame.queue} waiting · ${frame.cumulativeRejected} rejected · ${frame.cumulativeExpired} expired`;
    panel.querySelector('.bar span').style.width = `${Math.min(100, (frame.cumulativeAccepted / Math.max(1, (tick + 1) * world.config.actionsPerTick)) * 100)}%`;
  }
  status.textContent = `Tick ${tick + 1} of ${world.config.steps}. ${POLICY_IDS.map((id) => `${POLICY_LABELS[id]} ${world.policies[id].frames[tick].cumulativeAccepted} accepted`).join('; ')}.`;
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
  for (const name of ['seed', 'actionsPerTick', 'qualityRate', 'reviewBatch', 'deadline', 'queueLimit', 'adaptiveTarget']) {
    if (params.has(name)) form.elements[name].value = params.get(name);
  }
}

form.addEventListener('change', () => rebuild());
form.addEventListener('submit', (event) => event.preventDefault());
range.addEventListener('input', () => { stop(); tick = Number.parseInt(range.value, 10); render(); });
buttons.play.addEventListener('click', () => {
  if (timer) return stop();
  buttons.play.textContent = 'Pause';
  timer = window.setInterval(() => { if (tick >= world.config.steps - 1) return stop(); tick += 1; render(); }, 100);
});
buttons.step.addEventListener('click', () => { stop(); tick = Math.min(world.config.steps - 1, tick + 1); render(); });
buttons.end.addEventListener('click', () => { stop(); tick = world.config.steps - 1; render(); });
buttons.reset.addEventListener('click', () => { stop(); tick = 0; render(); });
buttons['next-seed'].addEventListener('click', () => { form.elements.seed.value = String((number('seed') + 1) >>> 0); rebuild(); });
buttons.defaults.addEventListener('click', () => { form.reset(); rebuild(); });
buttons.share.addEventListener('click', async () => {
  const { seed, config } = readControls();
  const url = new URL(window.location.href);
  for (const key of ['actionsPerTick', 'qualityRate', 'reviewBatch', 'deadline', 'queueLimit', 'adaptiveTarget']) url.searchParams.set(key, String(config[key]));
  url.searchParams.set('seed', String(seed));
  await navigator.clipboard?.writeText(url.toString());
  status.textContent = navigator.clipboard ? 'Replay link copied.' : url.toString();
});
buttons.download.addEventListener('click', () => {
  const blob = new Blob([`${JSON.stringify(world, null, 2)}\n`], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `work-or-proof-seed-${world.seed}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
});
window.addEventListener('resize', () => render());
setFromUrl();
rebuild();
