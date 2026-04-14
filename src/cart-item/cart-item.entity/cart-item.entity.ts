import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cart_id!: number;

  @Column()
  product_id!: number;

  @Column()
  quantity!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unit_price!: number;
}
