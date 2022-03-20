import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

export class LoginDto {
  @IsString()
  @ApiProperty({ description: 'Mail user' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Password user' })
  readonly password: string;

  readonly user: User;
}
