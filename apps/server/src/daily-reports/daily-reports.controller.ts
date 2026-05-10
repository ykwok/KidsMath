import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DailyReportsService } from './daily-reports.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('api/v1/daily-reports')
@UseGuards(JwtAuthGuard)
export class DailyReportsController {
  constructor(private readonly dailyReportsService: DailyReportsService) {}

  @Get('today')
  async getToday(@Query('childId') childId: string) {
    return this.dailyReportsService.getTodayReport(childId);
  }

  @Get()
  async findAll(
    @Query('childId') childId: string,
    @Query('page') page?: string,
    @Query('perPage') perPage?: string,
  ) {
    return this.dailyReportsService.findAll(
      childId,
      page ? Number(page) : 1,
      perPage ? Number(perPage) : 20,
    );
  }

  @Get('weekly')
  async getWeekly(@Query('childId') childId: string) {
    return this.dailyReportsService.getWeeklySummary(childId);
  }
}
