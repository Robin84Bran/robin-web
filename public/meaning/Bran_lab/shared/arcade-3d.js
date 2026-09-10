/* Bran Lab: locally bundled Three.js, real mesh scenes, original gameplay coordinates. */
(function () {
  'use strict';
  const storage = {
    get(key, fallback) { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch { /* Play remains available. */ } }
  };
  const settings = {
    explorer: storage.get('bran-mode', 'explorer') === 'explorer',
    color: storage.get('bran-color', '#38bdf8'),
    motion: storage.get('bran-motion', matchMedia('(prefers-reduced-motion: reduce)').matches ? 'off' : 'on') === 'on'
  };
  const S = 50;
  function create(original, kind) {
    if (!window.THREE) return null;
    const T = window.THREE;
    const canvas = document.createElement('canvas');
    canvas.className = 'scene-3d';
    canvas.setAttribute('aria-label', kind === 'maze' ? '3D maze: arrow keys or WASD to move' : '3D adventure: arrows or WASD, Space to jump, X to blast');
    let renderer;
    try { renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' }); }
    catch { return null; }
    original.insertAdjacentElement('afterend', canvas);
    original.style.visibility = 'hidden';
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = T.SRGBColorSpace;
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    const scene = new T.Scene();
    const camera = new T.OrthographicCamera(-12.8, 12.8, 7.2, -7.2, 0.1, 200);
    scene.add(new T.HemisphereLight(0xe5faff, kind === 'dash' ? 0x513878 : 0x57756b, 2.5));
    const sun = new T.DirectionalLight(0xfff2d6, 3.2);
    sun.position.set(-10, 22, 16); scene.add(sun);
    const fill = new T.DirectionalLight(0x85c7ff, 1.3);
    fill.position.set(12, 5, -9); scene.add(fill);
    const geometries = {
      box: new T.BoxGeometry(1, 1, 1),
      sphere: new T.SphereGeometry(0.5, 16, 12),
      pac: new T.SphereGeometry(0.5, 24, 16, 0.32, Math.PI * 2 - 0.64),
      cone: new T.ConeGeometry(0.5, 1, 5),
      gem: new T.OctahedronGeometry(0.5),
      ring: new T.TorusGeometry(0.5, 0.055, 8, 32),
      cylinder: new T.CylinderGeometry(0.5, 0.5, 1, 16)
    };
    const starShape = new T.Shape();
    for (let i = 0; i < 10; i++) {
      const a = i * Math.PI / 5 + Math.PI / 2, r = i % 2 ? 0.24 : 0.5;
      if (!i) starShape.moveTo(Math.cos(a) * r, Math.sin(a) * r);
      else starShape.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    starShape.closePath();
    geometries.star = new T.ExtrudeGeometry(starShape, { depth: 0.16, bevelEnabled: true, bevelSize: 0.035, bevelThickness: 0.035, bevelSegments: 1, steps: 1 });
    const materials = new Map(), meshes = new Map();
    let tick = 0, lastWidth = 0, lastHeight = 0, currentWorld = null, lost = false;
    function mat(color, glow = false) {
      const key = color + ':' + glow;
      if (!materials.has(key)) materials.set(key, new T.MeshStandardMaterial({ color, roughness: 0.52, metalness: glow ? 0.3 : 0.05, emissive: glow ? color : '#000000', emissiveIntensity: glow ? 0.3 : 0 }));
      return materials.get(key);
    }
    function mesh(id, shape, color, x, y, z, w = 1, h = w, d = w, glow = false) {
      let m = meshes.get(id);
      if (!m) { m = new T.Mesh(geometries[shape], mat(color, glow)); meshes.set(id, m); scene.add(m); }
      m.geometry = geometries[shape]; m.material = mat(color, glow); m.visible = true; m.userData.tick = tick;
      m.position.set(x, y, z); m.scale.set(w, h, d); m.rotation.set(0, 0, 0);
      return m;
    }
    function label(id, text, x, y, z, color = '#ffffff', width = 2.2) {
      let m = meshes.get(id);
      if (!m || m.userData.text !== text) {
        if (m) { scene.remove(m); m.material.map.dispose(); m.material.dispose(); }
        const c = document.createElement('canvas');
        let ctx = c.getContext('2d'); ctx.font = 'bold 44px system-ui';
        c.width = Math.max(64, Math.ceil(ctx.measureText(text).width + 32)); c.height = 96;
        ctx = c.getContext('2d'); ctx.fillStyle = color;
        ctx.font = 'bold 44px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(text, c.width / 2, 48, c.width - 16);
        const texture = new T.CanvasTexture(c); texture.colorSpace = T.SRGBColorSpace;
        m = new T.Sprite(new T.SpriteMaterial({ map: texture, depthTest: false }));
        m.userData.text = text; m.userData.ratio = c.height / c.width; meshes.set(id, m); scene.add(m);
      }
      m.visible = true; m.userData.tick = tick; m.position.set(x, y, z); m.scale.set(width, width * m.userData.ratio, 1);
    }
    function robot(id, x, y, z, w, h, color, time, moving = false, facing = 1) {
      const step = moving && settings.motion ? Math.sin(time * 15) * 0.13 : 0;
      mesh(id + 'body', 'box', color, x, y + h * 0.45, z, w * 0.88, h * 0.48, w * 0.7);
      const head = mesh(id + 'head', 'box', color, x, y + h * 0.84, z, w, h * 0.4, w * 0.85);
      head.rotation.z = moving ? -facing * 0.06 : 0;
      mesh(id + 'visor', 'box', '#162d49', x, y + h * 0.86, z + w * 0.445, w * 0.83, h * 0.19, 0.06);
      [-1, 1].forEach(side => {
        mesh(id + 'eye' + side, 'box', '#e5ffff', x + side * w * 0.2, y + h * 0.87, z + w * 0.49, w * 0.12, h * 0.08, 0.04, true);
        mesh(id + 'foot' + side, 'box', '#173249', x + side * w * 0.28, y + h * 0.08 + (side === 1 ? step : -step), z + 0.08, w * 0.38, h * 0.16, w * 0.72);
        mesh(id + 'arm' + side, 'sphere', color, x + side * w * 0.56, y + h * 0.47 - side * step, z, w * 0.3, h * 0.28, w * 0.32);
      });
      mesh(id + 'badge', 'gem', '#ffe091', x, y + h * 0.45, z + w * 0.38, w * 0.24, w * 0.28, 0.1, true);
      mesh(id + 'antenna', 'sphere', '#ffe091', x, y + h * 1.1, z, w * 0.2, w * 0.2, w * 0.2, true);
    }
    function background(cx, cy, time) {
      const dark = kind === 'dash';
      scene.background = new T.Color(dark ? '#111a39' : '#b9e8e9');
      scene.fog = new T.Fog(dark ? '#111a39' : '#b9e8e9', 44, 95);
      for (let i = -2; i < 10; i++) {
        const base = Math.floor(cx / 7) * 7 + i * 7;
        const height = 3 + (i + 10) % 4;
        if (dark) {
          mesh('bg' + i, 'box', i % 2 ? '#243858' : '#2a2954', base, cy - 4 + height / 2, -14, 3.6, height, 3.2);
          mesh('bgline' + i, 'box', i % 2 ? '#696cff' : '#27ddd8', base, cy - 4 + height, -12.3, 3.5, 0.06, 0.06, true);
          mesh('sky' + i, 'gem', '#7a8bbf', base + 1, cy + 6 + Math.sin(i * 6), -20, 0.13);
        } else {
          mesh('bg' + i, 'cone', i % 2 ? '#7bbabd' : '#98ced0', base, cy - 4, -17, 9, height * 1.8, 7);
          for (let j = 0; j < 3; j++) mesh('cloud' + i + j, 'sphere', '#f3ffff', base + j * 0.75 + Math.sin(time * 0.2 + i) * 0.3, cy + 4 + Math.sin(i) * 1.3, -10, 1.8, 0.85 + j * 0.15, 1.2);
        }
      }
      mesh('sun', 'sphere', dark ? '#9484eb' : '#ffe9a7', cx + 8.5, cy + 5, -18, 3, 3, 2);
    }
    function platform(id, p, world, demo = false) {
      const dark = kind === 'dash', x = p.x / S, y = -p.y / S, w = p.w / S, h = Math.min(p.h / S, 3.4);
      mesh(id, 'box', dark ? '#2b3f62' : (world?.level.palette.terrainSide || '#519e91'), x + w / 2, y - h / 2, -1, w, h, 3);
      mesh(id + 'top', 'box', dark ? '#7585d7' : (world?.level.palette.terrainTop || '#83d6a0'), x + w / 2, y - 0.06, -1, w, 0.12, 3.05);
      mesh(id + 'stripe', 'box', dark ? '#45e8e0' : '#b7edd3', x + w / 2, y - 0.25, 0.52, Math.max(0.1, w - 0.12), 0.09, 0.04, dark);
      for (let i = 0; i < Math.min(12, Math.floor(w / 1.4)); i++) {
        const tx = x + 0.8 + i * 1.4;
        if (dark) mesh(id + 'stud' + i, 'box', '#61769b', tx, y - 0.75, 0.53, 0.18, 0.18, 0.04);
        else {
          mesh(id + 'grass' + i, 'cone', '#69b58b', tx, y + 0.13, -1.9, 0.22, 0.3, 0.22);
          if (i % 3 === 0) {
            mesh(id + 'trunk' + i, 'cylinder', '#6a8270', tx, y + 0.45, -2.1, 0.15, 0.9, 0.15);
            mesh(id + 'tree' + i, 'sphere', '#439b83', tx, y + 1.2, -2.1, 1, 1.45, 1);
          }
        }
      }
    }
    function platformScene(world, time) {
      const size = canvas.getBoundingClientRect(), aspect = size.width / Math.max(size.height, 1);
      const halfW = Math.max(6, 7.2 * aspect), halfH = Math.max(7.2, 6 / aspect);
      camera.left = -halfW; camera.right = halfW; camera.top = halfH; camera.bottom = -halfH;
      const cx = world ? (aspect < 1.4 ? world.player.x / S + halfW * 0.38 : (world.camera.x + 640) / S) : 0;
      const cy = world ? -(world.camera.y + 360) / S : 0;
      camera.position.set(cx + 1.8, cy + 5, 32); camera.lookAt(cx, cy, 0); camera.updateProjectionMatrix();
      background(cx, cy, time);
      if (!world) {
        const center = aspect < 1 ? 0 : halfW * 0.46;
        platform('demo', { x: (center - 3.8) * S, y: 120, w: 380, h: 90 }, null, true);
        robot('hero', center - 0.3, -2.4, 0.7, 1.6, 2.5, settings.color, time, false);
        for (let i = 0; i < 3; i++) {
          const m = mesh('demoStar' + i, kind === 'dash' ? 'gem' : 'star', '#ffda75', center - 2.5 + i * 2.5, 1.5 + Math.sin(time * 1.3 + i) * 0.22, 0.8, 0.8);
          m.rotation.y = time * 0.55;
        }
        const ring = mesh('demoRing', 'ring', kind === 'dash' ? '#73efe8' : '#eefdf3', center, -0.8, -2, 6.5, 6.5, 1, true);
        ring.rotation.z = time * 0.1;
        return;
      }
      const visible = o => o.x + (o.w || 40) > (cx - halfW - 3) * S && o.x < (cx + halfW + 3) * S;
      world.platforms.forEach((p, i) => { if (visible(p)) platform('p' + i, p, world); });
      world.hazards.forEach((p, i) => {
        if (!visible(p)) return;
        const liquid = ['poison', 'tide', 'gust', 'flame', 'laser'].includes(p.kind);
        if (liquid) mesh('haz' + i, 'box', p.kind === 'tide' ? '#358ddd' : '#ff765f', (p.x + p.w / 2) / S, -(p.y + p.h / 2) / S, 0, p.w / S, p.h / S, 1.4, true);
        else for (let j = 0; j < Math.max(2, Math.ceil(p.w / 24)); j++) {
          const count = Math.max(2, Math.ceil(p.w / 24));
          mesh('haz' + i + '-' + j, 'cone', '#ff786f', (p.x + p.w / count * (j + 0.5)) / S, -(p.y + p.h / 2) / S, 0.65, p.w / count / S, p.h / S, 0.5);
        }
      });
      (world.stars || []).forEach((o, i) => {
        if (o.collected || !visible(o)) return;
        const m = mesh('star' + i, 'star', '#ffcc59', o.x / S, -o.y / S + Math.sin(time * 2 + i) * 0.07, 0.9, 0.58);
        m.rotation.y = time * 1.3 + i;
      });
      (world.powerups || []).forEach((o, i) => {
        if (o.collected || !visible(o)) return;
        mesh('power' + i, 'gem', '#56ddd4', o.x / S, -o.y / S, 0.7, 0.75, 0.85, 0.7, true).rotation.y = time;
        label('powerLabel' + i, o.powerupId.replaceAll('_', ' '), o.x / S, -o.y / S + 0.7, 0.7, '#173f4e', 2.2);
      });
      world.stations.forEach((o, i) => {
        if (!visible(o)) return;
        const x = (o.x + 16) / S, y = -o.y / S;
        mesh('station' + i, 'box', o.used ? '#60758b' : '#9474ef', x, y + 0.4, 0.55, 0.65, 0.88, 0.7);
        label('stationLetter' + i, o.used ? '✓' : '?', x, y + 0.52, 1, '#ffffff', 0.65);
        if (!o.used) {
          mesh('stationRing' + i, 'ring', '#d3baff', x, y + 0.5, 0.75, 1.15, 1.15, 0.6, true);
          label('stationTitle' + i, o.category.toUpperCase(), x, y + 1.35, 0.9, kind === 'dash' ? '#e1d9ff' : '#473474', 1.7);
        }
      });
      world.checkpoints.forEach((o, i) => {
        if (!visible(o)) return;
        const x = o.x / S, y = -o.y / S;
        mesh('pole' + i, 'cylinder', '#e0fff3', x, y + 0.9, -0.25, 0.1, 1.8, 0.1);
        mesh('flag' + i, 'box', o.active ? '#43f3b9' : '#48a28f', x + 0.42, y + 1.5, -0.25, 0.75, 0.44, 0.1, o.active);
        label('flagLabel' + i, o.active ? 'SAVED' : 'CHECKPOINT', x, y + 2.1, 0, kind === 'dash' ? '#a1fbe3' : '#235d54', 2);
      });
      const g = world.level.finish, locked = g.lockedByBoss && !world.bossCleared;
      if (visible(g)) {
        const x = (g.x + g.w / 2) / S, y = -(g.y + g.h / 2) / S;
        mesh('portal', 'ring', locked ? '#ff937e' : '#59f2d4', x, y, 0.5, g.w / S, g.h / S, 2, true);
        label('portalLabel', locked ? 'CLEAR THE BOSS' : 'FINISH', x, y + g.h / S / 2 + 0.5, 0.5, kind === 'dash' ? '#d7fff1' : '#225d57', 2.5);
      }
      world.enemies.forEach((o, i) => {
        if (!o.alive || !visible(o)) return;
        robot('enemy' + i, (o.x + o.w / 2) / S, -(o.y + o.h) / S, 0.65, o.w / S, o.h / S, o.freeze > 0 ? '#98eaff' : (o.colors?.body || (o.type === 'boss' ? '#bc86f5' : '#f58182')), time, Math.abs(o.vx || 0) > 1, o.dir);
        if (o.maxHp > 1) {
          mesh('hpbase' + i, 'box', '#24374d', (o.x + o.w / 2) / S, -o.y / S + 0.4, 1, o.w / S, 0.1, 0.05);
          mesh('hp' + i, 'box', '#8bf3c8', (o.x + o.w * o.hp / o.maxHp / 2) / S, -o.y / S + 0.4, 1.04, Math.max(0.01, o.w / S * o.hp / o.maxHp), 0.1, 0.05);
        }
      });
      const p = world.player;
      robot('player', (p.x + p.w / 2) / S, -(p.y + p.h) / S, 0.85, p.w / S, p.h / S, settings.color, time, Math.abs(p.vx) > 20 && p.grounded, p.facing);
      if (p.shield > 0 || p.invuln > 0 || p.effects?.star_invincible > 0) mesh('shield', 'ring', '#8bfdeb', (p.x + p.w / 2) / S, -(p.y + p.h / 2) / S, 1.05, 1.45, 1.65, 1, true);
      [...world.bullets, ...world.enemyBullets].forEach((b, i) => mesh('bullet' + i, 'sphere', i < world.bullets.length ? '#8efaff' : '#ff997b', b.x / S, -b.y / S, 1, (b.r || 6) * 2 / S, (b.r || 6) * 2 / S, 0.25, true));
      if (settings.motion) world.particles.forEach((p, i) => mesh('particle' + i, 'gem', p.color || '#ffe8af', p.x / S, -p.y / S, 1.2, (p.size || p.r || 4) / S * 1.6));
    }
    function mazeScene(state, time) {
      const world = state.levelState; if (!world) return;
      scene.fog = null; scene.background = new T.Color(state.themeMode === 'light' ? '#d4edf1' : '#131f39');
      camera.left = -8.65; camera.right = 8.65; camera.top = 8.65; camera.bottom = -8.65;
      camera.position.set(0, 23, 12); camera.lookAt(0, 0, 0); camera.updateProjectionMatrix();
      mesh('base', 'box', '#243855', 0, -0.5, 0, 15.5, 0.8, 15.5);
      mesh('rim', 'box', '#69b6d4', 0, -0.2, 0, 15.6, 0.08, 15.6);
      const walls = ['#4b83ba', '#9675bc', '#4f9ca0'];
      world.grid.forEach((row, r) => row.forEach((cell, c) => {
        const x = c - 7, z = r - 7, id = r + '-' + c;
        if (cell === '#') {
          mesh('wall' + id, 'box', walls[Math.floor(world.levelIndex / 3)], x, 0.24, z, 0.94, 0.72, 0.94);
          mesh('walltop' + id, 'box', '#97d7e7', x, 0.62, z, 0.8, 0.055, 0.8);
        } else {
          mesh('tile' + id, 'box', (r + c) % 2 ? '#253b54' : '#293f58', x, -0.04, z, 0.98, 0.08, 0.98);
          if (cell === '.') mesh('dot' + id, 'sphere', '#ffda88', x, 0.22, z, 0.16, 0.16, 0.16, true);
          if (cell === 'o') {
            mesh('qdot' + id, 'gem', '#6af4c5', x, 0.47 + Math.sin(time * 2 + r) * 0.06, z, 0.47, 0.68, 0.47, true).rotation.y = time;
            label('qmark' + id, '?', x, 1.06, z, '#c6ffe6', 0.62);
          }
        }
      }));
      const p = world.player, x = p.col - 7, z = p.row - 7;
      const pac = mesh('pac', settings.motion && Math.sin(time * 12) > 0.4 ? 'sphere' : 'pac', world.powerSecondsLeft > 0 ? '#87ffe1' : '#ffd34f', x, 0.51, z, 0.83, 0.83, 0.83);
      pac.rotation.y = { right: Math.PI, left: 0, up: -Math.PI / 2, down: Math.PI / 2 }[p.direction];
      const directions = { right: [1, 0], left: [-1, 0], up: [0, -1], down: [0, 1] }, [dx, dz] = directions[p.direction];
      [-1, 1].forEach(side => mesh('pacEye' + side, 'sphere', '#233b54', x + dx * 0.22 - dz * side * 0.15, 0.81, z + dz * 0.22 + dx * side * 0.15, 0.105));
      if (world.powerSecondsLeft > 0) { const m = mesh('pacRing', 'ring', '#7ffff0', x, 0.12, z, 1.15, 1.15, 1, true); m.rotation.x = -Math.PI / 2; }
      world.ghosts.forEach((g, i) => {
        const gx = g.col - 7, gz = g.row - 7, color = world.powerSecondsLeft > 0 ? '#6479cb' : g.color;
        mesh('ghost' + i, 'sphere', color, gx, 0.6, gz, 0.83, 0.94, 0.83);
        mesh('ghostskirt' + i, 'cylinder', color, gx, 0.27, gz, 0.82, 0.4, 0.82);
        [-1, 1].forEach(side => {
          mesh('geye' + i + side, 'sphere', '#ffffff', gx + side * 0.17, 0.69, gz + 0.32, 0.24, 0.27, 0.12);
          mesh('gpupil' + i + side, 'sphere', '#223c5c', gx + side * 0.17, 0.7, gz + 0.385, 0.09, 0.12, 0.06);
        });
      });
    }
    canvas.addEventListener('webglcontextlost', event => {
      event.preventDefault(); lost = true; canvas.style.display = 'none'; original.style.visibility = 'visible';
      document.body.dataset.renderer = '2d';
    });
    canvas.addEventListener('webglcontextrestored', () => { lost = false; canvas.style.display = ''; original.style.visibility = 'hidden'; document.body.dataset.renderer = '3d'; });
    document.body.dataset.renderer = '3d';
    return {
      render(state, time = performance.now() / 1000) {
        if (lost) return false;
        const world = kind === 'maze' ? state.levelState : state.world;
        if (world !== currentWorld) {
          for (const m of meshes.values()) { scene.remove(m); if (m.isSprite) { m.material.map.dispose(); m.material.dispose(); } }
          meshes.clear(); currentWorld = world;
        }
        tick++;
        const rect = canvas.getBoundingClientRect();
        if (!rect.width || !rect.height) return true;
        if (rect.width !== lastWidth || rect.height !== lastHeight) { lastWidth = rect.width; lastHeight = rect.height; renderer.setSize(rect.width, rect.height, false); }
        const t = settings.motion ? time : 0;
        if (kind === 'maze') mazeScene(state, t); else platformScene(world, t);
        meshes.forEach(m => { if (m.userData.tick !== tick) m.visible = false; });
        renderer.render(scene, camera);
        return true;
      },
      info() { return { meshes: meshes.size, drawCalls: renderer.info.render.calls, triangles: renderer.info.render.triangles }; }
    };
  }
  window.Bran3D = { create, settings, storage };
})();
