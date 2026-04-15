import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  store_id!: number;

  @Column()
  product_id!: number;

  @Column({ default: 0 })
  available_quantity!: number;

  @UpdateDateColumn()
  updated_at!: Date;
}
