import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Node } from '../../nodes/entities/node.entity';
import { Option } from './options.entity';

@Entity({ name: 'questions' })
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  //Solution id
  @ManyToOne(() => Option, (option) => option.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'option_id' })
  option: Option;

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

  @ManyToMany(() => Option, (option) => option.questions, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'questions_options',
    joinColumn: {
      name: 'question_id',
    },
    inverseJoinColumn: {
      name: 'option_id',
    },
  })
  options: Option[];

  @ManyToMany(() => Node, (node) => node.questions, { onDelete: 'CASCADE' })
  nodes: Node[];
}
