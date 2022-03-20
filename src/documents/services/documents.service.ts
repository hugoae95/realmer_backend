import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Node } from 'src/nodes/entities/node.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateDocumentDto, UpdateDocumentDto } from '../dtos/documents.dtos';

import { Document } from '../entities/documents.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private repo: Repository<Document>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const document = await this.repo.findOne(id);
    if (!document) {
      throw new NotFoundException(`Document #${id} not found`);
    }
    return document;
  }

  async create(data: CreateDocumentDto) {
    const newDocument = this.repo.create(data);
    if (data.userId) {
      const user = await this.userRepo.findOne(data.userId);
      if (!user) {
        throw new NotFoundException(`User #${data.userId} not found`);
      }
      newDocument.user = user;
    }
    return this.repo.save(newDocument);
  }

  async update(id: number, changes: UpdateDocumentDto) {
    const document = await this.findOne(id);
    this.repo.merge(document, changes);
    return this.repo.save(document);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  getDocumentsByNode = async (id: number) => {
    const documents = await this.repo
      .createQueryBuilder('documents')
      .innerJoin('nodes_documents', 'nd', 'nd.document_id=documents.id')
      .where('nd.node_id = :id', { id })
      .orderBy('documents.create_at', 'DESC')
      .getMany();
    return documents;
  };
}
