import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('client_history')
export class ClientHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  client_id!: number;

  @Column({ default: 0 })
  loyalty_points!: number;

  @Column({ default: false })
  loyalty_status!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
