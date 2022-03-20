import { IsString, IsNotEmpty, IsPositive, IsOptional } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly value: string;

  @IsPositive()
  @ApiProperty()
  readonly userId: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly nodeId: number;
}

export class CreateCommentNodeDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly commentId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly nodeId: number;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}

export class UpdateCommentNodeDto extends PartialType(CreateCommentNodeDto) {}
