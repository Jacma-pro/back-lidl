import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('store')
export class Store {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  phone!: string;

  @Column()
  address!: string;

  @Column()
  zip_code!: string;

  @Column()
  city!: string;

  @Column()
  country!: string;

  @Column('decimal', { precision: 9, scale: 6 })
  latitude!: number;

  @Column('decimal', { precision: 9, scale: 6 })
  longitude!: number;

  @Column({ nullable: true })
  opening_hours!: string;

  @Column()
  slot_duration_minutes!: number;

  @Column()
  max_orders_per_slot!: number;

  @Column()
  avg_preparation_time_minutes!: number;

  @Column({ default: false })
  drive_available!: boolean;

  @Column({ default: false })
  click_collect_available!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}