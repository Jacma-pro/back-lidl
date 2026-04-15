import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const category = await this.repo.findOne({ where: { id } });
    if (!category) throw new NotFoundException(`Catégorie #${id} introuvable`);
    return category;
  }

  async create(input: { name: string; description?: string | null; restrictions?: object | null }) {
    if (!input.name?.trim()) {
      throw new BadRequestException('Le nom de la catégorie est obligatoire');
    }
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
