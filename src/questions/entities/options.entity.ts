import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

import { Question } from './question.entity';

@Entity({ name: 'options' })
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  value: string;

  @ManyToMany(() => Question, (question) => question.options, {
    onDelete: 'CASCADE',
  })
  questions: Question[];

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
}
