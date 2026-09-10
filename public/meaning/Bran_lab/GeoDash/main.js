(function () {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const view3d = window.Bran3D?.create(canvas, "dash");

  const PANELS = {
    start: document.getElementById("startScreen"),
    select: document.getElementById("levelSelect"),
    pause: document.getElementById("pauseMenu"),
    challenge: document.getElementById("challengeModal"),
    result: document.getElementById("resultScreen")
  };

  const hud = document.getElementById("hud");
  const toast = document.getElementById("toast");
  const hudLevel = document.getElementById("hudLevel");
  const hudTheme = document.getElementById("hudTheme");
  const hudHealth = document.getElementById("hudHealth");
  const hudAmmo = document.getElementById("hudAmmo");
  const hudProgress = document.getElementById("hudProgress");
  const hudScore = document.getElementById("hudScore");
  const levelGrid = document.getElementById("levelGrid");
  const autoForwardToggle = document.getElementById("autoForwardToggle");
  const selectAutoForwardToggle = document.getElementById("selectAutoForwardToggle");
  const pauseAutoForwardToggle = document.getElementById("pauseAutoForwardToggle");
  const resultAutoForwardToggle = document.getElementById("resultAutoForwardToggle");
  const soundToggle = document.getElementById("soundToggle");
  const challengeCategory = document.getElementById("challengeCategory");
  const challengePrompt = document.getElementById("challengePrompt");
  const challengeChoices = document.getElementById("challengeChoices");
  const resultEyebrow = document.getElementById("resultEyebrow");
  const resultTitle = document.getElementById("resultTitle");
  const resultBody = document.getElementById("resultBody");
  const resultStars = document.getElementById("resultStars");
  const resultScore = document.getElementById("resultScore");
  const resultBest = document.getElementById("resultBest");
  const nextLevelBtn = document.getElementById("nextLevelBtn");

  const SAVE_KEY = "bran-blaster-academy-save";
  const WIDTH = canvas.width;
  const HEIGHT = canvas.height;
  const GRAVITY = 2250;
  const FLOOR_MARGIN = 220;
  const PLAYER_MAX_HP = 4;
  const PLAYER_MAX_AMMO = 7;
  const PLAYER_LIVES = 4;
  const COLORS = {
    player: "#2c8cff",
    playerAccent: "#ff9f43",
    enemy: "#ff6b7f",
    enemy2: "#7c59ff",
    bullet: "#2ec5ff",
    enemyBullet: "#ff7b54",
    hazard: "#ff5d73",
    checkpoint: "#2fc992",
    station: "#ffd166",
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

  syncAutoForwardToggles();
  soundToggle.checked = state.save.settings.sound;

  bindUI();
  renderLevelSelect();

  window.BranGame = { snapshot: () => ({ screen: state.screen, level: state.world?.level.id, player: state.world ? { ...state.world.player } : null, score: state.world?.score, renderer: document.body.dataset.renderer || '2d', graphics: view3d?.info() }) };
  document.addEventListener('visibilitychange', () => { if (document.hidden && state.screen === 'playing') { resetInputState(); togglePause(); } });
  let lastTime = performance.now();
  requestAnimationFrame(loop);

  function bindUI() {
    document.getElementById("playBtn").addEventListener("click", () => {
      startLevel(0);
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
    nextLevelBtn.addEventListener("click", () => {
      const nextIndex = Math.min(state.resultLevelIndex + 1, LEVELS.length - 1);
      startLevel(nextIndex);
    });

    autoForwardToggle.addEventListener("change", () => {
      setAutoForward(autoForwardToggle.checked, true);
    });

    selectAutoForwardToggle.addEventListener("change", () => {
      setAutoForward(selectAutoForwardToggle.checked, true);
    });

    pauseAutoForwardToggle.addEventListener("change", () => {
      setAutoForward(pauseAutoForwardToggle.checked, true);
    });

    resultAutoForwardToggle.addEventListener("change", () => {
      setAutoForward(resultAutoForwardToggle.checked, true);
    });

    soundToggle.addEventListener("change", () => {
      state.save.settings.sound = soundToggle.checked;
      saveState();
      if (soundToggle.checked) {
        playTone(640, 0.08, "triangle", 0.04);
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

  function loadSave() {
    const fallback = {
      unlockedLevel: LEVELS.length,
      bestStars: {},
      bestScores: {},
      settings: {
        autoForward: false,
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
        unlockedLevel: LEVELS.length,
        bestStars: parsed.bestStars || {},
        bestScores: parsed.bestScores || {},
        settings: {
          autoForward: typeof parsed.settings?.autoForward === "boolean" ? parsed.settings.autoForward : false,
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

  function setAutoForward(enabled, announce) {
    state.save.settings.autoForward = enabled;
    syncAutoForwardToggles();
    saveState();
    if (announce) {
      showToast(enabled ? "Auto-forward ready." : "Manual run mode ready.");
    }
  }

  function syncAutoForwardToggles() {
    const enabled = !!state.save.settings.autoForward;
    autoForwardToggle.checked = enabled;
    selectAutoForwardToggle.checked = enabled;
    pauseAutoForwardToggle.checked = enabled;
    resultAutoForwardToggle.checked = enabled;
  }

  function resetInputState() {
    state.keys.left = false;
    state.keys.right = false;
    state.jumpQueued = false;
    state.shootQueued = false;
  }

  function renderLevelSelect() {
    levelGrid.innerHTML = "";

    LEVELS.forEach((level, index) => {
      const unlocked = true;
      const card = document.createElement("div");
      card.className = `level-card${unlocked ? "" : " locked"}`;

      const stars = state.save.bestStars[level.id] || 0;
      const score = state.save.bestScores[level.id] || 0;
      const starText = "★".repeat(stars) + "☆".repeat(3 - stars);

      card.innerHTML = `
        <div class="eyebrow">Level ${level.id}</div>
        <h3>${level.name}</h3>
        <div class="level-meta">
          <span class="chip">${level.difficultyLabel}</span>
          <span class="chip">${starText}</span>
        </div>
        <p>${level.tagline}</p>
        <button class="${unlocked ? "primary-btn" : "secondary-btn"}" type="button" ${unlocked ? "" : "disabled"}>
          ${unlocked ? "Play Level" : "Locked"}
        </button>
        <div class="level-meta" style="margin-top: 12px;">
          <span class="chip">Best ${score}</span>
          <span class="chip">Target ${level.timeTarget}s</span>
        </div>
      `;

      const button = card.querySelector("button");
      if (unlocked) {
        button.addEventListener("click", () => startLevel(index));
      }
      levelGrid.appendChild(card);
    });
  }

  function showScreen(name) {
    state.screen = name;
    syncAutoForwardToggles();
    if (name !== "playing") {
      resetInputState();
    }
    Object.entries(PANELS).forEach(([key, panel]) => {
      panel.classList.toggle("active", key === name);
    });
    hud.classList.toggle("hidden", name !== "playing");
  }

  function endLevelView() {
    resetInputState();
    state.world = null;
    state.activePrompt = null;
    hud.classList.add("hidden");
    renderLevelSelect();
  }

  function startLevel(levelIndex) {
    const level = LEVELS[levelIndex];
    state.resultLevelIndex = levelIndex;
    resetInputState();
    state.world = createWorld(levelIndex);
    if (window.Bran3D?.settings.explorer) {
      Object.assign(state.world.player, { hp: 6, maxHp: 6, lives: 6, shield: 3 });
    }
    state.activePrompt = null;
    syncAutoForwardToggles();
    updateHUD();
    showScreen("playing");
    showToast(`Level ${level.id}: ${level.name} • Auto ${state.save.settings.autoForward ? "ON" : "OFF"}`);
    playTone(520, 0.08, "triangle", 0.05);
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
    const source = LEVELS[levelIndex];
    const platforms = source.platforms.map((platform) => ({ ...platform, baseX: platform.x, baseY: platform.y, t: Math.random() * Math.PI * 2 }));
    const initialRespawn = getSafeRespawnPoint(platforms, source.start.x, source.start.y, 42, 60);
    const hasBoss = source.enemies.some((enemy) => enemy.type === "boss");
    const world = {
      levelIndex,
      level: source,
      time: 0,
      score: 0,
      correctAnswers: 0,
      totalStations: source.stations.length,
      bossCleared: !hasBoss,
      usedQuestionIds: new Set(),
      camera: { x: 0, y: Math.max(0, source.height - HEIGHT) },
      particles: [],
      bullets: [],
      enemyBullets: [],
      flash: 0,
      respawn: initialRespawn,
      checkpointsReached: 0,
      player: {
        x: initialRespawn.x,
        y: initialRespawn.y,
        w: 42,
        h: 60,
        vx: 0,
        vy: 0,
        facing: 1,
        grounded: false,
        hp: PLAYER_MAX_HP,
        maxHp: PLAYER_MAX_HP,
        lives: PLAYER_LIVES,
        ammo: PLAYER_MAX_AMMO,
        maxAmmo: PLAYER_MAX_AMMO,
        invuln: 0,
        reloadBoost: 0,
        shootCooldown: 0,
        coyote: 0,
        jumpBuffer: 0,
        shield: 0
      },
      platforms,
      hazards: source.hazards.map((hazard) => ({ ...hazard, baseX: hazard.x, baseY: hazard.y, t: Math.random() * Math.PI * 2 })),
      stations: source.stations.map((station, index) => ({ ...station, used: false, pulse: index * 0.7 })),
      checkpoints: source.checkpoints.map((checkpoint) => ({ ...checkpoint, active: false })),
      enemies: source.enemies.map((enemy, index) => createEnemy(enemy, index))
    };

    return world;
  }

  function hasLivingBoss(world) {
    return world.enemies.some((enemy) => enemy.type === "boss" && enemy.alive);
  }

  function getSafeRespawnPoint(platforms, x, y, playerWidth, playerHeight) {
    const targetCenterX = x + playerWidth * 0.5;
    const targetFeetY = y + playerHeight;
    let best = null;

    platforms.forEach((platform) => {
      const safeMinX = platform.x + 8;
      const safeMaxX = platform.x + platform.w - playerWidth - 8;
      if (safeMaxX < safeMinX) {
        return;
      }

      const candidateX = clamp(x, safeMinX, safeMaxX);
      const candidateCenterX = candidateX + playerWidth * 0.5;
      const horizontalOffset = Math.abs(candidateCenterX - targetCenterX);
      const verticalOffset = platform.y - targetFeetY;

      if (verticalOffset < -28 || verticalOffset > 360) {
        return;
      }

      const score = horizontalOffset + Math.abs(verticalOffset) * 3;
      if (!best || score < best.score) {
        best = {
          score,
          x: candidateX,
          y: platform.y - playerHeight
        };
      }
    });

    if (best) {
      return { x: best.x, y: best.y };
    }

    return { x, y };
  }

  function createEnemy(enemy, index) {
    const base = {
      ...enemy,
      w: enemy.type === "boss" ? 92 : enemy.type === "drone" ? 44 : 48,
      h: enemy.type === "boss" ? 96 : enemy.type === "drone" ? 38 : 52,
      hp: enemy.hp || (enemy.type === "boss" ? 18 : enemy.type === "turret" ? 3 : 2),
      maxHp: enemy.hp || (enemy.type === "boss" ? 18 : enemy.type === "turret" ? 3 : 2),
      dir: enemy.patrolMax && enemy.patrolMax > enemy.patrolMin ? 1 : -1,
      vx: 0,
      vy: 0,
      baseY: enemy.y,
      cooldown: (enemy.cooldown || 1.8) * 1.18,
      shootTimer: 1.1 + index * 0.18,
      bob: Math.random() * Math.PI * 2,
      alive: true,
      damageFlash: 0
    };
    return base;
  }

  function loop(now) {
    const dt = Math.min(0.033, (now - lastTime) / 1000 || 0.016);
    lastTime = now;

    if (state.screen === "playing" && state.world) {
      updateWorld(dt);
    }

    renderScene(now / 1000);
    requestAnimationFrame(loop);
  }

  function updateWorld(dt) {
    const world = state.world;
    const player = world.player;
    const level = world.level;

    world.time += dt;
    world.flash = Math.max(0, world.flash - dt * 2.8);
    if (state.toastTimer > 0) {
      state.toastTimer -= dt;
      if (state.toastTimer <= 0) {
        toast.classList.add("hidden");
      }
    }

    updateHazards(world, dt);
    updatePlayer(world, dt);
    updateBullets(world, dt);
    updateEnemies(world, dt);
    updateParticles(world, dt);
    updateStations(world, dt);
    updateCheckpoints(world);
    updateFinish(world);

    if (player.y > level.height + FLOOR_MARGIN) {
      loseLife("Out of bounds");
    }

    updateCamera(world);
    updateHUD();
  }

  function updateHazards(world, dt) {
    world.hazards.forEach((hazard) => {
      hazard.t += dt * (hazard.speed || 1);
      if (hazard.axis === "y") {
        hazard.y = hazard.baseY + Math.sin(hazard.t) * (hazard.range || 80);
      } else if (hazard.axis === "x") {
        hazard.x = hazard.baseX + Math.sin(hazard.t) * (hazard.range || 80);
      }
    });
  }

  function updatePlayer(world, dt) {
    const player = world.player;
    const autoForward = state.save.settings.autoForward;
    const moveSpeed = 320;
    const autoSpeed = 150;
    const accel = player.grounded ? 15 : 9;

    player.invuln = Math.max(0, player.invuln - dt);
    player.reloadBoost = Math.max(0, player.reloadBoost - dt);
    player.shootCooldown = Math.max(0, player.shootCooldown - dt);
    player.coyote = Math.max(0, player.coyote - dt);
    player.jumpBuffer = Math.max(0, player.jumpBuffer - dt);

    if (state.jumpQueued) {
      player.jumpBuffer = 0.18;
      state.jumpQueued = false;
    }

    let desiredVx = 0;
    if (autoForward) {
      desiredVx = autoSpeed;
    }
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
      player.vy = -900;
      player.grounded = false;
      player.coyote = 0;
      player.jumpBuffer = 0;
      spawnJumpDust(world, player.x + player.w * 0.5, player.y + player.h);
      playTone(440, 0.07, "triangle", 0.05);
    }

    if (state.shootQueued) {
      attemptShoot(world);
      state.shootQueued = false;
    }

    player.vy += GRAVITY * dt;
    moveBody(player, world.platforms, dt);
    handlePlayerHazards(world);

    if (Math.abs(player.vx) > 16) {
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
        body.vx *= 0.18;
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
      showToast("Out of ammo. Hit a recharge station!");
      playTone(180, 0.09, "sawtooth", 0.04);
      return;
    }

    player.ammo -= 1;
    player.shootCooldown = 0.22;
    const dir = player.facing || 1;
    const diagonalShot = !player.grounded && (state.keys.left || state.keys.right);
    const shotVx = diagonalShot ? dir * 620 : dir * 760;
    const shotVy = diagonalShot ? -340 : 0;
    world.bullets.push({
      x: player.x + player.w * 0.5 + dir * 18,
      y: player.y + (diagonalShot ? 22 : 26),
      vx: shotVx,
      vy: shotVy,
      life: diagonalShot ? 1.25 : 1.1,
      r: 6
    });
    spawnImpactParticles(world, player.x + player.w * 0.5, player.y + 26, COLORS.bullet, 5, 170);
    playTone(760, 0.05, "square", 0.03);
  }

  function updateBullets(world, dt) {
    updateProjectileList(world.bullets, dt, world.level, (bullet) => {
      if (world.platforms.some((platform) => rectCircleOverlap(platform, bullet))) {
        spawnImpactParticles(world, bullet.x, bullet.y, COLORS.bullet, 6, 140);
        return true;
      }

      for (const enemy of world.enemies) {
        if (!enemy.alive) {
          continue;
        }
        if (circleHitsRect(bullet, enemy)) {
          enemy.hp -= 1;
          enemy.damageFlash = 0.18;
          world.score += 35;
          spawnImpactParticles(world, bullet.x, bullet.y, "#ffffff", 7, 180);
          playTone(enemy.type === "boss" ? 220 : 320, 0.06, "triangle", 0.04);
          if (enemy.hp <= 0) {
            enemy.alive = false;
            world.score += enemy.type === "boss" ? 400 : 85;
            spawnImpactParticles(world, enemy.x + enemy.w * 0.5, enemy.y + enemy.h * 0.5, enemy.type === "boss" ? "#ffd166" : "#ffffff", enemy.type === "boss" ? 22 : 12, 260);
            if (enemy.type === "boss") {
              world.bossCleared = true;
              world.flash = 1;
              showToast("Boss down! Finish gate unlocked.");
              playTone(660, 0.16, "triangle", 0.05);
            }
          }
          return true;
        }
      }
      return false;
    });

    updateProjectileList(world.enemyBullets, dt, world.level, (bullet) => {
      if (world.platforms.some((platform) => rectCircleOverlap(platform, bullet))) {
        spawnImpactParticles(world, bullet.x, bullet.y, COLORS.enemyBullet, 5, 120);
        return true;
      }
      if (circleHitsRect(bullet, world.player)) {
        takePlayerHit(1, "Enemy shot");
        spawnImpactParticles(world, bullet.x, bullet.y, COLORS.enemyBullet, 8, 160);
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

      if (enemy.type === "walker" || enemy.type === "boss") {
        const speed = enemy.type === "boss" ? 110 : 82;
        enemy.vx = speed * enemy.dir;
        enemy.vy += GRAVITY * dt;
        enemy.x += enemy.vx * dt;
        if (enemy.x < enemy.patrolMin || enemy.x + enemy.w > enemy.patrolMax) {
          enemy.dir *= -1;
        }

        const oldY = enemy.y;
        enemy.y += enemy.vy * dt;
        enemy.grounded = false;
        resolvePlatformCollisions(enemy, world.platforms, enemy.x, oldY, "y");
      } else if (enemy.type === "drone") {
        enemy.bob += dt * 1.8;
        enemy.x += enemy.dir * 90 * dt;
        if (enemy.x < enemy.patrolMin || enemy.x > enemy.patrolMax) {
          enemy.dir *= -1;
        }
        enemy.y = enemy.baseY + Math.sin(enemy.bob) * (enemy.amplitude || 24);
      }

      if (rectsOverlap(enemy, player)) {
        takePlayerHit(1, "Direct hit");
      }

      const dx = player.x - enemy.x;
      const dy = player.y - enemy.y;
      const dist = Math.hypot(dx, dy);
      const range = enemy.type === "boss" ? 560 : enemy.type === "turret" ? 470 : 410;

      if (dist < range && enemy.shootTimer <= 0) {
        fireEnemyShot(world, enemy, dx, dy);
        const cadence = enemy.type === "boss" ? 0.85 : enemy.cooldown || 1.6;
        enemy.shootTimer = cadence;
      }
    });

    world.bossCleared = !hasLivingBoss(world);
  }

  function fireEnemyShot(world, enemy, dx, dy) {
    const angle = Math.atan2(dy, dx);
    const spread = enemy.type === "boss" ? [-0.18, 0, 0.18] : [0];
    spread.forEach((offset) => {
      const shotAngle = angle + offset;
      world.enemyBullets.push({
        x: enemy.x + enemy.w * 0.5,
        y: enemy.y + enemy.h * 0.45,
        vx: Math.cos(shotAngle) * (enemy.type === "boss" ? 300 : 220),
        vy: Math.sin(shotAngle) * (enemy.type === "boss" ? 300 : 220),
        life: enemy.type === "boss" ? 2.6 : 2.2,
        r: enemy.type === "boss" ? 7 : 5
      });
    });
    playTone(enemy.type === "boss" ? 170 : 240, 0.05, "sawtooth", 0.03);
  }

  function updateParticles(world, dt) {
    for (let i = world.particles.length - 1; i >= 0; i -= 1) {
      const particle = world.particles[i];
      particle.life -= dt;
      particle.x += particle.vx * dt;
      particle.y += particle.vy * dt;
      particle.vy += particle.gravity * dt;
      if (particle.life <= 0) {
        world.particles.splice(i, 1);
      }
    }
  }

  function updateStations(world, dt) {
    world.stations.forEach((station) => {
      station.pulse += dt * 3;
      if (station.used || state.screen !== "playing") {
        return;
      }

      const zone = { x: station.x - 12, y: station.y - 56, w: 52, h: 86 };
      if (rectsOverlap(world.player, zone)) {
        openChallenge(world, station);
      }
    });
  }

  function updateCheckpoints(world) {
    world.checkpoints.forEach((checkpoint, index) => {
      const zone = { x: checkpoint.x - 6, y: checkpoint.y - 78, w: 30, h: 90 };
      if (!checkpoint.active && rectsOverlap(world.player, zone)) {
        checkpoint.active = true;
        world.respawn = getSafeRespawnPoint(world.platforms, checkpoint.x, checkpoint.y, world.player.w, world.player.h);
        world.checkpointsReached = Math.max(world.checkpointsReached, index + 1);
        world.score += 50;
        showToast("Checkpoint saved.");
        playTone(560, 0.08, "triangle", 0.05);
      }
    });
  }

  function updateFinish(world) {
    const finish = world.level.finish;
    const gate = { x: finish.x, y: finish.y, w: finish.w, h: finish.h };
    world.bossCleared = !hasLivingBoss(world);
    const locked = finish.lockedByBoss && !world.bossCleared;

    if (!locked && rectsOverlap(world.player, gate)) {
      completeLevel(world);
    }
  }

  function updateCamera(world) {
    const level = world.level;
    const player = world.player;
    const targetX = clamp(player.x + player.w * 0.5 - WIDTH * 0.38, 0, Math.max(0, level.width - WIDTH));
    const targetY = clamp(player.y + player.h * 0.5 - HEIGHT * 0.56, 0, Math.max(0, level.height - HEIGHT));
    world.camera.x += (targetX - world.camera.x) * 0.1;
    world.camera.y += (targetY - world.camera.y) * 0.1;
  }

  function handlePlayerHazards(world) {
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
    if (player.invuln > 0) {
      return;
    }

    if (player.shield > 0) {
      player.shield -= 1;
      player.invuln = 0.6;
      showToast("Shield blocked the hit.");
      playTone(900, 0.08, "triangle", 0.03);
      return;
    }

    player.hp -= amount;
    player.invuln = 1.0;
    world.flash = 0.45;
    showToast(label);
    playTone(210, 0.08, "sawtooth", 0.05);

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
    player.vx = 0;
    player.vy = 0;
    player.x = world.respawn.x;
    player.y = world.respawn.y;
    player.invuln = 1.4;
    world.score = Math.max(0, world.score - 60);
    showToast(`Respawned. ${player.lives} life${player.lives === 1 ? "" : "s"} left.`);
    spawnImpactParticles(world, player.x + player.w * 0.5, player.y + player.h * 0.5, "#ffffff", 12, 220);
  }

  function openChallenge(world, station) {
    const question = getQuestion(station.category, station.difficulty, world.usedQuestionIds);
    if (!question) {
      station.used = true;
      world.player.ammo = world.player.maxAmmo;
      return;
    }

    state.activePrompt = { station, question };
    showScreen("challenge");
    challengeCategory.textContent = `${capitalize(station.category)} Recharge`;
    challengePrompt.textContent = question.prompt;
    challengeChoices.innerHTML = "";

    question.choices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "choice-btn";
      button.textContent = choice;
      button.addEventListener("click", () => resolveChallenge(index === question.answer));
      challengeChoices.appendChild(button);
    });
  }

  function resolveChallenge(correct) {
    const world = state.world;
    if (!world || !state.activePrompt) {
      return;
    }

    const { station, question } = state.activePrompt;
    if (!correct) {
      challengePrompt.textContent = `Try this: ${question.choices[question.answer]}. Select it to recharge and keep going.`;
      [...challengeChoices.children].forEach((button, index) => {
        button.disabled = index !== question.answer;
        if (index === question.answer) button.focus();
      });
      return;
    }
    station.used = true;
    world.usedQuestionIds.add(question.id);

    if (correct) {
      world.player.ammo = world.player.maxAmmo;
      world.player.shield = Math.min(2, world.player.shield + 1);
      world.player.reloadBoost = 2.6;
      world.score += 120 + question.difficulty * 15;
      world.correctAnswers += 1;
      showToast("Recharge perfect: full ammo + shield.");
      playTone(620, 0.12, "triangle", 0.05);
      spawnImpactParticles(world, station.x + 16, station.y - 12, "#2fc992", 16, 240);
    } else {
      world.player.ammo = Math.min(world.player.maxAmmo, world.player.ammo + Math.ceil(world.player.maxAmmo * 0.75));
      world.score += 35;
      showToast("Partial reload. Keep pushing!");
      playTone(300, 0.08, "square", 0.03);
      spawnImpactParticles(world, station.x + 16, station.y - 12, "#ffd166", 12, 180);
    }

    state.activePrompt = null;
    world.player.invuln = Math.max(world.player.invuln, 1.5);
    showScreen("playing");
  }

  function getQuestion(category, difficulty, usedQuestionIds) {
    const candidates = QUESTION_BANK.filter((question) => question.category === category && !usedQuestionIds.has(question.id));
    if (!candidates.length) {
      return null;
    }

    const sameDifficulty = candidates.filter((question) => question.difficulty === difficulty);
    const nearDifficulty = candidates.filter((question) => Math.abs(question.difficulty - difficulty) <= 1);
    const pool = sameDifficulty.length ? sameDifficulty : nearDifficulty.length ? nearDifficulty : candidates;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function completeLevel(world) {
    const finishBonus = Math.max(0, Math.round((world.level.timeTarget - world.time) * 8));
    world.score += finishBonus + world.player.lives * 90 + world.correctAnswers * 40;
    finishRun(true, "Level clear");
  }

  function finishRun(won, reason) {
    const world = state.world;
    if (!world) {
      return;
    }

    const level = world.level;
    const stars = won ? calculateStars(world) : 0;
    const bestStarsValue = state.save.bestStars[level.id] || 0;
    const bestScoreValue = state.save.bestScores[level.id] || 0;

    if (won) {
      state.save.bestStars[level.id] = Math.max(bestStarsValue, stars);
      state.save.bestScores[level.id] = Math.max(bestScoreValue, world.score);
      state.save.unlockedLevel = LEVELS.length;
      saveState();
      renderLevelSelect();
    }

    resultEyebrow.textContent = won ? "Level Clear" : "Training Reset";
    resultTitle.textContent = won ? `${level.name} Complete!` : "Try That Run Again";
    resultBody.textContent = won
      ? `You finished in ${world.time.toFixed(1)}s with ${world.correctAnswers}/${world.totalStations} strong reload answers. Auto-forward stays ${state.save.settings.autoForward ? "ON" : "OFF"} until you change it.`
      : `${reason}. Restart the level or head back to level select to regroup.`;
    resultStars.textContent = won ? "★".repeat(stars) : "0";
    resultScore.textContent = `${world.score}`;
    resultBest.textContent = `${won ? state.save.bestScores[level.id] : bestScoreValue}`;

    nextLevelBtn.disabled = !won || world.levelIndex >= LEVELS.length - 1;
    nextLevelBtn.textContent = world.levelIndex >= LEVELS.length - 1 ? "Final Clear" : "Next Level";
    showScreen("result");
  }

  function calculateStars(world) {
    let stars = 1;
    const quickClear = world.time <= world.level.timeTarget * 1.1;
    const strongAnswers = world.correctAnswers >= Math.ceil(world.totalStations * 0.67);
    const steadyRun = world.player.lives >= 2;

    if (quickClear || strongAnswers) {
      stars += 1;
    }
    if (quickClear && steadyRun && world.score >= world.level.id * 260) {
      stars += 1;
    }
    return clamp(stars, 1, 3);
  }

  function updateHUD() {
    if (!state.world) {
      return;
    }

    const { level, player, score } = state.world;
    const finishX = level.finish.x + level.finish.w;
    const progress = clamp(Math.round(((player.x + player.w * 0.5) / finishX) * 100), 0, 100);
    hudLevel.textContent = `Level ${level.id}`;
    hudTheme.textContent = `${level.name}${state.save.settings.autoForward ? " • Auto" : ""}`;
    hudHealth.textContent = `Lives ${player.lives} • HP ${player.hp}${player.shield ? ` • Shield ${player.shield}` : ""}`;
    hudAmmo.textContent = `Ammo ${player.ammo}/${player.maxAmmo}`;
    hudProgress.textContent = `Progress ${progress}%`;
    hudScore.textContent = `Score ${score}`;

    const missionFill = document.getElementById('missionFill');
    if (missionFill) missionFill.style.width = `${clamp(state.world.player.x / state.world.level.finish.x * 100, 0, 100)}%`;
    const missionText = document.getElementById('missionText');
    if (missionText) missionText.textContent = `Brain boosts ${state.world.correctAnswers}/${state.world.totalStations} · ${state.world.checkpointsReached} checkpoints`;
  }

  function renderScene(time) {
    if (view3d?.render(state, time)) return;
    const world = state.world;
    const palette = world ? world.level.palette : { skyTop: "#f8fbff", skyBottom: "#d7efff", hillA: "#cdeeff", hillB: "#b7e3ff", accent: "#35a7ff" };

    drawBackground(palette, world ? world.camera.x : time * 15, world ? world.camera.y : 0, time);

    if (world) {
      ctx.save();
      ctx.translate(-world.camera.x, -world.camera.y);
      drawPlatforms(world);
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
        ctx.fillStyle = `rgba(255, 255, 255, ${world.flash * 0.25})`;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
      }
    } else {
      drawMenuDecor(time);
    }
  }

  function drawBackground(palette, cameraX, cameraY, time) {
    const gradient = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    gradient.addColorStop(0, palette.skyTop);
    gradient.addColorStop(1, palette.skyBottom);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.fillStyle = "rgba(255, 213, 148, 0.85)";
    ctx.beginPath();
    ctx.arc(WIDTH - 120, 110, 54, 0, Math.PI * 2);
    ctx.fill();

    const clouds = [
      { x: 150, y: 110, size: 46 },
      { x: 440, y: 150, size: 34 },
      { x: 830, y: 120, size: 40 },
      { x: 1120, y: 170, size: 36 }
    ];
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    clouds.forEach((cloud, index) => drawCloud(cloud.x - cameraX * 0.08 + Math.sin(time + index) * 10, cloud.y + Math.sin(time * 0.5 + index) * 3, cloud.size));

    ctx.fillStyle = palette.hillA;
    drawHillRow(HEIGHT - 170 - cameraY * 0.05, 90, 120, cameraX * 0.14);
    ctx.fillStyle = palette.hillB;
    drawHillRow(HEIGHT - 90 - cameraY * 0.08, 120, 155, cameraX * 0.2);
  }

  function drawCloud(x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size * 0.42, 0, Math.PI * 2);
    ctx.arc(x + size * 0.45, y - size * 0.12, size * 0.36, 0, Math.PI * 2);
    ctx.arc(x + size * 0.82, y, size * 0.28, 0, Math.PI * 2);
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
      ctx.fillStyle = "#f5fbff";
      roundRect(platform.x, platform.y, platform.w, platform.h, 18, true);
      ctx.fillStyle = "#b8e8ff";
      roundRect(platform.x, platform.y, platform.w, 16, 18, true);
      ctx.fillStyle = "rgba(37, 101, 143, 0.08)";
      ctx.fillRect(platform.x + 14, platform.y + platform.h - 12, platform.w - 28, 6);
    });
  }

  function drawStations(world, time) {
    world.stations.forEach((station) => {
      const glow = 0.55 + Math.sin(station.pulse + time * 2) * 0.2;
      ctx.save();
      ctx.translate(station.x, station.y);
      ctx.fillStyle = station.used ? "rgba(206, 227, 239, 0.7)" : `rgba(255, 209, 102, ${glow})`;
      roundRect(0, -44, 32, 44, 14, true);
      ctx.fillStyle = station.used ? "#87a8ba" : "#ffffff";
      ctx.font = "700 18px 'Trebuchet MS', sans-serif";
      ctx.fillText(station.category.charAt(0).toUpperCase(), 9, -16);
      if (!station.used) {
        ctx.strokeStyle = "rgba(255, 209, 102, 0.45)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(16, -26, 28 + Math.sin(station.pulse) * 4, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    });
  }

  function drawCheckpoints(world, time) {
    world.checkpoints.forEach((checkpoint) => {
      ctx.save();
      ctx.translate(checkpoint.x, checkpoint.y);
      ctx.fillStyle = checkpoint.active ? "#2fc992" : "rgba(47, 201, 146, 0.45)";
      ctx.fillRect(0, -90, 10, 90);
      ctx.beginPath();
      ctx.moveTo(10, -90);
      ctx.lineTo(50, -75 + Math.sin(time * 4) * 2);
      ctx.lineTo(10, -56);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    });
  }

  function drawFinish(world, time) {
    const finish = world.level.finish;
    const locked = finish.lockedByBoss && !world.bossCleared;
    ctx.save();
    ctx.translate(finish.x, finish.y);
    ctx.fillStyle = locked ? "#94a3b8" : COLORS.finish;
    ctx.fillRect(0, 0, 10, finish.h);
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(finish.w, 18 + Math.sin(time * 5) * 3);
    ctx.lineTo(10, 38);
    ctx.closePath();
    ctx.fill();
    if (locked) {
      ctx.fillStyle = "#ffffff";
      ctx.font = "800 18px 'Trebuchet MS', sans-serif";
      ctx.fillText("LOCK", 18, 70);
    }
    ctx.restore();
  }

  function drawHazards(world, time) {
    world.hazards.forEach((hazard) => {
      if (hazard.kind === "spikes") {
        ctx.fillStyle = COLORS.hazard;
        const spikeCount = Math.max(2, Math.floor(hazard.w / 16));
        for (let i = 0; i < spikeCount; i += 1) {
          const spikeX = hazard.x + i * (hazard.w / spikeCount);
          ctx.beginPath();
          ctx.moveTo(spikeX, hazard.y + hazard.h);
          ctx.lineTo(spikeX + hazard.w / spikeCount / 2, hazard.y);
          ctx.lineTo(spikeX + hazard.w / spikeCount, hazard.y + hazard.h);
          ctx.closePath();
          ctx.fill();
        }
      } else if (hazard.kind === "laser") {
        ctx.fillStyle = "rgba(255, 93, 115, 0.22)";
        roundRect(hazard.x - 10, hazard.y, hazard.w + 20, hazard.h, 18, true);
        ctx.fillStyle = `rgba(255, 93, 115, ${0.75 + Math.sin(time * 8 + hazard.t) * 0.12})`;
        roundRect(hazard.x, hazard.y, hazard.w, hazard.h, 16, true);
      } else {
        ctx.fillStyle = "rgba(255, 93, 115, 0.8)";
        roundRect(hazard.x, hazard.y, hazard.w, hazard.h, 10, true);
      }
    });
  }

  function drawEnemies(world, time) {
    world.enemies.forEach((enemy) => {
      if (!enemy.alive) {
        return;
      }

      ctx.save();
      ctx.translate(enemy.x, enemy.y);
      if (enemy.type === "drone") {
        ctx.fillStyle = enemy.damageFlash > 0 ? "#ffffff" : COLORS.enemy2;
        roundRect(0, 6, enemy.w, enemy.h - 8, 18, true);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(10, 18, 10, 6);
        ctx.fillRect(enemy.w - 20, 18, 10, 6);
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(4, 18);
        ctx.lineTo(-10 + Math.sin(time * 10) * 3, 10);
        ctx.moveTo(enemy.w - 4, 18);
        ctx.lineTo(enemy.w + 10 - Math.sin(time * 10) * 3, 10);
        ctx.stroke();
      } else if (enemy.type === "turret") {
        ctx.fillStyle = enemy.damageFlash > 0 ? "#ffffff" : COLORS.enemy;
        roundRect(0, 12, enemy.w, enemy.h - 12, 16, true);
        ctx.fillStyle = "#ffffff";
        roundRect(enemy.w - 8, 22, 18, 10, 8, true);
      } else {
        ctx.fillStyle = enemy.damageFlash > 0 ? "#ffffff" : enemy.type === "boss" ? "#ff7b54" : COLORS.enemy;
        roundRect(0, 14, enemy.w, enemy.h - 14, 18, true);
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(enemy.w * 0.35, 24, 5, 0, Math.PI * 2);
        ctx.arc(enemy.w * 0.67, 24, 5, 0, Math.PI * 2);
        ctx.fill();
        if (enemy.type === "boss") {
          ctx.fillStyle = "rgba(255,255,255,0.28)";
          roundRect(0, -14, enemy.w, 8, 999, true);
          ctx.fillStyle = "#ffd166";
          roundRect(0, -14, enemy.w * (enemy.hp / enemy.maxHp), 8, 999, true);
        }
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
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    ctx.beginPath();
    ctx.arc(bullet.x - 1, bullet.y - 1, bullet.r * 0.45, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawPlayer(world, time) {
    const player = world.player;
    const bodyColor = player.invuln > 0 ? "#7bc6ff" : COLORS.player;
    ctx.save();
    ctx.translate(player.x, player.y + Math.sin(time * 10) * Math.min(1.8, Math.abs(player.vx) * 0.004));

    if (player.reloadBoost > 0) {
      ctx.strokeStyle = `rgba(47, 201, 146, ${0.45 + Math.sin(time * 12) * 0.2})`;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(player.w * 0.5, player.h * 0.5, 36, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = bodyColor;
    roundRect(0, 12, player.w, player.h - 12, 18, true);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(14, 24, 5, 0, Math.PI * 2);
    ctx.arc(28, 24, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = COLORS.playerAccent;
    roundRect(player.facing > 0 ? player.w - 6 : -18, 28, 20, 10, 8, true);

    if (player.shield > 0) {
      ctx.strokeStyle = "rgba(47, 201, 146, 0.8)";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(player.w * 0.5, player.h * 0.5, 34 + Math.sin(time * 9) * 2, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawParticles(world) {
    world.particles.forEach((particle) => {
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = Math.max(0, particle.life / particle.maxLife);
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }

  function drawMenuDecor(time) {
    const baseY = HEIGHT - 160;
    ctx.save();
    ctx.translate(120, baseY + Math.sin(time * 2) * 4);
    ctx.fillStyle = "#2c8cff";
    roundRect(0, 12, 46, 58, 18, true);
    ctx.fillStyle = "#ff9f43";
    roundRect(40, 30, 22, 12, 8, true);
    ctx.restore();

    for (let i = 0; i < 5; i += 1) {
      ctx.fillStyle = ["#ff7b54", "#2fc992", "#ffd166", "#7c59ff", "#38bdf8"][i];
      roundRect(420 + i * 120, baseY - (i % 2) * 40, 70, 70, 24, true);
    }
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove("hidden");
    state.toastTimer = 2.2;
  }

  function spawnImpactParticles(world, x, y, color, count, speed) {
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const magnitude = speed * (0.35 + Math.random() * 0.65);
      world.particles.push({
        x,
        y,
        vx: Math.cos(angle) * magnitude,
        vy: Math.sin(angle) * magnitude,
        gravity: 120,
        size: 2 + Math.random() * 3,
        life: 0.28 + Math.random() * 0.34,
        maxLife: 0.6,
        color
      });
    }
  }

  function spawnJumpDust(world, x, y) {
    for (let i = 0; i < 8; i += 1) {
      world.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 160,
        vy: -40 - Math.random() * 60,
        gravity: 180,
        size: 3 + Math.random() * 2,
        life: 0.18 + Math.random() * 0.18,
        maxLife: 0.36,
        color: "rgba(255,255,255,0.92)"
      });
    }
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
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) {
        return;
      }
      state.audioContext = new Context();
    }

    const context = state.audioContext;
    if (context.state === "suspended") {
      context.resume();
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.value = frequency;
    gain.gain.value = volume;
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + duration);
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
