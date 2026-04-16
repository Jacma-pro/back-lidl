import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private readonly repo: Repository<Notification>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const notification = await this.repo.findOne({ where: { id } });
    if (!notification) throw new NotFoundException(`Notification #${id} introuvable`);
    return notification;
  }

  async create(input: {
    client_id: number;
    order_id?: number | null;
    type: 'CONFIRMATION' | 'READY' | 'CANCELLATION' | 'SUBSTITUTION';
    channel: 'EMAIL' | 'SMS' | 'PUSH';
    status?: 'PENDING' | 'SENT' | 'FAILED';
    sent_at?: Date | null;
  }) {
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
