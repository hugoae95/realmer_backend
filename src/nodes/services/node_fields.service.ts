import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateNodesFieldsDto,
  UpdateNodesFieldsDto,
} from '../dtos/nodes_fields.dtos';

import { NodeFields } from '../entities/nodes_fields.entity';
import { ContentType } from '../entities/content-type.entity';
import { Node } from '../entities/node.entity';
import { NodeFieldsValueService } from './node_fields_value.service';
import { NodeFieldsValue } from '../entities/nodes_fields_value.entity';
import { Fields } from 'src/models/fields.model';

@Injectable()
export class NodeFieldsService {
  constructor(
    @InjectRepository(NodeFields)
    private repo: Repository<NodeFields>,
    @InjectRepository(ContentType)
    private contentTypeRepo: Repository<ContentType>,
    private nodeFieldsValueService: NodeFieldsValueService,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const nodeField = await this.repo.findOne(id);
    if (!nodeField) {
      throw new NotFoundException(`Node Field #${id} not found`);
    }
    return nodeField;
  }

  async create(data: CreateNodesFieldsDto) {
    const newCategory = this.repo.create(data);
    if (data.contentTypeId) {
      const contentType = await this.contentTypeRepo.findOne(
        data.contentTypeId,
      );
      if (!contentType) {
        throw new NotFoundException(
          `contentType #${data.contentTypeId} not found`,
        );
      }
      newCategory.contentType = contentType;
    }
    return this.repo.save(newCategory);
  }

  async update(id: number, changes: UpdateNodesFieldsDto) {
    const nodeField = await this.findOne(id);
    this.repo.merge(nodeField, changes);
    return this.repo.save(nodeField);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  async getFieldsByTaxonomy(taxonomyId: number) {
    return await this.repo.find({ where: { taxonomy: taxonomyId } });
  }

  getFields = async (id: number, contentType: ContentType) => {
    return await this.repo.find({ where: { contentType } });
  };

  mapFields = (fields: NodeFields[], id: number, flag: boolean) => {
    const newFields = fields.map(async (field) => {
      const values = await this.nodeFieldsValueService.getFieldsValuesByNode(
        field.id,
        id,
      );
      if (flag) {
        return this.fieldValues(field, values);
      } else {
        return this.fieldValuesBack(field, values);
      }
    });
    return Promise.all(newFields);
  };

  fieldValuesBack = (field: NodeFields, values: NodeFieldsValue[]) => {
    const { id, name, title, type } = field;
    const newField = { id, name, title, value: '', values: [], type };
    if (values.length > 0) {
      newField['value'] = values[0].value;
      newField['values'] = values;
    }
    return newField;
  };

  fieldValues = (field: NodeFields, values: NodeFieldsValue[]) => {
    const { name, title, type } = field;
    const newField = { name, title, value: '', type };
    if (values.length > 0) {
      newField.value = values[0].value;
      if (field.type === Fields.IMAGE) {
        newField.value =
          // eslint-disable-next-line prettier/prettier
          process.env.BASE_URL + '/' + process.env.DO_DIR + '/' + values[0].value;
      }
      if (values.length > 1) {
        newField['multiple'] = values;
        newField['multiple'].map((field) => {
          if (type === Fields.IMAGE) {
            // eslint-disable-next-line prettier/prettier
            field.url = process.env.BASE_URL + '/' + process.env.DO_DIR + '/' + field.value;
            delete field.value;
            delete field.createAt;
            delete field.updateAt;
          }
          if (type === Fields.NUMBER) {
            field.value = parseInt(field.value);
          }
        });
      }
    }
    return newField;
  };

  getFieldsByNode = async (node: Node, flag = true) => {
    const { id, contentType } = node;
    const fields = await this.getFields(id, contentType);
    const newFields = await this.mapFields(fields, id, flag);
    return newFields;
  };
}
