import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateOptionsDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'value option' })
  readonly value: string;
}

export class UpdateOptionsDto extends PartialType(CreateOptionsDto) {}
