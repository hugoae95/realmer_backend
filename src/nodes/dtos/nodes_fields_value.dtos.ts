import { IsString, IsNotEmpty, IsPositive, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateNodesFieldsValueDto {
  @IsPositive()
  @ApiProperty()
  readonly nodeId: number;

  @IsPositive()
  @ApiProperty()
  readonly nodeFieldId: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  readonly value: string;
}

export class UpdateNodesFieldsValueDto extends PartialType(
  CreateNodesFieldsValueDto,
) {}
