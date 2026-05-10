import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RecommendationEngine {
  constructor(private readonly prisma: PrismaService) {}

  async getRecommendedLevel(childId: string) {
    const child = await this.prisma.user.findUnique({
      where: { id: childId },
    });
    if (!child) return null;

    const recentRecords = await this.prisma.learningRecord.findMany({
      where: { childId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { level: true },
    });

    if (recentRecords.length === 0) {
      // First time: return the first level
      return this.prisma.level.findFirst({
        where: { isActive: true },
        orderBy: { order: 'asc' },
      });
    }

    const recent3 = recentRecords.slice(0, 3);
    const correctCount = recent3.filter((r) => r.correct).length;
    const correctRate = correctCount / recent3.length;

    const lastLevel = recentRecords[0].level;

    if (recent3.length >= 3 && correctRate > 0.8) {
      // Advance to next difficulty
      const nextLevel = await this.prisma.level.findFirst({
        where: {
          isActive: true,
          order: { gt: lastLevel.order },
        },
        orderBy: { order: 'asc' },
      });
      if (nextLevel) return nextLevel;
    }

    const recent2 = recentRecords.slice(0, 2);
    const wrongCount = recent2.filter((r) => !r.correct).length;
    if (recent2.length >= 2 && wrongCount >= 2) {
      // Reinforce: find a level in concrete stage with same module/ageGroup
      const reinforceLevel = await this.prisma.level.findFirst({
        where: {
          isActive: true,
          module: lastLevel.module,
          ageGroup: lastLevel.ageGroup,
          stage: 'concrete',
        },
        orderBy: { order: 'asc' },
      });
      if (reinforceLevel) return reinforceLevel;
    }

    // Continue with next level in sequence
    const nextLevel = await this.prisma.level.findFirst({
      where: {
        isActive: true,
        order: { gt: lastLevel.order },
      },
      orderBy: { order: 'asc' },
    });
    if (nextLevel) return nextLevel;

    // Fallback: same level
    return lastLevel;
  }
}
