(function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const view3d = window.Bran3D?.create(canvas, "run");

  const PANELS = {
    start: document.getElementById("startScreen"),
    select: document.getElementById("levelSelect"),
    pause: document.getElementById("pauseMenu"),
    challenge: document.getElementById("challengeModal"),
    result: document.getElementById("resultScreen")
  };

  const refs = {
    hud: document.getElementById("hud"),
    hudLevel: document.getElementById("hudLevel"),
    hudTheme: document.getElementById("hudTheme"),
    hudHealth: document.getElementById("hudHealth"),
    hudAmmo: document.getElementById("hudAmmo"),
    hudLives: document.getElementById("hudLives"),
    hudStars: document.getElementById("hudStars"),
    hudScore: document.getElementById("hudScore"),
    hudProgress: document.getElementById("hudProgress"),
    toast: document.getElementById("toast"),
    levelGrid: document.getElementById("levelGrid"),
    challengeCategory: document.getElementById("challengeCategory"),
    challengePrompt: document.getElementById("challengePrompt"),
    challengeChoices: document.getElementById("challengeChoices"),
    challengeReward: document.getElementById("challengeReward"),
    resultEyebrow: document.getElementById("resultEyebrow"),
    resultTitle: document.getElementById("resultTitle"),
    resultBody: document.getElementById("resultBody"),
    resultStars: document.getElementById("resultStars"),
    resultScore: document.getElementById("resultScore"),
    resultBest: document.getElementById("resultBest"),
    nextLevelBtn: document.getElementById("nextLevelBtn"),
    toggles: {
      startAuto: document.getElementById("autoRunToggle"),
      selectAuto: document.getElementById("selectAutoRunToggle"),
      pauseAuto: document.getElementById("pauseAutoRunToggle"),
      resultAuto: document.getElementById("resultAutoRunToggle"),
      sound: document.getElementById("soundToggle")
    }
  };

  const SAVE_KEY = "super-run-rescue-save";
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  const GRAVITY = 2250;
  const FLOOR_MARGIN = 240;
  const PLAYER_HP = 4;
  const PLAYER_AMMO = 7;
  const PLAYER_LIVES = 4;
  const PLAYER_SIZE = { w: 42, h: 58 };
  const COLORS = {
    player: "#3399ff",
    playerAccent: "#ffcb4f",
    bullet: "#37d3ff",
    enemyBullet: "#ff8f63",
    star: "#ffd84f",
    checkpoint: "#2ecf97",
    station: "#8c6bff",
    finish: "#38bdf8"
  };

  const state = {
    save: loadSave(),
    screen: "start",
    world: null,
    keys: { left: false, right: false },
    jumpQueued: false,
    shootQueued: false,
    toastTimer: 0,
    activePrompt: null,
    resultLevelIndex: 0,
    audioContext: null
  };

  syncSettingsUI();
  bindUI();
  renderLevelSelect();

  window.BranGame = { snapshot: () => ({ screen: state.screen, level: state.world?.level.id, player: state.world ? { ...state.world.player } : null, score: state.world?.score, renderer: document.body.dataset.renderer || '2d', graphics: view3d?.info() }) };
  document.addEventListener('visibilitychange', () => { if (document.hidden && state.screen === 'playing') { resetInputState(); togglePause(); } });
  let lastTime = performance.now();
  requestAnimationFrame(loop);

  function loadSave() {
    const fallback = {
      unlockedLevel: 1,
      bestStars: {},
      bestScores: {},
      settings: {
        autoRun: false,
        sound: true
      }
    };

    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) {
        return fallback;
      }
      const parsed = JSON.parse(raw);
      return {
        unlockedLevel: clamp(parsed.unlockedLevel || 1, 1, LEVELS.length),
        bestStars: parsed.bestStars || {},
        bestScores: parsed.bestScores || {},
        settings: {
          autoRun: typeof parsed.settings?.autoRun === "boolean" ? parsed.settings.autoRun : false,
          sound: typeof parsed.settings?.sound === "boolean" ? parsed.settings.sound : true
        }
      };
    } catch (error) {
      return fallback;
    }
  }

  function saveState() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state.save)); } catch { /* Continue without saving. */ }
  }

  function syncSettingsUI() {
    const autoRun = !!state.save.settings.autoRun;
    refs.toggles.startAuto.checked = autoRun;
    refs.toggles.selectAuto.checked = autoRun;
    refs.toggles.pauseAuto.checked = autoRun;
    refs.toggles.resultAuto.checked = autoRun;
    refs.toggles.sound.checked = !!state.save.settings.sound;
  }

  function setAutoRun(enabled, announce) {
    state.save.settings.autoRun = enabled;
    syncSettingsUI();
    saveState();
    if (announce) {
      showToast(enabled ? "Adventure Assist on." : "Adventure Assist off.");
    }
  }

  function resetInputState() {
    state.keys.left = false;
    state.keys.right = false;
    state.jumpQueued = false;
    state.shootQueued = false;
  }

  function bindUI() {
    document.getElementById("playBtn").addEventListener("click", () => {
      startLevel(Math.max(0, state.save.unlockedLevel - 1));
    });
    document.getElementById("openLevelsBtn").addEventListener("click", () => showScreen("select"));
    document.getElementById("backToStartBtn").addEventListener("click", () => showScreen("start"));
    document.getElementById("pauseBtn").addEventListener("click", togglePause);
    document.getElementById("restartBtn").addEventListener("click", restartCurrentLevel);
    document.getElementById("resumeBtn").addEventListener("click", resumeGame);
    document.getElementById("pauseRestartBtn").addEventListener("click", restartCurrentLevel);
    document.getElementById("pauseLevelsBtn").addEventListener("click", () => {
      endLevelView();
      showScreen("select");
    });
    document.getElementById("resultRestartBtn").addEventListener("click", () => startLevel(state.resultLevelIndex));
    document.getElementById("resultLevelsBtn").addEventListener("click", () => {
      endLevelView();
      showScreen("select");
    });
    refs.nextLevelBtn.addEventListener("click", () => {
      const nextIndex = Math.min(state.resultLevelIndex + 1, LEVELS.length - 1);
      startLevel(nextIndex);
    });

    refs.toggles.startAuto.addEventListener("change", () => setAutoRun(refs.toggles.startAuto.checked, true));
    refs.toggles.selectAuto.addEventListener("change", () => setAutoRun(refs.toggles.selectAuto.checked, true));
    refs.toggles.pauseAuto.addEventListener("change", () => setAutoRun(refs.toggles.pauseAuto.checked, true));
    refs.toggles.resultAuto.addEventListener("change", () => setAutoRun(refs.toggles.resultAuto.checked, true));
    refs.toggles.sound.addEventListener("change", () => {
      state.save.settings.sound = refs.toggles.sound.checked;
      syncSettingsUI();
      saveState();
      if (refs.toggles.sound.checked) {
        playTone(660, 0.08, "triangle", 0.04);
      }
    });

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", () => {
      if (state.screen === "playing") {
        resetInputState();
        togglePause();
      }
    });
  }

  function onKeyDown(event) {
    if (event.target?.closest?.("input, select, textarea")) return;
    if (state.screen !== "playing" && event.key !== "Escape") return;
    if (["ArrowLeft", "ArrowRight", " "].includes(event.key)) event.preventDefault();
    if (event.repeat) {
      return;
    }

    if ((event.key.toLowerCase() === "a") || event.key === "ArrowLeft" || event.key === "," || event.key === "<") {
      state.keys.left = true;
    } else if ((event.key.toLowerCase() === "d") || event.key === "ArrowRight" || event.key === "." || event.key === ">") {
      state.keys.right = true;
    } else if (event.key === "ArrowUp" || event.key === " " || event.key.toLowerCase() === "w") {
      state.jumpQueued = true;
      event.preventDefault();
    } else if (event.key === "ArrowDown" || event.key.toLowerCase() === "x" || event.key.toLowerCase() === "s") {
      state.shootQueued = true;
      event.preventDefault();
    } else if (event.key === "Escape" && state.world) {
      if (state.screen === "playing") {
        togglePause();
      } else if (state.screen === "pause") {
        resumeGame();
      }
    }
  }

  function onKeyUp(event) {
    if ((event.key.toLowerCase() === "a") || event.key === "ArrowLeft" || event.key === "," || event.key === "<") {
      state.keys.left = false;
    } else if ((event.key.toLowerCase() === "d") || event.key === "ArrowRight" || event.key === "." || event.key === ">") {
      state.keys.right = false;
    }
  }

  function renderLevelSelect() {
    refs.levelGrid.innerHTML = "";
    LEVELS.forEach((level, index) => {
      const unlocked = index + 1 <= state.save.unlockedLevel;
      const stars = state.save.bestStars[level.id] || 0;
      const score = state.save.bestScores[level.id] || 0;
      const enemyLabels = level.mainEnemyTypes.map((id) => ENEMY_ROSTER[id]?.name || id).join(", ");
      const powerLabels = level.featuredPowerUps.map((id) => POWERUP_ROSTER[id]?.name || id).join(", ");

      const card = document.createElement("div");
      card.className = "level-card";
      card.innerHTML = `
        <div class="eyebrow">Level ${level.id}</div>
        <h3>${level.name}</h3>
        <div class="level-meta">
          <span class="chip">${"★".repeat(stars)}${"☆".repeat(3 - stars)}</span>
          <span class="chip">Target ${level.timeTarget}s</span>
        </div>
        <p>${level.gameplayPurpose}</p>
        <div class="level-meta">
          <span class="chip">Enemies: ${enemyLabels}</span>
        </div>
        <div class="level-meta">
          <span class="chip">Power-ups: ${powerLabels}</span>
        </div>
        <div class="level-meta">
          <span class="chip">Best ${score}</span>
        </div>
        <button class="${unlocked ? "primary-btn" : "secondary-btn"}" type="button" ${unlocked ? "" : "disabled"}>${unlocked ? "Play Level" : "Locked"}</button>
      `;
      const button = card.querySelector("button");
      if (unlocked) {
        button.addEventListener("click", () => startLevel(index));
      }
      refs.levelGrid.appendChild(card);
    });
  }

  function showScreen(name) {
    state.screen = name;
    syncSettingsUI();
    if (name !== "playing") {
      resetInputState();
    }
    Object.entries(PANELS).forEach(([key, panel]) => {
      panel.classList.toggle("active", key === name);
    });
    refs.hud.classList.toggle("hidden", name !== "playing");
  }

  function startLevel(levelIndex) {
    resetInputState();
    state.resultLevelIndex = levelIndex;
    state.activePrompt = null;
    state.world = createWorld(levelIndex);
    if (window.Bran3D?.settings.explorer) {
      Object.assign(state.world.player, { hp: 6, maxHp: 6, lives: 6, shield: 3 });
    }
    updateHUD();
    showScreen("playing");
    showToast(`Level ${state.world.level.id}: ${state.world.level.name}`);
    playTone(520, 0.08, "triangle", 0.05);
  }

  function endLevelView() {
    resetInputState();
    state.world = null;
    state.activePrompt = null;
    renderLevelSelect();
  }

  function restartCurrentLevel() {
    if (!state.world) {
      return;
    }
    startLevel(state.world.levelIndex);
  }

  function togglePause() {
    if (!state.world || state.screen === "challenge" || state.screen === "result") {
      return;
    }
    if (state.screen === "playing") {
      resetInputState();
      showScreen("pause");
    } else if (state.screen === "pause") {
      resumeGame();
    }
  }

  function resumeGame() {
    if (!state.world) {
      return;
    }
    resetInputState();
    state.world.player.vx = 0;
    showScreen("playing");
  }

  function createWorld(levelIndex) {
    const level = LEVELS[levelIndex];
    return {
      levelIndex,
      level,
      time: 0,
      score: 0,
      starCount: 0,
      correctAnswers: 0,
      totalStations: level.stations.length,
      usedQuestionIds: new Set(),
      bossCleared: false,
      camera: { x: 0, y: Math.max(0, level.height - HEIGHT) },
      flash: 0,
      particles: [],
      bullets: [],
      enemyBullets: [],
      respawn: { x: level.start.x, y: level.start.y },
      checkpointsReached: 0,
      player: {
        x: level.start.x,
        y: level.start.y,
        w: PLAYER_SIZE.w,
        h: PLAYER_SIZE.h,
        vx: 0,
        vy: 0,
        grounded: false,
        facing: 1,
        hp: PLAYER_HP,
        maxHp: PLAYER_HP,
        lives: PLAYER_LIVES,
        ammo: PLAYER_AMMO,
        maxAmmo: PLAYER_AMMO,
        shield: 0,
        invuln: 0,
        shootCooldown: 0,
        coyote: 0,
        jumpBuffer: 0,
        effects: {
          jump_boost: 0,
          double_shot: 0,
          speed_boots: 0,
          slow_time: 0,
          magnet: 0,
          freeze_blast: 0,
          glide: 0,
          star_invincible: 0
        }
      },
      platforms: level.platforms.map((item) => ({ ...item })),
      hazards: level.hazards.map((item) => ({ ...item, baseX: item.x, baseY: item.y, t: Math.random() * Math.PI * 2 })),
      enemies: level.enemies.map((item, index) => createEnemy(item, index)),
      powerups: level.powerups.map((item, index) => ({ ...item, collected: false, bob: index * 0.8 })),
      stars: level.stars.map((item, index) => ({ ...item, collected: false, bob: index * 0.7, vx: 0, vy: 0 })),
      stations: level.stations.map((item, index) => ({ ...item, used: false, pulse: index * 0.9 })),
      checkpoints: level.checkpoints.map((item) => ({ ...item, active: false }))
    };
  }

  function createEnemy(entry, index) {
    const def = ENEMY_ROSTER[entry.enemyId];
    return {
      ...entry,
      ...def,
      x: entry.x,
      y: entry.y,
      w: def.size.w,
      h: def.size.h,
      hp: entry.hp || def.hp,
      maxHp: entry.hp || def.hp,
      dir: 1,
      vx: 0,
      vy: 0,
      baseY: entry.y,
      anchorY: entry.anchorY ?? entry.y - 120,
      dropRange: entry.dropRange || 120,
      shootTimer: 1 + index * 0.2,
      hopTimer: 0.8 + index * 0.15,
      freeze: 0,
      alive: true,
      damageFlash: 0,
      bob: Math.random() * Math.PI * 2
    };
  }

  function loop(now) {
    const dt = Math.min(0.033, (now - lastTime) / 1000 || 0.016);
    lastTime = now;

    if (state.screen === "playing" && state.world) {
      updateWorld(dt);
    }

    render(now / 1000);
    requestAnimationFrame(loop);
  }

  function updateWorld(dt) {
    const world = state.world;
    const player = world.player;
    const hazardScale = player.effects.slow_time > 0 ? 0.6 : 1;

    world.time += dt;
    world.flash = Math.max(0, world.flash - dt * 2);
    if (state.toastTimer > 0) {
      state.toastTimer -= dt;
      if (state.toastTimer <= 0) {
        refs.toast.classList.add("hidden");
      }
    }

    updatePlayerEffects(player, dt);
    updateHazards(world, dt * hazardScale);
    updatePlayer(world, dt);
    updateCollectibles(world, dt);
    updateProjectiles(world, dt, hazardScale);
    updateEnemies(world, dt * hazardScale);
    updateStations(world);
    updateCheckpoints(world);
    updateFinish(world);
    updateParticles(world, dt);

    if (player.y > world.level.height + FLOOR_MARGIN) {
      loseLife("Fell off the route");
    }

    updateCamera(world);
    updateHUD();
  }

  function updatePlayerEffects(player, dt) {
    player.invuln = Math.max(0, player.invuln - dt);
    player.shootCooldown = Math.max(0, player.shootCooldown - dt);
    player.coyote = Math.max(0, player.coyote - dt);
    player.jumpBuffer = Math.max(0, player.jumpBuffer - dt);
    Object.keys(player.effects).forEach((key) => {
      player.effects[key] = Math.max(0, player.effects[key] - dt);
    });
  }

  function updateHazards(world, dt) {
    world.hazards.forEach((hazard) => {
      hazard.t += dt * (hazard.speed || 1);
      if (hazard.axis === "y") {
        hazard.y = hazard.baseY + Math.sin(hazard.t) * (hazard.range || 90);
      } else if (hazard.axis === "x") {
        hazard.x = hazard.baseX + Math.sin(hazard.t) * (hazard.range || 90);
      }
    });
  }

  function updatePlayer(world, dt) {
    const player = world.player;
    const autoRun = state.save.settings.autoRun;
    const speedBonus = player.effects.speed_boots > 0 ? 70 : 0;
    const moveSpeed = 320 + speedBonus;
    const autoSpeed = 160 + Math.min(speedBonus, 40);
    const accel = player.grounded ? 15 : 10;

    if (state.jumpQueued) {
      player.jumpBuffer = 0.18;
      state.jumpQueued = false;
    }

    let desiredVx = autoRun ? autoSpeed : 0;
    if (state.keys.right) {
      desiredVx = moveSpeed;
      player.facing = 1;
    }
    if (state.keys.left) {
      desiredVx = -moveSpeed * 0.85;
      player.facing = -1;
    }

    player.vx += (desiredVx - player.vx) * Math.min(1, accel * dt);

    if (player.jumpBuffer > 0 && (player.grounded || player.coyote > 0)) {
      player.vy = player.effects.jump_boost > 0 ? -1020 : -900;
      player.grounded = false;
      player.coyote = 0;
      player.jumpBuffer = 0;
      spawnDust(world, player.x + player.w * 0.5, player.y + player.h);
      playTone(430, 0.07, "triangle", 0.05);
    }

    if (state.shootQueued) {
      attemptShoot(world);
      state.shootQueued = false;
    }

    const gravity = player.effects.glide > 0 && player.vy > 0 ? GRAVITY * 0.42 : GRAVITY;
    player.vy += gravity * dt;
    if (player.effects.glide > 0) {
      player.vy = Math.min(player.vy, 340);
    }

    moveBody(player, world.platforms, dt);
    handleHazards(world);

    if (Math.abs(player.vx) > 12) {
      player.facing = player.vx >= 0 ? 1 : -1;
    }
  }

  function moveBody(body, platforms, dt) {
    const oldX = body.x;
    const oldY = body.y;
    body.x += body.vx * dt;
    resolvePlatformCollisions(body, platforms, oldX, oldY, "x");

    body.y += body.vy * dt;
    body.grounded = false;
    resolvePlatformCollisions(body, platforms, oldX, oldY, "y");

    if (body.grounded) {
      body.coyote = 0.15;
    }
  }

  function resolvePlatformCollisions(body, platforms, oldX, oldY, axis) {
    platforms.forEach((platform) => {
      if (!rectsOverlap(body, platform)) {
        return;
      }

      if (axis === "x") {
        if (oldX + body.w <= platform.x) {
          body.x = platform.x - body.w;
        } else if (oldX >= platform.x + platform.w) {
          body.x = platform.x + platform.w;
        }
        body.vx *= 0.15;
      } else {
        if (oldY + body.h <= platform.y) {
          body.y = platform.y - body.h;
          body.vy = 0;
          body.grounded = true;
        } else if (oldY >= platform.y + platform.h) {
          body.y = platform.y + platform.h;
          body.vy = 0;
        }
      }
    });
  }

  function attemptShoot(world) {
    const player = world.player;
    if (player.shootCooldown > 0) {
      return;
    }

    if (player.ammo <= 0) {
      showToast("Out of ammo. Find a knowledge crystal.");
      playTone(180, 0.08, "sawtooth", 0.04);
      return;
    }

    const dir = player.facing || 1;
    const airborne = !player.grounded && (state.keys.left || state.keys.right);
    const shotVy = airborne ? -330 : 0;
    const shotVx = airborne ? dir * 610 : dir * 760;
    const spread = player.effects.double_shot > 0 ? [-0.1, 0.1] : [0];

    player.ammo -= 1;
    player.shootCooldown = 0.22;
    spread.forEach((offset) => {
      world.bullets.push({
        x: player.x + player.w * 0.5 + dir * 16,
        y: player.y + (airborne ? 22 : 28),
        vx: shotVx,
        vy: shotVy + offset * 200,
        r: 6,
        life: 1.25
      });
    });
    spawnBurst(world, player.x + player.w * 0.5, player.y + 26, COLORS.bullet, 5, 150);
    playTone(760, 0.05, "square", 0.03);
  }

  function updateCollectibles(world, dt) {
    const player = world.player;
    const magnetOn = player.effects.magnet > 0;

    world.stars.forEach((item) => {
      if (item.collected) {
        return;
      }
      item.bob += dt * 2;
      if (magnetOn) {
        attractTowardPlayer(item, player, 200, dt, 420);
      }
      if (circleHitsRect({ x: item.x, y: item.y, r: 14 }, player)) {
        item.collected = true;
        world.starCount += 1;
        world.score += 12;
        spawnBurst(world, item.x, item.y, COLORS.star, 10, 170);
        playTone(930, 0.05, "triangle", 0.03);
      }
    });

    world.powerups.forEach((item) => {
      if (item.collected) {
        return;
      }
      item.bob += dt * 2.2;
      if (magnetOn) {
        attractTowardPlayer(item, player, 160, dt, 360);
      }
      if (circleHitsRect({ x: item.x, y: item.y, r: 18 }, player)) {
        item.collected = true;
        applyPowerUp(item.powerupId);
        world.score += 55;
        spawnBurst(world, item.x, item.y, POWERUP_ROSTER[item.powerupId].color, 12, 220);
      }
    });
  }

  function attractTowardPlayer(item, player, radius, dt, speed) {
    const dx = player.x + player.w * 0.5 - item.x;
    const dy = player.y + player.h * 0.5 - item.y;
    const dist = Math.hypot(dx, dy);
    if (dist < radius) {
      item.x += (dx / Math.max(1, dist)) * speed * dt;
      item.y += (dy / Math.max(1, dist)) * speed * dt;
    }
  }

  function updateProjectiles(world, dt, hazardScale) {
    updateProjectileList(world.bullets, dt, world.level, (bullet) => {
      if (world.platforms.some((platform) => rectCircleOverlap(platform, bullet))) {
        spawnBurst(world, bullet.x, bullet.y, COLORS.bullet, 6, 150);
        return true;
      }
      for (const enemy of world.enemies) {
        if (!enemy.alive) {
          continue;
        }
        if (circleHitsRect(bullet, enemy)) {
          enemy.hp -= 1;
          enemy.damageFlash = 0.18;
          if (world.player.effects.freeze_blast > 0 && !enemy.behavior.startsWith("boss")) {
            enemy.freeze = 1.8;
          }
          world.score += 35;
          if (enemy.hp <= 0) {
            defeatEnemy(world, enemy);
          } else {
            playTone(320, 0.05, "triangle", 0.03);
          }
          spawnBurst(world, bullet.x, bullet.y, "#ffffff", 8, 170);
          return true;
        }
      }
      return false;
    });

    updateProjectileList(world.enemyBullets, dt * hazardScale, world.level, (bullet) => {
      if (world.platforms.some((platform) => rectCircleOverlap(platform, bullet))) {
        spawnBurst(world, bullet.x, bullet.y, COLORS.enemyBullet, 5, 120);
        return true;
      }
      if (circleHitsRect(bullet, world.player)) {
        takePlayerHit(1, "Enemy blast");
        spawnBurst(world, bullet.x, bullet.y, COLORS.enemyBullet, 6, 140);
        return true;
      }
      return false;
    });
  }

  function updateProjectileList(list, dt, level, onHit) {
    for (let i = list.length - 1; i >= 0; i -= 1) {
      const bullet = list[i];
      bullet.x += bullet.vx * dt;
      bullet.y += bullet.vy * dt;
      bullet.life -= dt;
      if (bullet.life <= 0 || bullet.x < -80 || bullet.x > level.width + 80 || bullet.y < -80 || bullet.y > level.height + 80 || onHit(bullet)) {
        list.splice(i, 1);
      }
    }
  }

  function updateEnemies(world, dt) {
    const player = world.player;

    world.enemies.forEach((enemy) => {
      if (!enemy.alive) {
        return;
      }

      enemy.damageFlash = Math.max(0, enemy.damageFlash - dt);
      enemy.shootTimer -= dt;
      enemy.hopTimer -= dt;
      enemy.bob += dt * 2;

      if (enemy.freeze > 0) {
        enemy.freeze = Math.max(0, enemy.freeze - dt);
      } else {
        switch (enemy.behavior) {
          case "ground_patrol":
          case "ground_patrol_fast":
          case "armored_patrol":
            updateGroundEnemy(enemy, world.platforms, dt, enemy.speed);
            break;
          case "hopper":
            updateGroundEnemy(enemy, world.platforms, dt, enemy.speed);
            if (enemy.grounded && enemy.hopTimer <= 0) {
              enemy.vy = -720;
              enemy.hopTimer = 1.05;
            }
            break;
          case "fly_wave":
            updateFlyEnemy(enemy, dt);
            break;
          case "thread_drop":
            updateSpiderDrop(enemy, player, dt);
            break;
          case "boss_crab":
            updateGroundEnemy(enemy, world.platforms, dt, enemy.speed);
            maybeFireBoss(world, enemy, 1.35, [0], 260);
            break;
          case "boss_snake":
            updateGroundEnemy(enemy, world.platforms, dt, enemy.speed);
            maybeFireBoss(world, enemy, 1.1, [-0.12, 0.12], 300);
            break;
          case "boss_star":
            updateGroundEnemy(enemy, world.platforms, dt, enemy.speed);
            maybeFireBoss(world, enemy, 0.95, [-0.22, 0, 0.22], 320);
            break;
          default:
            break;
        }
      }

      if (player.effects.star_invincible > 0 && rectsOverlap(player, enemy)) {
        defeatEnemy(world, enemy);
        takeNoDamageKick(world, enemy);
        return;
      }

      if (rectsOverlap(player, enemy)) {
        if (canStompEnemy(player, enemy)) {
          enemy.hp -= 1;
          player.vy = -540;
          player.grounded = false;
          spawnBurst(world, enemy.x + enemy.w * 0.5, enemy.y + 12, "#ffffff", 8, 180);
          if (enemy.hp <= 0) {
            defeatEnemy(world, enemy);
          } else {
            enemy.damageFlash = 0.24;
            playTone(280, 0.05, "triangle", 0.03);
          }
        } else {
          takePlayerHit(1, `${enemy.name} bumped you`);
        }
      }
    });

    world.bossCleared = world.enemies.every((enemy) => !enemy.alive || !enemy.behavior.startsWith("boss"));
  }

  function updateGroundEnemy(enemy, platforms, dt, speed) {
    enemy.vx = speed * enemy.dir;
    enemy.vy += GRAVITY * dt;
    const oldX = enemy.x;
    const oldY = enemy.y;
    enemy.x += enemy.vx * dt;
    resolvePlatformCollisions(enemy, platforms, oldX, oldY, "x");
    if (enemy.x < enemy.patrolMin || enemy.x + enemy.w > enemy.patrolMax) {
      enemy.dir *= -1;
    }
    enemy.y += enemy.vy * dt;
    enemy.grounded = false;
    resolvePlatformCollisions(enemy, platforms, oldX, oldY, "y");
    if (!enemy.grounded) {
      enemy.dir *= -1;
    }
  }

  function updateFlyEnemy(enemy, dt) {
    enemy.x += enemy.speed * enemy.dir * dt;
    if (enemy.x < enemy.patrolMin || enemy.x > enemy.patrolMax) {
      enemy.dir *= -1;
    }
    enemy.y = enemy.baseY + Math.sin(enemy.bob * 2) * 24;
  }

  function updateSpiderDrop(enemy, player, dt) {
    const trigger = Math.abs((player.x + player.w * 0.5) - (enemy.x + enemy.w * 0.5)) < 120;
    if (trigger && enemy.y < enemy.anchorY + enemy.dropRange) {
      enemy.y += 150 * dt;
    } else if (!trigger && enemy.y > enemy.anchorY) {
      enemy.y -= 110 * dt;
    }
  }

  function maybeFireBoss(world, enemy, cadence, spread, speed) {
    if (enemy.shootTimer > 0) {
      return;
    }
    enemy.shootTimer = cadence;
    const player = world.player;
    const baseAngle = Math.atan2(player.y - enemy.y, player.x - enemy.x);
    spread.forEach((offset) => {
      const angle = baseAngle + offset;
      world.enemyBullets.push({
        x: enemy.x + enemy.w * 0.5,
        y: enemy.y + enemy.h * 0.45,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: enemy.behavior === "boss_star" ? 7 : 6,
        life: 2.4
      });
    });
    playTone(220, 0.05, "sawtooth", 0.03);
  }

  function defeatEnemy(world, enemy) {
    if (!enemy.alive) {
      return;
    }
    enemy.alive = false;
    world.score += enemy.behavior.startsWith("boss") ? 420 : 90;
    spawnBurst(world, enemy.x + enemy.w * 0.5, enemy.y + enemy.h * 0.5, enemy.colors.accent, enemy.behavior.startsWith("boss") ? 20 : 12, 240);
    playTone(enemy.behavior.startsWith("boss") ? 620 : 340, 0.09, "triangle", 0.04);
    if (enemy.behavior.startsWith("boss")) {
      showToast(`${enemy.name} defeated!`);
      world.flash = 0.9;
    }
  }

  function takeNoDamageKick(world, enemy) {
    const player = world.player;
    player.vy = -420;
    player.vx += player.x < enemy.x ? -80 : 80;
    world.score += 25;
  }

  function canStompEnemy(player, enemy) {
    return enemy.stompable && player.vy > 80 && player.y + player.h <= enemy.y + enemy.h * 0.55;
  }

  function handleHazards(world) {
    const player = world.player;
    world.hazards.forEach((hazard) => {
      if (rectsOverlap(player, hazard)) {
        takePlayerHit(1, "Hazard hit");
      }
    });
  }

  function takePlayerHit(amount, label) {
    const world = state.world;
    if (!world) {
      return;
    }
    const player = world.player;

    if (player.effects.star_invincible > 0 || player.invuln > 0) {
      return;
    }

    if (player.shield > 0) {
      player.shield -= 1;
      player.invuln = 0.75;
      showToast("Shield blocked the hit.");
      playTone(860, 0.05, "triangle", 0.03);
      return;
    }

    player.hp -= amount;
    player.invuln = 1;
    world.flash = 0.45;
    showToast(label);
    playTone(200, 0.08, "sawtooth", 0.04);

    if (player.hp <= 0) {
      loseLife(label);
    }
  }

  function loseLife(reason) {
    const world = state.world;
    if (!world) {
      return;
    }
    const player = world.player;
    player.lives -= 1;

    if (player.lives <= 0) {
      finishRun(false, reason);
      return;
    }

    player.hp = player.maxHp;
    player.ammo = player.maxAmmo;
    player.shield = 0;
    player.invuln = 1.4;
    player.vx = 0;
    player.vy = 0;
    player.x = world.respawn.x;
    player.y = world.respawn.y;
    Object.keys(player.effects).forEach((key) => {
      player.effects[key] = 0;
    });
    world.score = Math.max(0, world.score - 60);
    showToast(`Respawned. ${player.lives} lives left.`);
  }

  function updateStations(world) {
    if (state.screen !== "playing") {
      return;
    }
    world.stations.forEach((item) => {
      item.pulse += 0.06;
      if (item.used) {
        return;
      }
      const zone = { x: item.x - 8, y: item.y - 58, w: 52, h: 88 };
      if (rectsOverlap(world.player, zone)) {
        openChallenge(world, item);
      }
    });
  }

  function openChallenge(world, item) {
    const question = pickQuestion(item.category, item.difficulty, world.usedQuestionIds);
    if (!question) {
      item.used = true;
      world.player.ammo = world.player.maxAmmo;
      return;
    }

    state.activePrompt = { item, question };
    refs.challengeCategory.textContent = `${capitalize(item.category)} Crystal`;
    refs.challengePrompt.textContent = question.prompt;
    refs.challengeReward.textContent = `Correct answer: full ammo and ${POWERUP_ROSTER[item.reward].name}.`;
    refs.challengeChoices.innerHTML = "";
    question.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-btn";
      button.textContent = choice;
      button.addEventListener("click", () => resolveChallenge(index === question.answer));
      refs.challengeChoices.appendChild(button);
    });
    showScreen("challenge");
  }

  function pickQuestion(category, difficulty, usedSet) {
    const pool = QUESTION_BANK.filter((item) => item.category === category && !usedSet.has(item.id));
    if (!pool.length) {
      return null;
    }
    const same = pool.filter((item) => item.difficulty === difficulty);
    const near = pool.filter((item) => Math.abs(item.difficulty - difficulty) <= 1);
    const finalPool = same.length ? same : near.length ? near : pool;
    return finalPool[Math.floor(Math.random() * finalPool.length)];
  }

  function resolveChallenge(correct) {
    const world = state.world;
    if (!world || !state.activePrompt) {
      return;
    }
    const { item, question } = state.activePrompt;
    if (!correct) {
      refs.challengePrompt.textContent = `Try this: ${question.choices[question.answer]}. Select it to recharge and keep going.`;
      [...refs.challengeChoices.children].forEach((button, index) => {
        button.disabled = index !== question.answer;
        if (index === question.answer) button.focus();
      });
      return;
    }
    item.used = true;
    world.usedQuestionIds.add(question.id);

    if (correct) {
      world.player.ammo = world.player.maxAmmo;
      applyPowerUp(item.reward);
      world.score += 135 + item.difficulty * 12;
      world.correctAnswers += 1;
      showToast(`Correct! ${POWERUP_ROSTER[item.reward].name} awarded.`);
      spawnBurst(world, item.x + 16, item.y - 10, POWERUP_ROSTER[item.reward].color, 16, 240);
      playTone(620, 0.12, "triangle", 0.05);
    } else {
      world.player.ammo = Math.min(world.player.maxAmmo, world.player.ammo + Math.ceil(world.player.maxAmmo * 0.65));
      world.score += 35;
      showToast("Nice try. Partial refill.");
      spawnBurst(world, item.x + 16, item.y - 10, "#ffd166", 10, 180);
      playTone(300, 0.08, "square", 0.03);
    }

    state.activePrompt = null;
    world.player.invuln = Math.max(world.player.invuln, 1.5);
    showScreen("playing");
  }

  function applyPowerUp(powerupId) {
    const world = state.world;
    if (!world) {
      return;
    }

    const player = world.player;
    const power = POWERUP_ROSTER[powerupId];
    if (!power) {
      return;
    }

    switch (powerupId) {
      case "shield":
        player.shield = Math.min(2, player.shield + 1);
        break;
      case "heart_restore":
        player.hp = Math.min(player.maxHp, player.hp + 2);
        break;
      case "extra_ammo":
        player.ammo = player.maxAmmo;
        break;
      case "revive_token":
        player.lives = Math.min(6, player.lives + 1);
        break;
      default:
        if (power.kind === "timed") {
          player.effects[powerupId] = Math.max(player.effects[powerupId] || 0, power.duration);
        }
        break;
    }

    showToast(`${power.name} ready!`);
    playTone(560, 0.08, "triangle", 0.04);
  }

  function updateCheckpoints(world) {
    world.checkpoints.forEach((item, index) => {
      const zone = { x: item.x - 6, y: item.y - 88, w: 30, h: 100 };
      if (!item.active && rectsOverlap(world.player, zone)) {
        item.active = true;
        world.respawn = { x: item.x, y: item.y };
        world.checkpointsReached = Math.max(world.checkpointsReached, index + 1);
        world.score += 50;
        showToast("Checkpoint saved.");
        playTone(540, 0.08, "triangle", 0.04);
      }
    });
  }

  function updateFinish(world) {
    const gate = world.level.finish;
    const locked = gate.lockedByBoss && !world.bossCleared;
    if (locked && rectsOverlap(world.player, gate)) {
      showToast("Defeat the guardian first.");
      return;
    }
    if (!locked && rectsOverlap(world.player, gate)) {
      completeLevel(world);
    }
  }

  function completeLevel(world) {
    const finishBonus = Math.max(0, Math.round((world.level.timeTarget - world.time) * 8));
    world.score += finishBonus + world.correctAnswers * 45 + world.starCount * 8 + world.player.lives * 75;
    finishRun(true, "Level clear");
  }

  function finishRun(won, reason) {
    const world = state.world;
    if (!world) {
      return;
    }
    const level = world.level;
    const stars = won ? calculateStars(world) : 0;
    const bestStars = state.save.bestStars[level.id] || 0;
    const bestScore = state.save.bestScores[level.id] || 0;

    if (won) {
      state.save.bestStars[level.id] = Math.max(bestStars, stars);
      state.save.bestScores[level.id] = Math.max(bestScore, world.score);
      state.save.unlockedLevel = Math.max(state.save.unlockedLevel, Math.min(LEVELS.length, level.id + 1));
      saveState();
      renderLevelSelect();
    }

    refs.resultEyebrow.textContent = won ? "World Clear" : "Try Again";
    refs.resultTitle.textContent = won
      ? level.id === LEVELS.length ? `${level.rescueName} Rescued!` : `${level.name} Complete!`
      : "Camp Reset";
    refs.resultBody.textContent = won
      ? level.id === LEVELS.length
        ? `You rescued ${level.rescueName}, lit up the Star Castle, and finished the whole journey with ${world.correctAnswers}/${world.totalStations} smart station wins.`
        : `You crossed ${level.name} in ${world.time.toFixed(1)}s with ${world.starCount} stars and ${world.correctAnswers}/${world.totalStations} smart station wins.`
      : `${reason}. Restart and try a smoother route.`;
    refs.resultStars.textContent = won ? "★".repeat(stars) : "0";
    refs.resultScore.textContent = `${world.score}`;
    refs.resultBest.textContent = `${won ? state.save.bestScores[level.id] : bestScore}`;
    refs.nextLevelBtn.disabled = !won || world.levelIndex >= LEVELS.length - 1;
    refs.nextLevelBtn.textContent = world.levelIndex >= LEVELS.length - 1 ? "Journey Complete" : "Next Level";
    showScreen("result");
  }

  function calculateStars(world) {
    let stars = 1;
    const quick = world.time <= world.level.timeTarget * 1.1;
    const smart = world.correctAnswers >= Math.ceil(world.totalStations * 0.67);
    const healthy = world.player.lives >= 2;
    if (quick || smart) {
      stars += 1;
    }
    if (quick && smart && healthy) {
      stars += 1;
    }
    return clamp(stars, 1, 3);
  }

  function updateCamera(world) {
    const player = world.player;
    const targetX = clamp(player.x + player.w * 0.5 - WIDTH * 0.38, 0, Math.max(0, world.level.width - WIDTH));
    const targetY = clamp(player.y + player.h * 0.5 - HEIGHT * 0.58, 0, Math.max(0, world.level.height - HEIGHT));
    world.camera.x += (targetX - world.camera.x) * 0.1;
    world.camera.y += (targetY - world.camera.y) * 0.1;
  }

  function updateHUD() {
    if (!state.world) {
      return;
    }
    const { level, player, score, starCount } = state.world;
    const finishX = level.finish.x + level.finish.w;
    const progress = clamp(Math.round(((player.x + player.w * 0.5) / finishX) * 100), 0, 100);
    const activeEffects = Object.entries(player.effects)
      .filter(([, value]) => value > 0.1)
      .slice(0, 2)
      .map(([key]) => POWERUP_ROSTER[key].name)
      .join(" • ");

    refs.hudLevel.textContent = `Level ${level.id}`;
    refs.hudTheme.textContent = activeEffects ? `${level.name} • ${activeEffects}` : level.name;
    refs.hudHealth.textContent = `HP ${player.hp}${player.shield ? ` • Shield ${player.shield}` : ""}`;
    refs.hudAmmo.textContent = `Ammo ${player.ammo}/${player.maxAmmo}`;
    refs.hudLives.textContent = `Lives ${player.lives}`;
    refs.hudStars.textContent = `Stars ${starCount}`;
    refs.hudScore.textContent = `Score ${score}`;
    refs.hudProgress.textContent = `Progress ${progress}%`;

    const missionFill = document.getElementById('missionFill');
    if (missionFill) missionFill.style.width = `${clamp(state.world.player.x / state.world.level.finish.x * 100, 0, 100)}%`;
    const missionText = document.getElementById('missionText');
    if (missionText) missionText.textContent = `Brain boosts ${state.world.correctAnswers}/${state.world.totalStations} · ${state.world.checkpointsReached} checkpoints`;
  }

  function render(time) {
    if (view3d?.render(state, time)) return;
    const world = state.world;
    const palette = world ? world.level.palette : { skyTop: "#fbfeff", skyBottom: "#dff5ff", hillA: "#c9f0a6", hillB: "#8fd9ff", accent: "#ffcb4f", terrainTop: "#7fd36d", terrainSide: "#53b95a" };
    drawBackground(world, palette, time);

    if (world) {
      ctx.save();
      ctx.translate(-world.camera.x, -world.camera.y);
      drawPlatforms(world);
      drawStars(world, time);
      drawPowerups(world, time);
      drawStations(world, time);
      drawCheckpoints(world, time);
      drawFinish(world, time);
      drawHazards(world, time);
      drawEnemies(world, time);
      drawProjectiles(world);
      drawPlayer(world, time);
      drawParticles(world);
      ctx.restore();

      if (world.flash > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${world.flash * 0.22})`;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      }
    } else {
      drawMenuDecor(time);
    }
  }

  function drawBackground(world, palette, time) {
    const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    gradient.addColorStop(0, palette.skyTop);
    gradient.addColorStop(1, palette.skyBottom);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "rgba(255, 226, 128, 0.92)";
    ctx.beginPath();
    ctx.arc(WIDTH - 110, 110, 50, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "rgba(255,255,255,0.86)";
    drawCloud(160 + Math.sin(time) * 18, 120, 44);
    drawCloud(460 + Math.sin(time * 0.8 + 1) * 12, 170, 34);
    drawCloud(840 + Math.sin(time * 0.7 + 2) * 16, 126, 40);
    drawCloud(1120 + Math.sin(time * 0.6 + 3) * 14, 184, 32);

    const offset = world ? world.camera.x : time * 22;
    ctx.fillStyle = palette.hillA;
    drawHillRow(HEIGHT - 170, 130, 120, offset * 0.12);
    ctx.fillStyle = palette.hillB;
    drawHillRow(HEIGHT - 80, 150, 150, offset * 0.2);
    ctx.fillStyle = palette.accent;
    ctx.globalAlpha = 0.18;
    drawHillRow(HEIGHT - 10, 170, 100, offset * 0.28);
    ctx.globalAlpha = 1;
  }

  function drawCloud(x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size * 0.42, 0, Math.PI * 2);
    ctx.arc(x + size * 0.48, y - size * 0.14, size * 0.35, 0, Math.PI * 2);
    ctx.arc(x + size * 0.84, y, size * 0.28, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawHillRow(y, width, height, offset) {
    ctx.beginPath();
    ctx.moveTo(-200, HEIGHT);
    for (let i = -2; i < 14; i += 1) {
      const x = i * width - (offset % width);
      ctx.quadraticCurveTo(x + width * 0.5, y - height, x + width, y);
    }
    ctx.lineTo(WIDTH + 220, HEIGHT);
    ctx.closePath();
    ctx.fill();
  }

  function drawPlatforms(world) {
    world.platforms.forEach((platform) => {
      ctx.fillStyle = world.level.palette.terrainSide;
      roundRect(platform.x, platform.y, platform.w, platform.h, 18, true);
      ctx.fillStyle = world.level.palette.terrainTop;
      roundRect(platform.x, platform.y, platform.w, Math.min(platform.h, 18), 18, true);
      ctx.fillStyle = "rgba(255,255,255,0.18)";
      ctx.fillRect(platform.x + 14, platform.y + platform.h - 10, Math.max(0, platform.w - 28), 5);
    });
  }

  function drawStars(world, time) {
    world.stars.forEach((item) => {
      if (item.collected) {
        return;
      }
      drawStar(item.x, item.y + Math.sin(item.bob) * 4, 12, COLORS.star);
    });
  }

  function drawStar(x, y, radius, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 5; i += 1) {
      const angle = -Math.PI / 2 + i * (Math.PI * 2) / 5;
      const outerX = Math.cos(angle) * radius;
      const outerY = Math.sin(angle) * radius;
      const innerAngle = angle + Math.PI / 5;
      const innerX = Math.cos(innerAngle) * radius * 0.45;
      const innerY = Math.sin(innerAngle) * radius * 0.45;
      if (i === 0) {
        ctx.moveTo(outerX, outerY);
      } else {
        ctx.lineTo(outerX, outerY);
      }
      ctx.lineTo(innerX, innerY);
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawPowerups(world, time) {
    world.powerups.forEach((item) => {
      if (item.collected) {
        return;
      }
      const power = POWERUP_ROSTER[item.powerupId];
      ctx.save();
      ctx.translate(item.x, item.y + Math.sin(item.bob) * 5);
      ctx.fillStyle = power.color;
      roundRect(-16, -16, 32, 32, 12, true);
      ctx.fillStyle = power.id === "star_invincible" ? "#6b5200" : "#ffffff";
      ctx.font = "800 15px 'Trebuchet MS', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(power.name.charAt(0), 0, 6);
      ctx.restore();
    });
  }

  function drawStations(world, time) {
    world.stations.forEach((item) => {
      const glow = 0.55 + Math.sin(item.pulse + time * 2) * 0.2;
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.fillStyle = item.used ? "rgba(195, 205, 223, 0.78)" : `rgba(140, 107, 255, ${glow})`;
      roundRect(0, -46, 34, 46, 16, true);
      ctx.fillStyle = "#ffffff";
      ctx.font = "800 18px 'Trebuchet MS', sans-serif";
      ctx.fillText(item.category.charAt(0).toUpperCase(), 11, -17);
      if (!item.used) {
        ctx.strokeStyle = "rgba(140, 107, 255, 0.4)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(17, -25, 28 + Math.sin(item.pulse) * 4, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    });
  }

  function drawCheckpoints(world, time) {
    world.checkpoints.forEach((item) => {
      ctx.save();
      ctx.translate(item.x, item.y);
      ctx.fillStyle = item.active ? COLORS.checkpoint : "rgba(46, 207, 151, 0.46)";
      ctx.fillRect(0, -90, 10, 90);
      ctx.beginPath();
      ctx.moveTo(10, -90);
      ctx.lineTo(50, -76 + Math.sin(time * 4) * 2);
      ctx.lineTo(10, -56);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
  }

  function drawFinish(world, time) {
    const goal = world.level.finish;
    const locked = goal.lockedByBoss && !world.bossCleared;
    ctx.save();
    ctx.translate(goal.x, goal.y);
    ctx.fillStyle = locked ? "#97a0bc" : COLORS.finish;
    ctx.fillRect(0, 0, 10, goal.h);
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(goal.w, 18 + Math.sin(time * 4) * 3);
    ctx.lineTo(10, 40);
    ctx.closePath();
    ctx.fill();
    if (goal.rescue && !locked) {
      ctx.fillStyle = "#ffd166";
      drawStar(78, -24, 14, "#ffd166");
      ctx.fillStyle = "#ffffff";
      roundRect(58, -6, 42, 48, 18, true);
      ctx.fillStyle = "#ff9fcb";
      roundRect(68, 12, 22, 20, 12, true);
    }
    ctx.restore();
  }

  function drawHazards(world, time) {
    world.hazards.forEach((hazard) => {
      switch (hazard.kind) {
        case "tide":
        case "poison":
          ctx.fillStyle = hazard.kind === "tide" ? "rgba(67, 191, 255, 0.78)" : "rgba(71, 207, 151, 0.72)";
          roundRect(hazard.x, hazard.y, hazard.w, hazard.h, 12, true);
          break;
        case "buds":
        case "shells":
        case "thorns":
        case "crystals":
        case "reeds":
        case "spark":
          ctx.fillStyle = hazard.kind === "spark" ? "#ffd166" : "#ff7f7f";
          drawSpikes(hazard);
          break;
        case "webdrop":
        case "spikebar":
          ctx.fillStyle = hazard.kind === "webdrop" ? "rgba(143, 115, 255, 0.75)" : "rgba(255, 141, 99, 0.74)";
          roundRect(hazard.x, hazard.y, hazard.w, hazard.h, 14, true);
          break;
        case "gust":
          ctx.fillStyle = "rgba(143, 215, 255, 0.44)";
          roundRect(hazard.x, hazard.y, hazard.w, hazard.h, 16, true);
          break;
        case "flame":
          ctx.fillStyle = `rgba(255, 141, 99, ${0.75 + Math.sin(time * 8 + hazard.t) * 0.15})`;
          roundRect(hazard.x, hazard.y, hazard.w, hazard.h, 16, true);
          break;
        default:
          ctx.fillStyle = "#ff6b7f";
          roundRect(hazard.x, hazard.y, hazard.w, hazard.h, 10, true);
          break;
      }
    });
  }

  function drawSpikes(hazard) {
    const count = Math.max(2, Math.floor(hazard.w / 14));
    for (let i = 0; i < count; i += 1) {
      const spikeX = hazard.x + i * (hazard.w / count);
      ctx.beginPath();
      ctx.moveTo(spikeX, hazard.y + hazard.h);
      ctx.lineTo(spikeX + hazard.w / count / 2, hazard.y);
      ctx.lineTo(spikeX + hazard.w / count, hazard.y + hazard.h);
      ctx.closePath();
      ctx.fill();
    }
  }

  function drawEnemies(world, time) {
    world.enemies.forEach((enemy) => {
      if (!enemy.alive) {
        return;
      }
      const colors = enemy.damageFlash > 0 ? { body: "#ffffff", accent: enemy.colors.accent } : enemy.colors;
      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      if (enemy.behavior === "thread_drop") {
        ctx.strokeStyle = "rgba(143, 115, 255, 0.45)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(enemy.w * 0.5, 0);
        ctx.lineTo(enemy.w * 0.5, enemy.anchorY - enemy.y);
        ctx.stroke();
      }
      switch (enemy.id) {
        case "crab":
        case "crabKing":
          ctx.fillStyle = colors.body;
          roundRect(0, 10, enemy.w, enemy.h - 10, 18, true);
          ctx.fillStyle = colors.accent;
          roundRect(-8, enemy.h * 0.45, 16, 12, 8, true);
          roundRect(enemy.w - 8, enemy.h * 0.45, 16, 12, 8, true);
          break;
        case "spider":
          ctx.fillStyle = colors.body;
          roundRect(4, 10, enemy.w - 8, enemy.h - 10, 16, true);
          ctx.strokeStyle = colors.accent;
          ctx.lineWidth = 3;
          for (let i = 0; i < 4; i += 1) {
            ctx.beginPath();
            ctx.moveTo(10, 18 + i * 4);
            ctx.lineTo(0, 14 + i * 6);
            ctx.moveTo(enemy.w - 10, 18 + i * 4);
            ctx.lineTo(enemy.w, 14 + i * 6);
            ctx.stroke();
          }
          break;
        case "snake":
        case "snakeGuardian":
          ctx.fillStyle = colors.body;
          roundRect(0, enemy.h * 0.36, enemy.w, enemy.h * 0.48, 16, true);
          ctx.fillStyle = colors.accent;
          roundRect(enemy.w - 18, enemy.h * 0.2, 18, enemy.h * 0.4, 12, true);
          break;
        case "bee":
          ctx.fillStyle = colors.body;
          roundRect(0, 8, enemy.w, enemy.h - 8, 14, true);
          ctx.fillStyle = colors.accent;
          ctx.fillRect(enemy.w * 0.26, 8, 6, enemy.h - 8);
          ctx.fillRect(enemy.w * 0.56, 8, 6, enemy.h - 8);
          break;
        case "hopper":
          ctx.fillStyle = colors.body;
          roundRect(0, 8, enemy.w, enemy.h - 8, 16, true);
          ctx.fillStyle = colors.accent;
          roundRect(6, 0, enemy.w - 12, 14, 14, true);
          break;
        case "shellback":
        case "starSentinel":
          ctx.fillStyle = colors.body;
          roundRect(0, 10, enemy.w, enemy.h - 10, 18, true);
          ctx.fillStyle = colors.accent;
          roundRect(10, 2, enemy.w - 20, 18, 12, true);
          break;
        default:
          ctx.fillStyle = colors.body;
          roundRect(0, 0, enemy.w, enemy.h, 16, true);
          break;
      }
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(enemy.w * 0.34, Math.max(16, enemy.h * 0.34), 4, 0, Math.PI * 2);
      ctx.arc(enemy.w * 0.62, Math.max(16, enemy.h * 0.34), 4, 0, Math.PI * 2);
      ctx.fill();
      if (enemy.behavior.startsWith("boss")) {
        ctx.fillStyle = "rgba(255,255,255,0.28)";
        roundRect(0, -14, enemy.w, 8, 999, true);
        ctx.fillStyle = "#ffd166";
        roundRect(0, -14, enemy.w * (enemy.hp / enemy.maxHp), 8, 999, true);
      }
      if (enemy.freeze > 0) {
        ctx.fillStyle = "rgba(124, 228, 255, 0.45)";
        roundRect(-4, -4, enemy.w + 8, enemy.h + 8, 18, true);
      }
      ctx.restore();
    });
  }

  function drawProjectiles(world) {
    world.bullets.forEach((bullet) => drawBullet(bullet, COLORS.bullet));
    world.enemyBullets.forEach((bullet) => drawBullet(bullet, COLORS.enemyBullet));
  }

  function drawBullet(bullet, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, bullet.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.beginPath();
    ctx.arc(bullet.x - 1, bullet.y - 1, bullet.r * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawPlayer(world, time) {
    const player = world.player;
    const blink = player.invuln > 0 && Math.floor(time * 20) % 2 === 0;
    if (blink) {
      return;
    }
    ctx.save();
    ctx.translate(player.x, player.y + Math.sin(time * 10) * Math.min(2, Math.abs(player.vx) * 0.004));
    if (player.effects.star_invincible > 0) {
      drawStar(player.w * 0.5, -14, 12, "#fff27a");
    }
    ctx.fillStyle = COLORS.player;
    roundRect(0, 10, player.w, player.h - 10, 18, true);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(14, 22, 5, 0, Math.PI * 2);
    ctx.arc(28, 22, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = COLORS.playerAccent;
    roundRect(player.facing > 0 ? player.w - 6 : -18, 28, 20, 10, 8, true);
    if (player.shield > 0) {
      ctx.strokeStyle = "rgba(46, 207, 151, 0.85)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(player.w * 0.5, player.h * 0.5, 34 + Math.sin(time * 9) * 2, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawParticles(world) {
    world.particles.forEach((item) => {
      ctx.globalAlpha = Math.max(0, item.life / item.maxLife);
      ctx.fillStyle = item.color;
      ctx.beginPath();
      ctx.arc(item.x, item.y, item.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }

  function drawMenuDecor(time) {
    const baseY = HEIGHT - 150;
    ctx.save();
    ctx.translate(140, baseY + Math.sin(time * 2) * 4);
    ctx.fillStyle = COLORS.player;
    roundRect(0, 8, 48, 60, 18, true);
    ctx.fillStyle = COLORS.playerAccent;
    roundRect(42, 26, 20, 12, 8, true);
    ctx.restore();

    ["#ff8458", "#2fc992", "#ffd166", "#7d7dff", "#38bdf8"].forEach((color, index) => {
      ctx.fillStyle = color;
      roundRect(420 + index * 120, baseY - (index % 2) * 36, 70, 70, 24, true);
    });
  }

  function updateParticles(world, dt) {
    for (let i = world.particles.length - 1; i >= 0; i -= 1) {
      const item = world.particles[i];
      item.life -= dt;
      item.x += item.vx * dt;
      item.y += item.vy * dt;
      item.vy += item.gravity * dt;
      if (item.life <= 0) {
        world.particles.splice(i, 1);
      }
    }
  }

  function spawnBurst(world, x, y, color, count, speed) {
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const mag = speed * (0.35 + Math.random() * 0.65);
      world.particles.push({
        x,
        y,
        vx: Math.cos(angle) * mag,
        vy: Math.sin(angle) * mag,
        gravity: 150,
        size: 2 + Math.random() * 3,
        life: 0.24 + Math.random() * 0.36,
        maxLife: 0.6,
        color
      });
    }
  }

  function spawnDust(world, x, y) {
    for (let i = 0; i < 8; i += 1) {
      world.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 150,
        vy: -50 - Math.random() * 50,
        gravity: 180,
        size: 3 + Math.random() * 2,
        life: 0.18 + Math.random() * 0.18,
        maxLife: 0.36,
        color: "rgba(255,255,255,0.92)"
      });
    }
  }

  function showToast(message) {
    refs.toast.textContent = message;
    refs.toast.classList.remove("hidden");
    state.toastTimer = 2.1;
  }

  function rectsOverlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function circleHitsRect(circle, rect) {
    const nearestX = clamp(circle.x, rect.x, rect.x + rect.w);
    const nearestY = clamp(circle.y, rect.y, rect.y + rect.h);
    const dx = circle.x - nearestX;
    const dy = circle.y - nearestY;
    return dx * dx + dy * dy <= circle.r * circle.r;
  }

  function rectCircleOverlap(rect, circle) {
    return circleHitsRect(circle, rect);
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  function playTone(frequency, duration, type, volume) {
    if (!state.save.settings.sound) {
      return;
    }
    if (!state.audioContext) {
      const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextCtor) {
        return;
      }
      state.audioContext = new AudioContextCtor();
    }
    const audio = state.audioContext;
    if (audio.state === "suspended") {
      audio.resume();
    }
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + duration);
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start();
    osc.stop(audio.currentTime + duration);
  }

  function roundRect(x, y, w, h, radius, fill) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + w - radius, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
    ctx.lineTo(x + w, y + h - radius);
    ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
    ctx.lineTo(x + radius, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
  }
})();
