import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stock } from './stock.entity/stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly repo: Repository<Stock>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Stock #${id} introuvable`);
    return item;
  }

  async create(input: { store_id: number; product_id: number; available_quantity: number }) {
    if (input.available_quantity < 0) {
      throw new BadRequestException('La quantité disponible ne peut pas être négative');
    }
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
