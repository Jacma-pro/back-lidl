import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ClientAccountService {
	private readonly accounts: any[] = [
		{
			id: 1,
			client_id: 1,
			is_verified: true,
			is_active: true,
			created_at: new Date(),
			last_login_at: new Date(),
			updated_at: new Date(),
		},
	];

	findAll() {
		return this.accounts;
	}

	findOne(id: number) {
		const account = this.accounts.find((item) => item.id === id);
		if (!account) {
			throw new NotFoundException(`Compte client #${id} introuvable`);
		}
		return account;
	}

	create(input: { client_id: number; is_verified?: boolean; is_active?: boolean }) {
		if (!input.client_id) {
			throw new BadRequestException('client_id obligatoire');
		}

		const now = new Date();
		const created = {
			id: this.accounts.length + 1,
			client_id: input.client_id,
			is_verified: input.is_verified ?? false,
			is_active: input.is_active ?? true,
			created_at: now,
			last_login_at: null,
			updated_at: now,
		};

		this.accounts.push(created);
		return created;
	}
}
