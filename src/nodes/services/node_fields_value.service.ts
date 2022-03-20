import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateNodesFieldsValueDto,
  UpdateNodesFieldsValueDto,
} from '../dtos/nodes_fields_value.dtos';
import { Node } from '../entities/node.entity';

import { NodeFields } from '../entities/nodes_fields.entity';
import { NodeFieldsValue } from '../entities/nodes_fields_value.entity';

@Injectable()
export class NodeFieldsValueService {
  constructor(
    @InjectRepository(NodeFields)
    private nodeFieldRepo: Repository<NodeFields>,
    @InjectRepository(Node)
    private nodeRepo: Repository<Node>,
    @InjectRepository(NodeFieldsValue)
    private repo: Repository<NodeFieldsValue>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const category = await this.repo.findOne(id);
    if (!category) {
      throw new NotFoundException(`Node Field Value #${id} not found`);
    }
    return category;
  }

  async create(data: CreateNodesFieldsValueDto) {
    const newCategory = this.repo.create(data);
    if (data.nodeId) {
      const node = await this.nodeRepo.findOne(data.nodeId);
      if (!node) {
        throw new NotFoundException(`Node #${data.nodeId} not found`);
      }
      newCategory.node = node;
    }
    if (data.nodeFieldId) {
      const nodeField = await this.nodeFieldRepo.findOne(data.nodeFieldId);
      if (!nodeField) {
        throw new NotFoundException(
          `Node Field #${data.nodeFieldId} not found`,
        );
      }
      newCategory.nodeField = nodeField;
    }
    return this.repo.save(newCategory);
  }

  async update(id: number, changes: UpdateNodesFieldsValueDto) {
    const category = await this.findOne(id);
    this.repo.merge(category, changes);
    return this.repo.save(category);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async getFieldsValuesByNode(nodeFieldId: number, nodeId: number) {
    return await this.repo.find({
      where: { nodeField: nodeFieldId, node: nodeId },
    });
  }
}
