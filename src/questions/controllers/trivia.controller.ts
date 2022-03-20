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
import { CreateTriviaDto, UpdateTriviaDto } from '../dtos/trivia.dtos';
import { TriviaService } from '../services/trivia.service';

@ApiTags('Trivia')
@Controller('trivia')
export class TriviaController {
  constructor(private service: TriviaService) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Get('result/:id')
  async getResult(@Param('id', ParseIntPipe) id: number) {
    return await this.service.createResult(id);
  }

  @Post()
  create(@Body() payload: CreateTriviaDto) {
    return this.service.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTriviaDto,
  ) {
    return this.service.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(+id);
  }
}
