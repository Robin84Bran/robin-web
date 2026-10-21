export const VERSION = '1.0.0';

export const POLICY_IDS = ['fixed', 'adaptive', 'uncertain'];

export const POLICY_LABELS = {
  fixed: 'Fixed timeout',
  adaptive: 'Adaptive timeout',
  uncertain: 'Keep UNKNOWN',
};

export const DEFAULTS = Object.freeze({
  steps: 240,
  heartbeatEvery: 4,
  dropRate: 12,
  baseDelay: 2,
  burstStart: 72,
  burstEnd: 112,
  burstDelay: 14,
  outageStart: 140,
  outageLength: 40,
  fixedTimeout: 10,
  unknownAfter: 10,
  downAfter: 26,
  adaptiveMin: 8,
  adaptiveMax: 30,
});

function integer(name, value, min, max) {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new RangeError(`${name} must be an integer from ${min} to ${max}`);
  }
}

export function normalizeConfig(input = {}) {
  const config = { ...DEFAULTS, ...input };
  integer('steps', config.steps, 32, 1000);
  integer('heartbeatEvery', config.heartbeatEvery, 1, 60);
  integer('dropRate', config.dropRate, 0, 100);
  integer('baseDelay', config.baseDelay, 1, 60);
  integer('burstStart', config.burstStart, 0, config.steps);
  integer('burstEnd', config.burstEnd, config.burstStart, config.steps);
  integer('burstDelay', config.burstDelay, 1, 120);
  integer('outageStart', config.outageStart, 0, config.steps);
  integer('outageLength', config.outageLength, 0, config.steps - config.outageStart);
  integer('fixedTimeout', config.fixedTimeout, 1, 120);
  integer('unknownAfter', config.unknownAfter, 1, 120);
  integer('downAfter', config.downAfter, config.unknownAfter + 1, 240);
  integer('adaptiveMin', config.adaptiveMin, 1, 120);
  integer('adaptiveMax', config.adaptiveMax, config.adaptiveMin, 240);
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

export function seededWord(seed, ...parts) {
  let value = mix32(seed >>> 0);
  for (const part of parts) value = mix32(value ^ mix32(Number(part) >>> 0));
  return value >>> 0;
}

export function serviceIsUp(config, tick) {
  if (config.outageLength === 0) return true;
  return tick < config.outageStart || tick >= config.outageStart + config.outageLength;
}

export function makeHeartbeatStream(inputConfig, seed = 1) {
  const config = normalizeConfig(inputConfig);
  integer('seed', seed, 0, 0xffffffff);
  const packets = [];
  for (let sentAt = 0; sentAt < config.steps; sentAt += config.heartbeatEvery) {
    if (!serviceIsUp(config, sentAt)) continue;
    const sequence = Math.floor(sentAt / config.heartbeatEvery);
    const dropped = (seededWord(seed, sequence, 101) % 10000) < config.dropRate * 100;
    const inBurst = sentAt >= config.burstStart && sentAt < config.burstEnd;
    const delayCeiling = inBurst ? config.burstDelay : config.baseDelay;
    const delay = 1 + (seededWord(seed, sequence, 202) % delayCeiling);
    packets.push({
      sequence,
      sentAt,
      delay,
      deliveryAt: dropped ? null : sentAt + delay,
      dropped,
      inBurst,
    });
  }
  return packets;
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function statusFor(policy, seen, age, adaptiveTimeout, config) {
  if (!seen) return 'UNKNOWN';
  if (policy === 'fixed') return age <= config.fixedTimeout ? 'UP' : 'DOWN';
  if (policy === 'adaptive') return age <= adaptiveTimeout ? 'UP' : 'DOWN';
  if (age <= config.unknownAfter) return 'UP';
  return age <= config.downAfter ? 'UNKNOWN' : 'DOWN';
}

function emptyMetrics() {
  return {
    usefulRouting: 0,
    healthyFalseDown: 0,
    healthyUnknown: 0,
    outageUnsafeUp: 0,
    outageUnknown: 0,
    stateChanges: 0,
  };
}

export function simulateWorld(inputConfig = {}, seed = 1, includeFrames = true) {
  const config = normalizeConfig(inputConfig);
  integer('seed', seed, 0, 0xffffffff);
  const packets = makeHeartbeatStream(config, seed);
  const arrivals = new Map();
  for (const packet of packets) {
    if (packet.deliveryAt === null || packet.deliveryAt >= config.steps) continue;
    const bucket = arrivals.get(packet.deliveryAt) ?? [];
    bucket.push(packet);
    arrivals.set(packet.deliveryAt, bucket);
  }
  for (const bucket of arrivals.values()) bucket.sort((a, b) => a.sentAt - b.sentAt);

  const metrics = Object.fromEntries(POLICY_IDS.map((id) => [id, emptyMetrics()]));
  const previousStatus = Object.fromEntries(POLICY_IDS.map((id) => [id, null]));
  const policyFrames = Object.fromEntries(POLICY_IDS.map((id) => [id, []]));
  const firstDown = Object.fromEntries(POLICY_IDS.map((id) => [id, null]));
  const firstRecovered = Object.fromEntries(POLICY_IDS.map((id) => [id, null]));
  const evidenceFrames = [];
  let lastArrival = null;
  let messagesSeen = 0;
  let meanGap = config.heartbeatEvery;
  let gapDeviation = 0;
  let adaptiveTimeout = clamp(
    Math.ceil(meanGap + 3 * gapDeviation + 2),
    config.adaptiveMin,
    config.adaptiveMax,
  );
  const outageEnd = config.outageStart + config.outageLength;

  for (let tick = 0; tick < config.steps; tick += 1) {
    const delivered = arrivals.get(tick) ?? [];
    for (const packet of delivered) {
      if (lastArrival !== null) {
        const gap = tick - lastArrival;
        const oldMean = meanGap;
        meanGap = (3 * meanGap + gap) / 4;
        gapDeviation = (3 * gapDeviation + Math.abs(gap - oldMean)) / 4;
      }
      lastArrival = tick;
      messagesSeen += 1;
    }
    adaptiveTimeout = clamp(
      Math.ceil(meanGap + 3 * gapDeviation + 2),
      config.adaptiveMin,
      config.adaptiveMax,
    );
    const seen = lastArrival !== null;
    const age = seen ? tick - lastArrival : null;
    const actualUp = serviceIsUp(config, tick);
    const states = {};

    for (const policy of POLICY_IDS) {
      const state = statusFor(policy, seen, age, adaptiveTimeout, config);
      states[policy] = state;
      if (previousStatus[policy] !== null && previousStatus[policy] !== state) {
        metrics[policy].stateChanges += 1;
      }
      previousStatus[policy] = state;
      if (actualUp && state === 'UP') metrics[policy].usefulRouting += 1;
      if (actualUp && state === 'DOWN') metrics[policy].healthyFalseDown += 1;
      if (actualUp && state === 'UNKNOWN') metrics[policy].healthyUnknown += 1;
      if (!actualUp && state === 'UP') metrics[policy].outageUnsafeUp += 1;
      if (!actualUp && state === 'UNKNOWN') metrics[policy].outageUnknown += 1;
      if (!actualUp && tick >= config.outageStart && state === 'DOWN' && firstDown[policy] === null) {
        firstDown[policy] = tick;
      }
      if (config.outageLength > 0 && tick >= outageEnd && state === 'UP' && firstRecovered[policy] === null) {
        firstRecovered[policy] = tick;
      }
      if (includeFrames) {
        policyFrames[policy].push({
          tick,
          state,
          actual: actualUp ? 'UP' : 'DOWN',
          age,
          threshold: policy === 'adaptive'
            ? adaptiveTimeout
            : policy === 'fixed' ? config.fixedTimeout : config.downAfter,
          messagesSeen,
          ...metrics[policy],
        });
      }
    }
    if (includeFrames) {
      evidenceFrames.push({
        tick,
        actual: actualUp ? 'UP' : 'DOWN',
        delivered: delivered.map((packet) => packet.sequence),
        lastArrival,
        age,
        adaptiveTimeout,
        states,
      });
    }
  }

  const policies = {};
  for (const policy of POLICY_IDS) {
    policies[policy] = {
      policy,
      label: POLICY_LABELS[policy],
      summary: {
        ...metrics[policy],
        healthyUnavailability: metrics[policy].healthyFalseDown + metrics[policy].healthyUnknown,
        detectionDelay: firstDown[policy] === null ? null : firstDown[policy] - config.outageStart,
        recoveryDelay: firstRecovered[policy] === null ? null : firstRecovered[policy] - outageEnd,
        messagesSeen,
      },
      frames: policyFrames[policy],
    };
  }

  return {
    version: VERSION,
    seed,
    config,
    evidence: { packets, frames: evidenceFrames },
    policies,
  };
}
