import type { LevelData } from "../types/level-data";

export const level01Data: LevelData = {
  id: "level-01",
  name: "数数星球",
  order: 1,
  difficulty: "easy",
  description: "从 1 数到 10，认识基本数字",
  stages: [
    {
      id: "stage-01-01",
      type: "counting",
      question: "数一数，图中有几颗星星？⭐⭐⭐",
      options: ["2", "3", "4", "5"],
      answer: 3,
      hint: "试试用手指一颗一颗地数",
    },
    {
      id: "stage-01-02",
      type: "counting",
      question: "数一数，图中有几个月亮？🌙🌙🌙🌙🌙",
      options: ["3", "4", "5", "6"],
      answer: 5,
      hint: "从左到右数，不要漏掉哦",
    },
    {
      id: "stage-01-03",
      type: "comparison",
      question: "哪个数字更大？",
      options: ["3", "7"],
      answer: 7,
      hint: "7 在 3 的后面，所以 7 更大",
    },
    {
      id: "stage-01-04",
      type: "addition",
      question: "2 + 1 = ？",
      options: ["2", "3", "4", "5"],
      answer: 3,
      hint: "2 颗星星再拿 1 颗，一共几颗？",
    },
    {
      id: "stage-01-05",
      type: "pattern",
      question: "接下来是什么？1, 2, 3, ?",
      options: ["4", "5", "6", "2"],
      answer: 4,
      hint: "每次加 1，1 后面是 2，2 后面是 3...",
    },
  ],
};
