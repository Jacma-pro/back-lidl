import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CartItemService } from './cart-item.service';

@ApiTags('CartItem')
@Controller('cart-item')
export class CartItemController {
	constructor(private readonly cartItemService: CartItemService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les items panier' })
	@ApiResponse({ status: 200, description: 'Liste des items panier retournée' })
	findAll() {
		return this.cartItemService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer un item panier par ID' })
	@ApiParam({ name: 'id', example: 1 })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.cartItemService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Ajouter un item au panier' })
	create(@Body() body: { cart_id: number; product_id: number; quantity: number; unit_price: number }) {
		return this.cartItemService.create(body);
	}
}
