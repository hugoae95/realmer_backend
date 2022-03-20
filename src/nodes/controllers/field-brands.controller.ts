import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from './../../auth/decorators/public.decorator';
import { CreateFieldBrandDto } from '../dtos/field-brand.dtos';
import { FieldBrandService } from '../services/field-brand.services';

@ApiTags('Field Brand')
@Controller('field_brand')
export class FieldBrandController {
  constructor(private service: FieldBrandService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of field brand' })
  getAll() {
    return this.service.findAll();
  }

  @Public()
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateFieldBrandDto) {
    return this.service.create(payload);
  }
}
