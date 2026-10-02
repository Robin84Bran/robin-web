import test from 'node:test';
import assert from 'node:assert/strict';
import { simulate, defaults, presets, stations, controllerDecision, motherProposals, keyed } from './model.mjs';

test('recording cannot alter a treatment outcome; runs replay exactly', () => {
  const recorded = simulate({ seed: 11, steps: 220 });
  const unrecorded = simulate({ seed: 11, steps: 220, record: false });
  assert.deepEqual(recorded.arms.map(a => a.summary), unrecorded.arms.map(a => a.summary));
  assert.ok(unrecorded.arms.every(a => a.frames.length === 0));
  assert.deepEqual(unrecorded, simulate({ seed: 11, steps: 220, record: false }));
});

test('energy is conserved, including residual batteries on lost vehicles', () => {
  for (const energy of [8, 100]) for (const arm of simulate({ seed: 3, energy, record: false }).arms) {
    const s = arm.summary;
    assert.ok(s.remainingEnergy >= 0);
    assert.ok(Math.abs(s.initialEnergy - s.energyUsed - s.remainingEnergy) < 0.000002);
    assert.ok(Math.abs(s.motionEnergy + s.radioEnergy - s.energyUsed) < 0.000002);
    assert.ok(s.energyUsed <= s.initialEnergy + 0.000001);
  }
});

test('arms share the same seeded failure identities and initial payload', () => {
  const run = simulate({ population: 25, failureFraction: 0.4, record: false });
  for (const arm of run.arms) {
    assert.deepEqual(arm.diagnostics.failedIds, run.arms[0].diagnostics.failedIds);
    assert.equal(arm.summary.failedVehicles, 10);
    assert.equal(arm.summary.initialEnergy, 2500);
    assert.equal(arm.summary.activeVehicles, 15);
  }
});

test('population scaling explicitly changes budget but does not change sites', () => {
  for (const population of [2, 5, 10, 25, 50]) {
    const run = simulate({ population, steps: 40, record: false });
    assert.equal(run.world.objects.filter(o => o.kind === 'station').length, 10);
    assert.ok(run.arms.every(a => a.summary.initialEnergy === population * defaults.energy));
  }
});

test('physics respects finite bounds, turn limit, battery floor and reef exclusion', () => {
  const run = simulate({ fault: 'cross-current', current: 0.8, localizationNoise: 30, seed: 9 });
  for (const arm of run.arms) {
    assert.ok(arm.summary.maxObservedTurn <= run.audit.dynamicLimits.maxTurnRadiansPerStep + 1e-6);
    for (const frame of arm.frames) for (const n of frame.entities) {
      assert.ok(Number.isFinite(n.x) && n.x >= 0 && n.x <= run.world.width);
      assert.ok(Number.isFinite(n.y) && n.y >= 0 && n.y <= run.world.height);
      assert.ok(Number.isFinite(n.energy) && n.energy >= 0);
      if (n.id !== 'mother' && n.deployed) for (const reef of run.world.objects.filter(o => o.kind === 'reef')) {
        assert.ok(Math.hypot(n.x - reef.x, n.y - reef.y) >= reef.radius + 3 - 0.00001);
      }
    }
  }
});

test('local controller ignores inaccessible truth and does not mutate observations', () => {
  const input = {
    mode: 'local', tick: 96, id: 'v0', own: Object.freeze({ x: 220, y: 205 }),
    records: Object.freeze([Object.freeze({ id: 'v0', target: 's0', energy: 100, stamp: 96 })]),
    previousTarget: 's0', lastChange: 0, command: null,
  };
  const hostileTruth = new Proxy({}, { get() { throw new Error('Unobserved world was accessed'); } });
  assert.deepEqual(controllerDecision({ ...input, world: hostileTruth, realCoverage: hostileTruth, futureFailures: hostileTruth }), controllerDecision(input));
  assert.equal(controllerDecision(input).target, 's0');
});

test('future-stamped and expired beliefs cannot affect local action or mother proposals', () => {
  const fresh = [
    { id: 'v0', target: 's0', x: 220, y: 205, stamp: 96, energy: 100 },
    { id: 'v8', target: 's0', x: 220, y: 205, stamp: 96, energy: 100 },
  ];
  const future = stations.map((s, i) => ({ ...s, id: `v${i + 20}`, target: s.id, stamp: 999, energy: 100 }));
  const stale = stations.map((s, i) => ({ ...s, id: `v${i + 40}`, target: s.id, stamp: 0, energy: 100 }));
  const base = { mode: 'local', tick: 96, id: 'v8', own: { x: 220, y: 205 }, records: fresh, previousTarget: 's0', lastChange: 0, command: null };
  assert.deepEqual(controllerDecision({ ...base, records: [...fresh, ...future, ...stale] }), controllerDecision(base));
  assert.deepEqual(motherProposals([...fresh, ...future, ...stale], 96), motherProposals(fresh, 96));
});

