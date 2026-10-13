export const VERSION = '1.0.0';

export const POLICY_IDS = ['carry', 'reset', 'portable', 'frozen', 'random'];

export const POLICY_LABELS = {
  carry: 'Carry every habit',
  reset: 'Start blank',
  portable: 'Portable core',
  frozen: 'Frozen manual',
  random: 'Random control',
};

export const INTENTS = ['north', 'east', 'south', 'west'];

export const DEFAULTS = Object.freeze({
  steps: 96,
  swapEvery: 8,
  bodyCount: 4,
  divergence: 2,
  driftAt: 0,
  manifestFresh: true,
});

function assertInteger(name, value, min, max) {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new RangeError(`${name} must be an integer from ${min} to ${max}`);
  }
}

export function normalizeConfig(input = {}) {
  const config = { ...DEFAULTS, ...input };
  assertInteger('steps', config.steps, 8, 512);
  assertInteger('swapEvery', config.swapEvery, 1, config.steps);
  assertInteger('bodyCount', config.bodyCount, 1, 64);
  assertInteger('divergence', config.divergence, 0, 2);
  assertInteger('driftAt', config.driftAt, 0, config.steps - 1);
  config.manifestFresh = Boolean(config.manifestFresh);
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

function swap(permutation, a, b) {
  [permutation[a], permutation[b]] = [permutation[b], permutation[a]];
}

export function bodyMapping(seed, bodyIndex, version, divergence) {
  const mapping = [0, 1, 2, 3];
  if (divergence === 0) return mapping;
  if (divergence === 1) {
    const first = seededWord(seed, bodyIndex, version, 11) % 4;
    const second = (first + 1 + (seededWord(seed, bodyIndex, version, 12) % 3)) % 4;
    swap(mapping, first, second);
    return mapping;
  }
  for (let cursor = 3; cursor > 0; cursor -= 1) {
    const selected = seededWord(seed, bodyIndex, version, cursor, 21) % (cursor + 1);
    swap(mapping, cursor, selected);
  }
  if (mapping.every((intent, action) => intent === action)) {
    swap(mapping, bodyIndex % 4, (bodyIndex + 1) % 4);
  }
  return mapping;
}

function makeModel() {
  return {
    outcomes: [null, null, null, null],
    seenAt: [-1, -1, -1, -1],
    tries: [0, 0, 0, 0],
  };
}

function updateModel(model, action, actual, step) {
  for (let other = 0; other < 4; other += 1) {
    if (other !== action && model.outcomes[other] === actual) {
      model.outcomes[other] = null;
      model.seenAt[other] = -1;
    }
  }
  model.outcomes[action] = actual;
  model.seenAt[action] = step;
  model.tries[action] += 1;

  const knownActions = model.outcomes
    .map((value, index) => ({ value, index }))
    .filter(({ value }) => value !== null);
  const knownIntents = new Set(knownActions.map(({ value }) => value));
  if (knownActions.length === 3 && knownIntents.size === 3) {
    const missingAction = model.outcomes.findIndex((value) => value === null);
    const missingIntent = [0, 1, 2, 3].find((value) => !knownIntents.has(value));
    model.outcomes[missingAction] = missingIntent;
    model.seenAt[missingAction] = step;
  }
}

function chooseFromModel(model, target, step) {
  const matches = [0, 1, 2, 3]
    .filter((action) => model.outcomes[action] === target)
    .sort((a, b) => model.seenAt[b] - model.seenAt[a] || a - b);
  if (matches.length) return { action: matches[0], recalled: true };
  const minimumTries = Math.min(...model.tries);
  const candidates = [0, 1, 2, 3].filter((action) => model.tries[action] === minimumTries);
  return { action: candidates[step % candidates.length], recalled: false };
}

function targetIntent(seed, progress) {
  const current = seededWord(seed, progress, 101) % 4;
  if (progress === 0) return current;
  const previous = seededWord(seed, progress - 1, 101) % 4;
  return current === previous ? (current + 1 + (progress % 3)) % 4 : current;
}

export function simulatePolicy(inputConfig, policy, seed = 1, includeFrames = true) {
  const config = normalizeConfig(inputConfig);
  if (!POLICY_IDS.includes(policy)) throw new RangeError(`Unknown policy: ${policy}`);
  assertInteger('seed', seed, 0, 0xffffffff);

  let progress = 0;
  let correct = 0;
  let errors = 0;
  let currentHandoff = -1;
  let currentModel = null;
  let globalModel = makeModel();
  const bodyModels = new Map();
  const recoveries = [];
  let recoveryErrors = 0;
  let recoveryOpen = false;
  let recalls = 0;
  let calibrations = 0;
  let staleRecallErrors = 0;
  const frames = [];

  for (let step = 0; step < config.steps; step += 1) {
    const handoff = Math.floor(step / config.swapEvery);
    const bodyIndex = handoff % config.bodyCount;
    const version = config.driftAt > 0 && step >= config.driftAt ? 2 : 1;
    const fingerprint = `body-${bodyIndex + 1}${config.manifestFresh ? `-v${version}` : ''}`;
    const mapping = bodyMapping(seed, bodyIndex, version, config.divergence);

    if (handoff !== currentHandoff) {
      if (recoveryOpen) recoveries.push(recoveryErrors);
      currentHandoff = handoff;
      recoveryErrors = 0;
      recoveryOpen = true;
      if (policy === 'reset') {
        currentModel = makeModel();
        calibrations += 1;
      } else if (policy === 'carry') {
        currentModel = globalModel;
        if (handoff === 0) calibrations += 1;
        else recalls += 1;
      } else if (policy === 'portable') {
        if (bodyModels.has(fingerprint)) {
          currentModel = bodyModels.get(fingerprint);
          recalls += 1;
        } else {
          currentModel = makeModel();
          bodyModels.set(fingerprint, currentModel);
          calibrations += 1;
        }
      }
    }

    const target = targetIntent(seed, progress);
    let action;
    let usedRecall = false;
    if (policy === 'random') {
      action = seededWord(seed, step, 303) % 4;
    } else if (policy === 'frozen') {
      action = target;
    } else {
      const choice = chooseFromModel(currentModel, target, step);
      action = choice.action;
      usedRecall = choice.recalled;
    }

    const actual = mapping[action];
    const succeeded = actual === target;
    if (succeeded) {
      correct += 1;
      progress += 1;
      if (recoveryOpen) {
        recoveries.push(recoveryErrors);
        recoveryOpen = false;
      }
    } else {
      errors += 1;
      if (recoveryOpen) recoveryErrors += 1;
      if (policy === 'portable' && usedRecall && version === 2 && !config.manifestFresh) {
        staleRecallErrors += 1;
      }
    }

    if (policy === 'carry' || policy === 'reset' || policy === 'portable') {
      updateModel(currentModel, action, actual, step);
    }

    if (includeFrames) {
      frames.push({
        step,
        handoff,
        body: `body-${bodyIndex + 1}`,
        fingerprint,
        version,
        target: INTENTS[target],
        action: action + 1,
        actual: INTENTS[actual],
        correct: succeeded,
        progress,
      });
    }
  }
  if (recoveryOpen) recoveries.push(recoveryErrors);

  const recoveryTotal = recoveries.reduce((sum, value) => sum + value, 0);
  return {
    version: VERSION,
    seed,
    policy,
    config,
    summary: {
      actions: config.steps,
      correct,
      errors,
      assemblies: Math.floor(correct / 4),
      completionRate: correct / config.steps,
      handoffs: Math.ceil(config.steps / config.swapEvery),
      meanRecoveryErrors: recoveries.length ? recoveryTotal / recoveries.length : 0,
      maxRecoveryErrors: recoveries.length ? Math.max(...recoveries) : 0,
      recalls,
      calibrations,
      staleRecallErrors,
    },
    frames,
  };
}

export function simulateWorld(inputConfig, seed = 1, includeFrames = true) {
  const config = normalizeConfig(inputConfig);
  return {
    version: VERSION,
    seed,
    config,
    policies: Object.fromEntries(
      POLICY_IDS.map((policy) => [policy, simulatePolicy(config, policy, seed, includeFrames)]),
    ),
  };
}

