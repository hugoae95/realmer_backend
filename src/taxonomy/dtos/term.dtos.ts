import { IsString, IsNotEmpty, IsPositive, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTermDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @ApiProperty()
  readonly description: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly image: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  readonly copy: string;

  @IsPositive()
  @ApiProperty()
  readonly publish: number;

  @IsPositive()
  @ApiProperty()
  readonly userId: number;

  @IsPositive()
  @ApiProperty()
  readonly taxonomyId: number;
}

export class UpdateTermDto extends PartialType(CreateTermDto) {}
