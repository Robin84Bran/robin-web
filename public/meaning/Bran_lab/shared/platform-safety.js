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

  // Enemy level data is approximate artwork placement; feet must start on solid ground.
  function groundEnemy(enemy, platforms) {
    let best = null;
    for (const platform of platforms) {
      if (platform.axis || platform.w < enemy.w + 4) continue;
      const min = platform.x + 2, max = platform.x + platform.w - enemy.w - 2;
      const x = Math.max(min, Math.min(max, enemy.x));
      const y = platform.y - enemy.h;
      if (platforms.some(p => p !== platform && overlaps({ x, y, w: enemy.w, h: enemy.h }, p))) continue;
      const score = Math.abs(x - enemy.x) + Math.abs(y - enemy.y) * 2;
      if (!best || score < best.score) best = { x, y, min, max, score };
    }
    if (!best) throw new Error('A ground enemy needs a supported arena.');
    let min = Math.max(best.min, enemy.patrolMin ?? best.min);
    let max = Math.min(best.max, (enemy.patrolMax ?? best.max + enemy.w) - enemy.w);
    if (min > max) { min = best.min; max = best.max; }
    Object.assign(enemy, { x: Math.max(min, Math.min(max, best.x)), y: best.y, vy: 0, grounded: true, patrolMin: min, patrolMax: max + enemy.w });
    enemy.home = { x: enemy.x, y: enemy.y };
    return enemy;
  }
  function keepEnemyInArena(enemy, height) {
    if (enemy.x < enemy.patrolMin || enemy.x + enemy.w > enemy.patrolMax) {
      enemy.x = Math.max(enemy.patrolMin, Math.min(enemy.patrolMax - enemy.w, enemy.x));
      enemy.dir = enemy.x <= enemy.patrolMin ? 1 : -1;
    }
    if (enemy.home && (!Number.isFinite(enemy.y) || enemy.y > height + 100)) {
      Object.assign(enemy, enemy.home, { vx: 0, vy: 0, grounded: true });
    }
  }
  function bossHint(world) {
    const boss = world.enemies.find(e => e.alive && (e.type === 'boss' || e.behavior?.startsWith('boss')));
    if (!world.level.finish.lockedByBoss) return '';
    if (!boss) return 'Finish unlocked';
    const dx = boss.x - world.player.x, dy = boss.y - world.player.y;
    const direction = [Math.abs(dy) > 140 ? (dy > 0 ? 'below ↓' : 'above ↑') : '', Math.abs(dx) > 180 ? (dx > 0 ? 'right →' : 'left ←') : ''].filter(Boolean).join(' · ');
    return `Boss ${direction || 'in this arena'} · ${boss.hp} HP`;
  }
  window.BranPlatform = Object.freeze({ safeSpawn, groundEnemy, keepEnemyInArena, bossHint });
})();
