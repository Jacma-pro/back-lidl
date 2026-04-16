import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientAccount } from './client-account.entity/client-account.entity';

@Injectable()
export class ClientAccountService {
  constructor(
    @InjectRepository(ClientAccount)
    private readonly repo: Repository<ClientAccount>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const account = await this.repo.findOne({ where: { id } });
    if (!account) throw new NotFoundException(`Compte client #${id} introuvable`);
    return account;
  }

  async create(input: { client_id: number; is_verified?: boolean; is_active?: boolean }) {
    if (!input.client_id) {
      throw new BadRequestException('client_id obligatoire');
    }
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
