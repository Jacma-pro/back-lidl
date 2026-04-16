import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('pickup_slot')
export class PickupSlot {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  store_id!: number;

  @Column({ type: 'date' })
  date!: string;

  @Column({ type: 'time' })
  start_time!: string;

  @Column({ type: 'time' })
  end_time!: string;

  @Column()
  max_orders!: number;

  @Column({ default: 0 })
  current_orders!: number;

  @Column({ default: true })
  is_available!: boolean;
}
