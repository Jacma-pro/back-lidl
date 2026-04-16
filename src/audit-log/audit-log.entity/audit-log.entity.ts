import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum ActorRole {
  CLIENT = 'CLIENT',
  OPERATOR = 'OPERATOR',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}

@Entity('audit_log')
export class AuditLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  actor_id!: number;

  @Column({ type: 'enum', enum: ActorRole })
  actor_role!: ActorRole;

  @Column()
  action!: string;

  @Column()
  target_table!: string;

  @Column({ nullable: true })
  target_id!: number;

  @Column()
  ip_address!: string;

  @CreateDateColumn()
  created_at!: Date;
}
