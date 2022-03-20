import { IsString, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTaxonomyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsPositive()
  @ApiProperty()
  readonly publish: number;

  @IsPositive()
  @ApiProperty()
  readonly userId: number;
}

export class UpdateTaxonomyDto extends PartialType(CreateTaxonomyDto) {}
