const TILE_SIZE = 35;
const GRID_SIZE = 15;
const MAX_HEARTS = 15;
const STORAGE_KEY = "branlab-learning-pacman";

const SPEED_PROFILES = {
  low: {
    label: "Low",
    playerMultiplier: 1.85,
    ghostMultiplier: 2.5,
    ghostBestChance: 0.22
  },
  medium: {
    label: "Medium",
    playerMultiplier: 1.55,
    ghostMultiplier: 2.05,
    ghostBestChance: 0.38
  },
  high: {
    label: "High",
    playerMultiplier: 1.25,
    ghostMultiplier: 1.7,
    ghostBestChance: 0.54
  }
};

const MAZES = {
  meadow: [
    "###############",
    "#P..o#...#o...#",
    "#o##.#.#.#.##o#",
    "#.#.........#.#",
    "#.#.##.#.##.#.#",
    "#...#.....#...#",
    "###.#.###.#.###",
    "#o..#G...G#..o#",
    "###.#.###.#.###",
    "#..o#.....#...#",
    "#.#.##.#.##.#.#",
    "#.#.........#.#",
    "#.##.#.#.#.##.#",
    "#...o#...#o...#",
    "###############"
  ],
  canyon: [
    "###############",
    "#P..o#...#o...#",
    "#o##.#.#.#.##o#",
    "#.#....#....#.#",
    "#.#.##.#.##.#.#",
    "#...#.....#...#",
    "###.#.###.#.###",
    "#o..#G...G#..o#",
    "###.#.###.#.###",
    "#..o#.....#...#",
    "#.#.##.#.##.#.#",
    "#.#....#....#.#",
    "#.##.#.#.#.##.#",
    "#...o#...#o...#",
    "###############"
  ],
  galaxy: [
    "###############",
    "#P..o#.....#o.#",
    "#o#..#.#.#.#.o#",
    "#.#....#....#.#",
    "#.#.##...##.#.#",
    "#...#..G..#...#",
    "#.#.#.###.#.#.#",
    "#o...........o#",
    "#.#.#.###.#.#.#",
    "#..o#..G..#...#",
    "#.#.##...##.#.#",
    "#.#....#....#.#",
    "#..#.#.#.#.#..#",
    "#o...#...#o...#",
    "###############"
  ]
};

function q(subject, prompt, choices, answer, explanation) {
  return { subject, prompt, choices, answer, explanation };
}

