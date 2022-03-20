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
  CreateNodesFieldsValueDto,
  UpdateNodesFieldsValueDto,
} from '../dtos/nodes_fields_value.dtos';
import { NodeFieldsValueService } from '../services/node_fields_value.service';

@ApiTags('Nodes Field value')
@Controller('node_fields_value')
export class NodeFieldValueController {
  constructor(private termFieldValueService: NodeFieldsValueService) {}
  @Get()
  findAll() {
    return this.termFieldValueService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.termFieldValueService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateNodesFieldsValueDto) {
    return this.termFieldValueService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateNodesFieldsValueDto,
  ) {
    return this.termFieldValueService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.termFieldValueService.remove(+id);
  }
}
