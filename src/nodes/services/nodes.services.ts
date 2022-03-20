import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Term } from './../../taxonomy/entities/term.entity';
import { User } from './../../users/entities/user.entity';
import { Repository } from 'typeorm';
import { ContentType } from '../entities/content-type.entity';

import { CommentsService } from './../../comments/services/comments.service';
import { DocumentsService } from './../../documents/services/documents.service';
import { DocumentE } from './../../documents/models/documents.model';
import { Document } from './../../documents/entities/documents.entity';
import { Node } from '../entities/node.entity';
import { CreateNodeDto, UpdateNodeDto } from './../dtos/node.dtos';
import { NodeFieldsService } from './node_fields.service';
import { Question } from './../../questions/entities/question.entity';
import { QuestionsService } from './../../questions/services/questions.service';
import { NodeFields } from '../entities/nodes_fields.entity';
import { FieldBrandService } from './field-brand.services';

@Injectable()
export class NodesService {
  private relations: string[];

  constructor(
    @InjectRepository(Node) private repo: Repository<Node>,
    @InjectRepository(Term) private termRepo: Repository<Term>,
    @InjectRepository(Document) private documentRepo: Repository<Document>,
    @InjectRepository(Question) private questionRepo: Repository<Question>,
    @InjectRepository(ContentType)
    private repoContentType: Repository<ContentType>,
    @InjectRepository(User) private userRepo: Repository<User>,
    private documentsService: DocumentsService,
    private commentsService: CommentsService,
    private fieldService: NodeFieldsService,
    private questionService: QuestionsService,
    private fieldBrandService: FieldBrandService,
  ) {
    this.relations = ['contentType', 'documents', 'comments'];
  }

  findAll = async () => {
    return this.repo.find({
      relations: this.relations,
      order: { createAt: 'DESC' },
    });
  };

  mapNode = async (node: any) => {
    if (node.image) {
      node.image =
        process.env.BASE_URL + '/' + process.env.DO_DIR + '/' + node.image;
    } else {
      node.image = null;
    }
    if (node.type && node.type === 'number') {
      node.value = parseInt(node.value, 10);
    }
    if (node.source) {
      if (node.type === DocumentE.INFOGRAFIA || node.type === DocumentE.PDF) {
        node.source =
          process.env.BASE_URL + '/' + process.env.DO_DIR + '/' + node.source;
      }
      if (node.type && node.type === DocumentE.NODE) {
        const temp = await this.findOne(node.source);
        const nodeTemp = await this.getInfo(temp);
        const multiField = await nodeTemp.fields;
        if (multiField.length > 0) {
          node.source = multiField[0].multiple;
        }
      }
    }
    return await node;
  };

  findByTerms = async (termId: number, brandId: number) => {
    const nodes = this.repo.createQueryBuilder('nodes');
    return await nodes
      .leftJoinAndSelect('nodes.user', 'user')
      .leftJoinAndSelect('user.customer', 'customer')
      .innerJoin('nodes_terms', 'nt', 'nt.node_id=nodes.id')
      .innerJoin('field_brand', 'fb', 'fb.node_id=nodes.id')
      .where('nt.term_id = :id', { id: termId })
      .andWhere('fb.term_id = :tid', { tid: brandId })
      .orderBy('nodes.create_at', 'DESC')
      .getMany();
  };

  findByBrand = async (brandId: number, type: string) => {
    const nodes = this.repo.createQueryBuilder('nodes');
    return await nodes
      .leftJoinAndSelect('nodes.user', 'user')
      .leftJoinAndSelect('user.customer', 'customer')
      .innerJoin('content_type', 'ct', 'ct.id=nodes.content_type_id')
      .innerJoin('field_brand', 'fb', 'fb.node_id=nodes.id')
      .where('ct.name = :type', { type })
      .andWhere('fb.term_id = :tid', { tid: brandId })
      .orderBy('nodes.create_at', 'DESC')
      .getMany();
  };

  getAllInfo = async (nodes: Node[]) => {
    return Promise.all(
      nodes.map(async (node: Node) => {
        return await this.getInfo(node, false);
      }),
    );
  };