const QUESTION_SETS = [
  [
    q("Math", "What is 18 + 27?", ["35", "45", "55", "65"], 1, "18 + 27 = 45."),
    q("English", "Which word is the adjective in this sentence? The brave dog barked loudly.", ["dog", "brave", "barked", "loudly"], 1, "\"Brave\" describes the dog."),
    q("Chinese", "Which character means mountain?", ["水", "火", "山", "木"], 2, "\"山\" means mountain."),
    q("Science", "Which planet do we live on?", ["Mars", "Earth", "Venus", "Jupiter"], 1, "We live on Earth."),
    q("Math", "What is 9 x 6?", ["42", "48", "54", "63"], 2, "9 groups of 6 make 54."),
    q("Science", "Plants use sunlight, water, and air to make their own ____.", ["sound", "food", "shadow", "roots"], 1, "Plants make their own food.")
  ],
  [
    q("Math", "What is 84 - 29?", ["45", "55", "65", "75"], 1, "84 - 29 = 55."),
    q("English", "Which option is a complete sentence?", ["Under the bright moon", "My brother built a kite.", "Running to school", "The red backpack"], 1, "A complete sentence has a subject and a verb."),
    q("Chinese", "Which pinyin matches 学生?", ["xue sheng", "shui guo", "hao chi", "ri yue"], 0, "学生 is read xue sheng."),
    q("Science", "What happens when ice melts?", ["It becomes gas", "It becomes liquid water", "It disappears", "It becomes a rock"], 1, "Melting changes solid ice into liquid water."),
    q("Math", "What is 56 divided by 8?", ["6", "7", "8", "9"], 1, "56 / 8 = 7."),
    q("Science", "Why does the Moon look bright at night?", ["It makes its own light", "It reflects sunlight", "It is made of fire", "It glows from water"], 1, "The Moon reflects sunlight.")
  ],
  [
    q("Math", "What is the area of a rectangle that is 7 by 6?", ["13", "24", "36", "42"], 3, "Area = length x width, so 7 x 6 = 42."),
    q("English", "Which word is closest in meaning to rapid?", ["slow", "quick", "tiny", "smooth"], 1, "\"Quick\" is a synonym for rapid."),
    q("Chinese", "Which character means fire?", ["火", "土", "日", "口"], 0, "\"火\" means fire."),
    q("Science", "Which animal is a mammal?", ["Dolphin", "Shark", "Frog", "Lizard"], 0, "A dolphin is a mammal because it breathes air and nurses its young."),
    q("Math", "What is 3/4 of 20?", ["10", "12", "15", "18"], 2, "One fourth of 20 is 5, so three fourths is 15."),
    q("Science", "Which plant part carries water from the roots to the leaves?", ["Flower", "Stem", "Seed", "Fruit"], 1, "The stem helps move water through the plant.")
  ],
  [
    q("Math", "What is 125 + 278?", ["393", "403", "413", "423"], 1, "125 + 278 = 403."),
    q("English", "Which word is the conjunction? I was tired, so I slept early.", ["tired", "so", "slept", "early"], 1, "\"So\" connects the two ideas."),
    q("Chinese", "Which measure word fits this phrase? 一___书", ["只", "条", "本", "朵"], 2, "We say 一本书."),
    q("Science", "What force pulls us toward Earth?", ["Magnetism", "Gravity", "Electricity", "Sound"], 1, "Gravity pulls objects toward Earth."),
    q("Math", "What is 144 divided by 12?", ["10", "11", "12", "13"], 2, "144 / 12 = 12."),
    q("Science", "Which energy source is renewable?", ["Coal", "Oil", "Wind", "Natural gas"], 2, "Wind is a renewable energy source.")
  ],
  [
    q("Math", "What is the perimeter of a rectangle with sides 8 and 5?", ["13", "20", "26", "40"], 2, "8 + 5 + 8 + 5 = 26."),
    q("English", "Which word is an antonym of ancient?", ["dusty", "modern", "quiet", "rough"], 1, "\"Modern\" means the opposite of ancient."),
    q("Chinese", "What does 朋友 mean?", ["teacher", "friend", "family", "school"], 1, "朋友 means friend."),
    q("Science", "What is evaporation?", ["A gas turning to liquid", "A solid turning to liquid", "A liquid turning to gas", "A gas turning to solid"], 2, "Evaporation is when a liquid changes into a gas."),
    q("Math", "What is 2.5 + 1.7?", ["3.2", "4.0", "4.2", "4.7"], 2, "2.5 + 1.7 = 4.2."),
    q("Science", "In a food chain, what does a consumer do?", ["Makes sunlight", "Eats plants or animals", "Turns into soil", "Creates water"], 1, "A consumer gets energy by eating other living things.")
  ],
  [
    q("Math", "What is 3/5 + 1/5?", ["4/10", "2/5", "4/5", "1"], 2, "Add the numerators because the denominators match."),
    q("English", "Which word is a possessive pronoun?", ["hers", "her", "she", "herself"], 0, "\"Hers\" shows ownership by itself."),
    q("Chinese", "Which pinyin matches 中国?", ["zhong guo", "xiao niao", "sheng ri", "mei guo"], 0, "中国 is read zhong guo."),
    q("Science", "When salt disappears in water, the mixture is called a ____.", ["magnet", "solution", "shadow", "crystal"], 1, "Salt water is a solution."),
    q("Math", "What is 96 divided by 6, then plus 8?", ["20", "22", "24", "26"], 2, "96 / 6 = 16, and 16 + 8 = 24."),
    q("Science", "Which organ pumps blood through the body?", ["Lungs", "Stomach", "Heart", "Brain"], 2, "The heart pumps blood.")
  ],
  [
    q("Math", "What is the average of 6, 8, and 10?", ["7", "8", "9", "10"], 1, "6 + 8 + 10 = 24, and 24 / 3 = 8."),
    q("English", "Which sentence is a simile?", ["The stars twinkled.", "The baby slept.", "She was as quiet as a mouse.", "The car moved."], 2, "\"As quiet as a mouse\" compares using as."),
    q("Chinese", "Which sentence means \"I like reading books\"?", ["我喜欢看书。", "我今天九岁。", "他在跑步。", "我们去学校。"], 0, "我喜欢看书 means I like reading books."),
    q("Science", "Which simple machine is a ramp?", ["Lever", "Pulley", "Inclined plane", "Wheel and axle"], 2, "A ramp is an inclined plane."),
    q("Math", "Which fraction is equal to 0.75?", ["1/2", "2/3", "3/4", "4/5"], 2, "0.75 is the same as 3/4."),
    q("Science", "During photosynthesis, plants use sunlight to make ____.", ["sugar", "rocks", "sound", "metal"], 0, "Plants make sugar during photosynthesis.")
  ],
  [
    q("Math", "What is 432 - 178?", ["244", "254", "264", "274"], 1, "432 - 178 = 254."),
    q("English", "What does the prefix un- usually mean?", ["again", "not", "before", "small"], 1, "The prefix un- often means not."),
    q("Chinese", "Which character is a verb?", ["跑", "书", "山", "水"], 0, "\"跑\" means to run, so it is a verb."),
    q("Science", "What is condensation?", ["Liquid to gas", "Solid to gas", "Gas to liquid", "Liquid to solid"], 2, "Condensation happens when gas cools into liquid."),
    q("Math", "What is 15 x 9?", ["115", "125", "135", "145"], 2, "15 x 9 = 135."),
    q("Science", "Which animal is an omnivore?", ["Cow", "Lion", "Bear", "Deer"], 2, "A bear can eat plants and animals.")
  ],
  [
    q("Math", "What is 18 x 7 - 24?", ["92", "102", "112", "122"], 1, "18 x 7 = 126, and 126 - 24 = 102."),
    q("English", "Which sentence uses commas correctly?", ["After dinner we played cards and laughed.", "After dinner, we played cards and laughed.", "After dinner we, played cards and laughed.", "After, dinner we played cards and laughed."], 1, "A comma belongs after the opening phrase."),
    q("Chinese", "Which radical often appears in words about water?", ["口", "木", "氵", "火"], 2, "The water radical is 氵."),
    q("Science", "In the food chain Sun -> plant -> rabbit -> fox, the rabbit gets energy from the ____.", ["Sun", "plant", "fox", "soil"], 1, "The rabbit eats the plant."),
    q("Math", "What is 4/8 + 3/8?", ["7/16", "6/8", "7/8", "1"], 2, "Add the numerators: 4/8 + 3/8 = 7/8."),
    q("Science", "Which change is a chemical change?", ["Ice melting", "Paper tearing", "Rust forming", "Water boiling"], 2, "Rust forming makes a new substance, so it is a chemical change.")
  ]
];

