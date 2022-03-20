import { IsNotEmpty, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateAnswersDto {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'value trivia' })
  readonly triviaId: number;
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'value question' })
  readonly questionId: number;
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'value option' })
  readonly optionId: number;
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'value time' })
  readonly time: number;
}

export class UpdateAnswersDto extends PartialType(CreateAnswersDto) {}
