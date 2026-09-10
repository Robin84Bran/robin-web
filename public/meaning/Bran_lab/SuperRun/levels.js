const p = (x, y, w, h, options = {}) => ({ x, y, w, h, ...options });
const h = (x, y, w, h, options = {}) => ({ x, y, w, h, ...options });
const enemy = (enemyId, x, y, options = {}) => ({ enemyId, x, y, ...options });
const powerup = (powerupId, x, y, options = {}) => ({ powerupId, x, y, ...options });
const star = (x, y, options = {}) => ({ x, y, ...options });
const station = (x, y, category, difficulty, reward, options = {}) => ({ x, y, category, difficulty, reward, ...options });
const checkpoint = (x, y, options = {}) => ({ x, y, ...options });

const LEVELS = [
  {
    id: 1,
    name: "Sunny Training Fields",
    visualIdentity: "Warm grass, toy-block hills, smiling clouds, and bright training banners.",
    dominantTerrain: ["Flat grass lanes", "Low starter blocks", "Short bridges"],
    mainEnemyTypes: ["crab"],
    hazardTypes: ["Puddles", "Soft spike buds"],
    featuredPowerUps: ["shield", "heart_restore", "extra_ammo"],
    gameplayPurpose: "Friendly tutorial-feel introduction to movement, shooting, stomping, and challenge stations.",
    width: 3200,
    height: 920,
    timeTarget: 72,
    rescueName: "Luma",
    palette: { skyTop: "#fefdfc", skyBottom: "#dff5ff", hillA: "#c9f0a6", hillB: "#8fd9ff", accent: "#ffcb4f", terrainTop: "#7fd36d", terrainSide: "#53b95a" },
    start: { x: 120, y: 640 },
    finish: { x: 3000, y: 620, w: 90, h: 120 },
    platforms: [
      p(0, 760, 900, 160),
      p(980, 760, 380, 160),
      p(1430, 700, 220, 220),
      p(1710, 760, 420, 160),
      p(2210, 760, 250, 160),
      p(2520, 690, 220, 230),
      p(2790, 760, 410, 160)
    ],
    hazards: [
      h(905, 760, 70, 24, { kind: "buds" }),
      h(2140, 760, 65, 24, { kind: "buds" })
    ],
    enemies: [
      enemy("crab", 1120, 726, { patrolMin: 1030, patrolMax: 1320 }),
      enemy("crab", 1820, 726, { patrolMin: 1740, patrolMax: 2050 }),
      enemy("crab", 2860, 726, { patrolMin: 2820, patrolMax: 3080 })
    ],
    powerups: [
      powerup("shield", 530, 690),
      powerup("extra_ammo", 1540, 640),
      powerup("heart_restore", 2580, 630)
    ],
    stars: [
      star(420, 680), star(470, 650), star(520, 620), star(1480, 630), star(2680, 610)
    ],
    stations: [
      station(700, 700, "math", 1, "shield"),
      station(2330, 700, "science", 1, "extra_ammo")
    ],
    checkpoints: [
      checkpoint(1620, 650),
      checkpoint(2600, 640)
    ]
  },
  {
    id: 2,
    name: "Blocky Hills",
    visualIdentity: "Chunky toy blocks, spring steps, and bright mystery towers.",
    dominantTerrain: ["Stepped blocks", "Floating blocks", "Light moving lanes"],
    mainEnemyTypes: ["crab", "hopper"],
    hazardTypes: ["Spike buds", "Rolling block sweep"],
    featuredPowerUps: ["jump_boost", "double_shot", "heart_restore"],
    gameplayPurpose: "Teach cleaner jumps, small enemy combinations, and optional pickups on high routes.",
    width: 3600,
    height: 980,
    timeTarget: 80,
    rescueName: "Luma",
    palette: { skyTop: "#fefefe", skyBottom: "#d9efff", hillA: "#ffdcb3", hillB: "#9fd3ff", accent: "#ff9f43", terrainTop: "#f0b851", terrainSide: "#d38d28" },
    start: { x: 120, y: 660 },
    finish: { x: 3400, y: 560, w: 90, h: 120 },
    platforms: [
      p(0, 780, 680, 200),
      p(780, 720, 220, 260),
      p(1060, 660, 220, 320),
      p(1340, 740, 300, 240),
      p(1710, 670, 220, 310),
      p(2010, 780, 420, 200),
      p(2510, 690, 220, 290),
      p(2790, 620, 220, 360),
      p(3090, 780, 510, 200)
    ],
    hazards: [
      h(690, 780, 80, 24, { kind: "buds" }),
      h(1650, 780, 60, 24, { kind: "buds" }),
      h(2440, 780, 70, 24, { kind: "buds" })
    ],
    enemies: [
      enemy("crab", 860, 686, { patrolMin: 800, patrolMax: 960 }),
      enemy("hopper", 1450, 704, { patrolMin: 1370, patrolMax: 1590 }),
      enemy("crab", 2130, 746, { patrolMin: 2050, patrolMax: 2370 }),
      enemy("hopper", 3180, 744, { patrolMin: 3140, patrolMax: 3470 })
    ],
    powerups: [
      powerup("jump_boost", 1140, 600),
      powerup("double_shot", 1780, 610),
      powerup("heart_restore", 2870, 560)
    ],
    stars: [
      star(900, 630), star(1130, 560), star(1780, 570), star(2590, 620), star(2880, 540), star(3230, 720)
    ],
    stations: [
      station(520, 720, "chinese", 1, "heart_restore"),
      station(2300, 740, "math", 2, "double_shot")
    ],
    checkpoints: [
      checkpoint(1370, 700),
      checkpoint(2810, 580)
    ]
  },
  {
    id: 3,
    name: "Crab Beach",
    visualIdentity: "Sunny shore, piers, shells, foam bridges, and sparkling sea colors.",
    dominantTerrain: ["Boardwalks", "Sand bars", "Pier jumps"],
    mainEnemyTypes: ["crab", "bee", "crabKing"],
    hazardTypes: ["Tide pools", "Shell spikes"],
    featuredPowerUps: ["double_shot", "magnet", "shield"],
    gameplayPurpose: "First big enemy showcase with beach crabs, flying pressure, and a readable mini boss.",
    width: 3950,
    height: 980,
    timeTarget: 88,
    rescueName: "Luma",
    palette: { skyTop: "#fdfefe", skyBottom: "#d7f6ff", hillA: "#ffe6b3", hillB: "#91dcff", accent: "#3ec2ff", terrainTop: "#f7d37e", terrainSide: "#dfa74c" },
    start: { x: 120, y: 700 },
    finish: { x: 3740, y: 590, w: 90, h: 120, lockedByBoss: true },
    platforms: [
      p(0, 800, 720, 180),
      p(820, 800, 320, 180),
      p(1220, 730, 220, 250),
      p(1510, 800, 420, 180),
      p(2000, 720, 240, 260),
      p(2310, 800, 520, 180),
      p(2890, 800, 480, 180),
      p(3430, 800, 520, 180)
    ],
    hazards: [
      h(730, 800, 90, 24, { kind: "tide" }),
      h(1920, 800, 80, 24, { kind: "shells" }),
      h(2830, 800, 60, 24, { kind: "tide" })
    ],
    enemies: [
      enemy("crab", 960, 766, { patrolMin: 860, patrolMax: 1100 }),
      enemy("bee", 1360, 620, { patrolMin: 1260, patrolMax: 1460 }),
      enemy("crab", 2460, 766, { patrolMin: 2370, patrolMax: 2780 }),
      enemy("crabKing", 3510, 730, { patrolMin: 3470, patrolMax: 3830 })
    ],
    powerups: [
      powerup("magnet", 1330, 670),
      powerup("double_shot", 2080, 660),
      powerup("shield", 3020, 740)
    ],
    stars: [
      star(620, 730), star(1310, 650), star(1370, 620), star(2100, 640), star(3040, 720), star(3320, 730)
    ],
    stations: [
      station(570, 740, "science", 2, "magnet"),
      station(2660, 740, "math", 2, "double_shot")
    ],
    checkpoints: [
      checkpoint(2010, 690),
      checkpoint(3040, 740)
    ]
  },
  {
    id: 4,
    name: "Whispering Forest",
    visualIdentity: "Bright mint trees, web lanterns, leaf platforms, and secret side branches.",
    dominantTerrain: ["Tree stumps", "Branch platforms", "Layered vertical routes"],
    mainEnemyTypes: ["spider", "hopper", "bee"],
    hazardTypes: ["Thorn sprouts", "Web drops"],
    featuredPowerUps: ["jump_boost", "glide", "freeze_blast"],
    gameplayPurpose: "Vertical forest route with more careful reading and optional secret climbs.",
    width: 4300,
    height: 1160,
    timeTarget: 94,
    rescueName: "Luma",
    palette: { skyTop: "#fafffd", skyBottom: "#daf7ee", hillA: "#c9efcf", hillB: "#b0e4f9", accent: "#49c987", terrainTop: "#7ed48e", terrainSide: "#4daf69" },
    start: { x: 120, y: 920 },
    finish: { x: 4050, y: 430, w: 90, h: 120 },
    platforms: [
      p(0, 1040, 760, 120),
      p(830, 950, 240, 28),
      p(1120, 850, 220, 28),
      p(1380, 750, 220, 28),
      p(1650, 850, 220, 28),
      p(1930, 940, 340, 220),
      p(2340, 820, 220, 28),
      p(2610, 710, 220, 28),
      p(2890, 600, 240, 28),
      p(3200, 700, 240, 28),
      p(3520, 590, 250, 28),
      p(3810, 480, 280, 180)
    ],
    hazards: [
      h(770, 1040, 50, 24, { kind: "thorns" }),
      h(1590, 730, 50, 120, { kind: "webdrop", axis: "y", range: 100, speed: 1.2 }),
      h(2550, 800, 50, 120, { kind: "webdrop", axis: "y", range: 120, speed: 1.3 })
    ],
    enemies: [
      enemy("spider", 1000, 620, { anchorY: 760, dropRange: 140 }),
      enemy("hopper", 2040, 904, { patrolMin: 1970, patrolMax: 2220 }),
      enemy("spider", 2700, 520, { anchorY: 650, dropRange: 160 }),
      enemy("bee", 3630, 500, { patrolMin: 3520, patrolMax: 3900 })
    ],
    powerups: [
      powerup("jump_boost", 1170, 790),
      powerup("freeze_blast", 2940, 540),
      powerup("glide", 3900, 420)
    ],
    stars: [
      star(890, 900), star(1200, 800), star(1440, 700), star(2400, 770), star(2960, 520), star(3920, 390)
    ],
    stations: [
      station(560, 980, "chinese", 2, "jump_boost"),
      station(2050, 900, "science", 3, "freeze_blast")
    ],
    checkpoints: [
      checkpoint(1970, 900),
      checkpoint(3210, 660)
    ]
  },
  {
    id: 5,
    name: "Stone Caves",
    visualIdentity: "Sunlit crystal caves, pale stone ruins, and bouncing echo chambers.",
    dominantTerrain: ["Narrow ledges", "Ruined blocks", "Low ceiling runs"],
    mainEnemyTypes: ["spider", "hopper", "shellback"],
    hazardTypes: ["Crystal spikes", "Drop pits"],
    featuredPowerUps: ["heart_restore", "slow_time", "extra_ammo"],
    gameplayPurpose: "Tighter platforming with recovery zones and stronger enemy layering.",
    width: 4600,
    height: 1120,
    timeTarget: 100,
    rescueName: "Luma",
    palette: { skyTop: "#fcfdfd", skyBottom: "#eef6ff", hillA: "#d9e6ef", hillB: "#b9d9ff", accent: "#9aa8ff", terrainTop: "#b9c7d7", terrainSide: "#8da0b2" },
    start: { x: 120, y: 860 },
    finish: { x: 4370, y: 450, w: 90, h: 120 },
    platforms: [
      p(0, 980, 720, 140),
      p(800, 900, 220, 28),
      p(1080, 810, 220, 28),
      p(1360, 720, 220, 28),
      p(1630, 850, 230, 28),
      p(1940, 980, 330, 140),
      p(2350, 880, 240, 28),
      p(2640, 780, 240, 28),
      p(2920, 680, 240, 28),
      p(3220, 790, 260, 28),
      p(3540, 900, 330, 220),
      p(3930, 760, 240, 28),
      p(4220, 640, 240, 28)
    ],
    hazards: [
      h(730, 980, 70, 24, { kind: "crystals" }),
      h(1880, 980, 60, 24, { kind: "crystals" }),
      h(3500, 900, 40, 120, { kind: "crystals", axis: "y", range: 90, speed: 1.4 })
    ],
    enemies: [
      enemy("hopper", 1180, 774, { patrolMin: 1110, patrolMax: 1260 }),
      enemy("spider", 1500, 580, { anchorY: 710, dropRange: 130 }),
      enemy("shellback", 2030, 938, { patrolMin: 1980, patrolMax: 2230 }),
      enemy("hopper", 3320, 754, { patrolMin: 3240, patrolMax: 3440 }),
      enemy("shellback", 4300, 598, { patrolMin: 4250, patrolMax: 4430 })
    ],
    powerups: [
      powerup("slow_time", 1430, 660),
      powerup("extra_ammo", 2420, 840),
      powerup("heart_restore", 3990, 720)
    ],
    stars: [
      star(840, 860), star(1120, 770), star(1440, 630), star(2430, 830), star(2990, 640), star(4020, 690)
    ],
    stations: [
      station(500, 920, "math", 3, "heart_restore"),
      station(3080, 640, "science", 3, "slow_time")
    ],
    checkpoints: [
      checkpoint(1960, 940),
      checkpoint(3580, 860)
    ]
  },
  {
    id: 6,
    name: "Slither Swamp",
    visualIdentity: "Bright teal marsh, giant leaves, lily bridges, and jewel-green pools.",
    dominantTerrain: ["Marsh stepping stones", "Leaf bridges", "Snake lanes"],
    mainEnemyTypes: ["snake", "bee", "snakeGuardian"],
    hazardTypes: ["Poison pools", "Reed spikes"],
    featuredPowerUps: ["shield", "freeze_blast", "revive_token"],
    gameplayPurpose: "Faster ground pressure and a readable snake boss without a giant difficulty spike.",
    width: 5000,
    height: 1080,
    timeTarget: 106,
    rescueName: "Luma",
    palette: { skyTop: "#fbfffe", skyBottom: "#dcfbf1", hillA: "#bfecc0", hillB: "#9de3da", accent: "#33d28e", terrainTop: "#66ce83", terrainSide: "#3ea35f" },
    start: { x: 120, y: 820 },
    finish: { x: 4770, y: 560, w: 90, h: 120, lockedByBoss: true },
    platforms: [
      p(0, 940, 740, 140),
      p(820, 860, 220, 28),
      p(1090, 760, 220, 28),
      p(1370, 860, 230, 28),
      p(1650, 940, 330, 140),
      p(2040, 830, 230, 28),
      p(2330, 730, 240, 28),
      p(2620, 830, 240, 28),
      p(2910, 940, 360, 140),
      p(3350, 820, 240, 28),
      p(3640, 710, 240, 28),
      p(3930, 820, 260, 28),
      p(4250, 940, 750, 140)
    ],
    hazards: [
      h(750, 940, 70, 24, { kind: "poison" }),
      h(1980, 940, 60, 24, { kind: "reeds" }),
      h(2840, 940, 70, 24, { kind: "poison" }),
      h(4190, 940, 60, 24, { kind: "reeds" })
    ],
    enemies: [
      enemy("snake", 920, 832, { patrolMin: 850, patrolMax: 1010 }),
      enemy("bee", 1180, 690, { patrolMin: 1110, patrolMax: 1290 }),
      enemy("snake", 2100, 802, { patrolMin: 2070, patrolMax: 2240 }),
      enemy("bee", 3720, 640, { patrolMin: 3660, patrolMax: 3870 }),
      enemy("snakeGuardian", 4470, 878, { patrolMin: 4350, patrolMax: 4870 })
    ],
    powerups: [
      powerup("freeze_blast", 1430, 800),
      powerup("shield", 3020, 880),
      powerup("revive_token", 4070, 780)
    ],
    stars: [
      star(870, 810), star(1130, 720), star(1410, 790), star(2410, 690), star(3390, 780), star(4080, 760)
    ],
    stations: [
      station(530, 880, "science", 3, "shield"),
      station(3070, 880, "chinese", 4, "freeze_blast")
    ],
    checkpoints: [
      checkpoint(1670, 900),
      checkpoint(3350, 780)
    ]
  },
  {
    id: 7,
    name: "Sky Bridges",
    visualIdentity: "Cloud planks, rainbow trims, sky sails, and floating toy towers.",
    dominantTerrain: ["Floating bridges", "High cloud platforms", "Gentle vertical climbs"],
    mainEnemyTypes: ["bee", "hopper", "spider"],
    hazardTypes: ["Cloud gaps", "Wind fans"],
    featuredPowerUps: ["glide", "jump_boost", "magnet"],
    gameplayPurpose: "Air control showcase where gliding and precise jumps shine.",
    width: 5300,
    height: 1180,
    timeTarget: 110,
    rescueName: "Luma",
    palette: { skyTop: "#ffffff", skyBottom: "#d8f0ff", hillA: "#ecf7ff", hillB: "#cce8ff", accent: "#7fcfff", terrainTop: "#ffffff", terrainSide: "#b9d9f2" },
    start: { x: 120, y: 960 },
    finish: { x: 5070, y: 380, w: 90, h: 120 },
    platforms: [
      p(0, 1080, 720, 100),
      p(800, 980, 220, 28),
      p(1070, 880, 220, 28),
      p(1340, 780, 220, 28),
      p(1600, 900, 220, 28),
      p(1880, 1010, 320, 170),
      p(2260, 880, 220, 28),
      p(2520, 770, 220, 28),
      p(2790, 660, 220, 28),
      p(3060, 770, 220, 28),
      p(3330, 890, 240, 28),
      p(3620, 1000, 320, 180),
      p(4010, 880, 220, 28),
      p(4280, 760, 220, 28),
      p(4550, 640, 220, 28),
      p(4820, 520, 260, 28),
      p(5080, 640, 220, 540)
    ],
    hazards: [
      h(730, 1080, 70, 24, { kind: "gust" }),
      h(2210, 1010, 50, 24, { kind: "gust" }),
      h(3960, 1000, 50, 24, { kind: "gust" })
    ],
    enemies: [
      enemy("bee", 1150, 820, { patrolMin: 1090, patrolMax: 1270 }),
      enemy("hopper", 1960, 974, { patrolMin: 1910, patrolMax: 2150 }),
      enemy("spider", 2860, 500, { anchorY: 640, dropRange: 140 }),
      enemy("bee", 4370, 700, { patrolMin: 4320, patrolMax: 4690 })
    ],
    powerups: [
      powerup("glide", 1100, 840),
      powerup("jump_boost", 2830, 620),
      powerup("magnet", 4860, 480)
    ],
    stars: [
      star(840, 940), star(1100, 820), star(1400, 740), star(2550, 730), star(2830, 620), star(4860, 450)
    ],
    stations: [
      station(620, 1020, "math", 4, "glide"),
      station(3700, 960, "science", 4, "jump_boost")
    ],
    checkpoints: [
      checkpoint(1900, 970),
      checkpoint(3630, 960)
    ]
  },
  {
    id: 8,
    name: "Castle Approach",
    visualIdentity: "Sun-bright stone walls, banners, training cannons, and golden gates.",
    dominantTerrain: ["Fort walls", "Battlements", "Trap corridors"],
    mainEnemyTypes: ["shellback", "bee", "spider"],
    hazardTypes: ["Torch flames", "Spike bars"],
    featuredPowerUps: ["slow_time", "double_shot", "heart_restore"],
    gameplayPurpose: "Sharper pressure with stronger enemies before the final rescue push.",
    width: 5600,
    height: 1180,
    timeTarget: 116,
    rescueName: "Luma",
    palette: { skyTop: "#fffefd", skyBottom: "#f0f5ff", hillA: "#ebe1d4", hillB: "#d2def8", accent: "#ffbf73", terrainTop: "#d6c4ae", terrainSide: "#aa9072" },
    start: { x: 120, y: 920 },
    finish: { x: 5380, y: 360, w: 90, h: 120 },
    platforms: [
      p(0, 1040, 760, 140),
      p(830, 960, 220, 28),
      p(1100, 860, 220, 28),
      p(1380, 760, 220, 28),
      p(1660, 860, 220, 28),
      p(1940, 1040, 340, 140),
      p(2350, 930, 220, 28),
      p(2610, 820, 220, 28),
      p(2890, 710, 240, 28),
      p(3180, 820, 240, 28),
      p(3460, 930, 260, 28),
      p(3780, 1040, 340, 140),
      p(4190, 920, 220, 28),
      p(4460, 800, 220, 28),
      p(4740, 680, 220, 28),
      p(5010, 560, 220, 28),
      p(5280, 440, 320, 740)
    ],
    hazards: [
      h(770, 1040, 60, 24, { kind: "flame" }),
      h(2280, 1040, 70, 24, { kind: "spikebar" }),
      h(4120, 1040, 70, 24, { kind: "flame" }),
      h(4970, 520, 40, 120, { kind: "spikebar", axis: "y", range: 100, speed: 1.5 })
    ],
    enemies: [
      enemy("shellback", 1200, 818, { patrolMin: 1130, patrolMax: 1290 }),
      enemy("bee", 2740, 760, { patrolMin: 2650, patrolMax: 3070 }),
      enemy("shellback", 3870, 998, { patrolMin: 3820, patrolMax: 4080 }),
      enemy("spider", 4550, 640, { anchorY: 780, dropRange: 120 })
    ],
    powerups: [
      powerup("slow_time", 1720, 820),
      powerup("double_shot", 3220, 780),
      powerup("heart_restore", 5060, 520)
    ],
    stars: [
      star(850, 930), star(1420, 720), star(1730, 800), star(2950, 670), star(3230, 760), star(5060, 490)
    ],
    stations: [
      station(600, 980, "chinese", 4, "heart_restore"),
      station(3530, 890, "math", 4, "double_shot")
    ],
    checkpoints: [
      checkpoint(1960, 1000),
      checkpoint(3800, 1000)
    ]
  },
  {
    id: 9,
    name: "Star Castle Rescue",
    visualIdentity: "Glowing star halls, soft crystal ramps, bright royal banners, and a triumphant rescue tower.",
    dominantTerrain: ["Castle ramps", "Final climb platforms", "Boss arena"],
    mainEnemyTypes: ["shellback", "bee", "starSentinel"],
    hazardTypes: ["Star sparks", "Royal spike bars"],
    featuredPowerUps: ["glide", "shield", "star_invincible"],
    gameplayPurpose: "Final test blending platforming, enemy pressure, challenge rewards, and a celebratory rescue finish.",
    width: 6200,
    height: 1260,
    timeTarget: 128,
    rescueName: "Luma",
    palette: { skyTop: "#fffefb", skyBottom: "#f8ebff", hillA: "#f5d8ff", hillB: "#d7e4ff", accent: "#ffd166", terrainTop: "#e6d3ff", terrainSide: "#b59fd9" },
    start: { x: 120, y: 980 },
    finish: { x: 5980, y: 340, w: 100, h: 130, lockedByBoss: true, rescue: true },
    platforms: [
      p(0, 1100, 780, 160),
      p(860, 1010, 220, 28),
      p(1130, 920, 220, 28),
      p(1400, 830, 220, 28),
      p(1680, 930, 220, 28),
      p(1960, 1100, 340, 160),
      p(2360, 980, 220, 28),
      p(2630, 870, 220, 28),
      p(2900, 760, 220, 28),
      p(3180, 870, 220, 28),
      p(3460, 980, 240, 28),
      p(3760, 1100, 360, 160),
      p(4180, 960, 220, 28),
      p(4450, 840, 220, 28),
      p(4730, 720, 220, 28),
      p(5010, 840, 220, 28),
      p(5300, 960, 220, 28),
      p(5590, 820, 200, 28),
      p(5810, 670, 200, 28),
      p(5740, 460, 460, 28),
      p(5600, 1100, 600, 160)
    ],
    hazards: [
      h(790, 1100, 70, 24, { kind: "spark" }),
      h(1890, 1100, 70, 24, { kind: "spark" }),
      h(3710, 1100, 50, 24, { kind: "spark" }),
      h(5550, 960, 40, 120, { kind: "spikebar", axis: "y", range: 90, speed: 1.5 })
    ],
    enemies: [
      enemy("bee", 1210, 880, { patrolMin: 1150, patrolMax: 1330 }),
      enemy("shellback", 2020, 1058, { patrolMin: 1990, patrolMax: 2240 }),
      enemy("bee", 3340, 820, { patrolMin: 3210, patrolMax: 3490 }),
      enemy("shellback", 4520, 798, { patrolMin: 4490, patrolMax: 4640 }),
      enemy("starSentinel", 5660, 1010, { patrolMin: 5640, patrolMax: 6070 })
    ],
    powerups: [
      powerup("shield", 1450, 790),
      powerup("glide", 2930, 720),
      powerup("star_invincible", 5060, 800)
    ],
    stars: [
      star(900, 980), star(1150, 880), star(1450, 780), star(2400, 940), star(2940, 720), star(5060, 770), star(5900, 420)
    ],
    stations: [
      station(560, 1040, "science", 4, "shield"),
      station(2510, 940, "math", 5, "glide"),
      station(5360, 920, "chinese", 5, "star_invincible")
    ],
    checkpoints: [
      checkpoint(1980, 1060),
      checkpoint(3780, 1060),
      checkpoint(5600, 1060)
    ]
  }
];

window.LEVELS = LEVELS;
