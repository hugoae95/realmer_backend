import { IsString, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTermsFieldsValueDto {
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly termId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly termFieldId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly value: string;
}

export class UpdateTermsFieldsValueDto extends PartialType(
  CreateTermsFieldsValueDto,
) {}
