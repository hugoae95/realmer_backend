import { IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateTriviaDto {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'value option' })
  readonly userId: number;
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'value option' })
  readonly nodeId: number;
}

export class UpdateTriviaDto extends PartialType(CreateTriviaDto) {}
