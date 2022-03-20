import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Node } from 'src/nodes/entities/node.entity';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/options.entity';
import { CreateOptionsDto, UpdateOptionsDto } from '../dtos/options.dtos';

@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option)
    private repo: Repository<Option>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const option = await this.repo.findOne(id);
    if (!option) {
      throw new NotFoundException(`option #${id} not found`);
    }
    return option;
  }

  async create(data: CreateOptionsDto) {
    const newoption = this.repo.create(data);
    return this.repo.save(newoption);
  }

  createMultiples = async (options: []) => {
    return Promise.all(
      options.map(async (option) => {
        return await this.create({ value: option });
      }),
    );
  };

  async update(id: number, changes: UpdateOptionsDto) {
    const option = await this.findOne(id);
    this.repo.merge(option, changes);
    return this.repo.save(option);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
