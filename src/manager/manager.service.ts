import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './manager.entity/manager.entity';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private readonly repo: Repository<Manager>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const manager = await this.repo.findOne({ where: { id } });
    if (!manager) throw new NotFoundException(`Manager #${id} introuvable`);
    return manager;
  }

  findByWorkEmail(email: string) {
    return this.repo.findOne({ where: { work_email: email } });
  }

  async create(input: {
    permission_id: number;
    store_id: number;
    first_name: string;
    last_name_initials: string;
    work_email: string;
    password: string;
    work_phone: string;
  }) {
    if (!input.work_email?.trim()) {
      throw new BadRequestException('work_email obligatoire');
    }
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
