import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PickupSlotService {
	private readonly slots = [
		{
			id: 1,
			store_id: 1,
			date: '2026-04-15',
			start_time: '09:00',
			end_time: '10:00',
			max_orders: 20,
			current_orders: 7,
			is_available: true,
		},
	];

	findAll() {
		return this.slots;
	}

	findOne(id: number) {
		const slot = this.slots.find((item) => item.id === id);
		if (!slot) {
			throw new NotFoundException(`PickupSlot #${id} introuvable`);
		}
		return slot;
	}

	create(input: {
		store_id: number;
		date: string;
		start_time: string;
		end_time: string;
		max_orders: number;
		current_orders?: number;
	}) {
		const currentOrders = input.current_orders ?? 0;
		if (currentOrders > input.max_orders) {
			throw new BadRequestException('current_orders ne peut pas dépasser max_orders');
		}

		const created = {
			id: this.slots.length + 1,
			store_id: input.store_id,
			date: input.date,
			start_time: input.start_time,
			end_time: input.end_time,
			max_orders: input.max_orders,
			current_orders: currentOrders,
			is_available: currentOrders < input.max_orders,
		};

		this.slots.push(created);
		return created;
	}
}
