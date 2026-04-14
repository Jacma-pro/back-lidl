import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  private readonly mockCategories = [
    { id: 1, name: 'Fruits & Légumes', description: 'Produits frais', restrictions: null },
    { id: 2, name: 'Produits laitiers', description: 'Lait, fromages, yaourts', restrictions: { lactose: true } },
    { id: 3, name: 'Surgelés', description: 'Produits congelés', restrictions: null },
  ];

  findAll() {
    return this.mockCategories;
  }

  findOne(id: number) {
    const category = this.mockCategories.find(c => c.id === id);
    if (!category) throw new NotFoundException(`Catégorie #${id} introuvable`);
    return category;
  }
}