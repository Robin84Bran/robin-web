import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  DEFAULTS,
  POLICY_IDS,
  makeHeartbeatStream,
  normalizeConfig,
  serviceIsUp,
  simulateWorld,
} from './model.mjs';

test('deterministic replay is byte-for-byte stable', () => {
  assert.deepEqual(simulateWorld(DEFAULTS, 42), simulateWorld(DEFAULTS, 42));
});

test('all policies consume the same delivered heartbeat stream', () => {
  const world = simulateWorld(DEFAULTS, 7);
  const count = world.evidence.packets.filter((packet) => packet.deliveryAt !== null && packet.deliveryAt < DEFAULTS.steps).length;
  for (const policy of POLICY_IDS) assert.equal(world.policies[policy].summary.messagesSeen, count);
});

test('the service emits no heartbeat while truly down', () => {
  for (const packet of makeHeartbeatStream(DEFAULTS, 9)) {
    assert.equal(serviceIsUp(DEFAULTS, packet.sentAt), true);
  }
});

test('clean no-outage world never declares DOWN', () => {
  const config = { ...DEFAULTS, dropRate: 0, burstDelay: 2, outageLength: 0 };
  const world = simulateWorld(config, 1);
  for (const policy of POLICY_IDS) {
    assert.equal(world.policies[policy].summary.healthyFalseDown, 0);
    assert.equal(world.policies[policy].summary.detectionDelay, null);
  }
});

test('UNKNOWN policy exposes ambiguity before declaring DOWN', () => {
  const world = simulateWorld({ ...DEFAULTS, dropRate: 0, burstDelay: 2 }, 3);
  const frames = world.policies.uncertain.frames;
  const outageFrames = frames.filter((frame) => frame.tick >= DEFAULTS.outageStart && frame.tick < DEFAULTS.outageStart + DEFAULTS.outageLength);
  assert.ok(outageFrames.some((frame) => frame.state === 'UNKNOWN'));
  assert.ok(outageFrames.some((frame) => frame.state === 'DOWN'));
});

test('adaptive threshold remains bounded and reacts to long-delay arrivals', () => {
  const world = simulateWorld({ ...DEFAULTS, dropRate: 0, burstDelay: 30 }, 12);
  const thresholds = world.evidence.frames.map((frame) => frame.adaptiveTimeout);
  assert.ok(thresholds.every((value) => value >= DEFAULTS.adaptiveMin && value <= DEFAULTS.adaptiveMax));
  assert.ok(Math.max(...thresholds) > thresholds[0]);
});

test('every tick is accounted for without combining incompatible costs', () => {
  const world = simulateWorld(DEFAULTS, 17);
  const healthy = DEFAULTS.steps - DEFAULTS.outageLength;
  for (const policy of POLICY_IDS) {
    const summary = world.policies[policy].summary;
    assert.equal(summary.usefulRouting + summary.healthyFalseDown + summary.healthyUnknown, healthy);
    assert.equal(summary.outageUnsafeUp + summary.outageUnknown + (DEFAULTS.outageLength - summary.outageUnsafeUp - summary.outageUnknown), DEFAULTS.outageLength);
  }
});

test('fixed and adaptive baselines never emit UNKNOWN after first evidence', () => {
  const world = simulateWorld(DEFAULTS, 21);
  for (const policy of ['fixed', 'adaptive']) {
    const frames = world.policies[policy].frames;
    const firstSeen = frames.findIndex((frame) => frame.messagesSeen > 0);
    assert.ok(firstSeen >= 0);
    assert.ok(frames.slice(firstSeen).every((frame) => frame.state !== 'UNKNOWN'));
  }
});

test('invalid controls fail closed', () => {
  assert.throws(() => normalizeConfig({ steps: 2 }), /steps/);
  assert.throws(() => normalizeConfig({ dropRate: 101 }), /dropRate/);
  assert.throws(() => normalizeConfig({ downAfter: 10, unknownAfter: 10 }), /downAfter/);
  assert.throws(() => simulateWorld(DEFAULTS, -1), /seed/);
});
