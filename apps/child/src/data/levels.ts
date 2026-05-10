export interface CPAQuestion {
  id: string;
  stage: 'C' | 'P' | 'A';
  prompt: string;
  voiceHint: string;
  correctAnswer: string;
  options?: string[];
  concreteItems?: {
    total: number;
    label: string;
    emoji: string;
    bins: number;
  };
  pictorialItems?: {
    total: number;
    label: string;
    shape: 'circle' | 'square' | 'triangle';
    bins: number;
  };
}

export interface Level {
  id: number;
  title: string;
  description: string;
  module: 'counting' | 'comparing' | 'logic';
  questions: CPAQuestion[];
}

function makeCQuestion(
  num: number,
  emoji: string,
  label: string,
  bins: number,
  correct: string
): CPAQuestion {
  return {
    id: `C-${num}`,
    stage: 'C',
    prompt: `把 ${num} 个${label}分到 ${bins} 个篮子里`,
    voiceHint: `小朋友，把这 ${num} 个${label}分到两个篮子里吧！可以说“${correct}”哦`,
    correctAnswer: correct,
    concreteItems: { total: num, label, emoji, bins },
  };
}

function makePQuestion(
  num: number,
  shape: 'circle' | 'square' | 'triangle',
  label: string,
  bins: number,
  correct: string
): CPAQuestion {
  return {
    id: `P-${num}`,
    stage: 'P',
    prompt: `用图形把 ${num} 个${label}分开`,
    voiceHint: `拖动图形，把 ${num} 分成两份吧！`,
    correctAnswer: correct,
    pictorialItems: { total: num, label, shape, bins },
  };
}

function makeAQuestion(
  num: number,
  correct: string
): CPAQuestion {
  const options = [correct, `${num - 1}+1`, `1+${num - 1}`, `${Math.floor(num / 2)}+${Math.ceil(num / 2)}`];
  const uniqueOptions = Array.from(new Set(options));
  return {
    id: `A-${num}`,
    stage: 'A',
    prompt: `${num} = □ + □`,
    voiceHint: `${num} 可以分成几和几呢？`,
    correctAnswer: correct,
    options: uniqueOptions.sort(() => Math.random() - 0.5),
  };
}

export const LEVELS: Level[] = [
  {
    id: 1,
    title: '认识数字 5',
    description: '通过分苹果，认识数字 5 的分解',
    module: 'counting',
    questions: [
      makeCQuestion(5, '🍎', '苹果', 2, '3+2'),
      makePQuestion(5, 'circle', '圆点', 2, '3+2'),
      makeAQuestion(5, '3+2'),
    ],
  },
  {
    id: 2,
    title: '认识数字 4',
    description: '把 4 个星星分成两份',
    module: 'counting',
    questions: [
      makeCQuestion(4, '⭐', '星星', 2, '2+2'),
      makePQuestion(4, 'square', '方块', 2, '2+2'),
      makeAQuestion(4, '2+2'),
    ],
  },
  {
    id: 3,
    title: '认识数字 6',
    description: '探索 6 的多种分法',
    module: 'counting',
    questions: [
      makeCQuestion(6, '🍊', '橙子', 2, '4+2'),
      makePQuestion(6, 'triangle', '三角', 2, '4+2'),
      makeAQuestion(6, '4+2'),
    ],
  },
  {
    id: 4,
    title: '认识数字 3',
    description: '简单分解数字 3',
    module: 'counting',
    questions: [
      makeCQuestion(3, '🍓', '草莓', 2, '1+2'),
      makePQuestion(3, 'circle', '圆点', 2, '1+2'),
      makeAQuestion(3, '1+2'),
    ],
  },
  {
    id: 5,
    title: '认识数字 7',
    description: '挑战 7 的分解',
    module: 'counting',
    questions: [
      makeCQuestion(7, '🍌', '香蕉', 2, '3+4'),
      makePQuestion(7, 'square', '方块', 2, '3+4'),
      makeAQuestion(7, '3+4'),
    ],
  },
  {
    id: 6,
    title: '认识数字 8',
    description: '分解数字 8',
    module: 'counting',
    questions: [
      makeCQuestion(8, '🍇', '葡萄', 2, '5+3'),
      makePQuestion(8, 'triangle', '三角', 2, '5+3'),
      makeAQuestion(8, '5+3'),
    ],
  },
  {
    id: 7,
    title: '认识数字 9',
    description: '探索 9 的秘密',
    module: 'counting',
    questions: [
      makeCQuestion(9, '🍉', '西瓜', 2, '4+5'),
      makePQuestion(9, 'circle', '圆点', 2, '4+5'),
      makeAQuestion(9, '4+5'),
    ],
  },
  {
    id: 8,
    title: '认识数字 10',
    description: '挑战完整的 10',
    module: 'counting',
    questions: [
      makeCQuestion(10, '🌸', '花朵', 2, '6+4'),
      makePQuestion(10, 'square', '方块', 2, '6+4'),
      makeAQuestion(10, '6+4'),
    ],
  },
];
