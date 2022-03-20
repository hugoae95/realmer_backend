import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateTermsFieldsDto,
  UpdateTermsFieldsDto,
} from '../dtos/terms_fields.dtos';
import { Taxonomy } from '../entities/taxonomy.entity';

import { TermFields } from '../entities/terms_fields.entity';

@Injectable()
export class TermFieldsService {
  constructor(
    @InjectRepository(TermFields)
    private termFieldRepo: Repository<TermFields>,
    @InjectRepository(Taxonomy)
    private taxonomyRepo: Repository<Taxonomy>,
  ) {}

  findAll() {
    return this.termFieldRepo.find();
  }

  async findOne(id: number) {
    const category = await this.termFieldRepo.findOne(id);
    if (!category) {
      throw new NotFoundException(`Term Field #${id} not found`);
    }
    return category;
  }

  async create(data: CreateTermsFieldsDto) {
    const newCategory = this.termFieldRepo.create(data);
    if (data.taxonomyId) {
      const taxonomy = await this.taxonomyRepo.findOne(data.taxonomyId);
      if (!taxonomy) {
        throw new NotFoundException(`Taxonomy #${data.taxonomyId} not found`);
      }
      newCategory.taxonomy = taxonomy;
    }
    return this.termFieldRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateTermsFieldsDto) {
    const category = await this.findOne(id);
    this.termFieldRepo.merge(category, changes);
    return this.termFieldRepo.save(category);
  }

  remove(id: number) {
    return this.termFieldRepo.delete(id);
  }

  async getFieldsByTaxonomy(taxonomyId: number) {
    return await this.termFieldRepo.find({ where: { taxonomy: taxonomyId } });
  }
}
