import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './payment.entity/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly repo: Repository<Payment>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const payment = await this.repo.findOne({ where: { id } });
    if (!payment) throw new NotFoundException(`Payment #${id} introuvable`);
    return payment;
  }

  async create(input: {
    order_id: number;
    amount: number;
    method?: 'IN_STORE' | 'SIMULATED_ONLINE';
    status?: 'PENDING' | 'VALIDATED' | 'REFUNDED';
    transaction_ref?: string | null;
  }) {
    if (input.amount < 0) {
      throw new BadRequestException('Le montant est invalide');
    }
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
