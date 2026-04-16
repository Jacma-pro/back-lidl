import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientHistory } from './client-history.entity/client-history.entity';

@Injectable()
export class ClientHistoryService {
  constructor(
    @InjectRepository(ClientHistory)
    private readonly repo: Repository<ClientHistory>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Historique #${id} introuvable`);
    return item;
  }

  async create(input: { client_id: number; loyalty_points?: number; loyalty_status?: boolean }) {
    if (!input.client_id) {
      throw new BadRequestException('client_id obligatoire');
    }
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
