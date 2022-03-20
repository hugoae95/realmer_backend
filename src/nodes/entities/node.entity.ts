import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Document } from './../../documents/entities/documents.entity';
import { Term } from './../../taxonomy/entities/term.entity';
import { User } from './../../users/entities/user.entity';
import { ContentType } from './content-type.entity';
import { Comment } from './../../comments/entities/comments.entity';
import { Question } from 'src/questions/entities/question.entity';

@Entity({ name: 'nodes' })
@Index(['title', 'key'])
export class Node {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  url: string;

  @Column({ type: 'varchar' })
  key: string;

  @Column({ type: 'int', nullable: true })
  publish: number;

  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ContentType, (contentType) => contentType.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'content_type_id' })
  contentType: ContentType;

  @ManyToMany(() => Term, (term) => term.nodes, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'nodes_terms',
    joinColumn: {
      name: 'node_id',
    },
    inverseJoinColumn: {
      name: 'term_id',
    },
  })
  terms: Term[];

  @ManyToMany(() => Document, (document) => document.nodes, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'nodes_documents',
    joinColumn: {
      name: 'node_id',
    },
    inverseJoinColumn: {
      name: 'document_id',
    },
  })
  documents: Document[];

  @ManyToMany(() => Comment, (comment) => comment.nodes, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'nodes_comments',
    joinColumn: {
      name: 'node_id',
    },
    inverseJoinColumn: {
      name: 'comment_id',
    },
  })
  comments: Comment[];

  @ManyToMany(() => Question, (question) => question.nodes, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'nodes_questions',
    joinColumn: {
      name: 'node_id',
    },
    inverseJoinColumn: {
      name: 'question_id',
    },
  })
  questions: Question[];
}
