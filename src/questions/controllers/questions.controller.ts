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
import { CreateQuestionsDto, UpdateQuestionsDto } from '../dtos/questions.dtos';
import { QuestionsService } from './../services/questions.service';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private service: QuestionsService) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOneIns(id);
  }

  @Post()
  create(@Body() payload: CreateQuestionsDto) {
    return this.service.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateQuestionsDto,
  ) {
    return this.service.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(+id);
  }
}
