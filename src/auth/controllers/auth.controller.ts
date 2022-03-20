import {
  Body,
  Controller,
  HttpStatus,
  NotFoundException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './../services/auth.service';
import { UsersService } from './../../users/services/users.service';
import { User } from './../../users/entities/user.entity';
import {
  CodeDto,
  CreatePasswordCodeDto,
} from 'src/users/dtos/password-code.dto';
import { MailService } from 'src/mail/services/mail.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AuthUser } from '../decorators/user.decorator';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PayloadToken } from '../models/token.model';
import { error } from 'console';
import { LoginDto } from '../dtos/login.dtos';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private mailService: MailService,
  ) {}

  @Post('remember')
  rememberPassword(@Res() res, @Body() payload: CreatePasswordCodeDto) {
    this.userService
      .findByEmail(payload.email)
      .then(async (user: User) => {
        if (!user) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: 'Email does not exists' });
        }
        this.authService.generateRememberCode(user).then((passwordCode) => {
          this.mailService.sendUserCode(
            passwordCode.code,
            passwordCode.user.email,
          );
          const jwt = this.authService.generateJWT(user);
          if (!jwt) {
            return res
              .status(HttpStatus.BAD_REQUEST)
              .json({ message: 'Token not found' });
          }
          return res.status(HttpStatus.OK).json({
            message: 'Password code generate',
            code: passwordCode.code,
            token: jwt.access_token,
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('newpassword')
  newPassword(
    @Res() res,
    @AuthUser() user: PayloadToken,
    @Body() payload: CodeDto,
  ) {
    const promise = this.authService.changePassword(user.sub, payload);
    promise
      .then((data) => {
        if (!data) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: 'Code not found' });
        }
        return res.status(HttpStatus.OK).json({ message: 'Password Change' });
      })
      .catch((err) => {
        console.error(err);
      });
    return '';
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.generateJWT(req.user as User);
  }
}
