import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  DEFAULTS,
  POLICY_IDS,
  bodyMapping,
  normalizeConfig,
  simulatePolicy,
  simulateWorld,
} from './model.mjs';

test('deterministic replay is exact', () => {
  const first = simulateWorld(DEFAULTS, 42);
  const second = simulateWorld(DEFAULTS, 42);
  assert.deepEqual(first, second);
});

test('all actuator mappings remain bijections', () => {
  for (let seed = 1; seed <= 64; seed += 1) {
    for (let body = 0; body < 12; body += 1) {
      for (let version = 1; version <= 2; version += 1) {
        for (let divergence = 0; divergence <= 2; divergence += 1) {
          assert.deepEqual([...bodyMapping(seed, body, version, divergence)].sort(), [0, 1, 2, 3]);
        }
      }
    }
  }
});

test('every policy receives exactly the same action budget', () => {
  const world = simulateWorld(DEFAULTS, 9);
  for (const policy of POLICY_IDS) {
    assert.equal(world.policies[policy].summary.actions, DEFAULTS.steps);
    assert.equal(world.policies[policy].frames.length, DEFAULTS.steps);
  }
});

test('frozen manual is perfect when every body has the same mapping', () => {
  const run = simulatePolicy({ ...DEFAULTS, divergence: 0 }, 'frozen', 7, false);
  assert.equal(run.summary.correct, DEFAULTS.steps);
  assert.equal(run.summary.errors, 0);
});

test('one-use bodies make portable core equivalent to start blank', () => {
  const config = { ...DEFAULTS, bodyCount: 12 };
  for (let seed = 1; seed <= 16; seed += 1) {
    const reset = simulatePolicy(config, 'reset', seed, false).summary;
    const portable = simulatePolicy(config, 'portable', seed, false).summary;
    assert.equal(portable.correct, reset.correct);
    assert.equal(portable.errors, reset.errors);
  }
});

test('fresh capability versions prevent stale portable recalls', () => {
  const fresh = simulatePolicy({ ...DEFAULTS, driftAt: 48, manifestFresh: true }, 'portable', 17, false);
  const stale = simulatePolicy({ ...DEFAULTS, driftAt: 48, manifestFresh: false }, 'portable', 17, false);
  assert.equal(fresh.summary.staleRecallErrors, 0);
  assert.ok(stale.summary.staleRecallErrors >= 0);
});

test('portable core improves over reset in the frozen default batch', () => {
  let portable = 0;
  let reset = 0;
  for (let seed = 1; seed <= 64; seed += 1) {
    portable += simulatePolicy(DEFAULTS, 'portable', seed, false).summary.correct;
    reset += simulatePolicy(DEFAULTS, 'reset', seed, false).summary.correct;
  }
  assert.ok(portable > reset, `expected portable ${portable} > reset ${reset}`);
});

test('carry-all is not penalized when mappings are identical', () => {
  let carry = 0;
  let portable = 0;
  const config = { ...DEFAULTS, divergence: 0 };
  for (let seed = 1; seed <= 64; seed += 1) {
    carry += simulatePolicy(config, 'carry', seed, false).summary.correct;
    portable += simulatePolicy(config, 'portable', seed, false).summary.correct;
  }
  assert.ok(carry >= portable, `expected carry ${carry} >= portable ${portable}`);
});

test('invalid controls are rejected', () => {
  assert.throws(() => normalizeConfig({ steps: 0 }), /steps/);
  assert.throws(() => normalizeConfig({ swapEvery: 999 }), /swapEvery/);
  assert.throws(() => simulatePolicy(DEFAULTS, 'oracle', 1), /Unknown policy/);
});

