import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';

@ApiTags('Category')
@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Lister toutes les catégories' })
  @ApiResponse({ status: 200, description: 'Liste des catégories retournée' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une catégorie par son ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'Catégorie trouvée' })
  @ApiResponse({ status: 404, description: 'Catégorie introuvable' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Créer une catégorie' })
  @ApiResponse({ status: 201, description: 'Catégorie créée' })
  create(@Body() body: { name: string; description?: string | null; restrictions?: object | null }) {
    return this.categoriesService.create(body);
  }
}