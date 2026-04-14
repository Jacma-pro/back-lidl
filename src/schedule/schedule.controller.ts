import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ScheduleService } from './schedule.service';

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
	constructor(private readonly scheduleService: ScheduleService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les plannings' })
	@ApiResponse({ status: 200, description: 'Liste des plannings retournée' })
	findAll() {
		return this.scheduleService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer un planning par ID' })
	@ApiParam({ name: 'id', example: 1 })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.scheduleService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer un planning préparateur' })
	create(
		@Body()
		body: {
			preparer_id: number;
			store_id: number;
			date: string;
			start_time: string;
			end_time: string;
			status?: 'PRESENT' | 'ABSENT' | 'ON_LEAVE';
			comment?: string | null;
		},
	) {
		return this.scheduleService.create(body);
	}
}
