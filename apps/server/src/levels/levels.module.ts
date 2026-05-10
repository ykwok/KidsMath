import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { RecommendationEngine } from './recommendation.engine';

@Module({
  providers: [LevelsService, RecommendationEngine],
  controllers: [LevelsController],
})
export class LevelsModule {}
