import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PermissionService {
	private readonly roles = ['CLIENT', 'OPERATOR', 'MANAGER', 'ADMIN'] as const;

	private readonly permissions = [
		{ id: 1, role: 'CLIENT', created_at: new Date(), updated_at: new Date() },
		{ id: 2, role: 'OPERATOR', created_at: new Date(), updated_at: new Date() },
		{ id: 3, role: 'MANAGER', created_at: new Date(), updated_at: new Date() },
		{ id: 4, role: 'ADMIN', created_at: new Date(), updated_at: new Date() },
	];

	findAll() {
		return this.permissions;
	}

	findOne(id: number) {
		const permission = this.permissions.find((item) => item.id === id);
		if (!permission) {
			throw new NotFoundException(`Permission #${id} introuvable`);
		}
		return permission;
	}

	create(input: { role: 'CLIENT' | 'OPERATOR' | 'MANAGER' | 'ADMIN' }) {
		if (!this.roles.includes(input.role)) {
			throw new BadRequestException('Le role est invalide');
		}

		const now = new Date();
		const created = {
			id: this.permissions.length + 1,
			role: input.role,
			created_at: now,
			updated_at: now,
		};

		this.permissions.push(created);
		return created;
	}
}
