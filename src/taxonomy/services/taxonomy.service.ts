import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaxonomyDto, UpdateTaxonomyDto } from '../dtos/taxonomy.dtos';

import { Taxonomy } from '../entities/taxonomy.entity';

@Injectable()
export class TaxonomyService {
  constructor(
    @InjectRepository(Taxonomy)
    private taxonomyRepo: Repository<Taxonomy>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.taxonomyRepo.find();
  }
  //find term by one
  async findOne(id: number) {
    const category = await this.taxonomyRepo.findOne(id);
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(data: CreateTaxonomyDto) {
    const newCategory = this.taxonomyRepo.create(data);
    if (data.userId) {
      const user = await this.userRepo.findOne(data.userId);
      if (!user) {
        throw new NotFoundException(`User #${data.userId} not found`);
      }
      newCategory.user = user;
    }
    return this.taxonomyRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateTaxonomyDto) {
    const category = await this.findOne(id);
    this.taxonomyRepo.merge(category, changes);
    return this.taxonomyRepo.save(category);
  }

  remove(id: number) {
    return this.taxonomyRepo.delete(id);
  }
}