const BONUS_QUESTION_SETS = [
  [
    q("English", "What is the plural of mouse?", ["mouses", "mices", "mice", "mouse"], 2, "The plural of mouse is mice."),
    q("Chinese", "Which character means big?", ["大", "小", "人", "月"], 0, "\"大\" means big."),
    q("Science", "Which body part helps you breathe?", ["Lungs", "Teeth", "Bones", "Hair"], 0, "Your lungs help you breathe.")
  ],
  [
    q("Math", "What is 7 x 8?", ["48", "54", "56", "64"], 2, "7 x 8 = 56."),
    q("Chinese", "What does 星期一 mean?", ["Friday", "Monday", "Sunday", "Tuesday"], 1, "星期一 means Monday."),
    q("Science", "What do bees collect from flowers?", ["Rocks", "Nectar", "Sand", "Snow"], 1, "Bees collect nectar from flowers.")
  ],
  [
    q("English", "Which word is the verb? Birds glide above the lake.", ["Birds", "glide", "above", "lake"], 1, "\"Glide\" is the action word."),
    q("Chinese", "Which word means school?", ["学校", "苹果", "老师", "蓝色"], 0, "学校 means school."),
    q("Science", "What stage comes after a caterpillar in a butterfly life cycle?", ["Egg", "Pupa", "Leaf", "Wing"], 1, "A caterpillar becomes a pupa before turning into a butterfly.")
  ],
  [
    q("Math", "What is 3/4 + 1/4?", ["1/2", "1", "5/4", "2"], 1, "3/4 + 1/4 = 1 whole."),
    q("Chinese", "Which word means sun?", ["月亮", "星星", "太阳", "天空"], 2, "太阳 means sun."),
    q("Science", "Which planet is famous for its rings?", ["Saturn", "Mercury", "Earth", "Mars"], 0, "Saturn is known for its rings.")
  ],
  [
    q("English", "Which word is spelled correctly?", ["temprature", "temperature", "tempereture", "temperture"], 1, "\"Temperature\" is the correct spelling."),
    q("Chinese", "Which measure word fits this phrase? 一___鱼", ["本", "条", "朵", "双"], 1, "We say 一条鱼."),
    q("Science", "What is the name of the process plants use to make food?", ["Condensation", "Photosynthesis", "Evaporation", "Digestion"], 1, "Plants make food through photosynthesis.")
  ],
  [
    q("Math", "What is 1.2 + 0.9?", ["1.9", "2.0", "2.1", "2.2"], 2, "1.2 + 0.9 = 2.1."),
    q("Chinese", "Which sentence means \"The cat is sleeping\"?", ["猫在睡觉。", "狗在跑步。", "我喜欢米饭。", "今天下雨了。"], 0, "猫在睡觉 means The cat is sleeping."),
    q("Science", "Which material is the best conductor of electricity?", ["Rubber", "Metal", "Plastic", "Wood"], 1, "Metal is a good conductor.")
  ],
  [
    q("English", "What does the prefix re- usually mean?", ["under", "again", "small", "not"], 1, "The prefix re- often means again."),
    q("Chinese", "What does 快乐 mean?", ["angry", "happy", "hungry", "cold"], 1, "快乐 means happy."),
    q("Science", "Which organs help clean the blood?", ["Kidneys", "Eyes", "Ears", "Skin"], 0, "The kidneys help clean the blood.")
  ],
  [
    q("Math", "What is 64 divided by 8, then plus 17?", ["23", "24", "25", "26"], 2, "64 / 8 = 8, and 8 + 17 = 25."),
    q("Chinese", "Which radical often appears in words about trees or wood?", ["氵", "口", "木", "火"], 2, "The wood radical is 木."),
    q("Science", "Which trait is inherited from parents?", ["Favorite song", "Eye color", "Best friend", "Homework"], 1, "Eye color can be inherited.")
  ],
  [
    q("English", "Which word is an adverb?", ["careful", "carefully", "care", "careless"], 1, "\"Carefully\" tells how something is done."),
    q("Chinese", "Which word means experiment?", ["实验", "操场", "图书馆", "铅笔"], 0, "实验 means experiment."),
    q("Science", "Which gas do plants release during photosynthesis?", ["Oxygen", "Helium", "Nitrogen", "Steam"], 0, "Plants release oxygen during photosynthesis.")
  ]
];

const LEVEL_CONFIGS = [
  { id: 1, name: "Sunny Start", maze: "meadow", ghostCount: 1, ghostStepMs: 345, playerStepMs: 225, powerSeconds: 7.5, description: "A warm-up maze with gentler turns and one ghost." },
  { id: 2, name: "Hallway Hop", maze: "meadow", ghostCount: 2, ghostStepMs: 332, playerStepMs: 220, powerSeconds: 7.2, description: "A second ghost joins in, but the pace still stays friendly." },
  { id: 3, name: "Snack Sprint", maze: "meadow", ghostCount: 2, ghostStepMs: 320, playerStepMs: 214, powerSeconds: 6.9, description: "The chase speeds up a little while the questions get sharper." },
  { id: 4, name: "Word Maze", maze: "canyon", ghostCount: 2, ghostStepMs: 305, playerStepMs: 210, powerSeconds: 6.6, description: "Tighter corridors ask for better timing and cleaner turns." },
  { id: 5, name: "Fraction Dash", maze: "canyon", ghostCount: 3, ghostStepMs: 292, playerStepMs: 206, powerSeconds: 6.2, description: "Three ghosts roam the maze, so use the question-dots wisely." },
  { id: 6, name: "Brainy Bend", maze: "canyon", ghostCount: 3, ghostStepMs: 280, playerStepMs: 202, powerSeconds: 5.8, description: "The maze keeps pressure on while the subjects get harder." },
  { id: 7, name: "Lightning Loop", maze: "galaxy", ghostCount: 3, ghostStepMs: 268, playerStepMs: 198, powerSeconds: 5.4, description: "Longer paths and wider loops create trickier chase patterns." },
  { id: 8, name: "Challenge Chase", maze: "galaxy", ghostCount: 4, ghostStepMs: 255, playerStepMs: 194, powerSeconds: 5.1, description: "Four ghosts and tougher questions make this a real challenge." },
  { id: 9, name: "Super Scholar", maze: "galaxy", ghostCount: 4, ghostStepMs: 244, playerStepMs: 190, powerSeconds: 4.8, description: "The fastest maze with the trickiest mix of school skills." }
];

const LEVELS = LEVEL_CONFIGS.map((config, index) => ({
  ...config,
  questions: [...QUESTION_SETS[index], ...BONUS_QUESTION_SETS[index]]
}));

const directions = {
  up: { row: -1, col: 0 },
  down: { row: 1, col: 0 },
  left: { row: 0, col: -1 },
  right: { row: 0, col: 1 }
};

