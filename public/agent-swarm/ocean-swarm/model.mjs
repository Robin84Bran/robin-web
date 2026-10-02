/** Ocean Swarm: deterministic, reduced-order environmental-sensing experiment. */
export const meta = {
  id: 'ocean-swarm', number: 5, title: 'Ocean Swarm',
  subtitle: 'A constellation beneath a fallible mothership',
  question: 'Who repairs the sensing constellation when the sea breaks the plan?',
  description: 'Launch an underwater environmental sensor fleet. Compare provisioned stations, local vacancy repair, and bounded assistance through the same unreliable acoustic mesh.',
  scene: 'ocean', metric: 'coverage', label: 'Station uptime', unit: '%', direction: 'higher',
  hypothesis: 'Local repair can recover empty stations after node loss; delayed reports, congestion and partial views can also make repair worse. Mothership help must arrive over a real simulated link.',
  limitations: [
    'Synthetic horizontal dynamics; the 3D depth is illustrative, not a hydrodynamic simulation.',
    'The station map is provisioned to everyone. Actual coverage and remote survival are evaluator-only.',
    'Modeled energy and acoustic transport expose tradeoffs; their coefficients are not calibrated to hardware.',
    'Population sweeps increase total initial payload and energy. Arm comparisons at one population have equal budgets.',
  ],
};

export const defaults = {
  seed: 7, steps: 360, population: 25, fault: 'node-loss', faultTick: 170,
  failureFraction: 0.4, blackoutDuration: 90, commRange: 300, loss: 0.12,
  bandwidth: 192, latency: 2, beliefTTL: 60, localizationNoise: 9,
  current: 0.22, energy: 100, launchInterval: 2, record: true,
};
export const controls = [
  { key: 'population', label: 'Children deployed', type: 'select', options: [2, 5, 10, 25, 50].map(value => ({ value, label: `${value} vehicles` })) },
  { key: 'fault', label: 'Intervention', type: 'select', options: [
    { value: 'none', label: 'No failure' }, { value: 'node-loss', label: 'Lose children' },
    { value: 'radio-blackout', label: 'Acoustic blackout' }, { value: 'mothership', label: 'Lose mothership' },
    { value: 'cross-current', label: 'Shift the current' }, { value: 'compound', label: 'Compound failure' },
  ] },
  { key: 'commRange', label: 'Acoustic range', type: 'range', min: 100, max: 600, step: 25, unit: 'm' },
  { key: 'loss', label: 'Packet loss', type: 'range', min: 0, max: 0.7, step: 0.05 },
  { key: 'bandwidth', label: 'Transmit budget per vehicle', type: 'select', options: [96, 192, 384].map(value => ({ value, label: `${value} bytes / step` })) },
  { key: 'localizationNoise', label: 'Localization noise', type: 'range', min: 0, max: 30, step: 1, unit: 'm' },
  { key: 'current', label: 'Ambient current', type: 'range', min: 0, max: 0.8, step: 0.05, unit: 'm/s' },
  { key: 'energy', label: 'Initial battery per child', type: 'range', min: 30, max: 150, step: 5, unit: 'modeled Wh' },
];
export const presets = [
  { id: 'calm', label: 'An ordinary deployment', description: 'No failure: repair must justify its overhead against a stable provisioned constellation.', params: { fault: 'none' } },
  { id: 'node-loss', label: 'Silent children', description: 'A seeded 40% of children disappear. No death notification is delivered to other controllers.', params: { fault: 'node-loss' } },
  { id: 'radio-blackout', label: 'The silent ocean', description: 'All acoustic packets fail for fifteen simulated minutes, including mother commands.', params: { fault: 'radio-blackout' } },
  { id: 'mothership', label: 'Mother goes dark', description: 'The surface node disappears. Children retain only their own controller and already delivered information.', params: { fault: 'mothership' } },
  { id: 'cross-current', label: 'A moving world', description: 'A strong cross-current arrives halfway through deployment, testing navigation and energy margins.', params: { fault: 'cross-current' } },
  { id: 'compound', label: 'Three blows at once', description: 'Children, acoustic communication and mother fail together. The surviving world keeps moving.', params: { fault: 'compound' } },
];

