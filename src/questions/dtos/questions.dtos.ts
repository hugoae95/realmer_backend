import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsArray,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateQuestionsDto {
  @IsString()
  @ApiProperty({ description: 'value option' })
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly image: string;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly optionId: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly nodeId: number;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly options: [];
}

export class UpdateQuestionsDto extends PartialType(CreateQuestionsDto) {}
