import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum Role {
  CLIENT = 'CLIENT',
  OPERATOR = 'OPERATOR',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: Role })
  role!: Role;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
