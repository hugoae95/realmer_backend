import { IsString, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateContentTypeDto {
  @IsString()
  @ApiProperty({ description: 'the title of node' })
  readonly name: string;

  @IsPositive()
  @ApiProperty()
  readonly userId: number;
}

export class UpdateContentTypeDto extends PartialType(CreateContentTypeDto) {}
