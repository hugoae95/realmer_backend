import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Res,
  Put,
  Delete,
  ParseIntPipe,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { MailService } from 'src/mail/services/mail.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private mailService: MailService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOrderByUser(id);
  }

  @Post()
  async create(@Res() res, @Body() payload: CreateUserDto) {
    this.usersService
      .findByEmail(payload.email)
      .then(async (user) => {
        if (user) {
          return res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: 'Email already exists' });
        }
        this.usersService.create(payload).then((user) => {
          return res
            .status(HttpStatus.OK)
            .json({ message: 'User has been created successfully', user });
        });
      })
      .catch((e) => console.log(e));
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }
}
