import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LevelsModule } from './levels/levels.module';
import { LearningRecordsModule } from './learning-records/learning-records.module';
import { DailyReportsModule } from './daily-reports/daily-reports.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    LevelsModule,
    LearningRecordsModule,
    DailyReportsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
