import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly repo: Repository<Client>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const client = await this.repo.findOne({ where: { id } });
    if (!client) throw new NotFoundException(`Client #${id} introuvable`);
    return client;
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async create(input: {
    permission_id: number;
    last_name: string;
    first_name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    preferred_store_id?: number | null;
  }) {
    if (!input.email?.trim()) {
      throw new BadRequestException('Email obligatoire');
    }
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
