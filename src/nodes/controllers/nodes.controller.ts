import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from './../../auth/decorators/public.decorator';
import { CreateNodeDto, UpdateNodeDto } from '../dtos/node.dtos';
import { NodesService } from '../services/nodes.services';

@ApiTags('Nodes')
@Controller('nodes')
export class NodesController {
  constructor(private service: NodesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of nodes' })
  async getAll() {
    const nodes = await this.service.findAll();
    nodes.map((node) => {
      return this.service.mapNode(node);
    });
    return nodes;
  }

  @Public()
  @Get(':nodeId')
  @HttpCode(HttpStatus.ACCEPTED)
  async getOne(@Param('nodeId', ParseIntPipe) nodeId: number) {
    const node = await this.service.findOne(nodeId);
    return this.service.getInfo(node, true);
  }

  @Public()
  @Get(':nodeId/service')
  @HttpCode(HttpStatus.ACCEPTED)
  async getOneBack(@Param('nodeId', ParseIntPipe) nodeId: number) {
    const node = await this.service.findOne(nodeId);
    return this.service.getInfo(node, false);
  }

  @Public()
  @Get('key/:key')
  @HttpCode(HttpStatus.ACCEPTED)
  getOneByKey(@Param('key') key: string) {
    return this.service.findOneByKey(key);
  }

  @Post()
  create(@Body() payload: CreateNodeDto) {
    return this.service.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateNodeDto,
  ) {
    return this.service.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(+id);
  }
}
