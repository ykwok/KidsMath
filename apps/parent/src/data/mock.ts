import type { Child, DailyReport, WeeklyData, RadarData, GameTip, FAQ } from '@/types';

export const mockChild: Child = {
  id: '1',
  name: '小明',
  avatar: '',
  age: 5,
  stage: '探索期',
  learningDay: 42,
};

export const mockChildren: Child[] = [
  mockChild,
  {
    id: '2',
    name: '小红',
    avatar: '',
    age: 4,
    stage: '萌芽期',
    learningDay: 15,
  },
];

export const mockDailyReport: DailyReport = {
  date: '2026-05-10',
  duration: 10,
  completedLevels: 3,
  totalLevels: 5,
  accuracy: 85,
  emotion: '开心',
  levels: [
    {
      id: 'l1',
      title: '数字认读：1-5',
      correct: 5,
      total: 5,
      duration: 180,
      emotion: '开心',
    },
    {
      id: 'l2',
      title: '数量对应：找朋友',
      correct: 4,
      total: 5,
      duration: 240,
      emotion: '困惑',
    },
    {
      id: 'l3',
      title: '简单比较：多与少',
      correct: 5,
      total: 5,
      duration: 200,
      emotion: '开心',
    },
  ],
  tips: [
    '小明在"数量对应"环节稍有犹豫，建议在家多用实物（如积木、水果）进行"数与量"配对游戏。',
    '今日情绪积极，可以趁热打铁，在晚饭后安排 5 分钟数字卡片复习。',
    '正确率保持优秀，可以适当增加难度，尝试 6-10 的数字认知。',
  ],
};

export const mockWeeklyData: WeeklyData[] = [
  { date: '05-04', duration: 8, accuracy: 78 },
  { date: '05-05', duration: 12, accuracy: 82 },
  { date: '05-06', duration: 6, accuracy: 75 },
  { date: '05-07', duration: 15, accuracy: 88 },
  { date: '05-08', duration: 10, accuracy: 85 },
  { date: '05-09', duration: 9, accuracy: 80 },
  { date: '05-10', duration: 10, accuracy: 85 },
];

export const mockRadarData: RadarData[] = [
  {
    subject: '数与量',
    current: 85,
    previous: 72,
    fullMark: 100,
    percentile: 72,
    suggestion: '带孩子去超市购物时，让他们帮忙数苹果、拿 3 个橘子，把数字融入生活场景。',
  },
  {
    subject: '比较与运算',
    current: 70,
    previous: 65,
    fullMark: 100,
    percentile: 58,
    suggestion: '分零食时说"你有 2 块饼干，妈妈再给你 1 块，现在有几块？"用实物演示加减法。',
  },
  {
    subject: '逻辑与空间',
    current: 78,
    previous: 70,
    fullMark: 100,
    percentile: 65,
    suggestion: '玩积木搭建时引导孩子观察"哪块积木在上面""这座塔有几层"，培养空间感。',
  },
];

export const mockGameTips: GameTip[] = [
  {
    id: 'g1',
    title: '袜子配对游戏',
    time: '5 分钟',
    materials: '干净的袜子若干双',
    steps: '整理袜子时，让孩子按颜色、图案配对，再数一数每种颜色有几双。可以进阶为"找哪只袜子没有朋友"。',
    category: '数与量',
  },
  {
    id: 'g2',
    title: '楼梯数数挑战',
    time: '3 分钟',
    materials: '家里的楼梯',
    steps: '上下楼梯时，让孩子一边走一边数台阶。可以尝试正着数、倒着数，或者隔一级数一次。',
    category: '数与量',
  },
  {
    id: 'g3',
    title: '形状寻宝',
    time: '10 分钟',
    materials: '纸、笔（可选）',
    steps: '在房间里寻找圆形、方形、三角形的物品，每找到一个就记录下来，最后统计每种形状有几个。',
    category: '逻辑与空间',
  },
];

export const mockFAQs: FAQ[] = [
  {
    id: 'f1',
    question: '孩子数数总是跳过 4 怎么办？',
    answer: '这是 4-5 岁孩子常见的"数字盲点"。建议：1）用儿歌强化 1-10 顺序；2）用手指一个一个点着数；3）不要急于纠正，多练习自然过渡。',
    tags: ['数数', '常见问题'],
  },
  {
    id: 'f2',
    question: '如何教孩子理解守恒？',
    answer: '守恒概念通常在 5-7 岁形成。可以通过：1）把同样的水倒入不同形状的杯子；2）把一排积木排得紧凑或分散，问孩子数量是否一样。关键是让孩子亲手操作。',
    tags: ['概念理解', '守恒'],
  },
  {
    id: 'f3',
    question: '孩子对数学没兴趣怎么办？',
    answer: '兴趣是最好的老师。建议：1）把数学藏在游戏里，而不是"上课"；2）从孩子喜欢的主题切入（如恐龙、公主）；3）多给予具体表扬，如"你刚才数对了 5 个积木，真棒！"；4）每次学习时间不超过 10 分钟。',
    tags: ['兴趣培养', '学习方法'],
  },
];

export const emotionConfig: Record<string, { color: string; bg: string; icon: string }> = {
  '开心': { color: 'text-success', bg: 'bg-green-50', icon: '☺️' },
  '困惑': { color: 'text-warning', bg: 'bg-amber-50', icon: '🤔' },
  '无聊': { color: 'text-warm-400', bg: 'bg-warm-100', icon: '😑' },
  '兴奋': { color: 'text-brand-500', bg: 'bg-blue-50', icon: '🤩' },
};

export const stageColors: Record<string, string> = {
  '萌芽期': 'bg-rose-100 text-rose-700',
  '探索期': 'bg-brand-100 text-brand-700',
  '飞跃期': 'bg-purple-100 text-purple-700',
};
