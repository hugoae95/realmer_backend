import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NodesService } from 'src/nodes/services/nodes.services';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTermDto, UpdateTermDto } from '../dtos/term.dtos';
import { Taxonomy } from '../entities/taxonomy.entity';
import { Term } from '../entities/term.entity';
import { TermFields } from '../entities/terms_fields.entity';
import { TermFieldsService } from '../services/term_fields.service';
import { TermFieldsValueService } from './term_fields_value.service';

@Injectable()
export class TermService {
  constructor(
    @InjectRepository(Term)
    private termRepo: Repository<Term>,
    @InjectRepository(Taxonomy)
    private taxonomyRepo: Repository<Taxonomy>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private nodeService: NodesService,
    private termFieldService: TermFieldsService,
    private termFieldValueService: TermFieldsValueService,
  ) {}

  findAll = async (id = 0) => {
    let clauses: any = { relations: ['taxonomy'], order: { createAt: 'DESC' } };
    if (id > 0) {
      clauses = {
        where: { taxonomy: id },
        relations: ['taxonomy'],
        order: { createAt: 'DESC' },
      };
    }
    const terms: any = await this.termRepo.find(clauses);
    return Promise.all(
      terms.map(
        async (term: {
          id: number;
          image: string;
          taxonomy: Taxonomy;
          fields: any;
        }) => {
          if (term.image || term.image != null) {
            term.image = process.env.BASE_URL + '/sanofi_ruta/' + term.image;
          }
          term.fields = await this.getFields(term);
          return term;
        },
      ),
    );
  };

  getFields = async (term: {
    id: number;
    taxonomy: Taxonomy;
    fields: TermFields[];
  }) => {
    const fields = await this.termFieldService.getFieldsByTaxonomy(
      term.taxonomy.id,
    );
    return Promise.all(
      fields.map(async (field) => {
        return await this.getFieldValues(field, term.id);
      }),
    );
  };

  getFieldValues = async (field: TermFields, termId: number) => {
    const fieldData = { name: '', title: '', value: '', type: '', idValue: 0 };
    const values = await this.termFieldValueService.getFieldsValuesByTaxonomy(
      field.id,
      termId,
    );
    fieldData.name = field.name;
    fieldData.title = field.title;
    fieldData.type = field.type;
    fieldData.value = '';
    if (values.length > 0) {
      fieldData.idValue = values[0]['id'];
      fieldData.value = values[0]['value'];
    }
    return fieldData;
  };

  async findOne(id: number) {
    const category = await this.termRepo.findOne(id);
    if (!category) {
      throw new NotFoundException(`Term #${id} not found`);
    }
    return category;
  }

  findTermNodes = async (id: number, flag = true) => {
    const term = await this.termRepo.findOne(id, { relations: ['nodes'] });
    const newPromise = term.nodes.map(async (node) => {
      const newNode = await this.nodeService.getInfo(node, flag);
      return newNode;
    });
    const nodes = Promise.all(newPromise);
    term.nodes = await nodes;
    return term;
  };

  findNodesPillarByBrand = async (
    brandId: number,
    flag = true,
    type: string,
  ) => {
    const nodesTemp = await this.nodeService.findByBrand(brandId, type);
    const newPromise = nodesTemp.map(async (node) => {
      const newNode = await this.nodeService.getInfo(node, flag);
      return newNode;
    });
    const nodes = await Promise.all(newPromise);
    nodes.forEach((node: any) => {
      return this.mapNodeTerm(node);
    });
    return nodes;
  };

  mapNodeTerm = (node) => {
    return node.fields.map(
      (field: { name: string; value: string; type: string }) => {
        node[field.name] = field.value;
        if (field.type === 'image') {
          // eslint-disable-next-line prettier/prettier
          node[field.name] = process.env.BASE_URL + '/' + process.env.DO_DIR + '/' + field.value;
        }
        return node;
      },
    );
  };

  findTermNodesTerm = async (termId: number, brandId: number) => {
    const term = await this.termRepo.findOne(termId);
    if (!term) {
      throw new NotFoundException(`Term #${termId} not found`);
    }
    const nodes = await this.nodeService.findByTerms(termId, brandId);
    if (nodes.length > 0) {
      await this.nodeService.getAllInfo(nodes);
    }
    term.nodes = nodes;
    if (term.nodes && term.nodes.length > 0) {
      term.nodes.forEach((node: any) => {
        return this.mapNodeTerm(node);
      });
    }
    return term;
  };

  async create(data: CreateTermDto) {
    const newCategory = this.termRepo.create(data);
    if (data.userId) {
      const user = await this.userRepo.findOne(data.userId);
      if (!user) {
        throw new NotFoundException(`User #${data.userId} not found`);
      }
      newCategory.user = user;
    }
    if (data.taxonomyId) {
      const taxonomy = await this.taxonomyRepo.findOne(data.taxonomyId);
      if (!taxonomy) {
        throw new NotFoundException(`Taxonomy #${data.taxonomyId} not found`);
      }
      newCategory.taxonomy = taxonomy;
    }
    return this.termRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateTermDto) {
    const category = await this.findOne(id);
    this.termRepo.merge(category, changes);
    return this.termRepo.save(category);
  }

  remove(id: number) {
    return this.termRepo.delete(id);
  }
}
