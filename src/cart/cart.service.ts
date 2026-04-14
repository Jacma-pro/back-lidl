import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CartService {
	private readonly carts: any[] = [
		{
			id: 1,
			client_id: 1,
			store_id: 1,
			status: 'ACTIVE' as const,
			created_at: new Date(),
			updated_at: new Date(),
		},
	];

	findAll() {
		return this.carts;
	}

	findOne(id: number) {
		const cart = this.carts.find((item) => item.id === id);
		if (!cart) {
			throw new NotFoundException(`Cart #${id} introuvable`);
		}
		return cart;
	}

	create(input: { client_id: number; store_id: number; status?: 'ACTIVE' | 'ABANDONED' | 'CONVERTED' }) {
		if (!input.client_id || !input.store_id) {
			throw new BadRequestException('client_id et store_id sont obligatoires');
		}

		const now = new Date();
		const created = {
			id: this.carts.length + 1,
			client_id: input.client_id,
			store_id: input.store_id,
			status: input.status ?? 'ACTIVE',
			created_at: now,
			updated_at: now,
		};

		this.carts.push(created);
		return created;
	}
}
