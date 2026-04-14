import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PerformanceService {
	private readonly performances = [
		{
			id: 1,
			preparer_id: 1,
			orders_prepared_count: 120,
			avg_preparation_time: 18.5,
			error_rate: 2.3,
			stock_shortages_reported: 4,
			global_score: 87.4,
			period_start_date: '2026-04-01',
			period_end_date: '2026-04-30',
			created_at: new Date(),
		},
	];

	findAll() {
		return this.performances;
	}

	findOne(id: number) {
		const performance = this.performances.find((item) => item.id === id);
		if (!performance) {
			throw new NotFoundException(`Performance #${id} introuvable`);
		}
		return performance;
	}

	create(input: {
		preparer_id: number;
		orders_prepared_count: number;
		avg_preparation_time: number;
		error_rate: number;
		stock_shortages_reported: number;
		global_score: number;
		period_start_date: string;
		period_end_date: string;
	}) {
		const created = {
			id: this.performances.length + 1,
			preparer_id: input.preparer_id,
			orders_prepared_count: input.orders_prepared_count,
			avg_preparation_time: input.avg_preparation_time,
			error_rate: input.error_rate,
			stock_shortages_reported: input.stock_shortages_reported,
			global_score: input.global_score,
			period_start_date: input.period_start_date,
			period_end_date: input.period_end_date,
			created_at: new Date(),
		};

		this.performances.push(created);
		return created;
	}
}
