import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../../users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreateTrackingDto,
  FindParamsSearch,
  FindQuestionsParamsSearch,
  UpdateTrackingDto,
  FindGeneralUser,
  FindParamsPillar,
} from '../dtos/tracking.dtos';
import { Tracking } from '../entities/tracking.entity';
import { Term } from './../../taxonomy/entities/term.entity';
import { Type } from '../models/type.model';
import { DocumentsService } from './../../documents/services/documents.service';
import { NodesService } from './../../nodes/services/nodes.services';
import { CommentsService } from './../../comments/services/comments.service';
import { TriviaService } from './../../questions/services/trivia.service';
import { Node } from '../../nodes/entities/node.entity';

@Injectable()
export class TrackingService {
  constructor(
    @InjectRepository(Tracking) private repo: Repository<Tracking>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Term) private termRepo: Repository<Term>,
    @InjectRepository(Node) private nodeRepo: Repository<Node>,
    private documentsService: DocumentsService,
    private nodeService: NodesService,
    private commentsService: CommentsService,
    private triviaService: TriviaService,
  ) {}
  findAll = async () => {
    return await this.repo.find();
  };

  findOne = async (id: number) => {
    const tracking = await this.repo.findOne(id);
    if (!tracking) {
      throw new NotFoundException(`Tracking #${id} not found`);
    }
    return tracking;
  };

  create = async (data: CreateTrackingDto) => {
    const newTracking = this.repo.create(data);
    if (data.userId) {
      const user = await this.userRepo.findOne(data.userId);
      if (!user) {
        throw new NotFoundException(`User #${data.userId} not found`);
      }
      newTracking.user = user;
    }
    if (data.termId) {
      const term = await this.termRepo.findOne(data.termId);
      if (!term) {
        throw new NotFoundException(`Term #${data.termId} not found`);
      }
      newTracking.term = term;
    }
    if (data.brandId) {
      const brand = await this.termRepo.findOne(data.brandId);
      if (!brand) {
        throw new NotFoundException(`Brand #${data.brandId} not found`);
      }
      newTracking.brand = brand;
    }
    if (data.entityId) {
      newTracking.entity_id = data.entityId;
    }
    if (data.nodeId) {
      const node = await this.nodeRepo.findOne(data.nodeId);
      if (!node) {
        throw new NotFoundException(`Node #${data.nodeId} not found`);
      }
      newTracking.node = node;
    }
    return this.repo.save(newTracking);
  };

  update = async (id: number, changes: UpdateTrackingDto) => {
    const tracking = await this.findOne(id);
    this.repo.merge(tracking, changes);
    return this.repo.save(tracking);
  };

  remove = (id: number) => {
    return this.repo.delete(id);
  };

  mapTracking = async (
    tracking: Tracking[],
    userId: number,
    type: Type,
    params: any = null,
  ) => {
    const contents = await this.getContent(tracking, userId, type, params);
    return contents;
  };

  getByUserTermBrand = async (params: FindParamsSearch) => {
    const { userId, termId, brandId, type } = params;
    const tracking = await this.repo
      .createQueryBuilder('tracking')
      .where('tracking.user = :userId', { userId })
      .andWhere('tracking.brand = :brandId', { brandId })
      .andWhere('tracking.term = :termId', { termId })
      .andWhere('tracking.type = :type', { type })
      .orderBy('tracking.create_at', 'DESC')
      .getMany();
    return tracking;
  };

  getByUserTermBrandPillar = async (
    params: FindParamsPillar,
    termId: number,
    type: string,
  ) => {
    const { userId, brandId, pilarId } = params;
    const tracking = await this.repo
      .createQueryBuilder('tracking')
      .where('tracking.user = :userId', { userId })
      .andWhere('tracking.brand = :brandId', { brandId })
      .andWhere('tracking.term = :termId', { termId })
      .andWhere('tracking.type = :type', { type })
      .andWhere('tracking.node_id = :pilarId', { pilarId })
      .orderBy('tracking.create_at', 'DESC')
      .getMany();
    return tracking;
  };

  groupBy = (array: Tracking[], key: string) => {
    const tempResult = [];
    array.forEach((item) => {
      const find = tempResult.find((value) => item[key] === value[key]);
      if (!find) {
        tempResult.push(item);
      }
    });
    return tempResult;
  };

  getContentsUser = async (
    userId: number,
    contentTypeId: number,
    termId: number,
    brandId: number,
  ) => {
    const node = await this.nodeService.findOneByWhereCustom(
      userId,
      contentTypeId,
      termId,
      brandId,
    );
    return node;
  };

  getContent = async (
    tracking: Tracking[],
    userId: number,
    type: Type,
    params: FindParamsSearch = null,
  ) => {
    const time = this.getCountTime(tracking);
    const tempItems = this.groupBy(tracking, 'entity_id');
    const items = await this.mapContentsByType(tempItems, type);
    return Promise.all(items).then(async (data) => {
      const response = { data, length: data.length, time };
      let termId = 0;
      let brandId = 0;
      if (params) {
        termId = params.termId;
        brandId = params.brandId;
      }
      if (type === Type.COMMENT) {
        const forums = await this.getContentsUser(userId, 9, termId, brandId);
        response['forum'] = forums.length;
        response['data'] = forums;
      }
      if (type === Type.DOCUMENT) {
        data.map((item) => {
          let timer = 0;
          tracking.map((tra) => {
            if (item.id === tra.entity_id) {
              timer = tra.time;
            }
          });
          item.time = timer;
          return item;
        });
        response['data'] = data;
      }
      return response;
    });
  };

  mapContentsByType = async (tracking: Tracking[], type: Type) => {
    return tracking.map(async (item) => {
      switch (type) {
        case Type.DOCUMENT:
          const document = await this.documentsService.findOne(item.entity_id);
          return this.nodeService.mapNode(document);
        case Type.COMMENT:
          const comment = await this.commentsService.findOne(item.entity_id);
          return comment;
      }
    });
  };

  getCountTime = (tracking: Tracking[]) => {
    let time = 0;
    if (tracking.length > 0) {
      tracking.forEach((track: Tracking) => {
        time = time + track.time;
      });
    }
    return time;
  };

  getUserByQuestions = async (params: FindQuestionsParamsSearch) => {
    const trivias = await this.triviaService.getTriviasByTermBrand(params);
    const result = await this.triviaService.mapResult(trivias);
    const mapByNode = await this.triviaService.transformByNode(result);
    const tracking = await this.generateQuestionsTracking(mapByNode);
    return tracking;
  };

  generateQuestionsTracking = async (tracking: any) => {
    let average = 0;
    let time = 0;
    let winner = 0;
    let finish = 0;
    tracking.forEach((item: any) => {
      if (item.trivias.length > 0) {
        finish = finish + this.getFinishQuestions(item);
        time = time + this.getTimeQuestions(item.trivias);
        average = average + item.trivias[0].porcentual;
        if (item.trivias[0].winner) {
          winner = winner + 1;
        }
      }
    });
    if (tracking.length > 0) {
      average = average / tracking.length;
    }
    const items = await this.getNodesQuestions(tracking);
    return Promise.all(items).then((nodes) => {
      const newAverage = Math.round(average);
      return { finish, average: newAverage, time, winner, nodes };
    });
  };

  getNodesQuestions = (tracking: any) => {
    return tracking.map(async (item: any) => {
      const tempNode = await this.nodeService.findOne(item.nodeId);
      const node = await this.nodeService.getInfo(tempNode);
      return {
        porcentual: item.porcentual,
        node,
      };
    });
  };

  getFinishQuestions = (item: any) => {
    let finish = 0;
    if (item.trivias[0].finish) {
      finish = 1;
    }
    return finish;
  };

  getTimeQuestions = (trivias: []) => {
    let time = 0;
    trivias.forEach((item: any) => {
      time = time + item.durations;
    });
    return time;
  };

  getByUserType = async (userId: number, type: Type) => {
    const tracking = await this.repo
      .createQueryBuilder('tracking')
      .where('tracking.user = :userId', { userId })
      .andWhere('tracking.type = :type', { type })
      .orderBy('tracking.create_at', 'DESC')
      .getMany();
    return tracking;
  };

  getGeneralUserTrivias = async (userId: number) => {
    const trivias = await this.triviaService.getTriviasByUser(userId);
    const result = await this.triviaService.mapResult(trivias);
    const mapByNode = await this.triviaService.transformByNode(result);
    const tracking = await this.generateQuestionsTracking(mapByNode);
    return tracking;
  };

  getGeneralByUser = async (params: FindGeneralUser) => {
    const { userId } = params;
    const contents = await this.getByUserType(userId, Type.DOCUMENT);
    const mapContents = await this.mapTracking(contents, userId, Type.DOCUMENT);
    const comments = await this.getByUserType(userId, Type.COMMENT);
    const mapComments = await this.mapTracking(comments, userId, Type.COMMENT);
    const mapQuestions = await this.getGeneralUserTrivias(userId);
    return {
      contents: mapContents,
      comments: mapComments,
      questions: mapQuestions,
    };
  };
}
