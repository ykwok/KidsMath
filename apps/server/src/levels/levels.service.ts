import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RecommendationEngine } from './recommendation.engine';

@Injectable()
export class LevelsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly recommendationEngine: RecommendationEngine,
  ) {}

  async findAll(filters: { module?: string; ageGroup?: string; stage?: string }) {
    const where: any = { isActive: true };
    if (filters.module) where.module = filters.module;
    if (filters.ageGroup) where.ageGroup = filters.ageGroup;
    if (filters.stage) where.stage = filters.stage;

    return this.prisma.level.findMany({
      where,
      orderBy: { order: 'asc' },
    });
  }

  async findById(id: string) {
    const level = await this.prisma.level.findUnique({
      where: { id },
    });
    if (!level) throw new NotFoundException('Level not found');
    return level;
  }

  async getTodayRecommended(childId: string) {
    return this.recommendationEngine.getRecommendedLevel(childId);
  }
}
