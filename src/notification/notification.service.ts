import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class NotificationService {
	private readonly notifications: any[] = [
		{
			id: 1,
			client_id: 1,
			order_id: 1,
			type: 'CONFIRMATION' as const,
			channel: 'EMAIL' as const,
			status: 'SENT' as const,
			sent_at: new Date(),
			created_at: new Date(),
		},
	];

	findAll() {
		return this.notifications;
	}

	findOne(id: number) {
		const notification = this.notifications.find((item) => item.id === id);
		if (!notification) {
			throw new NotFoundException(`Notification #${id} introuvable`);
		}
		return notification;
	}

	create(input: {
		client_id: number;
		order_id?: number | null;
		type: 'CONFIRMATION' | 'READY' | 'CANCELLATION' | 'SUBSTITUTION';
		channel: 'EMAIL' | 'SMS' | 'PUSH';
		status?: 'PENDING' | 'SENT' | 'FAILED';
		sent_at?: Date | null;
	}) {
		const created = {
			id: this.notifications.length + 1,
			client_id: input.client_id,
			order_id: input.order_id ?? null,
			type: input.type,
			channel: input.channel,
			status: input.status ?? 'PENDING',
			sent_at: input.sent_at ?? null,
			created_at: new Date(),
		};

		this.notifications.push(created);
		return created;
	}
}
