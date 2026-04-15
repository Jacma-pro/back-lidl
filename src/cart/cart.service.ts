import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './cart.entity/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly repo: Repository<Cart>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const cart = await this.repo.findOne({ where: { id } });
    if (!cart) throw new NotFoundException(`Cart #${id} introuvable`);
    return cart;
  }

  async create(input: { client_id: number; store_id: number; status?: 'ACTIVE' | 'ABANDONED' | 'CONVERTED' }) {
    if (!input.client_id || !input.store_id) {
      throw new BadRequestException('client_id et store_id sont obligatoires');
    }
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
