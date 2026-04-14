import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('performances')
export class Performance {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  preparer_id!: number;

  @Column({ default: 0 })
  orders_prepared_count!: number;

  @Column('float', { default: 0 })
  avg_preparation_time!: number;

  @Column('float', { default: 0 })
  error_rate!: number;

  @Column({ default: 0 })
  stock_shortages_reported!: number;

  @Column('float', { default: 0 })
  global_score!: number;

  @Column({ type: 'date' })
  period_start_date!: string;

  @Column({ type: 'date' })
  period_end_date!: string;

  @CreateDateColumn()
  created_at!: Date;
}
