import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartItem } from './cart-item.entity/cart-item.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private readonly repo: Repository<CartItem>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`CartItem #${id} introuvable`);
    return item;
  }

  async create(input: { cart_id: number; product_id: number; quantity: number; unit_price: number }) {
    if (!input || input.quantity === undefined || input.unit_price === undefined) {
      throw new BadRequestException('Champs obligatoires manquants : cart_id, product_id, quantity, unit_price');
    }
    if (input.quantity <= 0 || input.unit_price < 0) {
      throw new BadRequestException('Quantité ou prix invalide');
    }
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }

  async updateQuantity(id: number, quantity: number) {
    if (quantity < 0) throw new BadRequestException('La quantité ne peut pas être négative');
    const item = await this.findOne(id);
    if (quantity === 0) {
      await this.repo.remove(item);
      return { deleted: true, id };
    }
    item.quantity = quantity;
    return this.repo.save(item);
  }

  async remove(id: number) {
    const item = await this.findOne(id);
    await this.repo.remove(item);
    return { deleted: true, id };
  }
}
