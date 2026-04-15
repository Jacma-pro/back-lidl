import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission, Role } from './permission.entity/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly repo: Repository<Permission>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const permission = await this.repo.findOne({ where: { id } });
    if (!permission) throw new NotFoundException(`Permission #${id} introuvable`);
    return permission;
  }

  async create(input: { role: 'CLIENT' | 'OPERATOR' | 'MANAGER' | 'ADMIN' }) {
    if (!Object.values(Role).includes(input.role as Role)) {
      throw new BadRequestException('Le role est invalide');
    }
    const entity = this.repo.create({ role: input.role as Role });
    return this.repo.save(entity);
  }
}
