import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les paniers' })
	@ApiResponse({ status: 200, description: 'Liste des paniers retournée' })
	findAll() {
		return this.cartService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer un panier par ID' })
	@ApiParam({ name: 'id', example: 1 })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.cartService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer un panier' })
	@ApiBody({
		schema: {
			example: { client_id: 1, store_id: 1, status: 'ACTIVE' },
		},
	})
	create(@Body() body: { client_id: number; store_id: number; status?: 'ACTIVE' | 'ABANDONED' | 'CONVERTED' }) {
		return this.cartService.create(body);
	}
}
