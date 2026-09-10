const p = (x, y, w, h, options = {}) => ({ x, y, w, h, ...options });
const h = (x, y, w, h, options = {}) => ({ x, y, w, h, ...options });
const e = (type, x, y, options = {}) => ({ type, x, y, ...options });
const s = (x, y, category, difficulty, options = {}) => ({ x, y, category, difficulty, ...options });
const c = (x, y, options = {}) => ({ x, y, ...options });

const LEVELS = [
  {
    id: 1,
    name: "Launch Yard",
    tagline: "Tutorial flow with friendly targets and quick reload pads.",
    difficultyLabel: "Warm-up",
    width: 3200,
    height: 920,
    timeTarget: 65,
    start: { x: 120, y: 640 },
    finish: { x: 3000, y: 620, w: 90, h: 120 },
    palette: { skyTop: "#f8fbff", skyBottom: "#d7efff", hillA: "#d3f0ff", hillB: "#bce5ff", accent: "#35a7ff" },
    platforms: [
      p(0, 760, 900, 160),
      p(960, 760, 420, 160),
      p(1440, 700, 220, 220),
      p(1710, 760, 520, 160),
      p(1950, 660, 180, 32),
      p(2240, 760, 360, 160),
      p(2550, 670, 180, 32),
      p(2780, 760, 420, 160)
    ],
    hazards: [
      h(905, 760, 55, 26, { kind: "spikes" }),
      h(1385, 760, 55, 26, { kind: "spikes" }),
      h(2605, 760, 45, 26, { kind: "spikes" })
    ],
    enemies: [
      e("walker", 1110, 700, { patrolMin: 1020, patrolMax: 1310 }),
      e("turret", 2010, 612, { cooldown: 1.6 }),
      e("walker", 2860, 700, { patrolMin: 2810, patrolMax: 3090 })
    ],
    stations: [
      s(700, 700, "math", 1),
      s(1820, 700, "science", 1),
      s(2470, 700, "chinese", 1)
    ],
    checkpoints: [
      c(1540, 630),
      c(2470, 700)
    ]
  },
  {
    id: 2,
    name: "Drone Docks",
    tagline: "Mobile targets, wider jumps, and your first moving pressure lane.",
    difficultyLabel: "Rookie",
    width: 3600,
    height: 980,
    timeTarget: 78,
    start: { x: 120, y: 640 },
    finish: { x: 3400, y: 590, w: 90, h: 120 },
    palette: { skyTop: "#f7fcff", skyBottom: "#d3f5ff", hillA: "#c5f0ff", hillB: "#a9ddff", accent: "#2fa6a1" },
    platforms: [
      p(0, 760, 620, 220),
      p(720, 760, 280, 220),
      p(1080, 700, 190, 280),
      p(1330, 760, 380, 220),
      p(1780, 690, 220, 28),
      p(2060, 760, 540, 220),
      p(2330, 640, 180, 28),
      p(2660, 760, 310, 220),
      p(3040, 700, 180, 280),
      p(3270, 760, 330, 220)
    ],
    hazards: [
      h(625, 760, 95, 26, { kind: "spikes" }),
      h(1720, 760, 60, 26, { kind: "spikes" }),
      h(2595, 760, 65, 26, { kind: "spikes" }),
      h(2990, 690, 38, 70, { kind: "laser", axis: "y", range: 120, speed: 1.3 })
    ],
    enemies: [
      e("drone", 860, 560, { patrolMin: 760, patrolMax: 980, amplitude: 26, cooldown: 2.2 }),
      e("walker", 1470, 700, { patrolMin: 1380, patrolMax: 1660 }),
      e("drone", 2440, 500, { patrolMin: 2320, patrolMax: 2520, amplitude: 34, cooldown: 1.8 }),
      e("turret", 3100, 652, { cooldown: 1.4 })
    ],
    stations: [
      s(500, 700, "science", 1),
      s(1910, 650, "math", 2),
      s(2860, 700, "chinese", 2)
    ],
    checkpoints: [
      c(1330, 700),
      c(2660, 700)
    ]
  },
  {
    id: 3,
    name: "Arena Alley",
    tagline: "A wider battle lane with more enemy overlap and faster choices.",
    difficultyLabel: "Skilled",
    width: 3950,
    height: 980,
    timeTarget: 80,
    start: { x: 120, y: 640 },
    finish: { x: 3740, y: 620, w: 90, h: 120 },
    palette: { skyTop: "#f9fcff", skyBottom: "#daf2ff", hillA: "#c6ebff", hillB: "#9fd8ff", accent: "#ff9f43" },
    platforms: [
      p(0, 760, 880, 220),
      p(960, 760, 720, 220),
      p(1760, 690, 220, 30),
      p(2050, 760, 740, 220),
      p(2330, 610, 160, 30),
      p(2850, 760, 260, 220),
      p(3180, 700, 190, 280),
      p(3410, 760, 540, 220)
    ],
    hazards: [
      h(885, 760, 75, 26, { kind: "spikes" }),
      h(1690, 760, 70, 26, { kind: "spikes" }),
      h(2790, 760, 60, 26, { kind: "spikes" }),
      h(3030, 670, 40, 90, { kind: "laser", axis: "y", range: 90, speed: 1.5 })
    ],
    enemies: [
      e("walker", 1180, 700, { patrolMin: 1030, patrolMax: 1540, cooldown: 2.1 }),
      e("walker", 1410, 700, { patrolMin: 1080, patrolMax: 1580, cooldown: 2.0 }),
      e("drone", 2270, 520, { patrolMin: 2120, patrolMax: 2480, amplitude: 28, cooldown: 1.7 }),
      e("turret", 2460, 562, { cooldown: 1.3 }),
      e("walker", 3550, 700, { patrolMin: 3470, patrolMax: 3850, cooldown: 1.8 })
    ],
    stations: [
      s(650, 700, "math", 2),
      s(1980, 650, "science", 2),
      s(3230, 650, "chinese", 2)
    ],
    checkpoints: [
      c(1980, 650),
      c(3180, 650)
    ]
  },
  {
    id: 4,
    name: "Sky Stack",
    tagline: "Vertical routes, split paths, and tactical shooting from above.",
    difficultyLabel: "Climber",
    width: 4100,
    height: 1220,
    timeTarget: 92,
    start: { x: 120, y: 900 },
    finish: { x: 3860, y: 360, w: 90, h: 120 },
    palette: { skyTop: "#f9fdff", skyBottom: "#d7f6ff", hillA: "#d0efff", hillB: "#afe1ff", accent: "#29c58f" },
    platforms: [
      p(0, 1020, 720, 200),
      p(810, 930, 220, 30),
      p(1080, 850, 240, 30),
      p(1380, 760, 220, 30),
      p(1650, 680, 240, 30),
      p(1920, 760, 260, 30),
      p(2240, 890, 240, 30),
      p(2520, 1010, 320, 210),
      p(2900, 900, 220, 30),
      p(3170, 760, 240, 30),
      p(3470, 610, 230, 30),
      p(3720, 480, 250, 180)
    ],
    hazards: [
      h(730, 1020, 70, 28, { kind: "spikes" }),
      h(1330, 850, 45, 110, { kind: "laser", axis: "y", range: 100, speed: 1.4 }),
      h(2200, 1000, 180, 20, { kind: "lava" }),
      h(3120, 900, 50, 28, { kind: "spikes" })
    ],
    enemies: [
      e("drone", 950, 760, { patrolMin: 840, patrolMax: 1160, amplitude: 35, cooldown: 2.0 }),
      e("turret", 1730, 622, { cooldown: 1.2 }),
      e("walker", 2580, 950, { patrolMin: 2550, patrolMax: 2790, cooldown: 1.7 }),
      e("drone", 3560, 430, { patrolMin: 3500, patrolMax: 3880, amplitude: 24, cooldown: 1.4 })
    ],
    stations: [
      s(600, 960, "chinese", 2),
      s(2020, 720, "math", 3),
      s(3340, 720, "science", 3)
    ],
    checkpoints: [
      c(1710, 640),
      c(3170, 720)
    ]
  },
  {
    id: 5,
    name: "Pulse Factory",
    tagline: "Moving hazards and timed runs start pushing your focus.",
    difficultyLabel: "Mid Boss",
    width: 4400,
    height: 1040,
    timeTarget: 95,
    start: { x: 120, y: 640 },
    finish: { x: 4180, y: 560, w: 90, h: 120 },
    palette: { skyTop: "#fffdf8", skyBottom: "#ffeccf", hillA: "#ffe4bb", hillB: "#ffd094", accent: "#ff8d52" },
    platforms: [
      p(0, 760, 720, 280),
      p(820, 760, 330, 280),
      p(1220, 690, 180, 28),
      p(1460, 760, 400, 280),
      p(1910, 650, 190, 28),
      p(2170, 760, 480, 280),
      p(2720, 690, 220, 28),
      p(3020, 760, 500, 280),
      p(3600, 680, 220, 28),
      p(3890, 760, 510, 280)
    ],
    hazards: [
      h(720, 760, 90, 26, { kind: "spikes" }),
      h(1140, 660, 40, 100, { kind: "laser", axis: "y", range: 100, speed: 1.6 }),
      h(1865, 760, 45, 26, { kind: "spikes" }),
      h(2660, 740, 50, 120, { kind: "laser", axis: "y", range: 120, speed: 1.9 }),
      h(3510, 760, 70, 26, { kind: "spikes" })
    ],
    enemies: [
      e("walker", 980, 700, { patrolMin: 860, patrolMax: 1100, cooldown: 1.9 }),
      e("turret", 1980, 612, { cooldown: 1.2 }),
      e("drone", 2450, 530, { patrolMin: 2240, patrolMax: 2580, amplitude: 30, cooldown: 1.5 }),
      e("walker", 3210, 700, { patrolMin: 3060, patrolMax: 3470, cooldown: 1.6 }),
      e("turret", 4040, 652, { cooldown: 1.1 })
    ],
    stations: [
      s(560, 700, "science", 2),
      s(2100, 610, "math", 3),
      s(3670, 640, "chinese", 3)
    ],
    checkpoints: [
      c(1540, 700),
      c(3040, 700)
    ]
  },
  {
    id: 6,
    name: "Crosswind Course",
    tagline: "Combat and traversal mix tighter, with less room for sloppy timing.",
    difficultyLabel: "Advanced",
    width: 4700,
    height: 1120,
    timeTarget: 102,
    start: { x: 120, y: 840 },
    finish: { x: 4480, y: 460, w: 90, h: 120 },
    palette: { skyTop: "#fbfcff", skyBottom: "#dff2ff", hillA: "#d4ebff", hillB: "#b5deff", accent: "#648dff" },
    platforms: [
      p(0, 960, 760, 160),
      p(820, 880, 210, 30),
      p(1080, 800, 230, 30),
      p(1360, 720, 240, 30),
      p(1680, 820, 210, 30),
      p(1940, 920, 360, 200),
      p(2370, 820, 230, 30),
      p(2650, 720, 230, 30),
      p(2930, 620, 260, 30),
      p(3250, 760, 300, 360),
      p(3610, 670, 210, 30),
      p(3880, 590, 230, 30),
      p(4160, 500, 230, 30),
      p(4430, 590, 270, 530)
    ],
    hazards: [
      h(770, 960, 50, 30, { kind: "spikes" }),
      h(1310, 780, 40, 100, { kind: "laser", axis: "y", range: 90, speed: 1.7 }),
      h(2300, 920, 60, 30, { kind: "spikes" }),
      h(3200, 710, 45, 120, { kind: "laser", axis: "y", range: 100, speed: 1.8 }),
      h(4110, 560, 45, 120, { kind: "laser", axis: "y", range: 100, speed: 1.8 })
    ],
    enemies: [
      e("drone", 1180, 690, { patrolMin: 1040, patrolMax: 1340, amplitude: 32, cooldown: 1.7 }),
      e("walker", 2040, 860, { patrolMin: 1970, patrolMax: 2230, cooldown: 1.5 }),
      e("turret", 3000, 572, { cooldown: 1.15 }),
      e("drone", 3750, 550, { patrolMin: 3660, patrolMax: 4040, amplitude: 40, cooldown: 1.3 }),
      e("walker", 4500, 530, { patrolMin: 4460, patrolMax: 4630, cooldown: 1.4 })
    ],
    stations: [
      s(700, 900, "math", 3),
      s(2310, 880, "science", 3),
      s(3540, 720, "chinese", 4)
    ],
    checkpoints: [
      c(1940, 880),
      c(3250, 720)
    ]
  },
  {
    id: 7,
    name: "Battle Bowl",
    tagline: "PvP-style arena energy with layered dodge, jump, and blaster pressure.",
    difficultyLabel: "Arena Ace",
    width: 5000,
    height: 1080,
    timeTarget: 108,
    start: { x: 120, y: 760 },
    finish: { x: 4770, y: 560, w: 90, h: 120 },
    palette: { skyTop: "#fffdfb", skyBottom: "#ffe7dd", hillA: "#ffd8c9", hillB: "#ffc1a9", accent: "#ff6c7a" },
    platforms: [
      p(0, 880, 740, 200),
      p(840, 880, 840, 200),
      p(1030, 720, 210, 28),
      p(1290, 640, 210, 28),
      p(1750, 880, 780, 200),
      p(2020, 720, 200, 28),
      p(2280, 620, 200, 28),
      p(2600, 880, 920, 200),
      p(2890, 720, 180, 28),
      p(3170, 620, 190, 28),
      p(3580, 880, 520, 200),
      p(4170, 760, 210, 320),
      p(4430, 670, 180, 28),
      p(4660, 880, 340, 200)
    ],
    hazards: [
      h(760, 880, 70, 28, { kind: "spikes" }),
      h(1680, 880, 60, 28, { kind: "spikes" }),
      h(2530, 860, 55, 120, { kind: "laser", axis: "y", range: 120, speed: 2.0 }),
      h(4100, 760, 50, 120, { kind: "laser", axis: "y", range: 100, speed: 1.9 }),
      h(4608, 880, 50, 28, { kind: "spikes" })
    ],
    enemies: [
      e("walker", 1120, 660, { patrolMin: 1040, patrolMax: 1200, cooldown: 1.5 }),
      e("drone", 1420, 530, { patrolMin: 1320, patrolMax: 1490, amplitude: 22, cooldown: 1.4 }),
      e("walker", 1870, 820, { patrolMin: 1800, patrolMax: 2470, cooldown: 1.3 }),
      e("turret", 2390, 582, { cooldown: 1.05 }),
      e("drone", 3000, 560, { patrolMin: 2870, patrolMax: 3340, amplitude: 32, cooldown: 1.2 }),
      e("walker", 3740, 820, { patrolMin: 3630, patrolMax: 4040, cooldown: 1.2 }),
      e("turret", 4510, 632, { cooldown: 1.0 })
    ],
    stations: [
      s(620, 820, "science", 3),
      s(2520, 820, "math", 4),
      s(4300, 720, "chinese", 4)
    ],
    checkpoints: [
      c(1760, 820),
      c(3580, 820)
    ]
  },
  {
    id: 8,
    name: "Turbo Terrace",
    tagline: "Fast but fair routes with denser platforming and quick combat reads.",
    difficultyLabel: "Elite",
    width: 5400,
    height: 1160,
    timeTarget: 112,
    start: { x: 120, y: 900 },
    finish: { x: 5190, y: 420, w: 90, h: 120 },
    palette: { skyTop: "#f8fdff", skyBottom: "#d7f4ff", hillA: "#cff0ff", hillB: "#a2ddff", accent: "#2aa8ff" },
    platforms: [
      p(0, 1020, 730, 140),
      p(820, 930, 200, 28),
      p(1060, 840, 200, 28),
      p(1310, 750, 210, 28),
      p(1570, 840, 220, 28),
      p(1850, 950, 300, 210),
      p(2220, 840, 220, 28),
      p(2480, 730, 230, 28),
      p(2760, 620, 240, 28),
      p(3050, 720, 240, 28),
      p(3360, 840, 240, 28),
      p(3650, 950, 320, 210),
      p(4040, 860, 220, 28),
      p(4300, 750, 220, 28),
      p(4580, 640, 220, 28),
      p(4850, 530, 220, 28),
      p(5120, 640, 280, 520)
    ],
    hazards: [
      h(740, 1010, 60, 28, { kind: "spikes" }),
      h(1525, 830, 40, 100, { kind: "laser", axis: "y", range: 90, speed: 2.1 }),
      h(2160, 950, 55, 28, { kind: "spikes" }),
      h(3310, 820, 40, 110, { kind: "laser", axis: "y", range: 110, speed: 2.0 }),
      h(3960, 950, 55, 28, { kind: "spikes" }),
      h(4805, 610, 40, 120, { kind: "laser", axis: "y", range: 100, speed: 2.1 })
    ],
    enemies: [
      e("drone", 1150, 760, { patrolMin: 1040, patrolMax: 1430, amplitude: 34, cooldown: 1.35 }),
      e("walker", 1910, 890, { patrolMin: 1870, patrolMax: 2120, cooldown: 1.25 }),
      e("turret", 2830, 582, { cooldown: 1.0 }),
      e("drone", 3470, 780, { patrolMin: 3380, patrolMax: 3570, amplitude: 20, cooldown: 1.1 }),
      e("walker", 3700, 890, { patrolMin: 3680, patrolMax: 3930, cooldown: 1.15 }),
      e("turret", 4650, 602, { cooldown: 0.95 }),
      e("drone", 5170, 470, { patrolMin: 5090, patrolMax: 5320, amplitude: 20, cooldown: 1.0 })
    ],
    stations: [
      s(680, 960, "chinese", 4),
      s(2180, 910, "math", 4),
      s(4020, 820, "science", 4)
    ],
    checkpoints: [
      c(1850, 910),
      c(3650, 910)
    ]
  },
  {
    id: 9,
    name: "Final Academy Gauntlet",
    tagline: "A final-exam run that blends traversal, pressure, and a boss arena finish.",
    difficultyLabel: "Boss Run",
    width: 6200,
    height: 1240,
    timeTarget: 132,
    start: { x: 120, y: 940 },
    finish: { x: 6020, y: 440, w: 100, h: 130, lockedByBoss: true },
    palette: { skyTop: "#fffdf9", skyBottom: "#ffeede", hillA: "#ffe0cc", hillB: "#ffcaa8", accent: "#ff7b54" },
    platforms: [
      p(0, 1060, 780, 180),
      p(860, 970, 210, 28),
      p(1120, 880, 220, 28),
      p(1380, 790, 220, 28),
      p(1640, 900, 230, 28),
      p(1920, 1010, 330, 230),
      p(2300, 900, 230, 28),
      p(2580, 790, 230, 28),
      p(2860, 680, 240, 28),
      p(3160, 790, 240, 28),
      p(3460, 900, 250, 28),
      p(3770, 1010, 330, 230),
      p(4170, 880, 220, 28),
      p(4430, 760, 220, 28),
      p(4710, 650, 240, 28),
      p(5000, 760, 250, 28),
      p(5310, 880, 260, 28),
      p(5600, 760, 170, 28),
      p(5790, 640, 170, 28),
      p(5620, 1040, 580, 200),
      p(5800, 520, 360, 28)
    ],
    hazards: [
      h(790, 1060, 60, 28, { kind: "spikes" }),
      h(1590, 870, 45, 110, { kind: "laser", axis: "y", range: 120, speed: 2.1 }),
      h(2250, 1010, 50, 28, { kind: "spikes" }),
      h(3410, 870, 45, 110, { kind: "laser", axis: "y", range: 120, speed: 2.15 }),
      h(4110, 1010, 55, 28, { kind: "spikes" }),
      h(4960, 620, 45, 130, { kind: "laser", axis: "y", range: 120, speed: 2.2 }),
      h(5570, 880, 45, 120, { kind: "laser", axis: "y", range: 120, speed: 2.0 })
    ],
    enemies: [
      e("drone", 1210, 810, { patrolMin: 1080, patrolMax: 1510, amplitude: 28, cooldown: 1.3 }),
      e("walker", 1960, 950, { patrolMin: 1940, patrolMax: 2210, cooldown: 1.15 }),
      e("turret", 2920, 642, { cooldown: 0.95 }),
      e("drone", 3890, 930, { patrolMin: 3790, patrolMax: 4080, amplitude: 24, cooldown: 1.05 }),
      e("walker", 4720, 590, { patrolMin: 4710, patrolMax: 4940, cooldown: 1.0 }),
      e("boss", 5710, 950, { patrolMin: 5650, patrolMax: 6040, hp: 18, cooldown: 0.9 })
    ],
    stations: [
      s(700, 1000, "math", 4),
      s(2120, 950, "science", 4),
      s(3800, 960, "chinese", 5),
      s(5400, 840, "math", 5)
    ],
    checkpoints: [
      c(1920, 970),
      c(3770, 970),
      c(5620, 1000)
    ]
  }
];

window.LEVELS = LEVELS;
