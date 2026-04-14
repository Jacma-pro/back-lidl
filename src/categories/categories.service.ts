import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  private readonly mockCategories: any[] = [
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

  create(input: { name: string; description?: string | null; restrictions?: object | null }) {
    if (!input.name?.trim()) {
      throw new BadRequestException('Le nom de la catégorie est obligatoire');
    }

    const created = {
      id: this.mockCategories.length + 1,
      name: input.name,
      description: input.description ?? null,
      restrictions: input.restrictions ?? null,
    };

    this.mockCategories.push(created);
    return created;
  }
}