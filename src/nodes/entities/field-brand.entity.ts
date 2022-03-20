import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Term } from './../../taxonomy/entities/term.entity';
import { Node } from './node.entity';

@Entity({ name: 'field_brand' })
export class FieldBrand {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Node, (node) => node.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'node_id' })
  node: Node;

  @ManyToOne(() => Term, (term) => term.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'term_id' })
  term: Term;

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
