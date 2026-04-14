import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('client_accounts')
export class ClientAccount {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  client_id!: number;

  @Column({ default: false })
  is_verified!: boolean;

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @Column({ nullable: true })
  last_login_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
