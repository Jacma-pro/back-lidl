import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class OrderItemService {
	private readonly orderItems: any[] = [
		{ id: 1, order_id: 1, product_id: 1, quantity: 2, unit_price: 1.99, substitution_id: null },
	];

	findAll() {
		return this.orderItems;
	}

	findOne(id: number) {
		const item = this.orderItems.find((entry) => entry.id === id);
		if (!item) {
			throw new NotFoundException(`OrderItem #${id} introuvable`);
		}
		return item;
	}

	create(input: { order_id: number; product_id: number; quantity: number; unit_price: number; substitution_id?: number | null }) {
		if (input.quantity <= 0 || input.unit_price < 0) {
			throw new BadRequestException('Quantité ou prix invalide');
		}

		const created = {
			id: this.orderItems.length + 1,
			order_id: input.order_id,
			product_id: input.product_id,
			quantity: input.quantity,
			unit_price: input.unit_price,
			substitution_id: input.substitution_id ?? null,
		};

		this.orderItems.push(created);
		return created;
	}
}
