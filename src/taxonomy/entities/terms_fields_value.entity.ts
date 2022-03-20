import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Term } from './term.entity';
import { TermFields } from './terms_fields.entity';

@Entity()
export class TermFieldsValue {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Term, (term) => term.id, { nullable: false })
  @JoinColumn({ name: 'term_id' })
  term: Term;

  @ManyToOne(() => TermFields, (termField) => termField.id, { nullable: false })
  @JoinColumn({ name: 'term_field_id' })
  termField: TermFields;

  @Column({ type: 'text' })
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
