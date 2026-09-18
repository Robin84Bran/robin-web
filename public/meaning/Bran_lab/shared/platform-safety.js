/* Shared, deterministic checkpoint placement for the two classic platformers. */
(function () {
  'use strict';
  const overlaps = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  function safeSpawn(world, x, y, width, height) {
    const blockers = (world.hazards || []).map(h => {
      const rx = h.axis === 'x' ? (h.range || 90) : 0;
      const ry = h.axis === 'y' ? (h.range || 90) : 0;
      return { x: (h.baseX ?? h.x) - rx - 12, y: (h.baseY ?? h.y) - ry - 12, w: h.w + rx * 2 + 24, h: h.h + ry * 2 + 24 };
    });
    for (const e of world.enemies || []) {
      if (e.alive === false || e.dead || e.hp <= 0) continue;
      const left = Math.min(e.x, e.patrolMin ?? e.x);
      const right = Math.max(e.x, e.patrolMax ?? e.x) + (e.w || 64);
      blockers.push({ x: left - 24, y: e.y - 100, w: right - left + 48, h: (e.h || 96) + 124 });
    }
    let best = null;
    for (const platform of world.platforms) {
      // Never save on moving or disappearing geometry.
      if (platform.axis || platform.moving || platform.breakable) continue;
      const min = platform.x + 16, max = platform.x + platform.w - width - 16;
      if (max < min) continue;
      const candidates = [Math.max(min, Math.min(max, x)), min, max];
      for (let candidate = min; candidate <= max; candidate += 12) candidates.push(candidate);
      for (const candidate of candidates) {
        const box = { x: candidate, y: platform.y - height, w: width, h: height };
        if (world.platforms.some(p => p !== platform && overlaps(box, p)) || blockers.some(b => overlaps(box, b))) continue;
        const score = Math.abs(candidate - x) + Math.abs(box.y - y) * 2;
        if (!best || score < best.score) best = { x: box.x, y: box.y, score };
      }
    }
    // A missing safe surface is a level-data error, never an unsafe fallback.
    if (!best) throw new Error('This level needs a safe checkpoint surface.');
    return { x: best.x, y: best.y };
  }
  window.BranPlatform = Object.freeze({ safeSpawn });
})();
