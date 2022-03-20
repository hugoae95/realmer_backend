import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { ContentType } from '../entities/content-type.entity';
import { CreateContentTypeDto } from './../dtos/content-type.dtos';

@Injectable()
export class ContentTypeService {
  constructor(
    @InjectRepository(ContentType) private repo: Repository<ContentType>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['user'],
    });
  }

  async findOne(id: number) {
    const node = await this.repo.findOne(id, {
      relations: ['user'],
    });
    if (!node) {
      throw new NotFoundException(`Content type #${id} not found`);
    }
    return node;
  }

  async create(data: CreateContentTypeDto) {
    const newNode = this.repo.create(data);
    if (data.userId) {
      const user = await this.userRepo.findOne(data.userId);
      if (!user) {
        throw new NotFoundException(`User #${data.userId} not found`);
      }
      newNode.user = user;
    }
    return this.repo.save(newNode);
  }
}
