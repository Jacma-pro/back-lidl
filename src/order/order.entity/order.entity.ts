import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum OrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
  PICKED_UP = 'PICKED_UP',
  CANCELLED = 'CANCELLED',
}

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  client_id!: number;

  @Column()
  store_id!: number;

  @Column()
  pickup_slot_id!: number;

  @Column({ nullable: true })
  preparer_id!: number;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column('decimal', { precision: 10, scale: 2 })
  total_price!: number;

  @Column()
  pickup_code!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