const oppositeDirection = {
  up: "down",
  down: "up",
  left: "right",
  right: "left"
};

const ghostColors = ["#ff5f76", "#4fd1ff", "#ff9f43", "#bf8cff"];

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const view3d = window.Bran3D?.create(canvas, "maze");
const modal = document.getElementById("modal");
const modalTag = document.getElementById("modalTag");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalChoices = document.getElementById("modalChoices");
const modalPrimary = document.getElementById("modalPrimary");
const modalSecondary = document.getElementById("modalSecondary");
const banner = document.getElementById("banner");
const levelRoad = document.getElementById("levelRoad");
const difficultyCard = document.getElementById("difficultyCard");
const levelLabel = document.getElementById("levelLabel");
const scoreLabel = document.getElementById("scoreLabel");
const pelletLabel = document.getElementById("pelletLabel");
const powerLabel = document.getElementById("powerLabel");
const hearts = document.getElementById("hearts");
const questionSummary = document.getElementById("questionSummary");
const questionTracker = document.getElementById("questionTracker");
const parentPanel = document.getElementById("parentPanel");
const answerKey = document.getElementById("answerKey");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const restartButton = document.getElementById("restartButton");
const parentModeToggle = document.getElementById("parentModeToggle");
const themeToggle = document.getElementById("themeToggle");
const speedSelect = document.getElementById("speedSelect");

const state = {
  currentLevelIndex: 0,
  unlockedLevel: 1,
  completedLevels: [],
  score: 0,
  parentMode: false,
  speedMode: "low",
  speedCustomized: false,
  themeMode: "dark",
  status: "ready",
  overlayLocked: true,
  levelState: null,
  lastFrame: 0,
  playerClock: 0,
  ghostClock: 0,
  pendingDirection: "right",
  activeQuestionIndex: -1,
  activeQuestionAwardsPower: false,
  messageTimeout: null
};

function loadStoredState() {
  let raw;
  try { raw = localStorage.getItem(STORAGE_KEY); } catch { return; }
  if (!raw) {
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    state.unlockedLevel = Math.min(Math.max(parsed.unlockedLevel || 1, 1), LEVELS.length);
    state.completedLevels = Array.isArray(parsed.completedLevels) ? parsed.completedLevels : [];
    state.parentMode = Boolean(parsed.parentMode);
    state.speedCustomized = Boolean(parsed.speedCustomized);
    state.speedMode = state.speedCustomized && SPEED_PROFILES[parsed.speedMode] ? parsed.speedMode : "low";
    state.themeMode = parsed.themeMode === "light" ? "light" : "dark";
    const maxUnlockedIndex = Math.max(0, state.unlockedLevel - 1);
    const requestedLevel = Number.isInteger(parsed.currentLevelIndex) ? parsed.currentLevelIndex : 0;
    state.currentLevelIndex = Math.min(Math.max(requestedLevel, 0), maxUnlockedIndex);
  } catch (error) {
    console.warn("Could not load save data.", error);
  }
}

function storeState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({
    currentLevelIndex: state.currentLevelIndex,
    unlockedLevel: state.unlockedLevel,
    completedLevels: state.completedLevels,
    parentMode: state.parentMode,
    speedMode: state.speedMode,
    speedCustomized: state.speedCustomized,
    themeMode: state.themeMode
  })); } catch { /* Play is available without storage. */ }
}

function cloneMaze(mazeName) {
  return MAZES[mazeName].map((row) => row.split(""));
}

function isWall(grid, row, col) {
  return !grid[row] || grid[row][col] === undefined || grid[row][col] === "#";
}

function currentSpeedProfile() {
  return SPEED_PROFILES[state.speedMode] || SPEED_PROFILES.low;
}

function currentPlayerStepMs() {
  const level = LEVELS[state.currentLevelIndex];
  return level.playerStepMs * currentSpeedProfile().playerMultiplier;
}

function currentGhostStepMs() {
  const level = LEVELS[state.currentLevelIndex];
  return level.ghostStepMs * currentSpeedProfile().ghostMultiplier;
}

function currentPowerSeconds() {
  const level = LEVELS[state.currentLevelIndex];
  const bonus = state.speedMode === "low" ? 0.5 : state.speedMode === "medium" ? 0.2 : 0;
  return level.powerSeconds + bonus;
}

function applyTheme() {
  document.body.dataset.theme = state.themeMode;
}

function createLevelState(levelIndex) {
  const level = LEVELS[levelIndex];
  const grid = cloneMaze(level.maze);
  const ghostStarts = [];
  let playerStart = { row: 1, col: 1 };
  let pelletsTotal = 0;
  let questionDotsTotal = 0;

  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell === "P") {
        playerStart = { row: rowIndex, col: colIndex };
        grid[rowIndex][colIndex] = " ";
      }
      if (cell === "G") {
        ghostStarts.push({ row: rowIndex, col: colIndex });
        grid[rowIndex][colIndex] = " ";
      }
      if (cell === "." || cell === "o") {
        pelletsTotal += 1;
      }
      if (cell === "o") {
        questionDotsTotal += 1;
      }
    });
  });

  while (ghostStarts.length < level.ghostCount) {
    ghostStarts.push(ghostStarts[0] || { row: 7, col: 7 });
  }

  if (questionDotsTotal !== level.questions.length) {
    console.warn("Question dots do not match question count for level", level.id);
  }

  return {
    levelIndex,
    grid,
    pelletsTotal,
    pelletsCollected: 0,
    player: {
      ...playerStart,
      direction: "right"
    },
    playerStart,
    ghosts: ghostStarts.slice(0, level.ghostCount).map((start, index) => ({
      row: start.row,
      col: start.col,
      startRow: start.row,
      startCol: start.col,
      direction: index % 2 === 0 ? "left" : "right",
      color: ghostColors[index % ghostColors.length]
    })),
    questions: level.questions.map((question) => ({
      ...question,
      asked: false,
      correct: null
    })),
    heartsLeft: MAX_HEARTS,
    powerSecondsLeft: 0,
    completed: false
  };
}

