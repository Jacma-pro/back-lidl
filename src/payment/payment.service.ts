import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PaymentService {
	private readonly payments: any[] = [
		{
			id: 1,
			order_id: 1,
			amount: 3.98,
			method: 'SIMULATED_ONLINE' as const,
			status: 'PENDING' as const,
			transaction_ref: 'TX-0001',
			created_at: new Date(),
		},
	];

	findAll() {
		return this.payments;
	}

	findOne(id: number) {
		const payment = this.payments.find((item) => item.id === id);
		if (!payment) {
			throw new NotFoundException(`Payment #${id} introuvable`);
		}
		return payment;
	}

	create(input: {
		order_id: number;
		amount: number;
		method?: 'IN_STORE' | 'SIMULATED_ONLINE';
		status?: 'PENDING' | 'VALIDATED' | 'REFUNDED';
		transaction_ref?: string | null;
	}) {
		if (input.amount < 0) {
			throw new BadRequestException('Le montant est invalide');
		}

		const created = {
			id: this.payments.length + 1,
			order_id: input.order_id,
			amount: input.amount,
			method: input.method ?? 'SIMULATED_ONLINE',
			status: input.status ?? 'PENDING',
			transaction_ref: input.transaction_ref ?? null,
			created_at: new Date(),
		};

		this.payments.push(created);
		return created;
	}
}
