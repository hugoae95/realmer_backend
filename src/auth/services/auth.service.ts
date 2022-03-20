import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './../../users/services/users.service';
import { User } from './../../users/entities/user.entity';
import { PasswordCode } from 'src/users/entities/password-code.entity';
import { PayloadToken } from './../models/token.model';
import { CodeDto, CreateUserCodeDto } from 'src/users/dtos/password-code.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(PasswordCode)
    private passwordCodeRepo: Repository<PasswordCode>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...rta } = user;
        return rta;
      }
    }
    return null;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  createCodeRandom(length: number) {
    return parseInt(Math.random().toFixed(length).replace('0.', ''));
  }

  async generateRememberCode(user: User) {
    const code = this.createCodeRandom(6).toString();
    const passwordCode = { code, userId: user.id, publish: '1' };
    return this.createUserCode(passwordCode);
  }

  async createUserCode(data: CreateUserCodeDto) {
    const newUser = this.passwordCodeRepo.create(data);
    const user = await this.usersService.findOne(data.userId);
    newUser.user = user;
    return await this.passwordCodeRepo.save(newUser);
  }

  async changePassword(userId: number, codeData: CodeDto) {
    return this.checkCode(userId, codeData.code)
      .then(async (data) => {
        if (!data) {
          return data;
        }
        this.passwordCodeRepo.update(data.id, { publish: '0' });
        const hashPassword = await bcrypt.hash(codeData.password, 10);
        return await this.usersService.update(userId, {
          password: hashPassword,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async checkCode(userId: number, code: string) {
    return await this.passwordCodeRepo.findOne({
      where: { code: code, user: userId, publish: 1 },
    });
  }
}
