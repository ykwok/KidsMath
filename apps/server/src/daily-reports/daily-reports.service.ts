import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DailyReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getTodayReport(childId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let report = await this.prisma.dailyReport.findUnique({
      where: {
        childId_date: {
          childId,
          date: today,
        },
      },
    });

    if (!report) {
      report = await this.generateReport(childId, today);
    }

    return report;
  }

  async findAll(childId: string, page = 1, perPage = 20) {
    const skip = (page - 1) * perPage;

    const [data, total] = await Promise.all([
      this.prisma.dailyReport.findMany({
        where: { childId },
        skip,
        take: perPage,
        orderBy: { date: 'desc' },
      }),
      this.prisma.dailyReport.count({ where: { childId } }),
    ]);

    return {
      data,
      meta: {
        page,
        per_page: perPage,
        total,
      },
    };
  }

  async getWeeklySummary(childId: string) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const reports = await this.prisma.dailyReport.findMany({
      where: {
        childId,
        date: {
          gte: sevenDaysAgo,
          lte: today,
        },
      },
      orderBy: { date: 'asc' },
    });

    const totalTime = reports.reduce((sum, r) => sum + r.totalTime, 0);
    const totalLevels = reports.reduce((sum, r) => sum + r.levelsCompleted, 0);
    const avgCorrectRate =
      reports.length > 0
        ? reports.reduce((sum, r) => sum + r.correctRate, 0) / reports.length
        : 0;

    return {
      startDate: sevenDaysAgo.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0],
      totalTime,
      totalLevelsCompleted: totalLevels,
      avgCorrectRate,
      dailyReports: reports,
    };
  }

  private async generateReport(childId: string, date: Date) {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);

    const records = await this.prisma.learningRecord.findMany({
      where: {
        childId,
        createdAt: {
          gte: date,
          lt: nextDay,
        },
      },
    });

    const totalTime = records.reduce((sum, r) => sum + r.timeSpent, 0);
    const levelsCompleted = records.length;
    const correctCount = records.filter((r) => r.correct).length;
    const correctRate = records.length > 0 ? correctCount / records.length : 0;

    const emotions = records
      .map((r) => r.emotion)
      .filter(Boolean) as string[];
    const emotionSummary = emotions.length > 0 ? this.summarizeEmotions(emotions) : null;

    const tips = this.generateTips(correctRate, totalTime);

    return this.prisma.dailyReport.create({
      data: {
        childId,
        date,
        totalTime,
        levelsCompleted,
        correctRate,
        emotionSummary,
        tips,
      },
    });
  }

  private summarizeEmotions(emotions: string[]): string {
    const counts: Record<string, number> = {};
    for (const e of emotions) {
      counts[e] = (counts[e] || 0) + 1;
    }
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return sorted.map(([e, c]) => `${e}(${c})`).join(', ');
  }

  private generateTips(correctRate: number, totalTime: number): string {
    if (correctRate < 0.5) {
      return '宝贝今天遇到了一些挑战，建议从更简单的实物操作关卡开始，建立信心后再逐步提升难度。';
    }
    if (totalTime < 60) {
      return '今天的学习时间较短，建议每天保持 10-15 分钟的学习节奏，培养良好的数感习惯。';
    }
    if (correctRate > 0.9) {
      return '宝贝今天表现非常棒！可以尝试更高难度的抽象思维关卡，进一步拓展数感能力。';
    }
    return '今天学习状态不错，继续保持这个节奏，明天会有更大的进步哦！';
  }
}
