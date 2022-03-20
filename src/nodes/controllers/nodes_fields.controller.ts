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
  CreateNodesFieldsDto,
  UpdateNodesFieldsDto,
} from './../dtos/nodes_fields.dtos';
import { NodeFieldsService } from '../services/node_fields.service';

@ApiTags('Node fields')
@Controller('node_fields')
export class NodeFieldController {
  constructor(private nodeFieldService: NodeFieldsService) {}
  @Get()
  findAll() {
    return this.nodeFieldService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.nodeFieldService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateNodesFieldsDto) {
    return this.nodeFieldService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateNodesFieldsDto,
  ) {
    return this.nodeFieldService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.nodeFieldService.remove(+id);
  }
}
