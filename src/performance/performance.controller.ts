import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PerformanceService } from './performance.service';

@ApiTags('Performance')
@Controller('performance')
export class PerformanceController {
	constructor(private readonly performanceService: PerformanceService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les performances' })
	@ApiResponse({ status: 200, description: 'Liste des performances retournée' })
	findAll() {
		return this.performanceService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer une performance par ID' })
	@ApiParam({ name: 'id', example: 1 })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.performanceService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer un enregistrement de performance' })
	create(
		@Body()
		body: {
			preparer_id: number;
			orders_prepared_count: number;
			avg_preparation_time: number;
			error_rate: number;
			stock_shortages_reported: number;
			global_score: number;
			period_start_date: string;
			period_end_date: string;
		},
	) {
		return this.performanceService.create(body);
	}
}
