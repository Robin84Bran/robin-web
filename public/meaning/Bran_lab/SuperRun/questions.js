const QUESTION_BANK = [
  { id: "m1", category: "math", difficulty: 1, prompt: "14 + 19 = ?", choices: ["31", "33", "35", "37"], answer: 1 },
  { id: "m2", category: "math", difficulty: 1, prompt: "9 x 7 = ?", choices: ["56", "63", "72", "81"], answer: 1 },
  { id: "m3", category: "math", difficulty: 2, prompt: "17 x 19 = ?", choices: ["303", "313", "323", "333"], answer: 2 },
  { id: "m4", category: "math", difficulty: 2, prompt: "Prime number?", choices: ["91", "97", "111", "121"], answer: 1 },
  { id: "m5", category: "math", difficulty: 2, prompt: "2, 6, 12, 20, 30, ?", choices: ["36", "40", "42", "44"], answer: 2 },
  { id: "m6", category: "math", difficulty: 3, prompt: "3/4 + 5/8 = ?", choices: ["1 1/8", "1 3/8", "1 5/8", "11/16"], answer: 1 },
  { id: "m7", category: "math", difficulty: 3, prompt: "A triangle has angles 35° and 65°. What is the third angle?", choices: ["70°", "75°", "80°", "90°"], answer: 2 },
  { id: "m8", category: "math", difficulty: 3, prompt: "If x + 11 = 27, x = ?", choices: ["14", "15", "16", "17"], answer: 2 },
  { id: "m9", category: "math", difficulty: 4, prompt: "5, 11, 23, 47, ?", choices: ["71", "83", "95", "107"], answer: 2 },
  { id: "m10", category: "math", difficulty: 4, prompt: "Perimeter of square side 14?", choices: ["42", "48", "56", "196"], answer: 2 },
  { id: "m11", category: "math", difficulty: 5, prompt: "Which is divisible by 9?", choices: ["245", "351", "472", "581"], answer: 1 },
  { id: "m12", category: "math", difficulty: 5, prompt: "3, 7, 15, 31, ?", choices: ["47", "55", "63", "71"], answer: 2 },

  { id: "s1", category: "science", difficulty: 1, prompt: "Force pulling objects to Earth?", choices: ["Gravity", "Magnetism", "Friction", "Steam"], answer: 0 },
  { id: "s2", category: "science", difficulty: 1, prompt: "Melting changes solid into...", choices: ["Gas", "Liquid", "Plasma", "Dust"], answer: 1 },
  { id: "s3", category: "science", difficulty: 2, prompt: "Blood away from heart travels in...", choices: ["Veins", "Arteries", "Nerves", "Tendons"], answer: 1 },
  { id: "s4", category: "science", difficulty: 2, prompt: "Why do shadows change length?", choices: ["Wind speed", "Sun angle", "Cloud taste", "Moon phase"], answer: 1 },
  { id: "s5", category: "science", difficulty: 3, prompt: "Energy of motion is...", choices: ["Chemical", "Kinetic", "Potential", "Solar"], answer: 1 },
  { id: "s6", category: "science", difficulty: 3, prompt: "Closest star to Earth?", choices: ["Polaris", "Venus", "The Sun", "Mars"], answer: 2 },
  { id: "s7", category: "science", difficulty: 4, prompt: "Most weather happens in the...", choices: ["Exosphere", "Troposphere", "Mesosphere", "Thermosphere"], answer: 1 },
  { id: "s8", category: "science", difficulty: 4, prompt: "Water leaving leaves is...", choices: ["Erosion", "Fusion", "Transpiration", "Condensing"], answer: 2 },
  { id: "s9", category: "science", difficulty: 5, prompt: "A push or pull is a...", choices: ["Pulse", "Force", "Phase", "Frame"], answer: 1 },
  { id: "s10", category: "science", difficulty: 5, prompt: "Day and night come from Earth's...", choices: ["Rotation", "Tilt", "Moon", "Clouds"], answer: 0 },

  { id: "c1", category: "chinese", difficulty: 1, prompt: "朋友 means...", choices: ["Teacher", "Friend", "Family", "Question"], answer: 1 },
  { id: "c2", category: "chinese", difficulty: 1, prompt: "Which means 'water'?", choices: ["火", "山", "水", "木"], answer: 2 },
  { id: "c3", category: "chinese", difficulty: 2, prompt: "学校 means...", choices: ["School", "Market", "Garden", "Window"], answer: 0 },
  { id: "c4", category: "chinese", difficulty: 2, prompt: "Choose antonym of 快", choices: ["慢", "远", "强", "早"], answer: 0 },
  { id: "c5", category: "chinese", difficulty: 3, prompt: "认真 means...", choices: ["Careful", "Noisy", "Expensive", "Cold"], answer: 0 },
  { id: "c6", category: "chinese", difficulty: 3, prompt: "Which character means fast in 他跑得很快?", choices: ["高", "快", "多", "远"], answer: 1 },
  { id: "c7", category: "chinese", difficulty: 4, prompt: "安静 means...", choices: ["Quiet", "Fast", "Crowded", "Lucky"], answer: 0 },
  { id: "c8", category: "chinese", difficulty: 4, prompt: "Choose synonym of 立刻", choices: ["马上", "最后", "已经", "一起"], answer: 0 },
  { id: "c9", category: "chinese", difficulty: 5, prompt: "Which sentence means “I went yesterday”?", choices: ["我昨天会去", "我昨天去了", "我昨天正在去", "我昨天会去了"], answer: 1 },
  { id: "c10", category: "chinese", difficulty: 5, prompt: "进步 means...", choices: ["Promise", "Progress", "Prize", "Question"], answer: 1 }
];

window.QUESTION_BANK = QUESTION_BANK;
