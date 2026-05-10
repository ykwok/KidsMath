import {
  Controller,
  Get,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { LevelsService } from './levels.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('api/v1/levels')
@UseGuards(JwtAuthGuard)
export class LevelsController {
  constructor(private readonly levelsService: LevelsService) {}

  @Get()
  async findAll(
    @Query('module') module?: string,
    @Query('ageGroup') ageGroup?: string,
    @Query('stage') stage?: string,
  ) {
    return this.levelsService.findAll({ module, ageGroup, stage });
  }

  @Get('today')
  async getToday(@CurrentUser('sub') userId: string) {
    return this.levelsService.getTodayRecommended(userId);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.levelsService.findById(id);
  }
}
