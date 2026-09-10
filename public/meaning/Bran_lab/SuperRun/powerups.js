const POWERUP_ROSTER = {
  jump_boost: {
    id: "jump_boost",
    name: "Jump Spring",
    visual: "Golden spring badge with a small cloud icon.",
    effect: "Jump higher for safer routes and secret platforms.",
    duration: 8,
    purpose: "Helps exploration, vertical recovery, and bonus path access.",
    rarity: "Common in vertical levels and secret side paths",
    kind: "timed",
    color: "#ffd166"
  },
  shield: {
    id: "shield",
    name: "Bubble Shield",
    visual: "Mint bubble orb with a tiny star sparkle.",
    effect: "Absorbs one hit.",
    duration: 0,
    purpose: "Makes the game fairer for younger players and supports risky runs.",
    rarity: "Common reward from challenge shrines",
    kind: "instant",
    color: "#2fc992"
  },
  double_shot: {
    id: "double_shot",
    name: "Twin Blaster",
    visual: "Blue crystal with two bright shot lines.",
    effect: "Bullets fire as a two-shot spread.",
    duration: 9,
    purpose: "Makes combat more satisfying without removing aim decisions.",
    rarity: "Uncommon combat reward",
    kind: "timed",
    color: "#38bdf8"
  },
  heart_restore: {
    id: "heart_restore",
    name: "Heart Berry",
    visual: "Red heart fruit with a leaf.",
    effect: "Restores lost health.",
    duration: 0,
    purpose: "Recovery and fairness between harder sections.",
    rarity: "Main path support pickup",
    kind: "instant",
    color: "#ff6b7f"
  },
  speed_boots: {
    id: "speed_boots",
    name: "Swift Boots",
    visual: "Orange sneaker icon with motion streaks.",
    effect: "Run faster for a short burst.",
    duration: 7,
    purpose: "Adds momentum to flat runs and fun chase sections.",
    rarity: "Occasional momentum reward",
    kind: "timed",
    color: "#ff9f43"
  },
  slow_time: {
    id: "slow_time",
    name: "Clock Bloom",
    visual: "Blue flower clock with soft glow.",
    effect: "Slows enemy and hazard motion briefly.",
    duration: 6,
    purpose: "Helps with dense danger and tricky timing sections.",
    rarity: "Rare support pickup in late levels",
    kind: "timed",
    color: "#6ea8ff"
  },
  magnet: {
    id: "magnet",
    name: "Star Magnet",
    visual: "U-shaped magnet with tiny star trails.",
    effect: "Pulls nearby stars and pickups toward the hero.",
    duration: 10,
    purpose: "Makes exploration rewards feel extra satisfying.",
    rarity: "Common in collectible-heavy worlds",
    kind: "timed",
    color: "#ff5fd2"
  },
  freeze_blast: {
    id: "freeze_blast",
    name: "Frost Pop",
    visual: "Ice crystal bubble with snow sparkles.",
    effect: "Shots freeze enemies on hit for a short time.",
    duration: 8,
    purpose: "Adds tactical combat variety without heavy complexity.",
    rarity: "Uncommon in enemy-heavy levels",
    kind: "timed",
    color: "#7ce4ff"
  },
  extra_ammo: {
    id: "extra_ammo",
    name: "Ammo Satchel",
    visual: "Bright yellow pouch with blaster sparks.",
    effect: "Instantly refills ammo.",
    duration: 0,
    purpose: "Emergency support so challenge stations are not the only lifeline.",
    rarity: "Main path safety pickup",
    kind: "instant",
    color: "#ffe066"
  },
  glide: {
    id: "glide",
    name: "Feather Cape",
    visual: "Soft white feather with sky-blue ribbon.",
    effect: "Slow fall for more air control.",
    duration: 10,
    purpose: "Makes sky routes and rescue jumps feel playful and safe.",
    rarity: "Featured in cloud and castle climbs",
    kind: "timed",
    color: "#f6fbff"
  },
  star_invincible: {
    id: "star_invincible",
    name: "Shine Star",
    visual: "Glowing five-point star with rainbow pulse.",
    effect: "Brief invincibility and enemy knock-through.",
    duration: 5,
    purpose: "Celebratory high-power moment used sparingly.",
    rarity: "Rare secret reward",
    kind: "timed",
    color: "#fff27a"
  },
  revive_token: {
    id: "revive_token",
    name: "Checkpoint Charm",
    visual: "Tiny charm ribbon with a heart seal.",
    effect: "Grants one extra life.",
    duration: 0,
    purpose: "Protects progress in later stages.",
    rarity: "Rare late-level support pickup",
    kind: "instant",
    color: "#c296ff"
  }
};

window.POWERUP_ROSTER = POWERUP_ROSTER;
