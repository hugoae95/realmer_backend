import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from './../users/users.module';
import { AuthController } from './controllers/auth.controller';
import config from './../config';
import { UsersService } from 'src/users/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { PasswordCode } from 'src/users/entities/password-code.entity';
import { ProductsService } from 'src/products/services/products.service';
import { CustomersService } from 'src/users/services/customers.service';
import { Product } from 'src/products/entities/product.entity';
import { Customer } from 'src/users/entities/customer.entity';
import { Brand } from 'src/products/entities/brand.entity';
import { CategoryProducts } from 'src/products/entities/category.entity';
import { MailService } from 'src/mail/services/mail.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TypeOrmModule.forFeature([
      User,
      PasswordCode,
      Product,
      Customer,
      Brand,
      CategoryProducts,
    ]),
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '10d',
          },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    ProductsService,
    CustomersService,
    LocalStrategy,
    JwtStrategy,
    MailService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