function movePosition(position, direction) {
  const vector = directions[direction];
  return {
    row: position.row + vector.row,
    col: position.col + vector.col
  };
}

function canMove(grid, position, direction) {
  const next = movePosition(position, direction);
  return !isWall(grid, next.row, next.col);
}

function showBanner(message) {
  banner.textContent = message;
  banner.classList.add("visible");
  window.clearTimeout(state.messageTimeout);
  state.messageTimeout = window.setTimeout(() => {
    banner.classList.remove("visible");
  }, 2200);
}

function updateHearts() {
  hearts.innerHTML = Array.from({ length: MAX_HEARTS }, (_, index) => {
    const empty = index >= state.levelState.heartsLeft ? "empty" : "";
    return `<span class="heart ${empty}" aria-hidden="true">&#10084;</span>`;
  }).join("");
}

function updateQuestionTracker() {
  const levelState = state.levelState;
  const solvedCount = levelState.questions.filter((question) => question.correct === true).length;
  questionSummary.textContent = `${solvedCount} / ${levelState.questions.length} solved`;

  questionTracker.innerHTML = levelState.questions.map((question, index) => {
    let statusClass = "pending";
    let statusText = "Waiting at a big dot";

    if (question.correct === true) {
      statusClass = "done";
      statusText = "Solved and powered up";
    } else if (question.correct === false) {
      statusClass = "missed";
      statusText = "Tried already";
    }

    return `
      <article class="question-card ${statusClass}">
        <strong>Question ${index + 1} · ${question.subject}</strong>
        <div>${question.prompt}</div>
        <small>${statusText}</small>
      </article>
    `;
  }).join("");

  parentPanel.hidden = !state.parentMode;
  answerKey.innerHTML = levelState.questions.map((question, index) => `
    <article class="answer-card">
      <strong>Question ${index + 1}</strong>
      <div>${question.prompt}</div>
      <small>Answer: ${question.choices[question.answer]} · ${question.explanation}</small>
    </article>
  `).join("");
}

function renderLevelRoad() {
  levelRoad.innerHTML = LEVELS.map((level, index) => {
    const locked = !state.parentMode && index + 1 > state.unlockedLevel;
    const current = index === state.currentLevelIndex;
    const completed = state.completedLevels.includes(level.id);

    return `
      <button
        class="level-button ${locked ? "locked" : ""} ${current ? "current" : ""} ${completed ? "complete" : ""}"
        data-level-index="${index}"
        ${locked ? "disabled" : ""}
      >
        <span>
          Level ${level.id}: ${level.name}
          <small>${level.description}</small>
        </span>
        <span>${completed ? "Done" : current ? "Now" : locked ? "Lock" : "Play"}</span>
      </button>
    `;
  }).join("");
}

function renderStaticUi() {
  const level = LEVELS[state.currentLevelIndex];
  const levelState = state.levelState;

  levelLabel.textContent = String(level.id);
  scoreLabel.textContent = String(state.score);
  pelletLabel.textContent = `${levelState.pelletsCollected}/${levelState.pelletsTotal}`;
  powerLabel.textContent = levelState.powerSecondsLeft > 0
    ? `Power ${levelState.powerSecondsLeft.toFixed(1)}s`
    : "Answer a big dot to power up";

  updateHearts();
  updateQuestionTracker();
  renderLevelRoad();

  difficultyCard.innerHTML = `
    <h3>${level.name}</h3>
    <p>${level.description}</p>
    <p>${level.ghostCount} ghost${level.ghostCount > 1 ? "s" : ""} · Speed ${currentSpeedProfile().label} · ${level.questions.length} question-dots</p>
  `;
}

function closeModal() {
  document.querySelector(".page-shell").inert = false;
  document.querySelector(".arcade-nav")?.removeAttribute("inert");
  modal.classList.add("hidden");
  state.overlayLocked = false;
}

function showModal({
  tag,
  title,
  body,
  choices = [],
  primaryLabel = "Continue",
  secondaryLabel = "",
  onPrimary = null,
  onSecondary = null
}) {
  modalTag.textContent = tag;
  modalTitle.textContent = title;
  modalBody.textContent = body;
  modalChoices.innerHTML = "";
  modal.classList.remove("hidden");
  document.querySelector(".page-shell").inert = true;
  document.querySelector(".arcade-nav")?.setAttribute("inert", "");
  state.overlayLocked = true;

  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-button";
    button.textContent = choice.label;
    button.addEventListener("click", choice.onSelect);
    modalChoices.appendChild(button);
  });

  modalPrimary.textContent = primaryLabel;
  modalPrimary.disabled = choices.length > 0;
  modalPrimary.onclick = () => {
    if (onPrimary) {
      onPrimary();
    } else {
      closeModal();
    }
  };

  if (secondaryLabel) {
    modalSecondary.classList.remove("hidden");
    modalSecondary.textContent = secondaryLabel;
    modalSecondary.onclick = () => {
      if (onSecondary) {
        onSecondary();
      } else {
        closeModal();
      }
    };
  } else {
    modalSecondary.classList.add("hidden");
    modalSecondary.onclick = null;
  }
  requestAnimationFrame(() => modal.querySelector("button:not(:disabled):not(.hidden)")?.focus());
}

function startLevel(levelIndex, resetScore = false) {
  if (!state.parentMode && levelIndex + 1 > state.unlockedLevel) {
    showBanner("Finish the earlier levels first.");
    return;
  }

  state.currentLevelIndex = levelIndex;
  if (resetScore) {
    state.score = 0;
  }

  state.levelState = createLevelState(levelIndex);
  state.status = "playing";
  state.overlayLocked = false;
  state.lastFrame = 0;
  state.playerClock = 0;
  state.ghostClock = 0;
  state.pendingDirection = "right";
  state.activeQuestionIndex = -1;
  state.activeQuestionAwardsPower = false;
  pauseButton.textContent = "Pause";
  storeState();
  renderStaticUi();
  showBanner(`Level ${levelIndex + 1}: ${LEVELS[levelIndex].name}`);
}

