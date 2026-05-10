import { IsString, IsBoolean, IsInt, IsOptional, Min, IsDateString } from 'class-validator';

export class CreateLearningRecordDto {
  @IsString()
  childId: string;

  @IsString()
  levelId: string;

  @IsBoolean()
  correct: boolean;

  @IsInt()
  @Min(0)
  timeSpent: number;

  @IsOptional()
  @IsString()
  answer?: string;

  @IsOptional()
  @IsString()
  emotion?: string;
}

export class QueryLearningRecordsDto {
  @IsString()
  childId: string;

  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  perPage?: string;
}
