(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (reduceMotion.matches) {
    return;
  }

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d', { alpha: true });

  if (!context) {
    return;
  }

  canvas.className = 'ambient-garden-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.prepend(canvas);

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const particles = [];
  const maximumParticles = finePointer.matches ? 20 : 12;
  const idleDelay = 3000;

  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let animationFrame = 0;
  let previousFrame = 0;
  let pageIdle = false;
  let pageIdleTimer = 0;
  let spawnTimer = 0;
  let cursorIdleTimer = 0;
  let cursorRestartTimer = 0;
  let cursorGarden = null;
  let pointerStill = false;
  let pointerSeen = false;
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;

  const randomBetween = (minimum, maximum) =>
    minimum + Math.random() * (maximum - minimum);

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  function createParticle() {
    if (particles.length >= maximumParticles) {
      return;
    }

    const isFlower = Math.random() > 0.28;
    const size = isFlower ? randomBetween(4.5, 8.5) : randomBetween(5, 9);

    particles.push({
      type: isFlower ? 'flower' : 'leaf',
      x: randomBetween(width * 0.05, width * 0.95),
      y: randomBetween(-18, Math.max(24, height * 0.08)),
      originX: 0,
      age: 0,
      bloomDuration: randomBetween(0.9, 1.8),
      fallSpeed: randomBetween(14, 28),
      drift: randomBetween(-4.5, 4.5),
      sway: randomBetween(10, 26),
      swayRate: randomBetween(0.45, 0.9),
      rotation: randomBetween(0, Math.PI * 2),
      rotationSpeed: randomBetween(-0.42, 0.42),
      size,
      opacity: isFlower ? randomBetween(0.34, 0.58) : randomBetween(0.24, 0.42),
      tint: Math.random(),
    });

    particles[particles.length - 1].originX = particles[particles.length - 1].x;
    ensureAnimation();
  }

  function drawFlower(particle, scale) {
    context.save();
    context.translate(particle.x, particle.y);
    context.rotate(particle.rotation);
    context.scale(scale, scale);

    for (let index = 0; index < 5; index += 1) {
      context.save();
      context.rotate((Math.PI * 2 * index) / 5);
      context.beginPath();
      context.moveTo(0, 0);
      context.bezierCurveTo(
        particle.size * 0.18,
        -particle.size * 0.12,
        particle.size * 0.62,
        -particle.size * 0.28,
        particle.size * 0.84,
        0,
      );
      context.bezierCurveTo(
        particle.size * 0.62,
        particle.size * 0.28,
        particle.size * 0.18,
        particle.size * 0.12,
        0,
        0,
      );
      context.fillStyle =
        particle.tint > 0.55
          ? `rgba(232, 188, 205, ${particle.opacity})`
          : `rgba(247, 218, 226, ${particle.opacity * 0.92})`;
      context.fill();
      context.restore();
    }

    context.beginPath();
    context.arc(0, 0, Math.max(1.1, particle.size * 0.14), 0, Math.PI * 2);
    context.fillStyle = `rgba(188, 157, 112, ${particle.opacity * 0.9})`;
    context.fill();
    context.restore();
  }

  function drawLeaf(particle, scale) {
    context.save();
    context.translate(particle.x, particle.y);
    context.rotate(particle.rotation);
    context.scale(scale, scale);
    context.beginPath();
    context.moveTo(0, -particle.size);
    context.bezierCurveTo(
      particle.size * 0.8,
      -particle.size * 0.4,
      particle.size * 0.72,
      particle.size * 0.55,
      0,
      particle.size,
    );
    context.bezierCurveTo(
      -particle.size * 0.72,
      particle.size * 0.55,
      -particle.size * 0.8,
      -particle.size * 0.4,
      0,
      -particle.size,
    );
    context.fillStyle =
      particle.tint > 0.5
        ? `rgba(159, 182, 201, ${particle.opacity})`
        : `rgba(166, 154, 126, ${particle.opacity * 0.9})`;
    context.fill();
    context.beginPath();
    context.moveTo(0, -particle.size * 0.68);
    context.lineTo(0, particle.size * 0.72);
    context.strokeStyle = `rgba(141, 112, 80, ${particle.opacity * 0.62})`;
    context.lineWidth = 0.65;
    context.stroke();
    context.restore();
  }

  function updateParticles(deltaSeconds) {
    for (let index = particles.length - 1; index >= 0; index -= 1) {
      const particle = particles[index];
      particle.age += deltaSeconds;
      const falling = particle.age > particle.bloomDuration;

      if (falling) {
        particle.y += particle.fallSpeed * deltaSeconds;
        particle.rotation += particle.rotationSpeed * deltaSeconds;
      }

      particle.x =
        particle.originX +
        Math.sin(particle.age * particle.swayRate + particle.rotation) * particle.sway +
        particle.drift * Math.max(0, particle.age - particle.bloomDuration);

      if (particle.y + particle.size >= height) {
        particles.splice(index, 1);
      }
    }
  }

  function drawParticles() {
    context.clearRect(0, 0, width, height);

    particles.forEach((particle) => {
      const bloomProgress = Math.min(1, particle.age / particle.bloomDuration);
      const scale = 1 - Math.pow(1 - bloomProgress, 3);

      if (particle.type === 'flower') {
        drawFlower(particle, scale);
      } else {
        drawLeaf(particle, scale);
      }
    });
  }

  function animate(time) {
    const deltaSeconds = previousFrame
      ? Math.min((time - previousFrame) / 1000, 0.035)
      : 0;
    previousFrame = time;
    updateParticles(deltaSeconds);
    drawParticles();

    if (particles.length || pageIdle) {
      animationFrame = window.requestAnimationFrame(animate);
    } else {
      animationFrame = 0;
      previousFrame = 0;
      context.clearRect(0, 0, width, height);
    }
  }

  function ensureAnimation() {
    if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(animate);
    }
  }

  function scheduleParticle() {
    window.clearTimeout(spawnTimer);

    if (!pageIdle) {
      return;
    }

    spawnTimer = window.setTimeout(() => {
      createParticle();

      if (Math.random() > 0.76) {
        window.setTimeout(createParticle, randomBetween(180, 420));
      }

      scheduleParticle();
    }, randomBetween(820, 1500));
  }

  function beginPageIdle() {
    pageIdle = true;
    createParticle();
    window.setTimeout(createParticle, 260);
    scheduleParticle();
    ensureAnimation();
  }

  function resetPageIdle() {
    pageIdle = false;
    window.clearTimeout(pageIdleTimer);
    window.clearTimeout(spawnTimer);
    pageIdleTimer = window.setTimeout(beginPageIdle, idleDelay);
  }

  function cursorMarkup() {
    return `
      <div class="cursor-garden__scene">
        <svg aria-hidden="true" fill="none" viewBox="0 0 200 200">
          <g class="cursor-garden__tree">
            <path class="cursor-garden__stem" d="M100 166C96 145 105 126 99 108C94 91 105 75 100 55" />
            <path class="cursor-garden__helix cursor-garden__helix--a" d="M100 145C72 134 72 116 100 106C128 96 128 78 100 67C82 60 78 49 84 37" />
            <path class="cursor-garden__helix cursor-garden__helix--b" d="M100 145C128 134 128 116 100 106C72 96 72 78 100 67C118 60 122 49 116 37" />
            <path class="cursor-garden__branch cursor-garden__branch--a" d="M99 120C80 113 68 99 55 82" />
            <path class="cursor-garden__branch cursor-garden__branch--b" d="M101 104C122 96 136 83 146 65" />
            <path class="cursor-garden__branch cursor-garden__branch--c" d="M99 88C82 80 71 69 65 55" />
            <g class="cursor-garden__leaves">
              <ellipse cx="54" cy="80" rx="7" ry="3.4" transform="rotate(-35 54 80)" />
              <ellipse cx="146" cy="64" rx="7" ry="3.4" transform="rotate(-48 146 64)" />
              <ellipse cx="65" cy="54" rx="6.5" ry="3.2" transform="rotate(34 65 54)" />
              <ellipse cx="85" cy="38" rx="6" ry="3" transform="rotate(-52 85 38)" />
              <ellipse cx="116" cy="37" rx="6" ry="3" transform="rotate(52 116 37)" />
            </g>
          </g>
          <g class="cursor-garden__ouroboros">
            <path class="cursor-garden__ring" d="M100 23A77 77 0 1 1 99.5 23" />
            <path class="cursor-garden__head" d="M101 23L89 16L92 29Z" />
            <circle class="cursor-garden__eye" cx="94.2" cy="21.7" r="1.25" />
          </g>
        </svg>
      </div>
    `;
  }

  function removeCursorGarden(immediate = false) {
    window.clearTimeout(cursorRestartTimer);

    if (!cursorGarden) {
      return;
    }

    const gardenToRemove = cursorGarden;
    cursorGarden = null;

    if (immediate) {
      gardenToRemove.remove();
      return;
    }

    gardenToRemove.classList.add('cursor-garden--dismissed');
    window.setTimeout(() => gardenToRemove.remove(), 420);
  }

  function createCursorGarden() {
    if (!finePointer.matches || !pointerSeen || !pointerStill || document.hidden) {
      return;
    }

    removeCursorGarden(true);
    const garden = document.createElement('div');
    garden.className = 'cursor-garden';
    garden.setAttribute('aria-hidden', 'true');
    garden.style.left = `${Math.min(Math.max(pointerX, 96), window.innerWidth - 96)}px`;
    garden.style.top = `${Math.min(Math.max(pointerY, 96), window.innerHeight - 96)}px`;
    garden.innerHTML = cursorMarkup();
    document.body.append(garden);
    cursorGarden = garden;

    const scene = garden.querySelector('.cursor-garden__scene');
    scene?.addEventListener('animationend', (event) => {
      if (event.target !== scene || event.animationName !== 'cursor-garden-cycle') {
        return;
      }

      removeCursorGarden(true);

      if (pointerStill) {
        cursorRestartTimer = window.setTimeout(createCursorGarden, 1400);
      }
    });
  }

  function resetCursorIdle() {
    pointerStill = false;
    window.clearTimeout(cursorIdleTimer);
    window.clearTimeout(cursorRestartTimer);
    removeCursorGarden();

    if (!finePointer.matches || !pointerSeen) {
      return;
    }

    cursorIdleTimer = window.setTimeout(() => {
      pointerStill = true;
      createCursorGarden();
    }, idleDelay);
  }

  function handlePointerMove(event) {
    if (event.pointerType && event.pointerType !== 'mouse') {
      return;
    }

    pointerSeen = true;
    pointerX = event.clientX;
    pointerY = event.clientY;
    resetPageIdle();
    resetCursorIdle();
  }

  function handleActivity() {
    resetPageIdle();
    resetCursorIdle();
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      pageIdle = false;
      window.clearTimeout(pageIdleTimer);
      window.clearTimeout(spawnTimer);
      removeCursorGarden(true);
      return;
    }

    resetPageIdle();
    resetCursorIdle();
  }

  resizeCanvas();
  resetPageIdle();
  window.addEventListener('resize', resizeCanvas, { passive: true });
  window.addEventListener('pointermove', handlePointerMove, { passive: true });
  window.addEventListener('pointerdown', handleActivity, { passive: true });
  window.addEventListener('wheel', handleActivity, { passive: true });
  window.addEventListener('scroll', handleActivity, { passive: true });
  window.addEventListener('touchstart', handleActivity, { passive: true });
  window.addEventListener('keydown', handleActivity);
  document.addEventListener('visibilitychange', handleVisibilityChange);

  reduceMotion.addEventListener('change', (event) => {
    if (!event.matches) {
      return;
    }

    pageIdle = false;
    window.clearTimeout(pageIdleTimer);
    window.clearTimeout(spawnTimer);
    window.clearTimeout(cursorIdleTimer);
    window.cancelAnimationFrame(animationFrame);
    removeCursorGarden(true);
    canvas.remove();
  });
})();
