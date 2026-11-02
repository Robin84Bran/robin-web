export const VERSION = '1.0.0';

export const POLICY_IDS = Object.freeze(['direct', 'shared', 'static', 'random']);
export const POLICY_LABELS = Object.freeze({
  direct: 'Direct bridges',
  shared: 'Shared layer',
  static: 'Static bridges',
  random: 'Random repair',
});

export const DEFAULTS = Object.freeze({
  steps: 160,
  services: 8,
  routeLength: 3,
  arrivalsPerTick: 2,
  deliveryAttempts: 3,
  repairsPerTick: 1,
  driftRate: 3,
  hubOutageRate: 2,
  hubRecoveryRate: 35,
  deadline: 24,
  queueLimit: 64,
  routePoolSize: 0,
});

function integer(name, value, min, max) {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new RangeError(`${name} must be an integer from ${min} to ${max}`);
  }
  return value;
}

export function normalizeConfig(input = {}) {
  const config = { ...DEFAULTS, ...input };
  integer('steps', config.steps, 16, 1000);
  integer('services', config.services, 3, 24);
  integer('routeLength', config.routeLength, 2, config.services);
  integer('arrivalsPerTick', config.arrivalsPerTick, 1, 8);
  integer('deliveryAttempts', config.deliveryAttempts, 1, 12);
  integer('repairsPerTick', config.repairsPerTick, 0, 4);
  integer('driftRate', config.driftRate, 0, 100);
  integer('hubOutageRate', config.hubOutageRate, 0, 100);
  integer('hubRecoveryRate', config.hubRecoveryRate, 0, 100);
  integer('deadline', config.deadline, 1, config.steps);
  integer('queueLimit', config.queueLimit, 1, 1000);
  integer('routePoolSize', config.routePoolSize, 0, 32);
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

export function draw(seed, tick, index, salt) {
  const value = (seed >>> 0)
    ^ Math.imul((tick + 1) >>> 0, 0x9e3779b1)
    ^ Math.imul((index + 17) >>> 0, 0x85ebca6b)
    ^ saltHash(salt);
  return mix32(value) / 0x100000000;
}

function routeFor(seed, tick, slot, config, salt = 'arrival') {
  const ranked = Array.from({ length: config.services }, (_, service) => ({
    service,
    rank: draw(seed, tick, service + slot * 31, salt),
  })).sort((a, b) => a.rank - b.rank || a.service - b.service);
  return ranked.slice(0, config.routeLength).map((entry) => entry.service);
}

function makeRoutePool(seed, config) {
  return Array.from({ length: config.routePoolSize }, (_, index) => routeFor(seed, -1 - index, index, config, 'route-pool'));
}

export function makeWorldTrace(input = DEFAULTS, seed = 1) {
  const config = normalizeConfig(input);
  integer('seed', seed, 0, 0xffffffff);
  const versions = Array(config.services).fill(0);
  const routePool = makeRoutePool(seed, config);
  let hubUp = true;
  let jobId = 0;
  const frames = [];

  for (let tick = 0; tick < config.steps; tick += 1) {
    const drifted = [];
    if (tick > 0) {
      for (let service = 0; service < config.services; service += 1) {
        if (draw(seed, tick, service, 'schema-drift') * 100 < config.driftRate) {
          versions[service] += 1;
          drifted.push(service);
        }
      }
      if (hubUp && draw(seed, tick, 0, 'hub-outage') * 100 < config.hubOutageRate) hubUp = false;
      else if (!hubUp && draw(seed, tick, 0, 'hub-recovery') * 100 < config.hubRecoveryRate) hubUp = true;
    }

    const arrivals = [];
    for (let slot = 0; slot < config.arrivalsPerTick; slot += 1) {
      const route = routePool.length
        ? routePool[Math.floor(draw(seed, tick, slot, 'pool-choice') * routePool.length)]
        : routeFor(seed, tick, slot, config);
      arrivals.push({ id: jobId, arrivedAt: tick, route: [...route] });
      jobId += 1;
    }
    frames.push({ tick, versions: [...versions], hubUp, drifted, arrivals });
  }
  return frames;
}

function pairKey(left, right) {
  return `${left}>${right}`;
}

function routePairs(route) {
  return route.slice(0, -1).map((left, index) => [left, route[index + 1]]);
}

function freshPairAdapter(versions, left, right) {
  return [versions[left], versions[right]];
}

function pairIsCurrent(adapters, versions, left, right) {
  const saved = adapters.get(pairKey(left, right));
  return Boolean(saved && saved[0] === versions[left] && saved[1] === versions[right]);
}

function routeIsCurrent(policy, route, state, frame) {
  if (policy === 'shared') {
    return frame.hubUp && route.every((service) => state.busAdapters[service] === frame.versions[service]);
  }
  return routePairs(route).every(([left, right]) => pairIsCurrent(state.pairAdapters, frame.versions, left, right));
}

function demandedStalePairs(queue, state, frame) {
  const found = new Map();
  for (const job of queue) {
    for (const [left, right] of routePairs(job.route)) {
      const key = pairKey(left, right);
      if (!found.has(key) && !pairIsCurrent(state.pairAdapters, frame.versions, left, right)) found.set(key, [left, right]);
    }
  }
  return [...found.values()];
}

function repair(policy, state, frame, seed, repairIndex) {
  if (policy === 'static') return null;
  if (policy === 'shared') {
    for (const job of state.queue) {
      const service = job.route.find((id) => state.busAdapters[id] !== frame.versions[id]);
      if (service !== undefined) {
        state.busAdapters[service] = frame.versions[service];
        return { kind: 'bus', service };
      }
    }
    return null;
  }

  const stale = demandedStalePairs(state.queue, state, frame);
  if (!stale.length) return null;
  const selected = policy === 'random'
    ? stale[Math.floor(draw(seed, frame.tick, repairIndex, 'random-repair') * stale.length)]
    : stale[0];
  const [left, right] = selected;
  state.pairAdapters.set(pairKey(left, right), freshPairAdapter(frame.versions, left, right));
  return { kind: 'pair', left, right };
}

function initialState(config) {
  const pairAdapters = new Map();
  for (let left = 0; left < config.services; left += 1) {
    for (let right = 0; right < config.services; right += 1) {
      if (left !== right) pairAdapters.set(pairKey(left, right), [0, 0]);
    }
  }
  return {
    pairAdapters,
    busAdapters: Array(config.services).fill(0),
    queue: [],
    summary: {
      arrived: 0,
      delivered: 0,
      expired: 0,
      overflowed: 0,
      blockedAttempts: 0,
      hubBlockedAttempts: 0,
      repairs: 0,
      unusedRepairs: 0,
      latencyTotal: 0,
      maxLatency: 0,
      finalQueue: 0,
      meanLatency: null,
    },
  };
}

function runPolicy(policy, trace, config, seed, includeFrames) {
  const state = initialState(config);
  const frames = [];

  for (const frame of trace) {
    state.summary.arrived += frame.arrivals.length;
    for (const job of frame.arrivals) {
      if (state.queue.length >= config.queueLimit) state.summary.overflowed += 1;
      else state.queue.push({ ...job, route: [...job.route] });
    }

    const kept = [];
    for (const job of state.queue) {
      if (frame.tick - job.arrivedAt >= config.deadline) state.summary.expired += 1;
      else kept.push(job);
    }
    state.queue = kept;

    const repairs = [];
    for (let index = 0; index < config.repairsPerTick; index += 1) {
      const action = repair(policy, state, frame, seed, index);
      if (action) {
        repairs.push(action);
        state.summary.repairs += 1;
      } else state.summary.unusedRepairs += 1;
    }

    const candidates = state.queue.slice(0, config.deliveryAttempts);
    const deliveredIds = new Set();
    for (const job of candidates) {
      if (routeIsCurrent(policy, job.route, state, frame)) {
        deliveredIds.add(job.id);
        state.summary.delivered += 1;
        const latency = frame.tick - job.arrivedAt;
        state.summary.latencyTotal += latency;
        state.summary.maxLatency = Math.max(state.summary.maxLatency, latency);
      } else {
        state.summary.blockedAttempts += 1;
        if (policy === 'shared' && !frame.hubUp) state.summary.hubBlockedAttempts += 1;
      }
    }
    if (deliveredIds.size) state.queue = state.queue.filter((job) => !deliveredIds.has(job.id));

    if (includeFrames) {
      frames.push({
        tick: frame.tick,
        hubUp: frame.hubUp,
        drifted: [...frame.drifted],
        versions: [...frame.versions],
        arrived: frame.arrivals.length,
        repairs,
        delivered: deliveredIds.size,
        cumulativeDelivered: state.summary.delivered,
        expired: state.summary.expired,
        overflowed: state.summary.overflowed,
        blockedAttempts: state.summary.blockedAttempts,
        queue: state.queue.length,
      });
    }
  }

  state.summary.finalQueue = state.queue.length;
  state.summary.meanLatency = state.summary.delivered
    ? state.summary.latencyTotal / state.summary.delivered
    : null;
  return { summary: state.summary, ...(includeFrames ? { frames } : {}) };
}

export function simulateWorld(input = DEFAULTS, seed = 1, includeFrames = true) {
  const config = normalizeConfig(input);
  integer('seed', seed, 0, 0xffffffff);
  const trace = makeWorldTrace(config, seed);
  const policies = Object.fromEntries(POLICY_IDS.map((policy) => [policy, runPolicy(policy, trace, config, seed, includeFrames)]));
  return { version: VERSION, seed, config, evidence: { frames: trace }, policies };
}
