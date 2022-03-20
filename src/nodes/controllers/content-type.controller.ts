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
import { CreateContentTypeDto } from '../dtos/content-type.dtos';
import { ContentTypeService } from '../services/content-type.services';

@ApiTags('Content type - Nodes')
@Controller('content_type')
export class ContentTypeController {
  constructor(private service: ContentTypeService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of content type' })
  getAll() {
    return this.service.findAll();
  }

  @Public()
  @Get(':nodeId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('nodeId', ParseIntPipe) nodeId: number) {
    return this.service.findOne(nodeId);
  }

  @Post()
  create(@Body() payload: CreateContentTypeDto) {
    return this.service.create(payload);
  }
}
