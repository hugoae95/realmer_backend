import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Type } from './../models/type.model';

export class CreateTrackingDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'tracking value.' })
  readonly value: string;

  @IsPositive()
  @ApiProperty()
  readonly time: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly entityId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;

  @IsEnum(Type)
  @IsNotEmpty()
  @ApiProperty()
  readonly type: Type;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly termId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;

  @IsPositive()
  @IsOptional()
  @ApiProperty()
  readonly nodeId: number;
}
export class FindParamsSearch {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly termId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;

  @IsEnum(Type)
  @IsNotEmpty()
  @ApiProperty()
  readonly type: Type;
}
export class FindParamsPillar {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly pilarId: number;
}
export class FindQuestionsParamsSearch {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly termId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly brandId: number;
}
export class FindGeneralUser {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;
}
export class UpdateTrackingDto extends PartialType(CreateTrackingDto) {}
