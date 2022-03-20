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
  CreateTrackingDto,
  UpdateTrackingDto,
  FindParamsSearch,
  FindQuestionsParamsSearch,
  FindGeneralUser,
  FindParamsPillar,
} from './../dtos/tracking.dtos';
import { Type } from './../models/type.model';
import { TrackingService } from './../services/tracking.service';

@ApiTags('Tracking')
@Controller('tracking')
export class TrackingController {
  constructor(private service: TrackingService) {}
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  get(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateTrackingDto) {
    return this.service.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateTrackingDto,
  ) {
    return this.service.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(+id);
  }

  @Get('user/:userId/term/:termId/brand/:brandId/type/:type')
  async getByUserTermBrand(@Param() params: FindParamsSearch) {
    const tracking = await this.service.getByUserTermBrand(params);
    const map = await this.service.mapTracking(
      tracking,
      params.userId,
      params.type,
      params,
    );
    return map;
  }

  @Get('user/:userId/brand/:brandId/pillar/:pilarId')
  async getByUserPillar(@Param() params: FindParamsPillar) {
    const type = Type.DOCUMENT;
    const tracking = await this.service.getByUserTermBrandPillar(
      params,
      10,
      type,
    );
    const map = await this.service.mapTracking(
      tracking,
      params.userId,
      type,
      params,
    );
    return map;
  }

  @Get('questions/user/:userId/term/:termId/brand/:brandId/')
  async getByQuestionsUser(@Param() params: FindQuestionsParamsSearch) {
    const tracking = this.service.getUserByQuestions(params);
    return tracking;
  }

  @Get('general/user/:userId')
  async getGeneralByUser(@Param() params: FindGeneralUser) {
    const tracking = await this.service.getGeneralByUser(params);
    return tracking;
  }
}
