import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsArray,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateNodeDto {
  @IsString()
  @ApiProperty({ description: 'the title of node' })
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly image: string;

  @IsOptional()
  @ApiProperty()
  readonly url: string;

  @IsString()
  @ApiProperty()
  readonly key: string;

  @IsPositive()
  @ApiProperty()
  readonly publish: number;

  @IsPositive()
  @ApiProperty()
  readonly userId: number;

  @IsPositive()
  @ApiProperty()
  readonly contentTypeId: number;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly termsIds: number[];

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly documentsIds: number[];

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly commentsIds: number[];

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly questionsIds: number[];

  @IsArray()
  @IsOptional()
  @ApiProperty()
  readonly brandsId: number[];
}

export class UpdateNodeDto extends PartialType(CreateNodeDto) {}
