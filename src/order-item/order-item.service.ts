import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './order-item.entity/order-item.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly repo: Repository<OrderItem>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`OrderItem #${id} introuvable`);
    return item;
  }

  async create(input: { order_id: number; product_id: number; quantity: number; unit_price: number; substitution_id?: number | null }) {
    if (input.quantity <= 0 || input.unit_price < 0) {
      throw new BadRequestException('Quantité ou prix invalide');
    }
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