  getInfoCommon = async (node: any) => {
    const nodeContentType = await this.repo.findOne(node.id, {
      relations: ['contentType'],
    });
    node.contentType = nodeContentType.contentType;
    node.documents = await this.documentsService.getDocumentsByNode(node.id);
    if (node.documents.length > 0) {
      const documentPromise = node.documents.map(
        async (document: Document) => await this.mapNode(document),
      );
      node.document = await Promise.all(documentPromise);
    }
    node.comments = await this.commentsService.getCommentsByNode(node.id);
    node.questions = await this.questionService.getQuestionsByNode(node.id);
    if (node.questions.length > 0) {
      node.questions.map((question: Question) => this.mapNode(question));
    }
    return await node;
  };

  getInfo = async (nodeRe: any, flag = true) => {
    const node = await this.getInfoCommon(nodeRe);
    node.fields = await this.fieldService.getFieldsByNode(node, flag);
    if (node.fields.length > 0) {
      node.fields.map((field: NodeFields) => this.mapNode(field));
    }
    this.mapNode(node);
    return node;
  };

  findOne = async (id: number) => {
    const node = await this.repo.findOne(id, {
      relations: this.relations,
    });
    if (!node) {
      throw new NotFoundException(`Node #${id} not found`);
    }
    return node;
  };

  findOneByWhere = async (where: any) => {
    const node = await this.repo.find({
      where,
      relations: this.relations,
    });
    return node;
  };

  findOneByWhereCustom = async (
    userId: number,
    contetTypeId: number,
    termId = 0,
    brandId = 0,
  ) => {
    const query = this.repo.createQueryBuilder('nodes');
    query
      .leftJoinAndSelect('nodes.user', 'user')
      .leftJoinAndSelect('nodes.comments', 'comment')
      .leftJoinAndSelect('user.customer', 'customer')
      .leftJoinAndSelect('comment.user', 'cuser')
      .leftJoinAndSelect('cuser.customer', 'ccustomer')
      .innerJoin('nodes_terms', 'nt', 'nt.node_id=nodes.id')
      .innerJoin('field_brand', 'fb', 'fb.node_id=nodes.id')
      .where('nodes.user_id = :uid', { uid: userId })
      .andWhere('nodes.content_type_id = :cid', { cid: contetTypeId });
    if (termId !== 0) {
      query.andWhere('nt.term_id = :tid', { tid: termId });
    }
    if (brandId !== 0) {
      query.andWhere('fb.term_id = :fid', { fid: brandId });
    }
    query.orderBy('nodes.create_at', 'DESC');

    return await query.getMany();
  };

  async findOneByKey(key: string) {
    const node = await this.repo.findOne({
      where: { key },
      relations: ['user', 'contentType', 'documents', 'comments'],
    });
    if (!node) {
      throw new NotFoundException(`Node #${key} not found`);
    }
    return node;
  }

  async create(data: CreateNodeDto) {
    const newNode = this.repo.create(data);
    if (data.userId) {
      const user = await this.userRepo.findOne(data.userId);
      if (!user) {
        throw new NotFoundException(`User #${data.userId} not found`);
      }
      newNode.user = user;
    }
    if (data.contentTypeId) {
      const contentType = await this.repoContentType.findOne(
        data.contentTypeId,
      );
      if (!contentType) {
        throw new NotFoundException(
          `Content Type #${data.contentTypeId} not found`,
        );
      }
      newNode.contentType = contentType;
    }
    if (data.termsIds) {
      const terms = await this.termRepo.findByIds(data.termsIds);
      newNode.terms = terms;
    }
    if (data.documentsIds) {
      const documents = await this.documentRepo.findByIds(data.documentsIds);
      newNode.documents = documents;
    }
    if (data.questionsIds) {
      const questions = await this.questionRepo.findByIds(data.questionsIds);
      newNode.questions = questions;
    }
    const node = await this.repo.save(newNode);
    if (data.brandsId) {
      data.brandsId.forEach((brand) => {
        this.fieldBrandService.create({ nodeId: node.id, termId: brand });
      });
    }
    return node;
  }

  async update(id: number, data: UpdateNodeDto) {
    const node = await this.findOne(id);
    if (data.termsIds) {
      const terms = await this.termRepo.findByIds(data.termsIds);
      node.terms = terms;
    }
    if (data.documentsIds) {
      const documents = await this.documentRepo.findByIds(data.documentsIds);
      node.documents = documents;
    }
    if (data.questionsIds) {
      const questions = await this.questionRepo.findByIds(data.questionsIds);
      node.questions = questions;
    }
    this.repo.merge(node, data);
    return this.repo.save(node);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
