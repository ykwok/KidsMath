import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { RecommendationEngine } from './recommendation.engine';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  providers: [LevelsService, RecommendationEngine],
  controllers: [LevelsController],
})
export class LevelsModule {}
