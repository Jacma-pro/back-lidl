import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductsService {
  private readonly mockProducts = [
    { id: 1, name: 'Pommes Gala 1kg', description: 'Pommes croquantes', price: 1.99, nutriscore: 'A', is_active: true },
    { id: 2, name: 'Lait demi-écrémé 1L', description: null, price: 0.89, nutriscore: 'B', is_active: true },
  ];

  findAll() {
    return this.mockProducts.filter(p => p.is_active);
  }

  findOne(id: number) {
    const product = this.mockProducts.find(p => p.id === id && p.is_active);
    if (!product) throw new NotFoundException(`Produit #${id} introuvable`);
    return product;
  }
}