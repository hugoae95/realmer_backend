import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Taxonomy } from './taxonomy.entity';
import { User } from './../../users/entities/user.entity';
import { Node } from './../../nodes/entities/node.entity';

@Entity()
export class Term {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  copy: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Column({ type: 'int', nullable: true })
  publish: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Taxonomy, (taxonomy) => taxonomy.id, { nullable: false })
  @JoinColumn({ name: 'taxonomy_id' })
  taxonomy: Taxonomy;

  @ManyToMany(() => Node, (node) => node.terms)
  nodes: Node[];
}
