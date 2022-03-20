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
import { CreateTaxonomyDto, UpdateTaxonomyDto } from '../dtos/taxonomy.dtos';

import { TaxonomyService } from '../services/taxonomy.service';

@ApiTags('Taxonomy')
@Controller('taxonomy')
export class TaxonomyController {
  constructor(private taxonomyService: TaxonomyService) {}
  @Get()
  findAll() {
    return this.taxonomyService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.taxonomyService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateTaxonomyDto) {
    return this.taxonomyService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTaxonomyDto,
  ) {
    return this.taxonomyService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.taxonomyService.remove(+id);
  }
}
