import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Performance } from './performance.entity/performance.entity';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private readonly repo: Repository<Performance>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const performance = await this.repo.findOne({ where: { id } });
    if (!performance) throw new NotFoundException(`Performance #${id} introuvable`);
    return performance;
  }

  async create(input: {
    preparer_id: number;
    orders_prepared_count: number;
    avg_preparation_time: number;
    error_rate: number;
    stock_shortages_reported: number;
    global_score: number;
    period_start_date: string;
    period_end_date: string;
  }) {
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
