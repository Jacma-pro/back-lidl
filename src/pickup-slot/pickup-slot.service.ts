import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PickupSlot } from './pickup-slot.entity/pickup-slot.entity';

@Injectable()
export class PickupSlotService {
  constructor(
    @InjectRepository(PickupSlot)
    private readonly repo: Repository<PickupSlot>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const slot = await this.repo.findOne({ where: { id } });
    if (!slot) throw new NotFoundException(`PickupSlot #${id} introuvable`);
    return slot;
  }

  async create(input: {
    store_id: number;
    date: string;
    start_time: string;
    end_time: string;
    max_orders: number;
    current_orders?: number;
  }) {
    const currentOrders = input.current_orders ?? 0;
    if (currentOrders > input.max_orders) {
      throw new BadRequestException('current_orders ne peut pas dépasser max_orders');
    }
    const entity = this.repo.create({
      ...input,
      current_orders: currentOrders,
      is_available: currentOrders < input.max_orders,
    } as any);
    return this.repo.save(entity as any);
  }
}
