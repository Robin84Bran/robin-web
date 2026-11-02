import { DEFAULTS, POLICY_IDS, POLICY_LABELS, simulateWorld } from './model.mjs';

const form = document.querySelector('#bridge-controls');
const canvas = document.querySelector('#bridge-world');
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
      services: number('services'),
      routeLength: number('routeLength'),
      driftRate: number('driftRate'),
      hubOutageRate: number('hubOutageRate'),
      repairsPerTick: number('repairsPerTick'),
      routePoolSize: number('routePoolSize'),
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
  canvas.height = Math.round(270 * ratio);
  return { ctx: canvas.getContext('2d'), width: canvas.width, height: canvas.height, ratio };
}

function draw() {
  const { ctx, width, height, ratio } = fitCanvas();
  const frame = world.evidence.frames[tick];
  const s = (value) => value * ratio;
  ctx.fillStyle = '#f3efe5';
  ctx.fillRect(0, 0, width, height);
  const centerX = width / 2;
  const centerY = s(120);
  const radius = Math.min(width * 0.34, s(88));

  for (let index = 0; index < frame.versions.length; index += 1) {
    const angle = (Math.PI * 2 * index) / frame.versions.length - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#c7c0b2';
    ctx.lineWidth = s(1);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, s(17), 0, Math.PI * 2);
    ctx.fillStyle = frame.drifted.includes(index) ? '#b96b4c' : '#557b70';
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = `${s(9)}px ui-monospace, SFMono-Regular, monospace`;
    ctx.textAlign = 'center';
    ctx.fillText(`S${index + 1}`, x, y - s(2));
    ctx.fillText(`v${frame.versions[index]}`, x, y + s(9));
  }

  ctx.beginPath();
  ctx.arc(centerX, centerY, s(27), 0, Math.PI * 2);
  ctx.fillStyle = frame.hubUp ? '#2f6f63' : '#a34f37';
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `${s(10)}px ui-monospace, SFMono-Regular, monospace`;
  ctx.textAlign = 'center';
  ctx.fillText('BUS', centerX, centerY - s(2));
  ctx.fillText(frame.hubUp ? 'UP' : 'DOWN', centerX, centerY + s(11));

  ctx.fillStyle = '#4e504a';
  ctx.font = `${s(11)}px ui-monospace, SFMono-Regular, monospace`;
  ctx.textAlign = 'left';
  const event = frame.drifted.length ? `schemas changed: ${frame.drifted.map((id) => `S${id + 1}`).join(', ')}` : 'no schema change';
  ctx.fillText(`TICK ${tick + 1} · ${event}`.slice(0, 100), s(18), s(238));
  ctx.fillStyle = '#d6d0c1';
  ctx.fillRect(s(18), s(250), width - s(36), s(8));
  ctx.fillStyle = '#2f6f63';
  ctx.fillRect(s(18), s(250), (width - s(36)) * ((tick + 1) / world.config.steps), s(8));
}

function render() {
  range.value = String(tick);
  draw();
  const arrived = (tick + 1) * world.config.arrivalsPerTick;
  for (const id of POLICY_IDS) {
    const run = world.policies[id];
    const frame = run.frames[tick];
    const panel = panels[id];
    panel.querySelector('.mode').textContent = id === 'shared' ? (frame.hubUp ? 'HUB UP' : 'HUB DOWN') : `${frame.repairs.length} REPAIR${frame.repairs.length === 1 ? '' : 'S'}`;
    panel.querySelector('.mode').dataset.feasible = String(id !== 'shared' || frame.hubUp);
    panel.querySelector('.counts').textContent = `${frame.cumulativeDelivered} delivered · ${frame.queue} queued · ${frame.blockedAttempts} blocked attempts`;
    panel.querySelector('.bar span').style.width = `${Math.min(100, (frame.cumulativeDelivered / Math.max(1, arrived)) * 100)}%`;
  }
  status.textContent = `Tick ${tick + 1} of ${world.config.steps}. Hub ${world.evidence.frames[tick].hubUp ? 'up' : 'down'}. ${POLICY_IDS.map((id) => `${POLICY_LABELS[id]} ${world.policies[id].frames[tick].cumulativeDelivered}`).join('; ')} delivered.`;
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
  for (const name of ['seed', 'services', 'routeLength', 'driftRate', 'hubOutageRate', 'repairsPerTick', 'routePoolSize']) {
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
  for (const key of ['services', 'routeLength', 'driftRate', 'hubOutageRate', 'repairsPerTick', 'routePoolSize']) url.searchParams.set(key, String(config[key]));
  url.searchParams.set('seed', String(seed));
  await navigator.clipboard?.writeText(url.toString());
  status.textContent = navigator.clipboard ? 'Replay link copied.' : url.toString();
});
buttons.download.addEventListener('click', () => {
  const blob = new Blob([`${JSON.stringify(world, null, 2)}\n`], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `bridge-or-bus-seed-${world.seed}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
});
window.addEventListener('resize', () => render());
setFromUrl();
rebuild();
