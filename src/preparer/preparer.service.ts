import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Preparer } from './preparer.entity/preparer.entity';

@Injectable()
export class PreparerService {
  constructor(
    @InjectRepository(Preparer)
    private readonly repo: Repository<Preparer>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const preparer = await this.repo.findOne({ where: { id } });
    if (!preparer) throw new NotFoundException(`Preparer #${id} introuvable`);
    return preparer;
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
