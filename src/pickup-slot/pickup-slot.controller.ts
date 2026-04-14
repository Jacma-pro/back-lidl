import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PickupSlotService } from './pickup-slot.service';

@ApiTags('PickupSlot')
@Controller('pickup-slot')
export class PickupSlotController {
	constructor(private readonly pickupSlotService: PickupSlotService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les créneaux de retrait' })
	@ApiResponse({ status: 200, description: 'Liste des créneaux retournée' })
	findAll() {
		return this.pickupSlotService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer un créneau par ID' })
	@ApiParam({ name: 'id', example: 1 })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.pickupSlotService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer un créneau de retrait' })
	create(
		@Body()
		body: {
			store_id: number;
			date: string;
			start_time: string;
			end_time: string;
			max_orders: number;
			current_orders?: number;
		},
	) {
		return this.pickupSlotService.create(body);
	}
}
