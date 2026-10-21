import { DEFAULTS, POLICY_IDS, POLICY_LABELS, simulateWorld } from './model.mjs';

const form = document.querySelector('#signal-controls');
const canvas = document.querySelector('#signal-world');
const status = document.querySelector('#lab-status');
const range = document.querySelector('#tick');
const panels = Object.fromEntries(POLICY_IDS.map((id) => [id, document.querySelector(`[data-policy="${id}"]`)]));
const buttons = Object.fromEntries(
  ['play', 'step', 'end', 'reset', 'next-seed', 'defaults', 'share', 'download'].map((id) => [id, document.querySelector(`#${id}`)]),
);

let world;
let tick = 0;
let timer = null;

function number(name) {
  return Number.parseInt(form.elements[name].value, 10);
}

function tempo() {
  if (form.elements.decisionTempo.value === 'aggressive') return { fixedTimeout: 6, unknownAfter: 6, downAfter: 18 };
  if (form.elements.decisionTempo.value === 'patient') return { fixedTimeout: 14, unknownAfter: 14, downAfter: 34 };
  return { fixedTimeout: 10, unknownAfter: 10, downAfter: 26 };
}

function readControls() {
  const overlap = form.elements.burstTiming.value === 'overlap';
  return {
    seed: number('seed') >>> 0,
    config: {
      ...DEFAULTS,
      heartbeatEvery: number('heartbeatEvery'),
      dropRate: number('dropRate'),
      burstDelay: number('burstDelay'),
      outageLength: number('outageLength'),
      burstStart: overlap ? 120 : 72,
      burstEnd: overlap ? 180 : 112,
      ...tempo(),
    },
  };
}

function stop() {
  if (timer) window.clearInterval(timer);
  timer = null;
  buttons.play.textContent = 'Play';
}

function stateDot(frame, index) {
  const state = frame.state.toLowerCase();
  return `<span class="dot ${state}" title="Tick ${index + 1}: ${frame.state}; actual ${frame.actual}" aria-label="Tick ${index + 1}: ${frame.state}; actual ${frame.actual}"></span>`;
}

function fitCanvas() {
  const rect = canvas.getBoundingClientRect();
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(320, Math.round(rect.width * ratio));
  canvas.height = Math.round(280 * ratio);
  return { ctx: canvas.getContext('2d'), width: canvas.width, height: canvas.height, ratio };
}

