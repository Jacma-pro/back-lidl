import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum SubstitutionStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REFUSED = 'REFUSED',
}

@Entity('substitution_proposal')
export class SubstitutionProposal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  order_item_id!: number;

  @Column()
  original_product_id!: number;

  @Column()
  proposed_product_id!: number;

  @Column({ type: 'enum', enum: SubstitutionStatus, default: SubstitutionStatus.PENDING })
  status!: SubstitutionStatus;

  @CreateDateColumn()
  created_at!: Date;
}
