import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LearningRecordsService } from './learning-records.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CreateLearningRecordDto, QueryLearningRecordsDto } from './learning-records.dto';

@Controller('api/v1/learning-records')
@UseGuards(JwtAuthGuard)
export class LearningRecordsController {
  constructor(private readonly learningRecordsService: LearningRecordsService) {}

  @Post()
  async create(@Body() dto: CreateLearningRecordDto) {
    return this.learningRecordsService.create(dto);
  }

  @Get()
  async findAll(@Query() query: QueryLearningRecordsDto) {
    return this.learningRecordsService.findAll(query);
  }

  @Get('stats')
  async getStats(@Query('childId') childId: string) {
    return this.learningRecordsService.getStats(childId);
  }
}
