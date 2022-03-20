import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsPositive,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { Role } from './../../auth/models/roles.model';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'the email of user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  readonly password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  @ApiProperty()
  readonly role: Role;

  @IsOptional()
  @IsPositive()
  @ApiProperty()
  readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
