import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ClientHistoryService {
	private readonly history = [
		{
			id: 1,
			client_id: 1,
			loyalty_points: 100,
			loyalty_status: true,
			created_at: new Date(),
			updated_at: new Date(),
		},
	];

	findAll() {
		return this.history;
	}

	findOne(id: number) {
		const item = this.history.find((entry) => entry.id === id);
		if (!item) {
			throw new NotFoundException(`Historique #${id} introuvable`);
		}
		return item;
	}

	create(input: { client_id: number; loyalty_points?: number; loyalty_status?: boolean }) {
		if (!input.client_id) {
			throw new BadRequestException('client_id obligatoire');
		}

		const now = new Date();
		const created = {
			id: this.history.length + 1,
			client_id: input.client_id,
			loyalty_points: input.loyalty_points ?? 0,
			loyalty_status: input.loyalty_status ?? false,
			created_at: now,
			updated_at: now,
		};

		this.history.push(created);
		return created;
	}
}
