import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ClientService {
	private readonly clients: any[] = [
		{
			id: 1,
			permission_id: 1,
			last_name: 'Durand',
			first_name: 'Emma',
			email: 'emma.durand@example.com',
			password: '$2b$10$m7kvhPRw1fxCUh.024wZVupwM4L4nxrLBpkjLTpTJ7J.92qAXfpA2', // client123
			phone: '0612345678',
			address: '12 rue de la Republique, Marseille',
			preferred_store_id: 1,
			created_at: new Date(),
			updated_at: new Date(),
		},
	];

	findAll() {
		return this.clients;
	}

	findOne(id: number) {
		const client = this.clients.find((item) => item.id === id);
		if (!client) {
			throw new NotFoundException(`Client #${id} introuvable`);
		}
		return client;
	}

	findByEmail(email: string) {
		return this.clients.find((item) => item.email === email) ?? null;
	}

	create(input: {
		permission_id: number;
		last_name: string;
		first_name: string;
		email: string;
		password: string;
		phone: string;
		address: string;
		preferred_store_id?: number | null;
	}) {
		if (!input.email?.trim()) {
			throw new BadRequestException('Email obligatoire');
		}

		const now = new Date();
		const created = {
			id: this.clients.length + 1,
			permission_id: input.permission_id,
			last_name: input.last_name,
			first_name: input.first_name,
			email: input.email,
			password: input.password,
			phone: input.phone,
			address: input.address,
			preferred_store_id: input.preferred_store_id ?? null,
			created_at: now,
			updated_at: now,
		};

		this.clients.push(created);
		return created;
	}
}