function resetLevel() {
  startLevel(state.currentLevelIndex, false);
}

function pauseGame() {
  if (state.status !== "playing") {
    return;
  }
  state.status = "paused";
  pauseButton.textContent = "Resume";
  showBanner("Game paused");
}

function resumeGame() {
  if (state.status !== "paused") {
    return;
  }
  state.status = "playing";
  pauseButton.textContent = "Pause";
  showBanner("Back in the maze");
}

function loseHeart(reason) {
  const levelState = state.levelState;
  levelState.heartsLeft -= 1;
  updateHearts();

  if (levelState.heartsLeft <= 0) {
    state.status = "gameover";
    showModal({
      tag: "Try Again",
      title: "Out Of Hearts",
      body: `The ${reason} cost your last heart. Restart the level and give it another go.`,
      primaryLabel: "Restart Level",
      secondaryLabel: "Close",
      onPrimary: () => {
        closeModal();
        resetLevel();
      },
      onSecondary: () => {
        closeModal();
      }
    });
    return true;
  }

  const player = levelState.player;
  player.row = levelState.playerStart.row;
  player.col = levelState.playerStart.col;
  player.direction = "right";
  state.pendingDirection = "right";

  levelState.ghosts.forEach((ghost) => {
    ghost.row = ghost.startRow;
    ghost.col = ghost.startCol;
  });

  showBanner(`${levelState.heartsLeft} hearts left.`);
  return false;
}

function nextQuestionIndex() {
  return state.levelState.questions.findIndex((question) => !question.asked);
}

function askNextQuestion(awardsPower) {
  const questionIndex = nextQuestionIndex();
  if (questionIndex === -1) {
    return false;
  }

  const question = state.levelState.questions[questionIndex];
  question.asked = true;
  state.activeQuestionIndex = questionIndex;
  state.activeQuestionAwardsPower = awardsPower;
  state.status = "question";

  const choices = question.choices.map((choice, choiceIndex) => ({
    label: choice,
    onSelect: () => handleQuestionAnswer(choiceIndex)
  }));

  if (state.parentMode) {
    choices.push({
      label: "Parent skip: mark correct",
      onSelect: () => handleQuestionAnswer(question.answer, true)
    });
  }

  showModal({
    tag: `${question.subject} Power Dot`,
    title: `Question ${questionIndex + 1}`,
    body: state.parentMode
      ? `${question.prompt} Answer key: ${question.choices[question.answer]}.`
      : question.prompt,
    choices,
    primaryLabel: "Choose An Answer"
  });

  return true;
}

function handleQuestionAnswer(choiceIndex, forcedCorrect = false) {
  const question = state.levelState.questions[state.activeQuestionIndex];
  const correct = forcedCorrect || choiceIndex === question.answer;
  if (!correct) {
    modalBody.textContent = `${question.explanation} Try again — your hearts are safe.`;
    const buttons = modalChoices.querySelectorAll('button');
    buttons[choiceIndex]?.setAttribute('disabled', '');
    buttons[question.answer]?.focus();
    return;
  }
  question.correct = correct;

  if (correct) {
    state.score += 150;
    if (state.activeQuestionAwardsPower) {
      state.levelState.powerSecondsLeft = currentPowerSeconds();
    }
    scoreLabel.textContent = String(state.score);
  } else if (loseHeart("wrong answer")) {
    renderStaticUi();
    return;
  }

  renderStaticUi();
  closeModal();

  const powerText = correct && state.activeQuestionAwardsPower
    ? ` Power-up ready for ${state.levelState.powerSecondsLeft.toFixed(1)} seconds.`
    : "";
  const feedback = correct
    ? `Correct! ${question.explanation}${powerText}`
    : `The correct answer was "${question.choices[question.answer]}". ${question.explanation}`;

  showModal({
    tag: correct ? "Nice Work" : "Learning Moment",
    title: correct ? "You Powered Up" : "Keep Learning",
    body: feedback,
    primaryLabel: "Continue",
    onPrimary: () => {
      closeModal();
      if (state.status !== "gameover") {
        state.status = "playing";
        checkForLevelComplete();
      }
    }
  });
}

function collectCell(cell) {
  if (cell === ".") {
    state.score += 10;
    state.levelState.pelletsCollected += 1;
    return;
  }

  if (cell === "o") {
    state.score += 25;
    state.levelState.pelletsCollected += 1;
    showBanner("Question-dot found.");
    askNextQuestion(true);
  }
}

function checkGhostCollision() {
  const levelState = state.levelState;
  for (const ghost of levelState.ghosts) {
    if (ghost.row === levelState.player.row && ghost.col === levelState.player.col) {
      if (levelState.powerSecondsLeft > 0) {
        state.score += 200;
        ghost.row = ghost.startRow;
        ghost.col = ghost.startCol;
        scoreLabel.textContent = String(state.score);
        showBanner("Ghost gobbled up.");
      } else if (state.status === "playing") {
        loseHeart("ghost bump");
      }
      break;
    }
  }
}

function availableMoves(position, currentDirection) {
  return Object.keys(directions).filter((direction) => {
    if (!canMove(state.levelState.grid, position, direction)) {
      return false;
    }

    if (oppositeDirection[currentDirection] === direction) {
      const alternatives = Object.keys(directions).filter((candidate) => {
        return candidate !== direction && canMove(state.levelState.grid, position, candidate);
      });
      return alternatives.length === 0;
    }

    return true;
  });
}

function chooseGhostDirection(ghost, moves) {
  const profile = currentSpeedProfile();
  const player = state.levelState.player;
  const frightened = state.levelState.powerSecondsLeft > 0;

  const rankedMoves = moves.map((direction) => {
    const next = movePosition(ghost, direction);
    const distance = Math.abs(next.row - player.row) + Math.abs(next.col - player.col);
    return { direction, distance };
  });

  rankedMoves.sort((left, right) => frightened
    ? right.distance - left.distance
    : left.distance - right.distance);

  if (Math.random() < profile.ghostBestChance) {
    return rankedMoves[0].direction;
  }

  return rankedMoves[Math.floor(Math.random() * rankedMoves.length)].direction;
}

