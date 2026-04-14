import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('preparers')
export class Preparer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  permission_id!: number;

  @Column()
  store_id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name_initials!: string;

  @Column({ unique: true })
  work_email!: string;

  @Column()
  password!: string;

  @Column()
  work_phone!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
