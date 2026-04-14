import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StockService } from './stock.service';

@ApiTags('Stock')
@Controller('stock')
export class StockController {
	constructor(private readonly stockService: StockService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les stocks' })
	@ApiResponse({ status: 200, description: 'Liste des stocks retournée' })
	findAll() {
		return this.stockService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer une ligne de stock par ID' })
	@ApiParam({ name: 'id', example: 1 })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.stockService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer une ligne de stock' })
	create(@Body() body: { store_id: number; product_id: number; available_quantity: number }) {
		return this.stockService.create(body);
	}
}
