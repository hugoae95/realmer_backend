import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnswersDto, UpdateAnswersDto } from '../dtos/answers.dtos';
import { Trivia } from '../entities/trivia.entity';
import { Answers } from '../entities/answer.entity';
import { Question } from '../entities/question.entity';
import { Option } from '../entities/options.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answers)
    private repo: Repository<Answers>,
    @InjectRepository(Trivia)
    private triviaRepo: Repository<Trivia>,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>,
    @InjectRepository(Option)
    private optionRepo: Repository<Option>,
  ) {}

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const question = await this.repo.findOne(id, {
      relations: ['trivia', 'question', 'option'],
    });
    if (!question) {
      throw new NotFoundException(`question #${id} not found`);
    }
    return question;
  }

  async create(data: CreateAnswersDto) {
    const answer = this.repo.create(data);
    if (data.triviaId) {
      const trivia = await this.triviaRepo.findOne(data.triviaId);
      if (!trivia) {
        throw new NotFoundException(`Trivia #${data.triviaId} not found`);
      }
      answer.trivia = trivia;
    }
    if (data.questionId) {
      const question = await this.questionRepo.findOne(data.questionId);
      if (!question) {
        throw new NotFoundException(`Question #${data.questionId} not found`);
      }
      answer.question = question;
    }
    if (data.optionId) {
      const option = await this.optionRepo.findOne(data.optionId);
      if (!option) {
        throw new NotFoundException(`Option #${data.optionId} not found`);
      }
      answer.option = option;
    }
    return this.repo.save(answer);
  }

  async update(id: number, data: UpdateAnswersDto) {
    const answer = await this.findOne(id);
    this.repo.merge(answer, data);
    return this.repo.save(answer);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  getUserAnswers = async (trivia: number) => {
    const answers = await this.repo.find({
      relations: ['option', 'question'],
      where: { trivia },
    });
    return answers;
  };
}
