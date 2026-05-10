import type { Level } from "@kidsmath/shared";

function emojiToType(
  emoji: string,
): "apple" | "star" | "ball" | "block" | "number" {
  switch (emoji) {
    case "🍎":
    case "🍓":
      return "apple";
    case "⭐":
    case "🌸":
      return "star";
    case "🍊":
    case "🍌":
    case "🍇":
    case "🍉":
      return "ball";
    default:
      return "number";
  }
}

function makeConcreteLevel(
  order: number,
  num: number,
  title: string,
  description: string,
  emoji: string,
  label: string,
  bins: number,
  correct: string,
  voiceHint: string,
  ageGroup: "sprout" | "explore" | "leap",
): Level {
  return {
    id: `level-${order.toString().padStart(2, "0")}`,
    module: "counting",
    ageGroup,
    stage: "concrete",
    title: `${title} · 实物操作`,
    description,
    order,
    isActive: true,
    content: {
      question: `把 ${num} 个${label}分到 ${bins} 个篮子里`,
      items: Array.from({ length: num }, (_, i) => ({
        id: `item-${i + 1}`,
        type: emojiToType(emoji),
        value: 1,
      })),
      correctAnswer: correct,
      hints: [
        `小朋友，把这 ${num} 个${label}分到两个篮子里吧！可以说“${correct}”哦`,
      ],
      voicePrompt: voiceHint,
    },
  };
}

function makePictorialLevel(
  order: number,
  num: number,
  title: string,
  description: string,
  label: string,
  correct: string,
  voiceHint: string,
  ageGroup: "sprout" | "explore" | "leap",
): Level {
  return {
    id: `level-${order.toString().padStart(2, "0")}`,
    module: "counting",
    ageGroup,
    stage: "pictorial",
    title: `${title} · 图形表示`,
    description,
    order,
    isActive: true,
    content: {
      question: `用图形把 ${num} 个${label}分开`,
      items: Array.from({ length: num }, (_, i) => ({
        id: `shape-${i + 1}`,
        type: "block" as const,
        value: 1,
      })),
      correctAnswer: correct,
      hints: [`拖动图形，把 ${num} 分成两份吧！`],
      voicePrompt: voiceHint,
    },
  };
}

function makeAbstractLevel(
  order: number,
  num: number,
  title: string,
  description: string,
  correct: string,
  voiceHint: string,
  ageGroup: "sprout" | "explore" | "leap",
): Level {
  return {
    id: `level-${order.toString().padStart(2, "0")}`,
    module: "counting",
    ageGroup,
    stage: "abstract",
    title: `${title} · 抽象运算`,
    description,
    order,
    isActive: true,
    content: {
      question: `${num} = □ + □`,
      items: [{ id: "num-1", type: "number", value: num }],
      correctAnswer: correct,
      hints: [`${num} 可以分成几和几呢？`],
      voicePrompt: voiceHint,
    },
  };
}

function ageGroupForNum(num: number): "sprout" | "explore" | "leap" {
  if (num <= 5) return "sprout";
  if (num <= 7) return "explore";
  return "leap";
}