test('a delivered command is usable only after arrival and before expiry', () => {
  const base = { mode: 'assisted', tick: 120, id: 'v0', own: { x: 220, y: 205 }, records: [], previousTarget: 's0', lastChange: 120 };
  assert.equal(controllerDecision({ ...base, command: { target: 's9', receivedAt: 121, expires: 140 } }).target, 's0');
  assert.equal(controllerDecision({ ...base, command: { target: 's9', receivedAt: 100, expires: 119 } }).target, 's0');
  assert.equal(controllerDecision({ ...base, command: { target: 's9', receivedAt: 120, expires: 140 } }).target, 's9');
});

test('mother commands traverse positive-latency transport and can fail to arrive', () => {
  const arm = simulate({ seed: 1, loss: 0.65, record: false }).arms[2];
  assert.ok(arm.summary.commandsIssued > 0);
  assert.ok(arm.summary.commandsDelivered > 0);
  assert.ok(arm.summary.commandsDelivered < arm.summary.commandsIssued);
  assert.ok(arm.summary.commandsExpired > 0);
  assert.equal(arm.summary.commandsIssued, arm.summary.commandsDelivered + arm.summary.commandsExpired + arm.summary.commandsPending);
  for (const command of arm.diagnostics.commands) assert.ok(command.receivedAt >= command.issuedAt + defaults.latency);
});

test('blackout stops in-flight delivery and transmissions; model never teleports commands', () => {
  const run = simulate({ fault: 'radio-blackout', faultTick: 120, blackoutDuration: 180, loss: 0.65, seed: 1, record: false });
  for (const arm of run.arms) {
    assert.equal(arm.summary.packetsScheduledInBlackout, 0);
    for (const command of arm.diagnostics.commands) assert.ok(command.receivedAt < 120 || command.receivedAt >= 300);
    assert.ok(arm.summary.minDeliveryDelay >= defaults.latency);
  }
});

test('mother loss does not secretly kill deployed children; unlaunched payload is stranded', () => {
  const later = simulate({ fault: 'mothership', record: false });
  assert.ok(later.arms.every(a => a.summary.activeVehicles === defaults.population && a.diagnostics.motherDeadTick === defaults.faultTick));
  const early = simulate({ fault: 'mothership', faultTick: 10, population: 25, launchInterval: 2, record: false });
  assert.ok(early.arms.every(a => a.summary.activeVehicles === 5));
});

test('an intervention at the final recorded step is counted, with recovery censored', () => {
  const result = simulate({ fault: 'node-loss', steps: 170, faultTick: 170, record: false });
  for (const arm of result.arms) {
    assert.equal(arm.summary.interventions, 1);
    assert.equal(arm.summary.failedVehicles, 10);
    assert.equal(arm.diagnostics.failedIds.length, 10);
    assert.equal(arm.summary.recoveryMinutes, null);
    assert.equal(arm.summary.recoveryCensored, 1);
  }
});

test('initial condition has no useful coverage and frames do not share mutable state', () => {
  const run = simulate({ seed: 7, steps: 90 });
  assert.equal(run.arms[0].frames[0].metrics.instantCoverage, 0);
  const saved = run.arms[0].frames[1].entities[0].x;
  run.arms[0].frames[0].entities[0].x = -999;
  run.arms[0].frames[0].objects[0].label = 'changed';
  assert.equal(run.arms[0].frames[1].entities[0].x, saved);
  assert.notEqual(run.arms[0].frames[1].objects[0].label, 'changed');
  assert.notEqual(run.world.objects[0].label, 'changed');
});

test('all presets and adversarial numeric inputs produce finite or explicitly null metrics', () => {
  for (const preset of presets) {
    const run = simulate({ ...preset.params, seed: NaN, steps: 50, population: 5, current: Infinity, record: false });
    for (const arm of run.arms) {
      for (const value of Object.values(arm.summary)) assert.ok(value === null || Number.isFinite(value));
      assert.equal(arm.summary.commandsIssued, arm.summary.commandsDelivered + arm.summary.commandsExpired + arm.summary.commandsPending);
    }
  }
});

test('keyed exogenous draws are independent of call order and differ across seeds', () => {
  const expected = keyed(4, 8, 'v1', 'flowX');
  for (let i = 0; i < 100; i++) keyed(999, i, 'irrelevant');
  assert.equal(keyed(4, 8, 'v1', 'flowX'), expected);
  assert.notEqual(keyed(5, 8, 'v1', 'flowX'), expected);
});
