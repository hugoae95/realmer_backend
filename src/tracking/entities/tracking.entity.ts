import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Node } from './../../nodes/entities/node.entity';
import { Term } from './../../taxonomy/entities/term.entity';
import { User } from './../../users/entities/user.entity';

@Entity({ name: 'tracking' })
export class Tracking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  value: string;

  @Column({ type: 'int', nullable: true })
  time: number;

  //Solution id
  @ManyToOne(() => Term, (term) => term.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'term_id' })
  term: Term;

  //Solution id
  @ManyToOne(() => Term, (term) => term.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'brand_id' })
  brand: Term;

  @Column({ type: 'int', nullable: false })
  entity_id: number;

  //Solution id
  @ManyToOne(() => User, (user) => user.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'text', nullable: false })
  type: string;

  //Optional Node id for pillars
  @ManyToOne(() => Node, (node) => node.id, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'node_id' })
  node: Node;

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
