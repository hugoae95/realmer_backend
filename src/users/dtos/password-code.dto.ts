import { IsString, IsNotEmpty, IsEmail, IsPositive } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreatePasswordCodeDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;
}

export class CreateUserCodeDto {
  @IsString()
  code: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly publish: string;

  @IsPositive()
  @ApiProperty()
  readonly userId: number;
}

export class CodeDto {
  @IsString()
  code: string;

  @IsString()
  password: string;
}

export class UpdatePasswordCodeDto extends PartialType(CreatePasswordCodeDto) {}