function stepGhosts() {
  const levelState = state.levelState;

  levelState.ghosts.forEach((ghost) => {
    const moves = availableMoves(ghost, ghost.direction);
    if (!moves.length) {
      return;
    }

    const choice = chooseGhostDirection(ghost, moves);
    ghost.direction = choice;
    const next = movePosition(ghost, choice);
    ghost.row = next.row;
    ghost.col = next.col;
  });

  checkGhostCollision();
}

function checkForLevelComplete() {
  const levelState = state.levelState;
  const allQuestionsHandled = levelState.questions.every((question) => question.correct !== null);
  const pelletsGone = levelState.pelletsCollected >= levelState.pelletsTotal;

  if (!pelletsGone || !allQuestionsHandled || levelState.completed) {
    return;
  }

  levelState.completed = true;
  const levelId = LEVELS[state.currentLevelIndex].id;
  if (!state.completedLevels.includes(levelId)) {
    state.completedLevels.push(levelId);
  }
  state.completedLevels.sort((left, right) => left - right);
  state.unlockedLevel = Math.min(Math.max(state.unlockedLevel, levelId + 1), LEVELS.length);
  storeState();
  state.status = "levelcomplete";

  const hasNextLevel = state.currentLevelIndex < LEVELS.length - 1;
  showModal({
    tag: "Level Complete",
    title: hasNextLevel ? "Maze Cleared" : "Adventure Complete",
    body: hasNextLevel
      ? `Great work. You cleared Level ${levelId}. Ready for Level ${levelId + 1}?`
      : "You finished all nine levels. Pac-Man is now a super scholar.",
    primaryLabel: hasNextLevel ? "Play Next Level" : "Play Level 9 Again",
    secondaryLabel: "Close",
    onPrimary: () => {
      closeModal();
      startLevel(hasNextLevel ? state.currentLevelIndex + 1 : LEVELS.length - 1, false);
    },
    onSecondary: () => {
      closeModal();
      renderStaticUi();
    }
  });
}

function stepPlayer() {
  const levelState = state.levelState;
  const player = levelState.player;

  if (state.pendingDirection && canMove(levelState.grid, player, state.pendingDirection)) {
    player.direction = state.pendingDirection;
  }

  if (!canMove(levelState.grid, player, player.direction)) {
    return;
  }

  const next = movePosition(player, player.direction);
  player.row = next.row;
  player.col = next.col;

  const cell = levelState.grid[player.row][player.col];
  if (cell === "." || cell === "o") {
    levelState.grid[player.row][player.col] = " ";
    collectCell(cell);
    scoreLabel.textContent = String(state.score);
    pelletLabel.textContent = `${levelState.pelletsCollected}/${levelState.pelletsTotal}`;
    renderStaticUi();
  }

  checkGhostCollision();

  if (state.status === "playing") {
    checkForLevelComplete();
  }
}

function updateGame(deltaMs) {
  if (state.status !== "playing" || state.overlayLocked || !state.levelState) {
    return;
  }

  const levelState = state.levelState;
  if (levelState.powerSecondsLeft > 0) {
    levelState.powerSecondsLeft = Math.max(0, levelState.powerSecondsLeft - deltaMs / 1000);
    powerLabel.textContent = levelState.powerSecondsLeft > 0
      ? `Power ${levelState.powerSecondsLeft.toFixed(1)}s`
      : "Answer a big dot to power up";
  }

  state.playerClock += deltaMs;
  state.ghostClock += deltaMs;

  const playerStepMs = currentPlayerStepMs();
  const ghostStepMs = currentGhostStepMs();

  while (state.playerClock >= playerStepMs) {
    state.playerClock -= playerStepMs;
    stepPlayer();
    if (state.status !== "playing") {
      break;
    }
  }

  while (state.ghostClock >= ghostStepMs && state.status === "playing") {
    state.ghostClock -= ghostStepMs;
    stepGhosts();
  }
}

