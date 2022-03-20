import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Node } from 'src/nodes/entities/node.entity';
import { Repository } from 'typeorm';
import { CreateTriviaDto, UpdateTriviaDto } from '../dtos/trivia.dtos';
import { User } from './../../users/entities/user.entity';
import { Trivia } from '../entities/trivia.entity';
import { Answers } from '../entities/answer.entity';
import { QuestionsService } from './../../questions/services/questions.service';
import { AnswersService } from './../../questions/services/answers.service';
import { Question } from '../entities/question.entity';
import { NodesService } from './../../nodes/services/nodes.services';
import { FindQuestionsParamsSearch } from './../../tracking/dtos/tracking.dtos';

@Injectable()
export class TriviaService {
  constructor(
    @InjectRepository(Trivia)
    private repo: Repository<Trivia>,
    @InjectRepository(Node)
    private nodeRepo: Repository<Node>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private questionService: QuestionsService,
    private answerService: AnswersService,
    private nodeService: NodesService,
  ) {}

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: number) {
    const question = await this.repo.findOne(id, {
      relations: ['user', 'node'],
    });
    if (!question) {
      throw new NotFoundException(`question #${id} not found`);
    }
    return question;
  }

  async findByNode(nodeId: number) {
    return await this.repo.find({
      where: { node: nodeId },
    });
  }

  createResult = async (id: number) => {
    const trivia = await this.findOne(id);
    return await this.buildResult(trivia);
  };

  buildResult = async (trivia: Trivia) => {
    const questions = await this.questionService.getQuestionsByNodeAns(
      trivia.node.id,
    );

    const answers = await this.answerService.getUserAnswers(trivia.id);
    const result = this.resultUser(trivia.id, trivia.node, questions, answers);
    return result;
  };

  mapResult = async (trivias: Trivia[]) => {
    return Promise.all(
      trivias.map(async (trivia) => {
        const result = await this.buildResult(trivia);
        return result;
      }),
    );
  };

  transformByNode = async (object: any) => {
    const newArray = [];
    object.map((item: any) => {
      const find = newArray.find((value) => {
        if (item.nodeId === value.nodeId) {
          value.trivias.push(item);
          return value;
        }
      });
      if (!find) {
        newArray.push({
          nodeId: item.nodeId,
          trivias: [item],
        });
      }
    });
    return newArray;
  };

  getTriviasByTermBrand = async (params: FindQuestionsParamsSearch) => {
    const { userId, brandId } = params;
    const trivia = await this.repo
      .createQueryBuilder('trivia')
      .leftJoinAndSelect('trivia.node', 'node')
      .innerJoin('field_brand', 'fb', 'fb.node_id=trivia.node_id')
      .where('trivia.user = :userId', { userId })
      .andWhere('fb.term_id = :brandId', { brandId })
      .orderBy('trivia.create_at', 'DESC')
      .getMany();
    return trivia;
  };

  getTriviasByUser = async (userId: number) => {
    const trivia = await this.repo
      .createQueryBuilder('trivia')
      .leftJoinAndSelect('trivia.node', 'node')
      .where('trivia.user = :userId', { userId })
      .orderBy('trivia.create_at', 'DESC')
      .getMany();
    return trivia;
  };

  getNodePorcentual = (fields) => {
    let porcentualFinish = 50;
    const field = fields.find((field) => field.name === 'porcentual');
    if (field) {
      porcentualFinish = field.value;
    }
    return porcentualFinish;
  };

  resultUser = async (
    triviaId: number,
    node: Node,
    questions: Question[],
    answers: Answers[],
  ) => {
    const trivias = await this.findByNode(node.id);
    const resume = this.answerResume(questions, answers);
    const incorrect = questions.length - resume.count;
    const porcentual = this.getPorcentual(questions.length, resume.count);
    const newNode = await this.nodeService.getInfo(node);
    const porcentualFinish = this.getNodePorcentual(newNode.fields);
    return {
      triviaId,
      nodeId: node.id,
      questions: {
        length: questions.length,
        correct: resume.count,
        does: resume.does,
        incorrect,
      },
      finish: resume.does === questions.length ? 1 : 0,
      durations: resume.time,
      trivias: trivias.length,
      porcentual,
      winner: this.getWinner(porcentual, porcentualFinish),
    };
  };

  getPorcentual = (total: number, cant: number) => {
    if (total <= 0) {
      return 0;
    }
    return (cant * 100) / total;
  };

  getWinner = (total: number, min: number) => {
    return total < min ? false : true;
  };

  answerResume = (questions: Question[], answers: Answers[]) => {
    let count = 0;
    let time = 0;
    let does = 0;
    questions.forEach((question: Question) => {
      answers.find((answer: Answers) => {
        if (question.option && answer.question.id === question.id) {
          does = does + 1;
          if (answer.option.id === question.option.id) {
            count = count + 1;
          }
          time = time + answer.time;
        }
      });
    });
    return { count, time, does };
  };

  async create(data: CreateTriviaDto) {
    const trivia = this.repo.create();
    if (data.userId) {
      const user = await this.userRepo.findOne(data.userId);
      if (!user) {
        throw new NotFoundException(`User #${data.userId} not found`);
      }
      trivia.user = user;
    }
    if (data.nodeId) {
      const node = await this.nodeRepo.findOne(data.nodeId);
      if (!node) {
        throw new NotFoundException(`Node #${data.nodeId} not found`);
      }
      trivia.node = node;
    }
    return this.repo.save(trivia);
  }

  async update(id: number, data: UpdateTriviaDto) {
    const trivia = await this.findOne(id);
    if (data.userId) {
      const user = await this.userRepo.findOne(data.userId);
      if (!user) {
        throw new NotFoundException(`User #${data.userId} not found`);
      }
      trivia.user = user;
    }
    if (data.nodeId) {
      const node = await this.nodeRepo.findOne(data.nodeId);
      if (!node) {
        throw new NotFoundException(`Node #${data.nodeId} not found`);
      }
      trivia.node = node;
    }
    return this.repo.save(trivia);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }
}
