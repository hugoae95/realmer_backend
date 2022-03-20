import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Node } from './../../nodes/entities/node.entity';
import { Term } from 'src/taxonomy/entities/term.entity';
import { FieldBrand } from '../entities/field-brand.entity';
import { CreateFieldBrandDto } from './../dtos/field-brand.dtos';

@Injectable()
export class FieldBrandService {
  constructor(
    @InjectRepository(FieldBrand) private repo: Repository<FieldBrand>,
    @InjectRepository(Node) private nodeRepo: Repository<Node>,
    @InjectRepository(Term) private termRepo: Repository<Term>,
  ) {}

  findAll() {
    return this.repo.find({ relations: ['node', 'term'] });
  }

  async findOne(id: number) {
    const node = await this.repo.findOne(id, { relations: ['node', 'term'] });
    if (!node) {
      throw new NotFoundException(`Content type #${id} not found`);
    }
    return node;
  }

  async create(data: CreateFieldBrandDto) {
    const newNode = this.repo.create();
    if (data.nodeId) {
      const node = await this.nodeRepo.findOne(data.nodeId);
      if (!node) {
        throw new NotFoundException(`Node #${data.nodeId} not found`);
      }
      newNode.node = node;
    }
    if (data.termId) {
      const term = await this.termRepo.findOne(data.termId);
      if (!term) {
        throw new NotFoundException(`Term #${data.termId} not found`);
      }
      newNode.term = term;
    }
    return this.repo.save(newNode);
  }

  deleteByNode = async (nodeId: number) => {
    const brand = await this.repo
      .createQueryBuilder('field_brand')
      .where('field_brand.node_id = :fid', { fid: nodeId })
      .getOne();
    if (!brand) {
      return false;
    }
    await this.repo.delete(brand.id);
    return true;
  };
}
