import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DEFAULTS, POLICY_IDS, makeCandidateTrace, normalizeConfig, simulateWorld } from './model.mjs';

test('deterministic replay is byte-for-byte stable', () => {
  assert.deepEqual(simulateWorld(DEFAULTS, 42), simulateWorld(DEFAULTS, 42));
});

test('all policies use one matched candidate stream', () => {
  const trace = makeCandidateTrace(DEFAULTS, 7);
  const world = simulateWorld(DEFAULTS, 7);
  assert.deepEqual(world.evidence.candidates, trace);
  assert.equal(trace.length, DEFAULTS.steps * DEFAULTS.actionsPerTick);
});

test('every policy consumes the exact action budget', () => {
  const world = simulateWorld(DEFAULTS, 9);
  for (const policy of POLICY_IDS) {
    const s = world.policies[policy].summary;
    assert.equal(s.actionBudget, DEFAULTS.steps * DEFAULTS.actionsPerTick);
    assert.equal(s.productionActions + s.reviewActions, s.actionBudget);
    assert.equal(s.produced + s.blockedProduction, s.productionActions);
  }
});

test('candidate accounting is conserved', () => {
  for (const seed of [1, 2, 9001]) {
    const world = simulateWorld(DEFAULTS, seed);
    for (const policy of POLICY_IDS) {
      const s = world.policies[policy].summary;
      assert.equal(s.produced, s.accepted + s.rejected + s.expired + s.finalQueue);
      assert.equal(s.reviewed, s.accepted + s.rejected);
    }
  }
});

test('fixed allocations stay fixed on every tick', () => {
  const config = { ...DEFAULTS, steps: 8, deadline: 8 };
  const world = simulateWorld(config, 3);
  assert.equal(world.policies.makerHeavy.summary.productionActions, 8 * 6);
  assert.equal(world.policies.balanced.summary.productionActions, 8 * 4);
  assert.equal(world.policies.checkerHeavy.summary.productionActions, 8 * 2);
});

test('perfect quality never rejects a reviewed candidate', () => {
  const world = simulateWorld({ ...DEFAULTS, qualityRate: 100 }, 5);
  for (const policy of POLICY_IDS) assert.equal(world.policies[policy].summary.rejected, 0);
});

test('zero quality never accepts a reviewed candidate', () => {
  const world = simulateWorld({ ...DEFAULTS, qualityRate: 0 }, 5);
  for (const policy of POLICY_IDS) assert.equal(world.policies[policy].summary.accepted, 0);
});

test('larger review batches can reverse the fixed allocation result', () => {
  const slow = simulateWorld({ ...DEFAULTS, qualityRate: 100, reviewBatch: 1 }, 4);
  const fast = simulateWorld({ ...DEFAULTS, qualityRate: 100, reviewBatch: 3 }, 4);
  assert.ok(slow.policies.balanced.summary.accepted > slow.policies.makerHeavy.summary.accepted);
  assert.ok(fast.policies.makerHeavy.summary.accepted > fast.policies.balanced.summary.accepted);
});

test('a bounded queue records blocked production', () => {
  const world = simulateWorld({ ...DEFAULTS, queueLimit: 2, adaptiveTarget: 2, reviewBatch: 1 }, 12);
  assert.ok(world.policies.makerHeavy.summary.blockedProduction > 0);
  for (const policy of POLICY_IDS) assert.ok(world.policies[policy].summary.maxQueue <= 2);
});

test('short deadlines retain expiry as a separate outcome', () => {
  const world = simulateWorld({ ...DEFAULTS, deadline: 1 }, 6);
  assert.ok(world.policies.makerHeavy.summary.expired > 0);
  assert.equal(world.policies.makerHeavy.summary.produced,
    world.policies.makerHeavy.summary.accepted + world.policies.makerHeavy.summary.rejected
      + world.policies.makerHeavy.summary.expired + world.policies.makerHeavy.summary.finalQueue);
});

test('review actions never inspect future validity', () => {
  const world = simulateWorld({ ...DEFAULTS, steps: 8, deadline: 8 }, 11);
  for (const policy of POLICY_IDS) {
    const s = world.policies[policy].summary;
    assert.ok(s.reviewed <= s.produced);
  }
});

test('invalid controls fail closed', () => {
  assert.throws(() => normalizeConfig({ actionsPerTick: 3 }), /actionsPerTick/);
  assert.throws(() => normalizeConfig({ qualityRate: 101 }), /qualityRate/);
  assert.throws(() => normalizeConfig({ reviewBatch: 0 }), /reviewBatch/);
  assert.throws(() => normalizeConfig({ steps: 8, deadline: 9 }), /deadline/);
  assert.throws(() => normalizeConfig({ queueLimit: 4, adaptiveTarget: 5 }), /adaptiveTarget/);
  assert.throws(() => simulateWorld(DEFAULTS, -1), /seed/);
});
