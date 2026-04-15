import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum CartStatus {
  ACTIVE = 'ACTIVE',
  ABANDONED = 'ABANDONED',
  CONVERTED = 'CONVERTED',
}

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  client_id!: number;

  @Column()
  store_id!: number;

  @Column({ type: 'enum', enum: CartStatus, default: CartStatus.ACTIVE })
  status!: CartStatus;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
