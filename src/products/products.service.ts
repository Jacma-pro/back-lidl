import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private readonly mockProducts: any[] = [
    {
      id: 1,
      category_id: 1,
      name: 'Pommes Gala 1kg',
      description: 'Pommes croquantes',
      price: 1.99,
      weight: 1,
      image_url: null,
      barcode: null,
      nutriscore: 'A',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      category_id: 2,
      name: 'Lait demi-écrémé 1L',
      description: null,
      price: 0.89,
      weight: null,
      image_url: null,
      barcode: null,
      nutriscore: 'B',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  findAll() {
    return this.mockProducts.filter(p => p.is_active);
  }

  findOne(id: number) {
    const product = this.mockProducts.find(p => p.id === id && p.is_active);
    if (!product) throw new NotFoundException(`Produit #${id} introuvable`);
    return product;
  }

  create(input: {
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

    const now = new Date();
    const created = {
      id: this.mockProducts.length + 1,
      category_id: input.category_id,
      name: input.name,
      description: input.description ?? null,
      price: input.price,
      weight: input.weight ?? null,
      image_url: input.image_url ?? null,
      barcode: input.barcode ?? null,
      nutriscore: input.nutriscore ?? null,
      is_active: input.is_active ?? true,
      created_at: now,
      updated_at: now,
    };

    this.mockProducts.push(created);
    return created;
  }
}