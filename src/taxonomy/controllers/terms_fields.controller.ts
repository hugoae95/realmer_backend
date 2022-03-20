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
  CreateTermsFieldsDto,
  UpdateTermsFieldsDto,
} from '../dtos/terms_fields.dtos';
import { TermFieldsService } from '../services/term_fields.service';

@ApiTags('Term fields')
@Controller('term_fields')
export class TermFieldController {
  constructor(private termFieldService: TermFieldsService) {}
  @Get()
  findAll() {
    return this.termFieldService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.termFieldService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateTermsFieldsDto) {
    return this.termFieldService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTermsFieldsDto,
  ) {
    return this.termFieldService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.termFieldService.remove(+id);
  }
}
