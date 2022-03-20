import { IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateFieldBrandDto {
  @IsPositive()
  @ApiProperty()
  readonly termId: number;

  @IsPositive()
  @ApiProperty()
  readonly nodeId: number;
}

export class UpdateFieldBrandDto extends PartialType(CreateFieldBrandDto) {}
