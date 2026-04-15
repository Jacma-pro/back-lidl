import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PreparerService {
	private readonly preparers = [
		{
			id: 1,
			permission_id: 2,
			store_id: 1,
			first_name: 'Nina',
			last_name_initials: 'M.',
			work_email: 'nina.m@lidl.fr',
			password: '$2b$10$l2PECj3R.ibMbCqtxA0JMeXa.tIzgRjU.0zWVZ4AuH7hRbh2XtH8q', // preparer123
			work_phone: '0491000101',
			created_at: new Date(),
			updated_at: new Date(),
		},
	];

	findAll() {
		return this.preparers;
	}

	findOne(id: number) {
		const preparer = this.preparers.find((item) => item.id === id);
		if (!preparer) {
			throw new NotFoundException(`Preparer #${id} introuvable`);
		}
		return preparer;
	}

	findByWorkEmail(email: string) {
		return this.preparers.find((item) => item.work_email === email) ?? null;
	}

	create(input: {
		permission_id: number;
		store_id: number;
		first_name: string;
		last_name_initials: string;
		work_email: string;
		password: string;
		work_phone: string;
	}) {
		if (!input.work_email?.trim()) {
			throw new BadRequestException('work_email obligatoire');
		}

		const now = new Date();
		const created = {
			id: this.preparers.length + 1,
			permission_id: input.permission_id,
			store_id: input.store_id,
			first_name: input.first_name,
			last_name_initials: input.last_name_initials,
			work_email: input.work_email,
			password: input.password,
			work_phone: input.work_phone,
			created_at: now,
			updated_at: now,
		};

		this.preparers.push(created);
		return created;
	}
}