const WIDTH = 1000, HEIGHT = 700, DT = 10, STATION_RADIUS = 48, PACKET_BYTES = 96;
const MAX_SPEED = 1.35, MAX_TURN = 0.19, INERTIA = 0.34, REPORT_EVERY = 8;
const ARM_DEFS = [
  { id: 'provisioned', label: 'Provisioned stations', color: '#edb566' },
  { id: 'local', label: 'Local repair', color: '#4ccbb9' },
  { id: 'assisted', label: 'Bounded assistance', color: '#9da9ff' },
];
export const stations = Array.from({ length: 10 }, (_, i) => ({ id: `s${i}`, kind: 'station', x: 220 + (i % 5) * 160, y: i < 5 ? 205 : 495, z: -35, radius: STATION_RADIUS, label: `Sensor site ${i + 1}` }));
const reefs = [
  { id: 'reef0', kind: 'reef', x: 430, y: 350, radius: 46, z: -35, label: 'Reef' },
  { id: 'reef1', kind: 'reef', x: 650, y: 352, radius: 39, z: -35, label: 'Reef' },
  { id: 'reef2', kind: 'reef', x: 266, y: 352, radius: 30, z: -35, label: 'Reef' },
];
const motherPosition = { x: 80, y: 350 };
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const finite = (v, fallback) => Number.isFinite(Number(v)) ? Number(v) : fallback;
const round = (v, digits = 6) => Number(v.toFixed(digits));
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const angleDiff = (a, b) => Math.atan2(Math.sin(a - b), Math.cos(a - b));
const rank = id => id === 'mother' ? -1 : Number(id.slice(1));

