const QUESTION_BANK = [
  ...window.BranGrade4.math,
  ...window.BranGrade4.chinese,

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

];

window.QUESTION_BANK = QUESTION_BANK;
