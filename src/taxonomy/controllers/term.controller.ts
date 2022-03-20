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

import { CreateTermDto, UpdateTermDto } from '../dtos/term.dtos';
import { TermService } from '../services/term.service';

@ApiTags('Terms')
@Controller('term')
export class TermController {
  constructor(private termService: TermService) {}
  @Get()
  async findAll() {
    return await this.termService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.termService.findOne(id);
  }

  @Get('taxonomy/:id')
  async getByTaxonomyId(@Param('id', ParseIntPipe) id: number) {
    return await this.termService.findAll(id);
  }

  @Get('/nodes/:id')
  async getTermWithNodes(@Param('id', ParseIntPipe) id: number) {
    const nodesTemp = await this.termService.findTermNodes(id, false);
    if (nodesTemp.nodes && nodesTemp.nodes.length > 0) {
      nodesTemp.nodes.forEach((node: any) => {
        node.fields.map((field: { name: string; value: string }) => {
          node[field.name] = field.value;
          return node;
        });
      });
    }
    return nodesTemp;
  }

  @Get('/nodes/:id/service')
  async getTermWithNodesBack(@Param('id', ParseIntPipe) id: number) {
    const nodesTemp = await this.termService.findTermNodes(id, false);
    return nodesTemp;
  }

  @Get('/nodes/:term/:termBrand')
  async getTermWithNodesTerm(
    @Param('term', ParseIntPipe) id: number,
    @Param('termBrand', ParseIntPipe) term: number,
  ) {
    const nodesTemp = await this.termService.findTermNodesTerm(id, term);
    return nodesTemp;
  }

  @Get('/landing/:term/:termBrand')
  async getLandingWithNodesTerm(
    @Param('term', ParseIntPipe) id: number,
    @Param('termBrand', ParseIntPipe) term: number,
  ) {
    const landing = await this.termService.findTermNodesTerm(id, term);
    return landing;
  }

  @Get('/pillars/:termBrand')
  async getPillarsByBrand(@Param('termBrand', ParseIntPipe) term: number) {
    const pillars = await this.termService.findNodesPillarByBrand(
      term,
      false,
      'landing',
    );
    return pillars;
  }

  @Get('/news/:term/:termBrand')
  async getNewsWithNodesTerm(
    @Param('term', ParseIntPipe) id: number,
    @Param('termBrand', ParseIntPipe) term: number,
  ) {
    const news = await this.termService.findTermNodesTerm(id, term);
    return news;
  }

  @Get('/nav/:term/:termBrand')
  async getTermByNavBrand(
    @Param('term', ParseIntPipe) id: number,
    @Param('termBrand', ParseIntPipe) term: number,
  ) {
    return await this.termService.findTermNodesTerm(id, term);
  }

  @Post()
  create(@Body() payload: CreateTermDto) {
    return this.termService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTermDto,
  ) {
    return this.termService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.termService.remove(+id);
  }
}
