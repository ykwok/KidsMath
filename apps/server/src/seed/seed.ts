import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.learningRecord.deleteMany();
  await prisma.dailyReport.deleteMany();
  await prisma.level.deleteMany();
  await prisma.user.deleteMany();

  // Create test parent and child
  const parent = await prisma.user.create({
    data: {
      id: 'test_parent_001',
      nickname: '测试家长',
      phone: '13800138000',
      role: 'PARENT',
    },
  });

  const child = await prisma.user.create({
    data: {
      id: 'test_child_001',
      nickname: '测试宝贝',
      role: 'CHILD',
      birthDate: new Date('2020-06-15'),
      parentId: parent.id,
    },
  });

  console.log(`Created parent: ${parent.nickname} (${parent.id})`);
  console.log(`Created child: ${child.nickname} (${child.id})`);

  // 数与量模块 (counting) - 10 levels, C→P→A stages
  const countingLevels = [
    // Concrete stage (C)
    {
      module: 'counting',
      ageGroup: 'explore',
      stage: 'concrete',
      title: '数一数有几个苹果',
      description: '通过实物图片，让孩子数一数盘子里有几个苹果',
      order: 1,
      content: {
        type: 'counting',
        question: '盘子里有几个苹果？',
        items: ['🍎', '🍎', '🍎', '🍎', '🍎'],
        options: ['3', '4', '5', '6'],
        correctAnswer: '5',
        hint: '用手指一个一个指着数',
      },
    },
    {
      module: 'counting',
      ageGroup: 'explore',
      stage: 'concrete',
      title: '数一数有几只小鸟',
      description: '观察图片，数一数树上有几只小鸟',
      order: 2,
      content: {
        type: 'counting',
        question: '树上有几只小鸟？',
        items: ['🐦', '🐦', '🐦', '🐦', '🐦', '🐦', '🐦'],
        options: ['5', '6', '7', '8'],
        correctAnswer: '7',
        hint: '从左到右，一个一个数',
      },
    },
    {
      module: 'counting',
      ageGroup: 'explore',
      stage: 'concrete',
      title: '找一找少了哪个数字',
      description: '观察数字序列，找出缺失的数字',
      order: 3,
      content: {
        type: 'missing_number',
        question: '序列中少了哪个数字？ 1, 2, _, 4, 5',
        options: ['2', '3', '6', '1'],
        correctAnswer: '3',
        hint: '按顺序念一遍数字',
      },
    },
    {
      module: 'counting',
      ageGroup: 'explore',
      stage: 'concrete',
      title: '比多少',
      description: '比较两组物品的数量',
      order: 4,
      content: {
        type: 'comparison',
        question: '哪边的星星更多？',
        leftItems: ['⭐', '⭐', '⭐', '⭐'],
        rightItems: ['⭐', '⭐', '⭐'],
        options: ['左边多', '右边多', '一样多'],
        correctAnswer: '左边多',
        hint: '两边各数一遍',
      },
    },
    // Pictorial stage (P)
    {
      module: 'counting',
      ageGroup: 'explore',
      stage: 'pictorial',
      title: '数轴上的数字',
      description: '在数轴上找到正确的数字位置',
      order: 5,
      content: {
        type: 'number_line',
        question: '数轴上箭头指向的数字是？',
        numberLine: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        arrowPosition: 6,
        options: ['5', '6', '7', '8'],
        correctAnswer: '6',
        hint: '从0开始数到箭头位置',
      },
    },
    {
      module: 'counting',
      ageGroup: 'explore',
      stage: 'pictorial',
      title: '数字拆分',
      description: '将一个数字拆分成两个数的和',
      order: 6,
      content: {
        type: 'decomposition',
        question: '5 可以拆成 2 和几？',
        options: ['2', '3', '4', '5'],
        correctAnswer: '3',
        hint: '伸出5根手指，收起2根，还剩几根？',
      },
    },
    {
      module: 'counting',
      ageGroup: 'explore',
      stage: 'pictorial',
      title: '相邻数字',
      description: '找出数字的邻居（前一个和后一个）',
      order: 7,
      content: {
        type: 'neighbors',
        question: '数字 4 的邻居是？',
        options: ['2 和 5', '3 和 5', '3 和 6', '5 和 6'],
        correctAnswer: '3 和 5',
        hint: '比4少1和比4多1',
      },
    },
    {
      module: 'counting',
      ageGroup: 'explore',
      stage: 'pictorial',
      title: '10以内加减',
      description: '通过图示理解简单的加减法',
      order: 8,
      content: {
        type: 'addition',
        question: '3 + 4 = ?',
        visualA: ['🟠', '🟠', '🟠'],
        visualB: ['🔵', '🔵', '🔵', '🔵'],
        options: ['6', '7', '8', '9'],
        correctAnswer: '7',
        hint: '把所有圆球数一遍',
      },
    },
    // Abstract stage (A)
    {
      module: 'counting',
      ageGroup: 'explore',
      stage: 'abstract',
      title: '心算挑战',
      description: '不借助图片，直接计算',
      order: 9,
      content: {
        type: 'mental_math',
        question: '8 - 3 = ?',
        options: ['4', '5', '6', '7'],
        correctAnswer: '5',
        hint: '8往后数3个',
      },
    },
    {
      module: 'counting',
      ageGroup: 'explore',
      stage: 'abstract',
      title: '数字规律',
      description: '发现数字排列的规律',
      order: 10,
      content: {
        type: 'pattern',
        question: '下一个数字是什么？ 2, 4, 6, 8, _',
        options: ['9', '10', '12', '14'],
        correctAnswer: '10',
        hint: '每次增加2',
      },
    },
  ];

  // 比较与运算模块 (comparison) - 5 levels
  const comparisonLevels = [
    {
      module: 'comparison',
      ageGroup: 'explore',
      stage: 'concrete',
      title: '大小比较',
      description: '比较两个数字的大小',
      order: 11,
      content: {
        type: 'compare',
        question: '5 和 3 哪个大？',
        visualA: ['🍎', '🍎', '🍎', '🍎', '🍎'],
        visualB: ['🍎', '🍎', '🍎'],
        options: ['5 大', '3 大', '一样大'],
        correctAnswer: '5 大',
        hint: '数一数两边各有几个',
      },
    },
    {
      module: 'comparison',
      ageGroup: 'explore',
      stage: 'concrete',
      title: '等于的概念',
      description: '理解"等于"的含义',
      order: 12,
      content: {
        type: 'equal',
        question: '2 + 2 和 4 一样大吗？',
        visualA: ['🟡', '🟡', '🟡', '🟡'],
        visualB: ['🔴', '🔴', '🔴', '🔴'],
        options: ['是', '否'],
        correctAnswer: '是',
        hint: '两边各数一数',
      },
    },
    {
      module: 'comparison',
      ageGroup: 'explore',
      stage: 'pictorial',
      title: '符号填空',
      description: '在圆圈中填入正确的比较符号',
      order: 13,
      content: {
        type: 'fill_symbol',
        question: '7 ○ 4',
        options: ['>', '<', '='],
        correctAnswer: '>',
        hint: '7比4大',
      },
    },
    {
      module: 'comparison',
      ageGroup: 'explore',
      stage: 'pictorial',
      title: '简单运算比较',
      description: '先计算，再比较大小',
      order: 14,
      content: {
        type: 'compare_expression',
        question: '3 + 2 ○ 6 - 1',
        options: ['>', '<', '='],
        correctAnswer: '=',
        hint: '分别算出两边的结果',
      },
    },
    {
      module: 'comparison',
      ageGroup: 'explore',
      stage: 'abstract',
      title: '找最大数',
      description: '从一组数字中找出最大的',
      order: 15,
      content: {
        type: 'find_max',
        question: '下面哪个数字最大？',
        numbers: [3, 7, 5, 9, 2],
        options: ['3', '7', '5', '9'],
        correctAnswer: '9',
        hint: '从大到小排一排',
      },
    },
  ];

  const allLevels = [...countingLevels, ...comparisonLevels];

  for (const level of allLevels) {
    await prisma.level.create({ data: level as any });
  }

  console.log(`Created ${allLevels.length} levels`);
  console.log('Seed completed successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
