import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum PaymentMethod {
  IN_STORE = 'IN_STORE',
  SIMULATED_ONLINE = 'SIMULATED_ONLINE',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED',
  REFUNDED = 'REFUNDED',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  order_id!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount!: number;

  @Column({ type: 'enum', enum: PaymentMethod })
  method!: PaymentMethod;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status!: PaymentStatus;

  @Column({ nullable: true })
  transaction_ref!: string;

  @CreateDateColumn()
  created_at!: Date;
}
