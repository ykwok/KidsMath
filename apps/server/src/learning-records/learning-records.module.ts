import { Module } from '@nestjs/common';
import { LearningRecordsService } from './learning-records.service';
import { LearningRecordsController } from './learning-records.controller';

@Module({
  providers: [LearningRecordsService],
  controllers: [LearningRecordsController],
})
export class LearningRecordsModule {}