function draw() {
  const { ctx, width, height, ratio } = fitCanvas();
  const scale = (value) => value * ratio;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#f3efe5';
  ctx.fillRect(0, 0, width, height);
  const frame = world.evidence.frames[tick];
  const serviceX = scale(82);
  const observerX = width - scale(82);
  const railY = scale(98);

  ctx.strokeStyle = '#b8b09f';
  ctx.lineWidth = scale(2);
  ctx.beginPath();
  ctx.moveTo(serviceX + scale(28), railY);
  ctx.lineTo(observerX - scale(28), railY);
  ctx.stroke();

  const packets = world.evidence.packets.filter((packet) => packet.sentAt <= tick && tick - packet.sentAt <= 34);
  for (const packet of packets) {
    if (packet.dropped) {
      if (tick - packet.sentAt > 10) continue;
      const x = serviceX + (observerX - serviceX) * Math.min(0.42, (tick - packet.sentAt) / 20);
      ctx.strokeStyle = '#a65f42';
      ctx.lineWidth = scale(2);
      ctx.beginPath();
      ctx.moveTo(x - scale(5), railY - scale(5));
      ctx.lineTo(x + scale(5), railY + scale(5));
      ctx.moveTo(x + scale(5), railY - scale(5));
      ctx.lineTo(x - scale(5), railY + scale(5));
      ctx.stroke();
    } else if (packet.deliveryAt >= tick) {
      const progress = Math.max(0, Math.min(1, (tick - packet.sentAt) / packet.delay));
      const x = serviceX + scale(28) + (observerX - serviceX - scale(56)) * progress;
      ctx.fillStyle = packet.inBurst ? '#b47a31' : '#3f756b';
      ctx.beginPath();
      ctx.arc(x, railY, scale(5), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const serviceUp = frame.actual === 'UP';
  ctx.fillStyle = serviceUp ? '#39766a' : '#a45c43';
  ctx.beginPath();
  ctx.arc(serviceX, railY, scale(28), 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.font = `${scale(12)}px ui-monospace, SFMono-Regular, monospace`;
  ctx.textAlign = 'center';
  ctx.fillText(serviceUp ? 'UP' : 'DOWN', serviceX, railY + scale(4));

  ctx.fillStyle = '#2f312e';
  ctx.beginPath();
  ctx.arc(observerX, railY, scale(28), 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.fillText('VIEW', observerX, railY + scale(4));

  ctx.fillStyle = '#4e504a';
  ctx.font = `${scale(11)}px ui-monospace, SFMono-Regular, monospace`;
  ctx.fillText('HIDDEN SERVICE', serviceX, railY - scale(43));
  ctx.fillText(frame.delivered.length ? `ARRIVED #${frame.delivered.join(', #')}` : 'NO ARRIVAL', observerX, railY - scale(43));
  ctx.fillText(frame.age === null ? 'NO EVIDENCE YET' : `LAST ARRIVAL ${frame.age} TICKS AGO`, observerX, railY + scale(48));

  const timelineX = scale(28);
  const timelineY = scale(214);
  const timelineW = width - scale(56);
  ctx.fillStyle = '#d8d2c4';
  ctx.fillRect(timelineX, timelineY, timelineW, scale(16));
  const span = (start, end, color, yOffset = 0) => {
    ctx.fillStyle = color;
    ctx.fillRect(
      timelineX + timelineW * (start / world.config.steps),
      timelineY + scale(yOffset),
      timelineW * ((end - start) / world.config.steps),
      scale(16 - yOffset),
    );
  };
  span(world.config.burstStart, world.config.burstEnd, '#d7b36f');
  span(world.config.outageStart, world.config.outageStart + world.config.outageLength, '#a45c43', 7);
  const cursor = timelineX + timelineW * (tick / (world.config.steps - 1));
  ctx.strokeStyle = '#242723';
  ctx.lineWidth = scale(2);
  ctx.beginPath();
  ctx.moveTo(cursor, timelineY - scale(8));
  ctx.lineTo(cursor, timelineY + scale(24));
  ctx.stroke();
  ctx.fillStyle = '#4e504a';
  ctx.textAlign = 'left';
  ctx.fillText('DELAY BURST', timelineX, timelineY - scale(12));
  ctx.textAlign = 'right';
  ctx.fillText('RUST = TRUE OUTAGE', timelineX + timelineW, timelineY - scale(12));
}

function render() {
  range.value = String(tick);
  draw();
  for (const id of POLICY_IDS) {
    const run = world.policies[id];
    const frame = run.frames[tick];
    const panel = panels[id];
    panel.querySelector('.verdict').textContent = frame.state;
    panel.querySelector('.verdict').dataset.state = frame.state.toLowerCase();
    panel.querySelector('.threshold').textContent = `evidence age ${frame.age ?? '—'} · DOWN threshold ${frame.threshold}`;
    panel.querySelector('.counts').textContent = `${frame.usefulRouting} useful UP · ${frame.healthyFalseDown} false DOWN · ${frame.outageUnsafeUp} outage UP`;
    panel.querySelector('.trace').innerHTML = run.frames.slice(Math.max(0, tick - 47), tick + 1).map(stateDot).join('');
  }
  const states = POLICY_IDS.map((id) => `${POLICY_LABELS[id]} ${world.policies[id].frames[tick].state}`).join('; ');
  status.textContent = `Tick ${tick + 1} of ${world.config.steps}. Actual service: ${world.evidence.frames[tick].actual}. ${states}.`;
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
  for (const name of ['seed', 'heartbeatEvery', 'dropRate', 'burstDelay', 'outageLength', 'burstTiming', 'decisionTempo']) {
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
window.addEventListener('resize', () => draw());

buttons.play.addEventListener('click', () => {
  if (timer) return stop();
  if (tick >= world.config.steps - 1) tick = 0;
  buttons.play.textContent = 'Pause';
  timer = window.setInterval(() => {
    tick += 1;
    render();
    if (tick >= world.config.steps - 1) stop();
  }, 80);
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
buttons.reset.addEventListener('click', () => {
  stop();
  tick = 0;
  render();
});
buttons['next-seed'].addEventListener('click', () => {
  form.elements.seed.value = String((number('seed') + 1) >>> 0);
  rebuild();
});
buttons.defaults.addEventListener('click', () => {
  form.reset();
  rebuild();
});
buttons.share.addEventListener('click', () => {
  const params = new URLSearchParams();
  for (const name of ['seed', 'heartbeatEvery', 'dropRate', 'burstDelay', 'outageLength', 'burstTiming', 'decisionTempo']) {
    params.set(name, form.elements[name].value);
  }
  window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  status.textContent = 'The address now reproduces this synthetic world.';
});
buttons.download.addEventListener('click', () => {
  const blob = new Blob([`${JSON.stringify(world, null, 2)}\n`], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `signal-or-silence-seed-${world.seed}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
});

setFromUrl();
rebuild();
