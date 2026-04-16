import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum ScheduleStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  ON_LEAVE = 'ON_LEAVE',
}

@Entity('schedule')
export class Schedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  preparer_id!: number;

  @Column()
  store_id!: number;

  @Column({ type: 'date' })
  date!: string;

  @Column({ type: 'time' })
  start_time!: string;

  @Column({ type: 'time' })
  end_time!: string;

  @Column({ type: 'enum', enum: ScheduleStatus, default: ScheduleStatus.PRESENT })
  status!: ScheduleStatus;

  @Column({ nullable: true })
  comment!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