/** Counter-based draws: an arm's branch or queue does not consume another draw. */
export function keyed(seed, ...keys) {
  let h = (seed >>> 0) ^ 2166136261;
  const text = keys.join('|');
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  h ^= h >>> 16; h = Math.imul(h, 2246822507); h ^= h >>> 13; h = Math.imul(h, 3266489909); h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
function noise(seed, ...keys) {
  return (keyed(seed, ...keys, 0) + keyed(seed, ...keys, 1) + keyed(seed, ...keys, 2) - 1.5) * 2;
}
function normalize(options) {
  const p = { ...defaults, ...options };
  for (const [key, lo, hi] of [
    ['seed', 0, 2147483647], ['steps', 40, 720], ['population', 2, 50], ['faultTick', 10, 690],
    ['failureFraction', 0, 0.9], ['blackoutDuration', 1, 300], ['commRange', 80, 1000],
    ['loss', 0, 0.95], ['bandwidth', 96, 768], ['latency', 1, 12], ['beliefTTL', 12, 180],
    ['localizationNoise', 0, 50], ['current', 0, 1], ['energy', 5, 300], ['launchInterval', 0, 5],
  ]) p[key] = clamp(finite(p[key], defaults[key]), lo, hi);
  for (const key of ['seed', 'steps', 'population', 'faultTick', 'blackoutDuration', 'bandwidth', 'latency', 'beliefTTL', 'launchInterval']) p[key] = Math.round(p[key]);
  if (!presets.some(preset => preset.params.fault === p.fault)) p.fault = defaults.fault;
  p.record = options.record !== false;
  return p;
}
function initialTarget(index, population) { return `s${Math.floor(index * 10 / population)}`; }
function currentAt(p, tick, position) {
  const storm = (p.fault === 'cross-current' || p.fault === 'compound') && tick >= p.faultTick ? 0.5 : 0;
  return {
    x: p.current * (0.4 + 0.4 * Math.sin(tick / 37 + position.y / 180)) + storm * 0.3,
    y: p.current * (0.65 * Math.cos(position.x / 260 + tick / 81)) + storm * Math.sin(tick / 25 + 0.8),
  };
}
function temperatureAt(tick, position) {
  const plumeX = 220 + tick * 1.35, plumeY = 355 + Math.sin(tick / 70) * 140;
  return 13 + position.x / 500 + 2.7 * Math.exp(-((position.x - plumeX) ** 2 + (position.y - plumeY) ** 2) / 55000);
}
function freshRecords(memory, tick, ttl) {
  return [...memory.values()].filter(r => tick >= r.stamp && tick - r.stamp <= ttl);
}
function countsAndClaims(records) {
  const claims = new Map(stations.map(s => [s.id, []]));
  for (const r of records) if (claims.has(r.target)) claims.get(r.target).push(r);
  for (const v of claims.values()) v.sort((a, b) => rank(a.id) - rank(b.id));
  return claims;
}

/**
 * Auditable pure controller. Only own observation, received records and mission map enter.
 * No physical world, remote-alive flags, evaluator coverage or future failure is accepted.
 */
export function controllerDecision({ mode, tick, id, own, records, previousTarget, lastChange, command, ttl = 60 }) {
  if (mode === 'provisioned') return { target: previousTarget, reason: 'provisioned' };
  if (mode === 'assisted' && command && command.receivedAt <= tick && command.expires >= tick) {
    return { target: command.target, reason: 'delivered-command' };
  }
  if (tick < 90 || tick - lastChange < 24 || tick % 8 !== rank(id) % 8) return { target: previousTarget, reason: 'hold' };
  const recent = records.filter(r => r.stamp <= tick && tick - r.stamp <= ttl && r.energy > 0);
  const claims = countsAndClaims(recent);
  const mine = claims.get(previousTarget) || [];
  const desired = Math.max(1, Math.floor(recent.length / stations.length));
  const retained = mine.slice(0, desired).some(r => r.id === id);
  if (mine.length <= desired || retained) return { target: previousTarget, reason: 'retain-site' };
  const candidates = stations.filter(s => claims.get(s.id).length < desired);
  candidates.sort((a, b) => {
    const scoreA = claims.get(a.id).length * 350 + dist(own, a);
    const scoreB = claims.get(b.id).length * 350 + dist(own, b);
    return scoreA - scoreB || a.id.localeCompare(b.id);
  });
  return candidates.length ? { target: candidates[0].id, reason: 'local-vacancy' } : { target: previousTarget, reason: 'no-vacancy' };
}

/** Bounded mother proposals from received records only, never from fleet truth. */
export function motherProposals(records, tick, ttl = 60) {
  const recent = records.filter(r => r.stamp <= tick && tick - r.stamp <= ttl && r.energy > 0);
  const claims = countsAndClaims(recent);
  const desired = Math.max(1, Math.floor(recent.length / stations.length));
  const surplus = [...claims.values()].flatMap(list => list.slice(desired));
  const vacancies = stations.filter(s => claims.get(s.id).length < desired);
  const proposals = [];
  for (const station of vacancies) {
    if (!surplus.length || proposals.length === 2) break;
    surplus.sort((a, b) => dist(a, station) - dist(b, station) || rank(a.id) - rank(b.id));
    const selected = surplus.shift();
    proposals.push({ recipient: selected.id, target: station.id });
  }
  return proposals;
}

function createNode(index, p) {
  const id = `v${index}`;
  return {
    id, index, x: motherPosition.x, y: motherPosition.y, vx: 0, vy: 0, heading: 0,
    energy: p.energy, alive: true, deployed: false, launchTick: index * p.launchInterval,
    target: initialTarget(index, p.population), initialTarget: initialTarget(index, p.population),
    lastChange: 0, command: null, biasX: 0, biasY: 0, memory: new Map(), queue: [], seen: new Set(),
    changed: 0, deadReason: null, own: null,
  };
}
function observe(node, p, tick) {
  node.biasX = clamp(node.biasX + noise(p.seed, tick, node.id, 'biasX') * 0.14 * p.localizationNoise, -2 * p.localizationNoise, 2 * p.localizationNoise);
  node.biasY = clamp(node.biasY + noise(p.seed, tick, node.id, 'biasY') * 0.14 * p.localizationNoise, -2 * p.localizationNoise, 2 * p.localizationNoise);
  const flow = currentAt(p, tick, node);
  return {
    id: node.id, stamp: tick,
    x: clamp(node.x + node.biasX + noise(p.seed, tick, node.id, 'x') * p.localizationNoise, 0, WIDTH),
    y: clamp(node.y + node.biasY + noise(p.seed, tick, node.id, 'y') * p.localizationNoise, 0, HEIGHT),
    flowX: flow.x + noise(p.seed, tick, node.id, 'flowX') * 0.05,
    flowY: flow.y + noise(p.seed, tick, node.id, 'flowY') * 0.05,
    temperature: temperatureAt(tick, node) + noise(p.seed, tick, node.id, 'temperature') * 0.18,
    target: node.target, energy: node.energy,
  };
}
function move(node, p, tick, observation, meters) {
  const target = stations.find(s => s.id === node.target);
  let dx = target.x - observation.x, dy = target.y - observation.y;
  const targetDist = Math.hypot(dx, dy);
  let desiredX = dx / Math.max(targetDist, 1) * Math.min(MAX_SPEED, targetDist / 24) - observation.flowX;
  let desiredY = dy / Math.max(targetDist, 1) * Math.min(MAX_SPEED, targetDist / 24) - observation.flowY;
  for (const reef of reefs) {
    const rd = dist(observation, reef), proximity = reef.radius + 68;
    if (rd < proximity) {
      const push = (proximity - rd) / 45;
      desiredX += (observation.x - reef.x) / Math.max(rd, 1) * push;
      desiredY += (observation.y - reef.y) / Math.max(rd, 1) * push;
    }
  }
  const desiredHeading = Math.atan2(desiredY, desiredX);
  const previousHeading = node.heading;
  node.heading += clamp(angleDiff(desiredHeading, node.heading), -MAX_TURN, MAX_TURN);
  meters.maxObservedTurn = Math.max(meters.maxObservedTurn, Math.abs(angleDiff(node.heading, previousHeading)));
  // Turn before full thrust: otherwise a slow-turning vehicle circles its berth
  // at full power. This actuator-aware navigation rule is identical in all arms.
  const alignment = Math.max(0.08, Math.cos(angleDiff(desiredHeading, node.heading)));
  const throttle = Math.min(1, Math.hypot(desiredX, desiredY) / MAX_SPEED) * alignment;
  const flow = currentAt(p, tick, node);
  node.vx += INERTIA * (Math.cos(node.heading) * MAX_SPEED * throttle + flow.x - node.vx);
  node.vy += INERTIA * (Math.sin(node.heading) * MAX_SPEED * throttle + flow.y - node.vy);
  const prevX = node.x, prevY = node.y;
  node.x = clamp(node.x + node.vx * DT, 0, WIDTH);
  node.y = clamp(node.y + node.vy * DT, 0, HEIGHT);
  for (const reef of reefs) {
    const rd = dist(node, reef);
    if (rd < reef.radius + 3) {
      const nx = rd > 0 ? (node.x - reef.x) / rd : 1, ny = rd > 0 ? (node.y - reef.y) / rd : 0;
      node.x = reef.x + nx * (reef.radius + 3); node.y = reef.y + ny * (reef.radius + 3);
      node.vx *= 0.1; node.vy *= 0.1; meters.reefContacts++;
    }
  }
  meters.distance += Math.hypot(node.x - prevX, node.y - prevY);
  const cost = Math.min(node.energy, 0.027 + 0.245 * throttle ** 2);
  node.energy -= cost; meters.motionEnergy += cost;
  if (node.energy <= 0) { node.alive = false; node.deadReason = 'battery'; meters.exhausted++; }
}
function enqueue(node, packet, meters) {
  if (node.queue.length >= 16) { node.queue.shift(); meters.queueDrops++; }
  node.queue.push(packet);
}
function makeReport(node, tick) {
  return { id: `${node.id}:r:${tick}`, kind: 'report', origin: node.id, stamp: tick, expires: tick + 120, hops: 0, payload: { ...node.own, target: node.target } };
}
function runArm(def, p) {
  const nodes = Array.from({ length: p.population }, (_, i) => createNode(i, p));
  const mother = { id: 'mother', ...motherPosition, alive: true, deployed: true, energy: Infinity, memory: new Map(), queue: [], seen: new Set() };
  const byId = new Map([...nodes, mother].map(n => [n.id, n]));
  const scheduled = new Map();
  const failedIds = nodes.slice().sort((a, b) => keyed(p.seed, 'fatal', a.id) - keyed(p.seed, 'fatal', b.id)).slice(0, Math.round(p.population * p.failureFraction)).map(n => n.id);
  const frames = [], coverages = [], commandRecords = [];
  const issuedCommands = new Map(), deliveredCommands = new Set();
  const meters = { motionEnergy: 0, radioEnergy: 0, motherRadioEnergy: 0, bytes: 0, receivedBytes: 0, attemptedLinks: 0, deliveredLinks: 0, packetLosses: 0, commandsIssued: 0, commandsDelivered: 0, commandsExpired: 0, commandFollowingSteps: 0, aliveSteps: 0, targetChanges: 0, queueDrops: 0, reefContacts: 0, distance: 0, exhausted: 0, sampleError: 0, samples: 0, minimumDeliveryDelay: Infinity, maxObservedTurn: 0, preFault: [], networkDuringBlackout: 0 };
  let coveredTotal = 0, timeTo80 = null, motherDeadTick = null;

  // The launch manifest is common prior information. Later records arrive over links.
  for (const node of nodes) for (const other of nodes) node.memory.set(other.id, { id: other.id, x: mother.x, y: mother.y, target: other.target, energy: other.energy, stamp: 0 });

  for (let tick = 0; tick <= p.steps; tick++) {
    const faultNow = tick === p.faultTick;
    const blackout = (p.fault === 'radio-blackout' || p.fault === 'compound') && tick >= p.faultTick && tick < p.faultTick + p.blackoutDuration;
    if (faultNow && (p.fault === 'node-loss' || p.fault === 'compound')) for (const id of failedIds) { const n = byId.get(id); n.alive = false; n.deadReason = 'intervention'; }
    if (faultNow && (p.fault === 'mothership' || p.fault === 'compound')) {
      mother.alive = false; mother.queue.length = 0; motherDeadTick = tick;
      for (const n of nodes) if (!n.deployed) { n.alive = false; n.deadReason = 'stranded'; }
    }
    // Delivery is a physical process; no receiving while dead or during a blackout.
    for (const transit of scheduled.get(tick) || []) {
      const receiver = byId.get(transit.to);
      if (!receiver.alive || !receiver.deployed || blackout || transit.packet.expires < tick) continue;
      const packet = transit.packet;
      meters.deliveredLinks++; meters.receivedBytes += PACKET_BYTES;
      meters.minimumDeliveryDelay = Math.min(meters.minimumDeliveryDelay, tick - transit.sent);
      if (receiver.id !== 'mother') {
        const used = Math.min(receiver.energy, 0.0012); receiver.energy -= used; meters.radioEnergy += used;
      } else meters.motherRadioEnergy += 0.0012;
      if (receiver.seen.has(packet.id)) continue;
      receiver.seen.add(packet.id);
      if (packet.kind === 'report') {
        const previous = receiver.memory.get(packet.origin);
        if (!previous || packet.stamp > previous.stamp) receiver.memory.set(packet.origin, { ...packet.payload });
      } else if (packet.payload.recipient === receiver.id) {
        if (tick <= packet.payload.expires) {
          receiver.command = { target: packet.payload.target, issuedAt: packet.stamp, receivedAt: tick, expires: packet.payload.expires };
          meters.commandsDelivered++;
          deliveredCommands.add(packet.id);
          commandRecords.push({ issuedAt: packet.stamp, receivedAt: tick, recipient: receiver.id, target: packet.payload.target });
        }
      }
      if (packet.hops < 4) enqueue(receiver, { ...packet, hops: packet.hops + 1 }, meters);
    }
    scheduled.delete(tick);
    for (const node of nodes) {
      if (!node.alive) continue;
      if (!node.deployed && tick >= node.launchTick && mother.alive) {
        node.deployed = true; node.x += noise(p.seed, node.id, 'launchX') * 5; node.y += noise(p.seed, node.id, 'launchY') * 6;
        node.heading = Math.atan2(stations.find(s => s.id === node.target).y - node.y, stations.find(s => s.id === node.target).x - node.x);
      }
      if (!node.deployed) continue;
      node.own = observe(node, p, tick);
      node.memory.set(node.id, { ...node.own, target: node.target });
      const decision = controllerDecision({ mode: def.id, tick, id: node.id, own: node.own, records: freshRecords(node.memory, tick, p.beliefTTL), previousTarget: node.target, lastChange: node.lastChange, command: node.command, ttl: p.beliefTTL });
      if (decision.target !== node.target) { node.target = decision.target; node.lastChange = tick; node.changed++; meters.targetChanges++; }
      if (decision.reason === 'delivered-command') meters.commandFollowingSteps++;
      meters.aliveSteps++;
      if (tick > 0) move(node, p, tick, node.own, meters);
      if (node.alive && tick % REPORT_EVERY === node.index % REPORT_EVERY) {
        const packet = makeReport(node, tick); node.seen.add(packet.id); enqueue(node, packet, meters);
      }
    }
    if (mother.alive && def.id === 'assisted' && tick >= 96 && tick % 24 === 0) {
      for (const proposal of motherProposals(freshRecords(mother.memory, tick, p.beliefTTL), tick, p.beliefTTL)) {
        const packet = { id: `mother:c:${tick}:${proposal.recipient}`, origin: 'mother', kind: 'command', stamp: tick, expires: tick + 24, hops: 0, payload: { ...proposal, expires: tick + 24 } };
        mother.seen.add(packet.id); enqueue(mother, packet, meters); meters.commandsIssued++;
        issuedCommands.set(packet.id, packet.expires);
      }
    }
    const active = [...nodes.filter(n => n.alive && n.deployed), ...(mother.alive ? [mother] : [])];
    const recentLinks = [];
    if (tick < p.steps) for (const sender of active) {
      let sent = 0;
      while (sender.queue.length && sent + PACKET_BYTES <= p.bandwidth) {
        const packet = sender.queue.shift();
        if (packet.expires < tick) continue;
        sent += PACKET_BYTES; meters.bytes += PACKET_BYTES;
        if (sender.id !== 'mother') {
          const cost = Math.min(sender.energy, 0.004); sender.energy -= cost; meters.radioEnergy += cost;
        } else meters.motherRadioEnergy += 0.004;
        for (const receiver of active) {
          if (receiver.id === sender.id || dist(sender, receiver) > p.commRange) continue;
          meters.attemptedLinks++;
          const fade = 0.12 * (dist(sender, receiver) / p.commRange) ** 2;
          if (blackout || keyed(p.seed, tick, sender.id, receiver.id, packet.id, 'link') < Math.min(0.99, p.loss + fade)) { meters.packetLosses++; continue; }
          const delay = p.latency + Math.floor(keyed(p.seed, tick, sender.id, receiver.id, packet.id, 'delay') * 3);
          const arrives = tick + delay;
          if (!scheduled.has(arrives)) scheduled.set(arrives, []);
          scheduled.get(arrives).push({ to: receiver.id, packet, sent: tick });
          if (recentLinks.length < 80) recentLinks.push({ from: sender.id, to: receiver.id, strength: 1 - p.loss });
          if (blackout) meters.networkDuringBlackout++;
        }
      }
    }
    const live = nodes.filter(n => n.alive && n.deployed && n.energy > 0);
    const covered = stations.filter(s => live.some(n => dist(n, s) <= STATION_RADIUS));
    const instant = 100 * covered.length / stations.length;
    // Tick zero is the initial condition, not an extra ten-second interval.
    if (tick > 0) { coveredTotal += instant; coverages.push(instant); }
    if (timeTo80 === null && instant >= 80) timeTo80 = tick * DT / 60;
    if (tick >= p.faultTick - 30 && tick < p.faultTick) meters.preFault.push(instant);
    for (const n of live) {
      const site = stations.find(s => dist(n, s) <= STATION_RADIUS);
      if (site) { meters.sampleError += Math.abs(n.own.temperature - temperatureAt(tick, site)); meters.samples++; }
    }
    const currentCoverage = tick === 0 ? 0 : coveredTotal / tick;
    if (p.record && (tick % 3 === 0 || tick === p.steps || faultNow)) {
      const coveredIds = new Set(covered.map(s => s.id));
      frames.push({
        tick,
        entities: [
          ...nodes.map(n => ({ id: n.id, x: round(n.x), y: round(n.y), z: n.deployed ? -35 : 0, heading: round(n.heading), kind: 'vessel', alive: n.alive && n.energy > 0, deployed: n.deployed, energy: round(n.energy), target: n.target, belief: freshRecords(n.memory, tick, p.beliefTTL).length / p.population, perceivedX: n.own ? round(n.own.x) : n.x, perceivedY: n.own ? round(n.own.y) : n.y, reason: n.deadReason })),
          { id: 'mother', ...motherPosition, z: 0, heading: 0, kind: 'node', alive: mother.alive, energy: 1, belief: freshRecords(mother.memory, tick, p.beliefTTL).length / p.population },
        ],
        objects: [...stations.map(s => ({ ...s, label: `${s.label} · ${coveredIds.has(s.id) ? 'covered' : 'uncovered'}`, active: coveredIds.has(s.id) })), ...reefs.map(r => ({ ...r })), { id: 'surface', kind: 'mothership', ...motherPosition, z: 0, radius: 16, label: mother.alive ? 'Surface relay' : 'Mother offline' }],
        links: recentLinks,
        metrics: { coverage: round(currentCoverage), instantCoverage: instant, activeVehicles: live.length, energyUsed: round(meters.motionEnergy + meters.radioEnergy), bytes: meters.bytes, commandFollowing: meters.commandFollowingSteps, temperatureMAE: meters.samples ? round(meters.sampleError / meters.samples) : null },
        note: faultNow ? faultLabel(p) : blackout ? 'Acoustic blackout: no packet or mother command can arrive.' : undefined,
      });
    }
  }
  const preCoverage = meters.preFault.length ? meters.preFault.reduce((a, b) => a + b, 0) / meters.preFault.length : null;
  const faultOccurred = p.fault !== 'none' && p.faultTick <= p.steps;
  let recoveryMinutes = null;
  if (faultOccurred && preCoverage > 0) {
    // Ten consecutive covered intervals avoid claiming recovery from a one-frame crossing.
    for (let i = p.faultTick - 1; i <= coverages.length - 10; i++) {
      if (coverages.slice(i, i + 10).every(v => v >= preCoverage * 0.8)) { recoveryMinutes = (i - (p.faultTick - 1)) * DT / 60; break; }
    }
  }
  const post = faultOccurred ? coverages.slice(p.faultTick - 1) : [];
  const totalEnergy = meters.motionEnergy + meters.radioEnergy;
  const remainingEnergy = nodes.reduce((s, n) => s + n.energy, 0);
  // Packet transport already discards expired packets. Count undelivered commands
  // against their ledger deadlines; counting only late arrivals would always be zero.
  const expiredCommands = [...issuedCommands].filter(([id, deadline]) => deadline < p.steps && !deliveredCommands.has(id)).length;
  const pendingCommands = meters.commandsIssued - meters.commandsDelivered - expiredCommands;
  return {
    ...def, frames,
    summary: {
      coverage: round(coveredTotal / p.steps), finalCoverage: coverages.at(-1),
      postFaultCoverage: post.length ? round(post.reduce((a, b) => a + b, 0) / post.length) : null,
      preFaultCoverage: preCoverage === null ? null : round(preCoverage),
      timeTo80Minutes: timeTo80 === null ? null : round(timeTo80), recoveryMinutes: recoveryMinutes === null ? null : round(recoveryMinutes),
      recoveryCensored: faultOccurred && preCoverage > 0 && recoveryMinutes === null ? 1 : 0,
      energyUsed: round(totalEnergy), initialEnergy: round(p.population * p.energy), remainingEnergy: round(remainingEnergy),
      motionEnergy: round(meters.motionEnergy), radioEnergy: round(meters.radioEnergy), motherRadioEnergy: round(meters.motherRadioEnergy),
      bytes: meters.bytes, receivedBytes: meters.receivedBytes, linkDeliveryRatio: meters.attemptedLinks ? round(meters.deliveredLinks / meters.attemptedLinks) : null,
      commandsIssued: meters.commandsIssued, commandsDelivered: meters.commandsDelivered, commandsExpired: expiredCommands, commandsPending: pendingCommands,
      centralDependency: meters.aliveSteps ? round(100 * meters.commandFollowingSteps / meters.aliveSteps) : 0,
      activeVehicles: nodes.filter(n => n.alive && n.deployed && n.energy > 0).length,
      interventions: faultOccurred ? 1 : 0, failedVehicles: faultOccurred && ['node-loss', 'compound'].includes(p.fault) ? failedIds.length : 0,
      exhaustedVehicles: meters.exhausted, targetChanges: meters.targetChanges, reefContacts: meters.reefContacts,
      distanceMetres: round(meters.distance), temperatureMAE: meters.samples ? round(meters.sampleError / meters.samples) : null,
      queueDrops: meters.queueDrops, minDeliveryDelay: Number.isFinite(meters.minimumDeliveryDelay) ? meters.minimumDeliveryDelay : null,
      maxObservedTurn: round(meters.maxObservedTurn), packetsScheduledInBlackout: meters.networkDuringBlackout,
    },
    notes: [
      'Coverage is evaluator truth; controllers never receive it.',
      'Provisioned telemetry uses the same channel protocol as repair arms. Extra assisted command traffic is counted.',
      ...(def.id === 'assisted' ? ['Mother assistance depends only on received, expiring records. Children fall back to local repair when delivered commands expire.'] : []),
    ],
    diagnostics: { failedIds: faultOccurred && ['node-loss', 'compound'].includes(p.fault) ? failedIds : [], motherDeadTick, commands: commandRecords, lastBeliefs: nodes.map(n => ({ id: n.id, records: freshRecords(n.memory, p.steps, p.beliefTTL).map(r => ({ id: r.id, stamp: r.stamp, target: r.target })) })) },
  };
}
function faultLabel(p) {
  return ({ none: 'No intervention', 'node-loss': `${Math.round(p.failureFraction * 100)}% of child nodes lost`, 'radio-blackout': 'Acoustic blackout begins', mothership: 'Mothership lost', 'cross-current': 'Cross-current arrives', compound: 'Children + communication + mothership lost' })[p.fault];
}
export function simulate(options = {}) {
  const p = normalize(options);
  const eventList = [{ tick: 0, label: 'Launch sequence begins', kind: 'launch' }];
  if (p.fault !== 'none' && p.faultTick <= p.steps) eventList.push({ tick: p.faultTick, label: faultLabel(p), kind: 'fault' });
  if (['radio-blackout', 'compound'].includes(p.fault) && p.faultTick + p.blackoutDuration <= p.steps) eventList.push({ tick: p.faultTick + p.blackoutDuration, label: 'Acoustic channel returns', kind: 'recovery' });
  return {
    version: '1.0.0', seed: p.seed, params: p,
    world: { width: WIDTH, height: HEIGHT, depth: 60, objects: [...stations.map(s => ({ ...s })), ...reefs.map(r => ({ ...r })), { id: 'surface', kind: 'mothership', ...motherPosition, z: 0, radius: 16, label: 'Surface relay' }] },
    arms: ARM_DEFS.map(def => runArm(def, p)), events: eventList,
    audit: {
      informationBoundary: 'Pure controller receives noisy own observation, a fixed mission map, expiring source-stamped received records and delivered commands. Physics alone sees true positions. Coverage, remote survival and failure schedule are evaluator-only.',
      budget: `Each arm starts with ${p.population} identical children × ${p.energy} modeled Wh, one surface relay, ${p.bandwidth} transmitted bytes per node per ten-second step. Population changes increase total budget.`,
      dimensions: '1000 × 700 horizontal metres; 10 seconds per step; depth is illustrative. Speed/current in m/s, synthetic energy in modeled Wh, temperature in synthetic °C.',
      sensing: 'Noisy absolute localization plus bounded random-walk bias, noisy current and scalar temperature. Local observations are generated from truth by a sensor boundary; controllers never receive the physical state object.',
      transport: '96-byte packets; bounded transmit queues; range, keyed loss, 1+ step latency, four relay hops, source stamps, expiry. Mother proposals share this exact transport.',
      dynamicLimits: { maxPropulsionMetresPerSecond: MAX_SPEED, maxTurnRadiansPerStep: MAX_TURN, inertiaFraction: INERTIA, stationRadiusMetres: STATION_RADIUS },
      primaryMetric: 'Mean of instantaneous covered-site percentages over steps 1…steps; includes deployment time.',
      recoveryMetric: 'First run of ten consecutive post-intervention steps with coverage ≥80% of the preceding thirty-step mean; null if censored or undefined.',
      knownOmissions: ['No validated acoustic propagation or collision avoidance between vehicles.', 'No vertical dynamics, sea-surface waves, docking or real hardware.', 'Environmental samples are synthetic; station placement is provisioned, not learned.'],
    },
  };
}
