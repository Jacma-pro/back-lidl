import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private readonly repo: Repository<Store>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const store = await this.repo.findOne({ where: { id } });
    if (!store) throw new NotFoundException(`Magasin #${id} introuvable`);
    return store;
  }

  async create(input: {
    name: string;
    email: string;
    phone: string;
    address: string;
    zip_code: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    opening_hours?: string | null;
    slot_duration_minutes: number;
    max_orders_per_slot: number;
    avg_preparation_time_minutes: number;
    drive_available?: boolean;
    click_collect_available?: boolean;
  }) {
    if (!input.name?.trim()) {
      throw new BadRequestException('Le nom du magasin est obligatoire');
    }
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
