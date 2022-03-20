import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Node } from './node.entity';
import { NodeFields } from './nodes_fields.entity';

@Entity()
export class NodeFieldsValue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Node, (node) => node.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'node_id' })
  node: Node;

  @ManyToOne(() => NodeFields, (nodeField) => nodeField.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'node_field_id' })
  nodeField: NodeFields;

  @Column({ type: 'text', nullable: true })
  value: string;

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
}
