export const VERSION = '1.0.0';

export const POLICY_IDS = Object.freeze(['makerHeavy', 'balanced', 'checkerHeavy', 'adaptive', 'random']);
export const POLICY_LABELS = Object.freeze({
  makerHeavy: 'Six make, two check',
  balanced: 'Four make, four check',
  checkerHeavy: 'Two make, six check',
  adaptive: 'Queue-aware',
  random: 'Random split',
});

export const DEFAULTS = Object.freeze({
  steps: 120,
  actionsPerTick: 8,
  qualityRate: 70,
  reviewBatch: 1,
  deadline: 12,
  queueLimit: 64,
  adaptiveTarget: 8,
});

function integer(name, value, min, max) {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new RangeError(`${name} must be an integer from ${min} to ${max}`);
  }
  return value;
}

export function normalizeConfig(input = {}) {
  const config = { ...DEFAULTS, ...input };
  integer('steps', config.steps, 8, 1000);
  integer('actionsPerTick', config.actionsPerTick, 4, 32);
  integer('qualityRate', config.qualityRate, 0, 100);
  integer('reviewBatch', config.reviewBatch, 1, 8);
  integer('deadline', config.deadline, 1, config.steps);
  integer('queueLimit', config.queueLimit, 1, 4096);
  integer('adaptiveTarget', config.adaptiveTarget, 1, config.queueLimit);
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

export function makeCandidateTrace(input = DEFAULTS, seed = 1) {
  const config = normalizeConfig(input);
  integer('seed', seed, 0, 0xffffffff);
  const count = config.steps * config.actionsPerTick;
  return Array.from({ length: count }, (_, id) => ({
    id,
    valid: draw(seed, 0, id, 'candidate-quality') * 100 < config.qualityRate,
  }));
}

function fixedProductionCount(policy, actions) {
  if (policy === 'makerHeavy') return Math.max(1, Math.round(actions * 0.75));
  if (policy === 'balanced') return Math.round(actions * 0.5);
  if (policy === 'checkerHeavy') return Math.max(1, Math.round(actions * 0.25));
  return null;
}

function initialSummary() {
  return {
    actionBudget: 0,
    productionActions: 0,
    blockedProduction: 0,
    produced: 0,
    reviewActions: 0,
    idleReviewActions: 0,
    reviewed: 0,
    accepted: 0,
    rejected: 0,
    expired: 0,
    finalQueue: 0,
    meanReviewAge: null,
    reviewAgeTotal: 0,
    maxQueue: 0,
  };
}

function runPolicy(policy, candidates, config, seed, includeFrames) {
  const queue = [];
  const summary = initialSummary();
  const frames = [];
  let nextCandidate = 0;

  function produce(tick) {
    summary.productionActions += 1;
    if (queue.length >= config.queueLimit) {
      summary.blockedProduction += 1;
      return { kind: 'blocked' };
    }
    const source = candidates[nextCandidate];
    nextCandidate += 1;
    queue.push({ id: source.id, valid: source.valid, createdAt: tick });
    summary.produced += 1;
    summary.maxQueue = Math.max(summary.maxQueue, queue.length);
    return { kind: 'produced', id: source.id };
  }

  function review(tick) {
    summary.reviewActions += 1;
    if (!queue.length) {
      summary.idleReviewActions += 1;
      return { kind: 'idle', reviewed: 0, accepted: 0, rejected: 0 };
    }
    let reviewed = 0;
    let accepted = 0;
    let rejected = 0;
    while (reviewed < config.reviewBatch && queue.length) {
      const candidate = queue.shift();
      const age = tick - candidate.createdAt;
      summary.reviewAgeTotal += age;
      if (candidate.valid) {
        summary.accepted += 1;
        accepted += 1;
      } else {
        summary.rejected += 1;
        rejected += 1;
      }
      summary.reviewed += 1;
      reviewed += 1;
    }
    return { kind: 'reviewed', reviewed, accepted, rejected };
  }

  for (let tick = 0; tick < config.steps; tick += 1) {
    let expiredThisTick = 0;
    while (queue.length && tick - queue[0].createdAt >= config.deadline) {
      queue.shift();
      summary.expired += 1;
      expiredThisTick += 1;
    }

    const actions = [];
    const fixed = fixedProductionCount(policy, config.actionsPerTick);
    for (let slot = 0; slot < config.actionsPerTick; slot += 1) {
      let choice;
      if (fixed !== null) choice = slot < fixed ? 'produce' : 'review';
      else if (policy === 'adaptive') choice = queue.length < config.adaptiveTarget ? 'produce' : 'review';
      else choice = draw(seed, tick, slot, 'random-policy') < 0.5 ? 'produce' : 'review';
      actions.push(choice === 'produce' ? produce(tick) : review(tick));
    }
    summary.actionBudget += config.actionsPerTick;

    if (includeFrames) {
      frames.push({
        tick,
        produced: actions.filter((action) => action.kind === 'produced').length,
        reviewed: actions.reduce((total, action) => total + (action.reviewed || 0), 0),
        accepted: actions.reduce((total, action) => total + (action.accepted || 0), 0),
        rejected: actions.reduce((total, action) => total + (action.rejected || 0), 0),
        expired: expiredThisTick,
        queue: queue.length,
        cumulativeAccepted: summary.accepted,
        cumulativeRejected: summary.rejected,
        cumulativeExpired: summary.expired,
        blockedProduction: summary.blockedProduction,
        idleReviewActions: summary.idleReviewActions,
      });
    }
  }

  summary.finalQueue = queue.length;
  summary.meanReviewAge = summary.reviewed ? summary.reviewAgeTotal / summary.reviewed : null;
  return { summary, ...(includeFrames ? { frames } : {}) };
}

export function simulateWorld(input = DEFAULTS, seed = 1, includeFrames = true) {
  const config = normalizeConfig(input);
  integer('seed', seed, 0, 0xffffffff);
  const candidates = makeCandidateTrace(config, seed);
  const policies = {};
  for (const policy of POLICY_IDS) policies[policy] = runPolicy(policy, candidates, config, seed, includeFrames);
  return {
    experiment: 'Work or Proof?',
    version: VERSION,
    seed,
    config,
    evidence: {
      candidateCount: candidates.length,
      validCandidates: candidates.filter((candidate) => candidate.valid).length,
      ...(includeFrames ? { candidates } : {}),
    },
    policies,
  };
}
