import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ManagerService {
	private readonly managers = [
		{
			id: 1,
			permission_id: 3,
			store_id: 1,
			first_name: 'Julie',
			last_name_initials: 'R.',
			work_email: 'julie.r@lidl.fr',
			password: '$2b$10$1ulavp6pnlXoig/cneCJT.lrJPSqTzkEDc1ueyQMzYLzZzSxSrGES', // manager123
			work_phone: '0491000201',
			created_at: new Date(),
			updated_at: new Date(),
		},
	];

	findAll() {
		return this.managers;
	}

	findOne(id: number) {
		const manager = this.managers.find((item) => item.id === id);
		if (!manager) {
			throw new NotFoundException(`Manager #${id} introuvable`);
		}
		return manager;
	}

	findByWorkEmail(email: string) {
		return this.managers.find((item) => item.work_email === email) ?? null;
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
			id: this.managers.length + 1,
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

		this.managers.push(created);
		return created;
	}
}
