import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';

import { Trivia } from './trivia.entity';
import { Question } from './question.entity';
import { Option } from './options.entity';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'answers' })
export class Answers {
  @PrimaryGeneratedColumn()
  id: number;

  //Trivia id
  @ManyToOne(() => Trivia, (trivia) => trivia.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trivia_id' })
  trivia: Trivia;

  //Question id
  @ManyToOne(() => Question, (question) => question.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'question_id' })
  question: Question;

  //Option id
  @ManyToOne(() => Option, (option) => option.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'option_id' })
  option: Option;

  @Column({ type: 'int' })
  time: number;

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
