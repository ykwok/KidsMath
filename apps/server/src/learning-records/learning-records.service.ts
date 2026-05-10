import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateLearningRecordDto,
  QueryLearningRecordsDto,
} from './learning-records.dto';
import type { LearningRecord } from '@kidsmath/shared';

@Injectable()
export class LearningRecordsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateLearningRecordDto): Promise<LearningRecord> {
    const record = await this.prisma.learningRecord.create({
      data: {
        childId: dto.childId,
        levelId: dto.levelId,
        correct: dto.correct,
        timeSpent: dto.timeSpent,
        answer: dto.answer,
        emotion: dto.emotion,
      },
      include: {
        level: {
          select: {
            id: true,
            title: true,
            module: true,
            ageGroup: true,
            stage: true,
          },
        },
      },
    });
    return this.mapRecord(record);
  }

  async findAll(query: QueryLearningRecordsDto) {
    const page = Number(query.page || '1');
    const perPage = Number(query.perPage || '20');
    const skip = (page - 1) * perPage;

    const where: any = { childId: query.childId };
    if (query.startDate || query.endDate) {
      where.createdAt = {};
      if (query.startDate) where.createdAt.gte = new Date(query.startDate);
      if (query.endDate) where.createdAt.lte = new Date(query.endDate);
    }

    const [data, total] = await Promise.all([
      this.prisma.learningRecord.findMany({
        where,
        skip,
        take: perPage,
        orderBy: { createdAt: 'desc' },
        include: {
          level: {
            select: {
              id: true,
              title: true,
              module: true,
              ageGroup: true,
              stage: true,
            },
          },
        },
      }),
      this.prisma.learningRecord.count({ where }),
    ]);

    return {
      data: data.map((r) => this.mapRecord(r)),
      meta: {
        page,
        per_page: perPage,
        total,
      },
    };
  }

  async getStats(childId: string) {
    const records = await this.prisma.learningRecord.findMany({
      where: { childId },
    });

    const totalAttempts = records.length;
    const correctAttempts = records.filter((r) => r.correct).length;
    const totalTimeSpent = records.reduce((sum, r) => sum + r.timeSpent, 0);

    return {
      totalAttempts,
      correctAttempts,
      incorrectAttempts: totalAttempts - correctAttempts,
      correctRate: totalAttempts > 0 ? correctAttempts / totalAttempts : 0,
      totalTimeSpent,
    };
  }

  private mapRecord(prismaRecord: any): LearningRecord {
    return {
      id: prismaRecord.id,
      childId: prismaRecord.childId,
      levelId: prismaRecord.levelId,
      correct: prismaRecord.correct,
      timeSpent: prismaRecord.timeSpent,
      answer: prismaRecord.answer ?? undefined,
      emotion: prismaRecord.emotion ?? undefined,
      createdAt: prismaRecord.createdAt.toISOString(),
    };
  }
}
