import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateTermsFieldsValueDto,
  UpdateTermsFieldsValueDto,
} from '../dtos/terms_fields_value.dtos';
import { Term } from '../entities/term.entity';

import { TermFields } from '../entities/terms_fields.entity';
import { TermFieldsValue } from '../entities/terms_fields_value.entity';

@Injectable()
export class TermFieldsValueService {
  constructor(
    @InjectRepository(TermFields)
    private termFieldRepo: Repository<TermFields>,
    @InjectRepository(Term)
    private termRepo: Repository<Term>,
    @InjectRepository(TermFieldsValue)
    private termFieldValueRepo: Repository<TermFieldsValue>,
  ) {}

  findAll() {
    return this.termFieldValueRepo.find();
  }

  async findOne(id: number) {
    const category = await this.termFieldValueRepo.findOne(id);
    if (!category) {
      throw new NotFoundException(`Term Field Value #${id} not found`);
    }
    return category;
  }

  async create(data: CreateTermsFieldsValueDto) {
    const newCategory = this.termFieldValueRepo.create(data);
    if (data.termId) {
      const term = await this.termRepo.findOne(data.termId);
      if (!term) {
        throw new NotFoundException(`Term #${data.termId} not found`);
      }
      newCategory.term = term;
    }
    if (data.termFieldId) {
      const termField = await this.termFieldRepo.findOne(data.termFieldId);
      if (!termField) {
        throw new NotFoundException(
          `Term Field #${data.termFieldId} not found`,
        );
      }
      newCategory.termField = termField;
    }
    return this.termFieldValueRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateTermsFieldsValueDto) {
    const category = await this.findOne(id);
    this.termFieldValueRepo.merge(category, changes);
    return this.termFieldValueRepo.save(category);
  }

  remove(id: number) {
    return this.termFieldValueRepo.delete(id);
  }

  async getFieldsValuesByTaxonomy(termFieldId: number, termId: number) {
    return await this.termFieldValueRepo.find({
      where: { termField: termFieldId, term: termId },
    });
  }
}
