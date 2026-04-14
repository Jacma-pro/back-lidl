import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Lister tous les produits actifs du catalogue' })
  @ApiResponse({ status: 200, description: 'Liste des produits retournée' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un produit par son ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Produit trouvé' })
  @ApiResponse({ status: 404, description: 'Produit introuvable' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un produit' })
  @ApiResponse({ status: 201, description: 'Produit créé' })
  create(
    @Body()
    body: {
      category_id: number;
      name: string;
      description?: string | null;
      price: number;
      weight?: number | null;
      image_url?: string | null;
      barcode?: string | null;
      nutriscore?: string | null;
      is_active?: boolean;
    },
  ) {
    return this.productsService.create(body);
  }
}