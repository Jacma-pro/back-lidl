import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CartItemService {
	private readonly items = [
		{ id: 1, cart_id: 1, product_id: 1, quantity: 2, unit_price: 1.99 },
	];

	findAll() {
		return this.items;
	}

	findOne(id: number) {
		const item = this.items.find((entry) => entry.id === id);
		if (!item) {
			throw new NotFoundException(`CartItem #${id} introuvable`);
		}
		return item;
	}

	create(input: { cart_id: number; product_id: number; quantity: number; unit_price: number }) {
		if (input.quantity <= 0 || input.unit_price < 0) {
			throw new BadRequestException('Quantité ou prix invalide');
		}

		const created = {
			id: this.items.length + 1,
			cart_id: input.cart_id,
			product_id: input.product_id,
			quantity: input.quantity,
			unit_price: input.unit_price,
		};

		this.items.push(created);
		return created;
	}
}
