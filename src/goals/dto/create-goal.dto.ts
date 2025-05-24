import {
  IsString,
  IsBoolean,
  IsOptional,
  IsISO8601,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGoalDto {
  @ApiProperty({ example: 'Finish Backend' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 'Complete all backend logic using NestJS' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '2025-06-01T12:00:00Z' })
  @IsISO8601()
  deadline: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isPublic: boolean;

  @ApiPropertyOptional({ example: '664f78e4b9d78a7adcd45d32' })
  @IsOptional()
  @IsString()
  parentId?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  order: number;
}
