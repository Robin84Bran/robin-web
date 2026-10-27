import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DEFAULTS, MODULES, POLICY_IDS, canRun, makeHealthTrace, normalizeConfig, simulateWorld } from './model.mjs';

test('deterministic replay is byte-for-byte stable', () => {
  assert.deepEqual(simulateWorld(DEFAULTS, 42), simulateWorld(DEFAULTS, 42));
});

test('all policies receive one shared failure trace', () => {
  const world = simulateWorld(DEFAULTS, 7);
  assert.equal(world.evidence.frames.length, DEFAULTS.steps);
  for (const policy of POLICY_IDS) assert.equal(world.policies[policy].frames.length, DEFAULTS.steps);
});

test('calm world exposes the graceful architecture peak cost', () => {
  const config = { ...DEFAULTS, failureRate: 0, repairRate: 0, shockEvery: 0, shockSize: 0 };
  const world = simulateWorld(config, 1);
  assert.equal(world.policies.monolith.summary.usefulWork, config.steps * 12);
  assert.equal(world.policies.graceful.summary.usefulWork, config.steps * 10);
  assert.equal(world.policies.core.summary.usefulWork, config.steps * 2);
});

test('graceful shed never attempts an infeasible tier', () => {
  const world = simulateWorld({ ...DEFAULTS, failureRate: 12, repairRate: 2, shockSize: 4 }, 9);
  for (const frame of world.policies.graceful.frames) assert.equal(frame.mode === 'idle' || frame.feasible, true);
  assert.equal(world.policies.graceful.summary.failedAttempts, 0);
});

test('correlated shock removes the declared number of active modules', () => {
  const config = { ...DEFAULTS, failureRate: 0, repairRate: 0, shockEvery: 30, shockSize: 4 };
  const trace = makeHealthTrace(config, 3);
  assert.equal(trace[30].events.filter((event) => event.type === 'shock').length, 4);
  assert.equal(trace[30].health.filter(Boolean).length, MODULES.length - 4);
});

test('frame accounting reproduces every policy summary', () => {
  const world = simulateWorld(DEFAULTS, 17);
  for (const policy of POLICY_IDS) {
    const run = world.policies[policy];
    assert.equal(run.frames.reduce((sum, frame) => sum + frame.work, 0), run.summary.usefulWork);
    assert.equal(run.summary.productiveTicks + run.summary.failedAttempts + run.summary.idleTicks, DEFAULTS.steps);
  }
});

test('mode requirements are explicit', () => {
  const all = MODULES.map(() => true);
  assert.equal(canRun('full', all), true);
  all[5] = false;
  assert.equal(canRun('full', all), false);
  assert.equal(canRun('reduced', all), true);
});

test('invalid controls fail closed', () => {
  assert.throws(() => normalizeConfig({ steps: 2 }), /steps/);
  assert.throws(() => normalizeConfig({ failureRate: 101 }), /failureRate/);
  assert.throws(() => normalizeConfig({ shockEvery: 0, shockSize: 2 }), /shockEvery/);
  assert.throws(() => simulateWorld(DEFAULTS, -1), /seed/);
});
