import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit-log.entity/audit-log.entity';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly repo: Repository<AuditLog>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const log = await this.repo.findOne({ where: { id } });
    if (!log) throw new NotFoundException(`AuditLog #${id} introuvable`);
    return log;
  }

  async create(input: {
    actor_id: number;
    actor_role: 'CLIENT' | 'OPERATOR' | 'MANAGER' | 'ADMIN';
    action: string;
    target_table: string;
    target_id?: number | null;
    ip_address: string;
  }) {
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
