import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateChildDto {
  @IsString()
  nickname: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string;
}
