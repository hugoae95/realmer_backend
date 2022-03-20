import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import {
  CreateCommentDto,
  UpdateCommentDto,
  CreateCommentNodeDto,
} from '../dtos/comments.dtos';
import { Comment } from '../entities/comments.entity';
import { Node } from './../../nodes/entities/node.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private repo: Repository<Comment>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Node)
    private nodeRepo: Repository<Node>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const comment = await this.repo.findOne(id);
    if (!comment) {
      throw new NotFoundException(`Comment #${id} not found`);
    }
    return comment;
  }

  async create(data: CreateCommentDto) {
    const newComment = this.repo.create(data);
    if (data.userId) {
      const user = await this.userRepo.findOne(data.userId);
      if (!user) {
        throw new NotFoundException(`User #${data.userId} not found`);
      }
      newComment.user = user;
    }
    const comment = await this.repo.save(newComment);
    if (data.nodeId) {
      const node = await this.nodeRepo.findOne(data.nodeId, {
        relations: ['comments'],
      });
      const find = node.comments.find((c) => c.id === comment.id);
      if (!find) {
        node.comments.push(comment);
      }
      const newComments = node.comments;
      node.comments = newComments;
      this.nodeRepo.save(node);
    }
    return comment;
  }

  async createNodeComment(data: CreateCommentNodeDto) {
    const node = await this.nodeRepo.findOne(data.nodeId, {
      relations: ['comments'],
    });
    if (!node) {
      throw new NotFoundException(`Node #${data.nodeId} not found`);
    }
    if (data.commentId) {
      const comment = await this.repo.findOne(data.commentId);
      if (!comment) {
        throw new NotFoundException(`Comment #${data.commentId} not found`);
      }
      const find = node.comments.find((c) => c.id === data.commentId);
      if (!find) {
        node.comments.push(comment);
      }
      const newComments = node.comments;
      node.comments = newComments;
    }
    return this.nodeRepo.save(node);
  }

  async update(id: number, changes: UpdateCommentDto) {
    const comment = await this.findOne(id);
    this.repo.merge(comment, changes);
    return this.repo.save(comment);
  }

  remove(id: number) {
    return this.repo.delete(id);
  }

  getCommentsByNode = async (id: number) => {
    const comments = await this.repo
      .createQueryBuilder('comments')
      .leftJoinAndSelect('comments.user', 'user')
      .leftJoinAndSelect('user.customer', 'customer')
      .innerJoin('nodes_comments', 'nd', 'nd.comment_id=comments.id')
      .where('nd.node_id = :id', { id })
      .orderBy('comments.create_at', 'DESC')
      .getMany();
    return comments;
  };
}
