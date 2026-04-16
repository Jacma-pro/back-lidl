import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity/schedule.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly repo: Repository<Schedule>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const schedule = await this.repo.findOne({ where: { id } });
    if (!schedule) throw new NotFoundException(`Schedule #${id} introuvable`);
    return schedule;
  }

  async create(input: {
    preparer_id: number;
    store_id: number;
    date: string;
    start_time: string;
    end_time: string;
    status?: 'PRESENT' | 'ABSENT' | 'ON_LEAVE';
    comment?: string | null;
  }) {
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
