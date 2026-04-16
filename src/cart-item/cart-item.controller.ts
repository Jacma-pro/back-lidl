import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
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
	@ApiBody({ schema: { example: { cart_id: 1, product_id: 1, quantity: 2, unit_price: 3.99 } } })
	@ApiResponse({ status: 201, description: 'Item ajouté au panier' })
	@ApiResponse({ status: 400, description: 'Champs manquants ou quantité/prix invalide' })
	create(@Body() body: { cart_id: number; product_id: number; quantity: number; unit_price: number }) {
		return this.cartItemService.create(body);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Modifier la quantité d\'un item — supprime automatiquement si quantité = 0' })
	@ApiParam({ name: 'id', example: 1 })
	@ApiBody({ schema: { example: { quantity: 3 } } })
	@ApiResponse({ status: 200, description: 'Quantité mise à jour' })
	@ApiResponse({ status: 200, description: 'Item supprimé (quantité = 0) — retourne { deleted: true, id }' })
	@ApiResponse({ status: 404, description: 'Item introuvable' })
	updateQuantity(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: { quantity: number },
	) {
		return this.cartItemService.updateQuantity(id, body.quantity);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Supprimer un item du panier' })
	@ApiParam({ name: 'id', example: 1 })
	@ApiResponse({ status: 200, description: 'Item supprimé — retourne { deleted: true, id }' })
	@ApiResponse({ status: 404, description: 'Item introuvable' })
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.cartItemService.remove(id);
	}
}
