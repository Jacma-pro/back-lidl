import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  findAll() {
    return this.repo.find({ where: { is_active: true } });
  }

  async findOne(id: number) {
    const product = await this.repo.findOne({ where: { id, is_active: true } });
    if (!product) throw new NotFoundException(`Produit #${id} introuvable`);
    return product;
  }

  async create(input: {
    category_id: number;
    name: string;
    description?: string | null;
    price: number;
    weight?: number | null;
    image_url?: string | null;
    barcode?: string | null;
    nutriscore?: string | null;
    is_active?: boolean;
  }) {
    if (!input.name?.trim()) {
      throw new BadRequestException('Le nom du produit est obligatoire');
    }
    if (input.price == null || input.price < 0) {
      throw new BadRequestException('Le prix du produit est invalide');
    }
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
