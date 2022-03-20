import { IsString, IsNotEmpty, Length } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsString()
  @Length(3, 30)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @Length(3, 30)
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsNotEmpty()
  readonly document: string;

  @IsString()
  @Length(1, 1)
  @IsNotEmpty()
  readonly gender: string;

}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
