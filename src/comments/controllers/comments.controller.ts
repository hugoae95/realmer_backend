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
import {
  CreateCommentDto,
  UpdateCommentDto,
  CreateCommentNodeDto,
  UpdateCommentNodeDto,
} from './../dtos/comments.dtos';
import { CommentsService } from './../services/comments.service';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private service: CommentsService) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCommentDto) {
    return this.service.create(payload);
  }

  @Post('node')
  createNodeComment(@Body() payload: CreateCommentNodeDto) {
    return this.service.createNodeComment(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCommentDto,
  ) {
    return this.service.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(+id);
  }
}
