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
  CreateTermsFieldsValueDto,
  UpdateTermsFieldsValueDto,
} from '../dtos/terms_fields_value.dtos';
import { TermFieldsValueService } from '../services/term_fields_value.service';

@ApiTags('Terms Field value')
@Controller('term_fields_value')
export class TermFieldValueController {
  constructor(private termFieldValueService: TermFieldsValueService) {}
  @Get()
  findAll() {
    return this.termFieldValueService.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.termFieldValueService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateTermsFieldsValueDto) {
    return this.termFieldValueService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTermsFieldsValueDto,
  ) {
    return this.termFieldValueService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.termFieldValueService.remove(+id);
  }
}