function drawMaze() {
  if (!state.levelState) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  const levelState = state.levelState;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#061120";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const x = col * TILE_SIZE;
      const y = row * TILE_SIZE;
      const cell = levelState.grid[row][col];

      if (cell === "#") {
        ctx.fillStyle = "#1b4fff";
        ctx.fillRect(x + 3, y + 3, TILE_SIZE - 6, TILE_SIZE - 6);
        ctx.strokeStyle = "#7cc7ff";
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 6, y + 6, TILE_SIZE - 12, TILE_SIZE - 12);
      } else {
        ctx.fillStyle = "rgba(255,255,255,0.03)";
        ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
      }

      if (cell === ".") {
        ctx.fillStyle = "#ffe589";
        ctx.beginPath();
        ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      if (cell === "o") {
        ctx.fillStyle = "#6fe6ae";
        ctx.beginPath();
        ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#dffef0";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  }
}

function drawOverlayGrid() {
  ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
  ctx.lineWidth = 1;
  for (let index = 0; index <= GRID_SIZE; index += 1) {
    ctx.beginPath();
    ctx.moveTo(index * TILE_SIZE, 0);
    ctx.lineTo(index * TILE_SIZE, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, index * TILE_SIZE);
    ctx.lineTo(canvas.width, index * TILE_SIZE);
    ctx.stroke();
  }
}

function drawPlayer() {
  const player = state.levelState.player;
  const centerX = player.col * TILE_SIZE + TILE_SIZE / 2;
  const centerY = player.row * TILE_SIZE + TILE_SIZE / 2;
  const mouthBase = 0.22 + (Math.sin(performance.now() / 120) + 1) * 0.13;
  const angleByDirection = {
    right: 0,
    left: Math.PI,
    up: -Math.PI / 2,
    down: Math.PI / 2
  };

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(angleByDirection[player.direction] || 0);
  ctx.fillStyle = "#ffd84f";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.arc(0, 0, TILE_SIZE * 0.38, mouthBase, Math.PI * 2 - mouthBase);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawGhost(ghost) {
  const frightened = state.levelState.powerSecondsLeft > 0;
  const centerX = ghost.col * TILE_SIZE + TILE_SIZE / 2;
  const centerY = ghost.row * TILE_SIZE + TILE_SIZE / 2;
  const color = frightened ? "#7cc7ff" : ghost.color;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(0, -4, TILE_SIZE * 0.3, Math.PI, 0);
  ctx.lineTo(TILE_SIZE * 0.3, TILE_SIZE * 0.24);
  ctx.lineTo(TILE_SIZE * 0.16, TILE_SIZE * 0.16);
  ctx.lineTo(0, TILE_SIZE * 0.24);
  ctx.lineTo(-TILE_SIZE * 0.16, TILE_SIZE * 0.16);
  ctx.lineTo(-TILE_SIZE * 0.3, TILE_SIZE * 0.24);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(-6, -2, 4.5, 0, Math.PI * 2);
  ctx.arc(6, -2, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#102448";
  ctx.beginPath();
  ctx.arc(-5, -1, 2.2, 0, Math.PI * 2);
  ctx.arc(7, -1, 2.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function render() {
  if (view3d?.render(state)) return;
  drawMaze();
  if (!state.levelState) {
    return;
  }
  drawOverlayGrid();
  state.levelState.ghosts.forEach(drawGhost);
  drawPlayer();
}

function gameLoop(timestamp) {
  if (!state.lastFrame) {
    state.lastFrame = timestamp;
  }

  const deltaMs = Math.min(50, timestamp - state.lastFrame);
  state.lastFrame = timestamp;
  updateGame(deltaMs);
  render();
  window.requestAnimationFrame(gameLoop);
}

function handleDirection(direction) {
  if (state.overlayLocked) return;
  state.pendingDirection = direction;
  if (state.status === "ready") {
    startLevel(state.currentLevelIndex, true);
  }
}

function attachEvents() {
  window.addEventListener("blur", pauseGame);
  document.addEventListener("visibilitychange", () => { if (document.hidden) pauseGame(); });
  document.addEventListener("keydown", (event) => {
    if (event.target?.closest?.("input, select, textarea") || state.overlayLocked) return;
    const keyToDirection = {
      w: "up", a: "left", s: "down", d: "right", W: "up", A: "left", S: "down", D: "right",
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right"
    };

    if (keyToDirection[event.key]) {
      event.preventDefault();
      handleDirection(keyToDirection[event.key]);
      return;
    }

    if ((event.key.toLowerCase() === "p" || event.key === "Escape")) {
      if (state.status === "playing") {
        pauseGame();
      } else if (state.status === "paused") {
        resumeGame();
      }
    }
  });

  document.querySelectorAll("[data-direction]").forEach((button) => {
    button.addEventListener("click", () => {
      handleDirection(button.dataset.direction);
    });
  });

  levelRoad.addEventListener("click", (event) => {
    const target = event.target.closest("[data-level-index]");
    if (!target) {
      return;
    }
    const levelIndex = Number(target.dataset.levelIndex);
    startLevel(levelIndex, levelIndex === 0 && state.score === 0);
  });

  startButton.addEventListener("click", () => {
    startLevel(state.currentLevelIndex, state.currentLevelIndex === 0 && state.score === 0);
  });

  pauseButton.addEventListener("click", () => {
    if (state.status === "playing") {
      pauseGame();
    } else if (state.status === "paused") {
      resumeGame();
    }
  });

  restartButton.addEventListener("click", () => {
    resetLevel();
  });

  parentModeToggle.addEventListener("change", () => {
    state.parentMode = parentModeToggle.checked;
    storeState();
    renderStaticUi();
    showBanner(state.parentMode ? "Parent Mode On" : "Parent Mode Off");
  });

  themeToggle.addEventListener("change", () => {
    state.themeMode = themeToggle.checked ? "light" : "dark";
    applyTheme();
    storeState();
    showBanner(state.themeMode === "light" ? "Light theme on." : "Dark theme on.");
  });

  speedSelect.addEventListener("change", () => {
    state.speedMode = speedSelect.value;
    state.speedCustomized = true;
    storeState();
    renderStaticUi();
    showBanner(`Speed set to ${currentSpeedProfile().label}.`);
  });
}

function showWelcomeModal() {
  const resumeLabel = state.currentLevelIndex > 0 ? `Continue Level ${state.currentLevelIndex + 1}` : "Start Level 1";
  showModal({
    tag: "Ready",
    title: "Your next bright idea starts here.",
    body: "Collect every golden dot and solve nine green brain boosts to clear the maze. Arrows or WASD move; P pauses. Brain boosts freeze the action while you think, then power you up to chase ghosts. Start with the relaxed pace and turn it up when you’re ready.",
    primaryLabel: resumeLabel,
    secondaryLabel: "Close",
    onPrimary: () => {
      closeModal();
      startLevel(state.currentLevelIndex, state.currentLevelIndex === 0 && state.score === 0);
    },
    onSecondary: () => {
      closeModal();
      render();
    }
  });
}

function init() {
  loadStoredState();
  parentModeToggle.checked = state.parentMode;
  themeToggle.checked = state.themeMode === "light";
  speedSelect.value = state.speedMode;
  applyTheme();
  state.levelState = createLevelState(state.currentLevelIndex);
  renderStaticUi();
  attachEvents();
  showWelcomeModal();
  window.requestAnimationFrame(gameLoop);
}

window.BranGame = { snapshot: () => ({ screen: state.status, level: state.currentLevelIndex + 1, player: { ...state.levelState?.player }, score: state.score, hearts: state.levelState?.heartsLeft, renderer: document.body.dataset.renderer || "2d", graphics: view3d?.info() }) };
init();
