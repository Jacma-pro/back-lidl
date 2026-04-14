import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class OrderService {
	private readonly orders: any[] = [
		{
			id: 1,
			client_id: 1,
			store_id: 1,
			pickup_slot_id: 1,
			preparer_id: null,
			status: 'PENDING' as const,
			total_price: 3.98,
			pickup_code: 'AB12CD',
			created_at: new Date(),
			updated_at: new Date(),
		},
	];

	findAll() {
		return this.orders;
	}

	findOne(id: number) {
		const order = this.orders.find((item) => item.id === id);
		if (!order) {
			throw new NotFoundException(`Order #${id} introuvable`);
		}
		return order;
	}

	create(input: {
		client_id: number;
		store_id: number;
		pickup_slot_id: number;
		preparer_id?: number | null;
		status?: 'PENDING' | 'IN_PROGRESS' | 'READY' | 'PICKED_UP' | 'CANCELLED';
		total_price: number;
		pickup_code: string;
	}) {
		if (input.total_price < 0 || !input.pickup_code?.trim()) {
			throw new BadRequestException('total_price ou pickup_code invalide');
		}

		const now = new Date();
		const created = {
			id: this.orders.length + 1,
			client_id: input.client_id,
			store_id: input.store_id,
			pickup_slot_id: input.pickup_slot_id,
			preparer_id: input.preparer_id ?? null,
			status: input.status ?? 'PENDING',
			total_price: input.total_price,
			pickup_code: input.pickup_code,
			created_at: now,
			updated_at: now,
		};

		this.orders.push(created);
		return created;
	}
}
