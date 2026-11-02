import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DEFAULTS, POLICY_IDS, makeWorldTrace, normalizeConfig, simulateWorld } from './model.mjs';

test('deterministic replay is byte-for-byte stable', () => {
  assert.deepEqual(simulateWorld(DEFAULTS, 42), simulateWorld(DEFAULTS, 42));
});

test('all policies receive one matched world trace', () => {
  const world = simulateWorld(DEFAULTS, 7);
  assert.equal(world.evidence.frames.length, DEFAULTS.steps);
  for (const policy of POLICY_IDS) assert.equal(world.policies[policy].frames.length, DEFAULTS.steps);
});

test('accounting conserves every arrived job', () => {
  for (const seed of [1, 2, 9001]) {
    const world = simulateWorld(DEFAULTS, seed);
    for (const policy of POLICY_IDS) {
      const s = world.policies[policy].summary;
      assert.equal(s.arrived, s.delivered + s.expired + s.overflowed + s.finalQueue);
    }
  }
});

test('static bridges never repair after schema drift', () => {
  const world = simulateWorld({ ...DEFAULTS, driftRate: 20 }, 9);
  assert.equal(world.policies.static.summary.repairs, 0);
  assert.ok(world.policies.static.summary.blockedAttempts > 0);
});

test('a permanently unavailable hub blocks shared delivery', () => {
  const config = { ...DEFAULTS, hubOutageRate: 100, hubRecoveryRate: 0, driftRate: 0 };
  const world = simulateWorld(config, 4);
  assert.equal(world.policies.shared.frames[0].delivered > 0, true);
  assert.equal(world.policies.shared.frames.slice(1).every((frame) => frame.delivered === 0), true);
  assert.ok(world.policies.shared.summary.hubBlockedAttempts > 0);
});

test('stable schemas and stable hub keep both active architectures current', () => {
  const config = { ...DEFAULTS, driftRate: 0, hubOutageRate: 0 };
  const world = simulateWorld(config, 3);
  assert.equal(world.policies.direct.summary.delivered, world.policies.shared.summary.delivered);
  assert.equal(world.policies.direct.summary.repairs, 0);
  assert.equal(world.policies.shared.summary.repairs, 0);
});

test('drift increments only the matched service versions', () => {
  const trace = makeWorldTrace({ ...DEFAULTS, driftRate: 100, steps: 16, deadline: 16 }, 5);
  assert.deepEqual(trace[0].versions, Array(DEFAULTS.services).fill(0));
  assert.deepEqual(trace[1].versions, Array(DEFAULTS.services).fill(1));
  assert.equal(trace[1].drifted.length, DEFAULTS.services);
});

test('repair action budget cannot be exceeded', () => {
  const config = { ...DEFAULTS, repairsPerTick: 2, driftRate: 30 };
  const world = simulateWorld(config, 11);
  for (const policy of POLICY_IDS) {
    assert.ok(world.policies[policy].summary.repairs <= config.steps * config.repairsPerTick);
    for (const frame of world.policies[policy].frames) assert.ok(frame.repairs.length <= config.repairsPerTick);
  }
});

test('a bounded queue records overflow without losing accounting', () => {
  const config = { ...DEFAULTS, queueLimit: 1, deadline: DEFAULTS.steps, driftRate: 100, repairsPerTick: 0 };
  const world = simulateWorld(config, 12);
  for (const policy of POLICY_IDS) {
    const s = world.policies[policy].summary;
    assert.ok(s.overflowed > 0);
    assert.equal(s.arrived, s.delivered + s.expired + s.overflowed + s.finalQueue);
  }
});

test('invalid controls fail closed', () => {
  assert.throws(() => normalizeConfig({ services: 2 }), /services/);
  assert.throws(() => normalizeConfig({ services: 4, routeLength: 5 }), /routeLength/);
  assert.throws(() => normalizeConfig({ driftRate: 101 }), /driftRate/);
  assert.throws(() => normalizeConfig({ repairsPerTick: -1 }), /repairsPerTick/);
  assert.throws(() => simulateWorld(DEFAULTS, -1), /seed/);
});
