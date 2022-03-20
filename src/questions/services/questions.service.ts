import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Node } from 'src/nodes/entities/node.entity';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/options.entity';
import { CreateQuestionsDto, UpdateQuestionsDto } from '../dtos/questions.dtos';
import { OptionsService } from './options.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private repo: Repository<Question>,
    @InjectRepository(Node)
    private nodeRepo: Repository<Node>,
    @InjectRepository(Option)
    private optionRepo: Repository<Option>,
    private optionsService: OptionsService,
  ) {}

  findAll() {
    return this.findOneIns();
  }

  async findOne(id: number) {
    const question = await this.repo.findOne(id, {
      relations: ['options'],
      order: { id: 'ASC' },
    });
    if (!question) {
      throw new NotFoundException(`question #${id} not found`);
    }
    return question;
  }

  async findOneIns(id = 0) {
    const question = this.repo
      .createQueryBuilder('questions')
      .leftJoinAndSelect('questions.options', 'questions_options');
    if (id > 0) {
      question.where('questions.id = :id', { id });
    }
    question.orderBy('questions.create_at', 'DESC');
    return await question.getMany();
  }

  async create(data: CreateQuestionsDto) {
    const newquestion = this.repo.create(data);
    if (data.optionId) {
      const option = await this.optionRepo.findOne(data.optionId);
      if (!option) {
        throw new NotFoundException(`Option #${data.optionId} not found`);
      }
      newquestion.option = option;
    }
    const question = await this.repo.save(newquestion);
    if (data.options) {
      const options = await this.optionsService.createMultiples(data.options);
      question.options = options;
    }
    const newQuestion = await this.repo.save(question);
    if (data.nodeId) {
      const node = await this.nodeRepo.findOne(data.nodeId, {
        relations: ['questions'],
      });
      if (!node) {
        throw new NotFoundException(`Node #${data.nodeId} not found`);
      }
      const questions = node.questions;
      questions.push(newQuestion);
      node.questions = questions;
      await this.nodeRepo.save(node);
    }
    return newQuestion;
  }

  async update(id: number, changes: UpdateQuestionsDto) {
    const question = await this.findOne(id);
    this.repo.merge(question, changes);
    if (changes.options) {
      changes.options.map(async (option: any) => {
        if (option.id) {
          this.optionsService.update(option.id, { value: option.value });
        } else {
          if (option.value !== '') {
            const newOption: any = await this.optionsService.create({
              value: option.value,
            });
            question.options.push(newOption);
          }
          this.repo.save(question);
        }
      });
    }
    if (changes.optionId) {
      const option = await this.optionRepo.findOne(changes.optionId);
      if (!option) {
        throw new NotFoundException(`Option #${changes.optionId} not found`);
      }
      question.option = option;
    }
    return this.repo.save(question);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
  getQuestionsByNode = async (id: number) => {
    const questions = await this.repo
      .createQueryBuilder('questions')
      .leftJoinAndSelect('questions.options', 'options')
      .innerJoin('nodes_questions', 'nq', 'nq.question_id=questions.id')
      .where('nq.node_id = :id', { id })
      .orderBy('options.id', 'ASC')
      .getMany();
    return questions;
  };

  getQuestionsByNodeAns = async (id: number) => {
    const questions = await this.repo
      .createQueryBuilder('questions')
      .leftJoinAndSelect('questions.option', 'options')
      .innerJoin('nodes_questions', 'nq', 'nq.question_id=questions.id')
      .where('nq.node_id = :id', { id })
      .orderBy('questions.create_at', 'DESC')
      .getMany();
    if (!questions) {
      throw new NotFoundException(`Questions not found`);
    }
    return questions;
  };
}
