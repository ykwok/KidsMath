import { Module } from '@nestjs/common';
import { LearningRecordsService } from './learning-records.service';
import { LearningRecordsController } from './learning-records.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [AuthModule, PrismaModule],
  providers: [LearningRecordsService],
  controllers: [LearningRecordsController],
})
export class LearningRecordsModule {}
