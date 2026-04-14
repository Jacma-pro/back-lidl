import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';

@ApiTags('Order')
@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les commandes' })
	@ApiResponse({ status: 200, description: 'Liste des commandes retournée' })
	findAll() {
		return this.orderService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer une commande par ID' })
	@ApiParam({ name: 'id', example: 1 })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.orderService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer une commande' })
	create(
		@Body()
		body: {
			client_id: number;
			store_id: number;
			pickup_slot_id: number;
			preparer_id?: number | null;
			status?: 'PENDING' | 'IN_PROGRESS' | 'READY' | 'PICKED_UP' | 'CANCELLED';
			total_price: number;
			pickup_code: string;
		},
	) {
		return this.orderService.create(body);
	}
}
