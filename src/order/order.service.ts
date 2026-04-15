import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const order = await this.repo.findOne({ where: { id } });
    if (!order) throw new NotFoundException(`Order #${id} introuvable`);
    return order;
  }

  async create(input: {
    client_id: number;
    store_id: number;
    pickup_slot_id: number;
    preparer_id?: number | null;
    status?: 'PENDING' | 'IN_PROGRESS' | 'READY' | 'PICKED_UP' | 'CANCELLED';
    total_price: number;
    pickup_code: string;
  }) {
    if (input.total_price < 0 || !input.pickup_code?.trim()) {
      throw new BadRequestException('total_price ou pickup_code invalide');
    }
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
