export const VERSION = '1.0.0';

export const MODULES = Object.freeze([
  { id: 'drive-a', type: 'actuator', label: 'Drive A' },
  { id: 'drive-b', type: 'actuator', label: 'Drive B' },
  { id: 'drive-c', type: 'actuator', label: 'Drive C' },
  { id: 'sense-a', type: 'sensor', label: 'Sense A' },
  { id: 'sense-b', type: 'sensor', label: 'Sense B' },
  { id: 'link', type: 'link', label: 'Link' },
  { id: 'power-a', type: 'power', label: 'Power A' },
  { id: 'power-b', type: 'power', label: 'Power B' },
]);

export const MODE_IDS = Object.freeze(['full', 'reduced', 'core']);
export const POLICY_IDS = Object.freeze(['monolith', 'graceful', 'core', 'random']);
export const POLICY_LABELS = Object.freeze({
  monolith: 'Full job',
  graceful: 'Graceful shed',
  core: 'Core only',
  random: 'Random mode',
});

export const MODE_RULES = Object.freeze({
  full: { label: 'FULL', value: 12, gracefulValue: 10, needs: { actuator: 3, sensor: 2, link: 1, power: 2 } },
  reduced: { label: 'REDUCED', value: 6, gracefulValue: 5, needs: { actuator: 2, sensor: 1, link: 0, power: 1 } },
  core: { label: 'CORE', value: 2, gracefulValue: 2, needs: { actuator: 1, sensor: 0, link: 0, power: 1 } },
});

export const DEFAULTS = Object.freeze({
  steps: 120,
  failureRate: 3,
  repairRate: 8,
  shockEvery: 30,
  shockSize: 2,
  switchCost: 1,
});

function integer(name, value, min, max) {
  if (!Number.isInteger(value) || value < min || value > max) throw new RangeError(`${name} must be an integer from ${min} to ${max}`);
  return value;
}

export function normalizeConfig(input = {}) {
  const config = { ...DEFAULTS, ...input };
  integer('steps', config.steps, 8, 1000);
  integer('failureRate', config.failureRate, 0, 100);
  integer('repairRate', config.repairRate, 0, 100);
  integer('shockEvery', config.shockEvery, 0, config.steps);
  integer('shockSize', config.shockSize, 0, MODULES.length);
  integer('switchCost', config.switchCost, 0, 12);
  if (config.shockSize > 0 && config.shockEvery === 0) throw new RangeError('shockEvery must be positive when shockSize is positive');
  return config;
}

function mix32(value) {
  let x = value >>> 0;
  x ^= x >>> 16;
  x = Math.imul(x, 0x7feb352d);
  x ^= x >>> 15;
  x = Math.imul(x, 0x846ca68b);
  x ^= x >>> 16;
  return x >>> 0;
}

function saltHash(text) {
  let value = 2166136261;
  for (const char of text) value = Math.imul(value ^ char.charCodeAt(0), 16777619);
  return value >>> 0;
}

export function draw(seed, tick, moduleIndex, salt) {
  const value = (seed >>> 0) ^ Math.imul((tick + 1) >>> 0, 0x9e3779b1) ^ Math.imul((moduleIndex + 17) >>> 0, 0x85ebca6b) ^ saltHash(salt);
  return mix32(value) / 0x100000000;
}

function counts(health) {
  const result = { actuator: 0, sensor: 0, link: 0, power: 0 };
  health.forEach((up, index) => { if (up) result[MODULES[index].type] += 1; });
  return result;
}

export function canRun(mode, health) {
  const available = counts(health);
  return Object.entries(MODE_RULES[mode].needs).every(([type, needed]) => available[type] >= needed);
}

export function makeHealthTrace(input = DEFAULTS, seed = 1) {
  const config = normalizeConfig(input);
  integer('seed', seed, 0, 0xffffffff);
  const health = MODULES.map(() => true);
  const frames = [];
  for (let tick = 0; tick < config.steps; tick += 1) {
    const events = [];
    if (tick > 0) {
      for (let index = 0; index < health.length; index += 1) {
        if (!health[index] && draw(seed, tick, index, 'repair') * 100 < config.repairRate) {
          health[index] = true;
          events.push({ type: 'repair', module: MODULES[index].id });
        }
      }
      if (config.shockSize > 0 && tick % config.shockEvery === 0) {
        const candidates = health.map((up, index) => ({ up, index, rank: draw(seed, tick, index, 'shock') }))
          .filter((entry) => entry.up)
          .sort((a, b) => a.rank - b.rank || a.index - b.index)
          .slice(0, config.shockSize);
        for (const { index } of candidates) {
          health[index] = false;
          events.push({ type: 'shock', module: MODULES[index].id });
        }
      }
      for (let index = 0; index < health.length; index += 1) {
        if (health[index] && draw(seed, tick, index, 'failure') * 100 < config.failureRate) {
          health[index] = false;
          events.push({ type: 'failure', module: MODULES[index].id });
        }
      }
    }
    frames.push({ tick, health: [...health], counts: counts(health), events });
  }
  return frames;
}

function gracefulMode(health) {
  return MODE_IDS.find((mode) => canRun(mode, health)) ?? 'idle';
}

function selectedMode(policy, health, seed, tick) {
  if (policy === 'monolith') return 'full';
  if (policy === 'graceful') return gracefulMode(health);
  if (policy === 'core') return 'core';
  return MODE_IDS[Math.floor(draw(seed, tick, 91, 'random-policy') * MODE_IDS.length)];
}

function runPolicy(policy, trace, config, seed, includeFrames) {
  const summary = {
    usefulWork: 0,
    ceilingWork: 0,
    productiveTicks: 0,
    failedAttempts: 0,
    idleTicks: 0,
    switches: 0,
    fullCompletions: 0,
    reducedCompletions: 0,
    coreCompletions: 0,
  };
  const frames = [];
  let previousMode = null;
  for (const worldFrame of trace) {
    const best = gracefulMode(worldFrame.health);
    const ceiling = best === 'idle' ? 0 : MODE_RULES[best].value;
    const mode = selectedMode(policy, worldFrame.health, seed, worldFrame.tick);
    const feasible = mode !== 'idle' && canRun(mode, worldFrame.health);
    const switched = previousMode !== null && previousMode !== mode;
    if (switched) summary.switches += 1;
    let work = 0;
    if (mode === 'idle') {
      summary.idleTicks += 1;
    } else if (!feasible) {
      summary.failedAttempts += 1;
    } else {
      const gross = policy === 'graceful' ? MODE_RULES[mode].gracefulValue : MODE_RULES[mode].value;
      work = Math.max(0, gross - (policy === 'graceful' && switched ? config.switchCost : 0));
      summary.productiveTicks += 1;
      summary[`${mode}Completions`] += 1;
    }
    summary.usefulWork += work;
    summary.ceilingWork += ceiling;
    if (includeFrames) frames.push({ tick: worldFrame.tick, mode, feasible, switched, work, cumulativeWork: summary.usefulWork });
    previousMode = mode;
  }
  return { summary, ...(includeFrames ? { frames } : {}) };
}

export function simulateWorld(input = DEFAULTS, seed = 1, includeFrames = true) {
  const config = normalizeConfig(input);
  integer('seed', seed, 0, 0xffffffff);
  const trace = makeHealthTrace(config, seed);
  const policies = Object.fromEntries(POLICY_IDS.map((policy) => [policy, runPolicy(policy, trace, config, seed, includeFrames)]));
  return { version: VERSION, seed, config, evidence: { modules: MODULES, frames: trace }, policies };
}
