import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderItemService } from './order-item.service';

@ApiTags('OrderItem')
@Controller('order-item')
export class OrderItemController {
	constructor(private readonly orderItemService: OrderItemService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les items de commande' })
	@ApiResponse({ status: 200, description: 'Liste des order items retournée' })
	findAll() {
		return this.orderItemService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer un item commande par ID' })
	@ApiParam({ name: 'id', example: 1 })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.orderItemService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer un item de commande' })
	create(
		@Body()
		body: { order_id: number; product_id: number; quantity: number; unit_price: number; substitution_id?: number | null },
	) {
		return this.orderItemService.create(body);
	}
}
