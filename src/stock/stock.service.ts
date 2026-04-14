import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StockService {
	private readonly stocks = [
		{ id: 1, store_id: 1, product_id: 1, available_quantity: 40, updated_at: new Date() },
		{ id: 2, store_id: 1, product_id: 2, available_quantity: 55, updated_at: new Date() },
		{ id: 3, store_id: 2, product_id: 1, available_quantity: 18, updated_at: new Date() },
	];

	findAll() {
		return this.stocks;
	}

	findOne(id: number) {
		const item = this.stocks.find((entry) => entry.id === id);
		if (!item) {
			throw new NotFoundException(`Stock #${id} introuvable`);
		}
		return item;
	}

	create(input: { store_id: number; product_id: number; available_quantity: number }) {
		if (input.available_quantity < 0) {
			throw new BadRequestException('La quantité disponible ne peut pas être négative');
		}

		const created = {
			id: this.stocks.length + 1,
			store_id: input.store_id,
			product_id: input.product_id,
			available_quantity: input.available_quantity,
			updated_at: new Date(),
		};

		this.stocks.push(created);
		return created;
	}
}