export const LEVELS: Level[] = [
  // Level 1: 认识数字 5
  makeConcreteLevel(
    1,
    5,
    "认识数字 5",
    "通过分苹果，认识数字 5 的分解",
    "🍎",
    "苹果",
    2,
    "3+2",
    "小朋友，把这 5 个苹果分到两个篮子里吧！可以说“3+2”哦",
    ageGroupForNum(5),
  ),
  makePictorialLevel(
    2,
    5,
    "认识数字 5",
    "用图形把 5 个圆点分开",
    "圆点",
    "3+2",
    "拖动图形，把 5 分成两份吧！",
    ageGroupForNum(5),
  ),
  makeAbstractLevel(
    3,
    5,
    "认识数字 5",
    "5 可以分成几和几呢？",
    "3+2",
    "5 可以分成几和几呢？",
    ageGroupForNum(5),
  ),

  // Level 2: 认识数字 4
  makeConcreteLevel(
    4,
    4,
    "认识数字 4",
    "把 4 个星星分成两份",
    "⭐",
    "星星",
    2,
    "2+2",
    "小朋友，把这 4 个星星分到两个篮子里吧！可以说“2+2”哦",
    ageGroupForNum(4),
  ),
  makePictorialLevel(
    5,
    4,
    "认识数字 4",
    "用图形把 4 个方块分开",
    "方块",
    "2+2",
    "拖动图形，把 4 分成两份吧！",
    ageGroupForNum(4),
  ),
  makeAbstractLevel(
    6,
    4,
    "认识数字 4",
    "4 可以分成几和几呢？",
    "2+2",
    "4 可以分成几和几呢？",
    ageGroupForNum(4),
  ),

  // Level 3: 认识数字 6
  makeConcreteLevel(
    7,
    6,
    "认识数字 6",
    "探索 6 的多种分法",
    "🍊",
    "橙子",
    2,
    "4+2",
    "小朋友，把这 6 个橙子分到两个篮子里吧！可以说“4+2”哦",
    ageGroupForNum(6),
  ),
  makePictorialLevel(
    8,
    6,
    "认识数字 6",
    "用图形把 6 个三角分开",
    "三角",
    "4+2",
    "拖动图形，把 6 分成两份吧！",
    ageGroupForNum(6),
  ),
  makeAbstractLevel(
    9,
    6,
    "认识数字 6",
    "6 可以分成几和几呢？",
    "4+2",
    "6 可以分成几和几呢？",
    ageGroupForNum(6),
  ),

  // Level 4: 认识数字 3
  makeConcreteLevel(
    10,
    3,
    "认识数字 3",
    "简单分解数字 3",
    "🍓",
    "草莓",
    2,
    "1+2",
    "小朋友，把这 3 个草莓分到两个篮子里吧！可以说“1+2”哦",
    ageGroupForNum(3),
  ),
  makePictorialLevel(
    11,
    3,
    "认识数字 3",
    "用图形把 3 个圆点分开",
    "圆点",
    "1+2",
    "拖动图形，把 3 分成两份吧！",
    ageGroupForNum(3),
  ),
  makeAbstractLevel(
    12,
    3,
    "认识数字 3",
    "3 可以分成几和几呢？",
    "1+2",
    "3 可以分成几和几呢？",
    ageGroupForNum(3),
  ),

  // Level 5: 认识数字 7
  makeConcreteLevel(
    13,
    7,
    "认识数字 7",
    "挑战 7 的分解",
    "🍌",
    "香蕉",
    2,
    "3+4",
    "小朋友，把这 7 个香蕉分到两个篮子里吧！可以说“3+4”哦",
    ageGroupForNum(7),
  ),
  makePictorialLevel(
    14,
    7,
    "认识数字 7",
    "用图形把 7 个方块分开",
    "方块",
    "3+4",
    "拖动图形，把 7 分成两份吧！",
    ageGroupForNum(7),
  ),
  makeAbstractLevel(
    15,
    7,
    "认识数字 7",
    "7 可以分成几和几呢？",
    "3+4",
    "7 可以分成几和几呢？",
    ageGroupForNum(7),
  ),

  // Level 6: 认识数字 8
  makeConcreteLevel(
    16,
    8,
    "认识数字 8",
    "分解数字 8",
    "🍇",
    "葡萄",
    2,
    "5+3",
    "小朋友，把这 8 个葡萄分到两个篮子里吧！可以说“5+3”哦",
    ageGroupForNum(8),
  ),
  makePictorialLevel(
    17,
    8,
    "认识数字 8",
    "用图形把 8 个三角分开",
    "三角",
    "5+3",
    "拖动图形，把 8 分成两份吧！",
    ageGroupForNum(8),
  ),
  makeAbstractLevel(
    18,
    8,
    "认识数字 8",
    "8 可以分成几和几呢？",
    "5+3",
    "8 可以分成几和几呢？",
    ageGroupForNum(8),
  ),

  // Level 7: 认识数字 9
  makeConcreteLevel(
    19,
    9,
    "认识数字 9",
    "探索 9 的秘密",
    "🍉",
    "西瓜",
    2,
    "4+5",
    "小朋友，把这 9 个西瓜分到两个篮子里吧！可以说“4+5”哦",
    ageGroupForNum(9),
  ),
  makePictorialLevel(
    20,
    9,
    "认识数字 9",
    "用图形把 9 个圆点分开",
    "圆点",
    "4+5",
    "拖动图形，把 9 分成两份吧！",
    ageGroupForNum(9),
  ),
  makeAbstractLevel(
    21,
    9,
    "认识数字 9",
    "9 可以分成几和几呢？",
    "4+5",
    "9 可以分成几和几呢？",
    ageGroupForNum(9),
  ),

  // Level 8: 认识数字 10
  makeConcreteLevel(
    22,
    10,
    "认识数字 10",
    "挑战完整的 10",
    "🌸",
    "花朵",
    2,
    "6+4",
    "小朋友，把这 10 个花朵分到两个篮子里吧！可以说“6+4”哦",
    ageGroupForNum(10),
  ),
  makePictorialLevel(
    23,
    10,
    "认识数字 10",
    "用图形把 10 个方块分开",
    "方块",
    "6+4",
    "拖动图形，把 10 分成两份吧！",
    ageGroupForNum(10),
  ),
  makeAbstractLevel(
    24,
    10,
    "认识数字 10",
    "10 可以分成几和几呢？",
    "6+4",
    "10 可以分成几和几呢？",
    ageGroupForNum(10),
  ),
];
