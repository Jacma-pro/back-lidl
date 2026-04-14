import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuditLogService {
	private readonly logs: any[] = [
		{
			id: 1,
			actor_id: 1,
			actor_role: 'CLIENT' as const,
			action: 'ORDER_CREATED',
			target_table: 'order',
			target_id: 1,
			ip_address: '127.0.0.1',
			created_at: new Date(),
		},
	];

	findAll() {
		return this.logs;
	}

	findOne(id: number) {
		const log = this.logs.find((item) => item.id === id);
		if (!log) {
			throw new NotFoundException(`AuditLog #${id} introuvable`);
		}
		return log;
	}

	create(input: {
		actor_id: number;
		actor_role: 'CLIENT' | 'OPERATOR' | 'MANAGER' | 'ADMIN';
		action: string;
		target_table: string;
		target_id?: number | null;
		ip_address: string;
	}) {
		const created = {
			id: this.logs.length + 1,
			actor_id: input.actor_id,
			actor_role: input.actor_role,
			action: input.action,
			target_table: input.target_table,
			target_id: input.target_id ?? null,
			ip_address: input.ip_address,
			created_at: new Date(),
		};

		this.logs.push(created);
		return created;
	}
}
