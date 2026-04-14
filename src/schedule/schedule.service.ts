import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ScheduleService {
	private readonly schedules: any[] = [
		{
			id: 1,
			preparer_id: 1,
			store_id: 1,
			date: '2026-04-15',
			start_time: '08:00',
			end_time: '12:00',
			status: 'PRESENT' as const,
			comment: null,
			created_at: new Date(),
			updated_at: new Date(),
		},
	];

	findAll() {
		return this.schedules;
	}

	findOne(id: number) {
		const schedule = this.schedules.find((item) => item.id === id);
		if (!schedule) {
			throw new NotFoundException(`Schedule #${id} introuvable`);
		}
		return schedule;
	}

	create(input: {
		preparer_id: number;
		store_id: number;
		date: string;
		start_time: string;
		end_time: string;
		status?: 'PRESENT' | 'ABSENT' | 'ON_LEAVE';
		comment?: string | null;
	}) {
		const now = new Date();
		const created = {
			id: this.schedules.length + 1,
			preparer_id: input.preparer_id,
			store_id: input.store_id,
			date: input.date,
			start_time: input.start_time,
			end_time: input.end_time,
			status: input.status ?? 'PRESENT',
			comment: input.comment ?? null,
			created_at: now,
			updated_at: now,
		};

		this.schedules.push(created);
		return created;
	}
}
