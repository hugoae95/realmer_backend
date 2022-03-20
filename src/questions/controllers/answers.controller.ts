import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAnswersDto, UpdateAnswersDto } from '../dtos/answers.dtos';
import { AnswersService } from '../services/answers.service';

@ApiTags('Answers')
@Controller('answers')
export class AnswersController {
  constructor(private service: AnswersService) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateAnswersDto) {
    return this.service.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAnswersDto,
  ) {
    return this.service.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(+id);
  }
}
