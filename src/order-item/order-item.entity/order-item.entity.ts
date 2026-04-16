import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  order_id!: number;

  @Column()
  product_id!: number;

  @Column()
  quantity!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unit_price!: number;

  @Column({ nullable: true })
  substitution_id!: number;
}
