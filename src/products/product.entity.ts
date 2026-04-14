import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  category_id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column('decimal', { nullable: true })
  weight!: number;

  @Column('decimal', { nullable: true })
  length!: number;

  @Column('decimal', { nullable: true })
  width!: number;

  @Column('decimal', { nullable: true })
  height!: number;

  @Column({ nullable: true })
  image_url!: string;

  @Column({ nullable: true })
  barcode!: string;

  @Column({ nullable: true })
  nutriscore!: string;

  @Column({ default: true })
  is_active!: boolean;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}