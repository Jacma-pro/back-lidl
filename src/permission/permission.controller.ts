import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionService } from './permission.service';

@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
	constructor(private readonly permissionService: PermissionService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les permissions' })
	@ApiResponse({ status: 200, description: 'Liste des permissions retournée' })
	findAll() {
		return this.permissionService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer une permission par ID' })
	@ApiParam({ name: 'id', example: 1 })
	@ApiResponse({ status: 200, description: 'Permission trouvée' })
	@ApiResponse({ status: 404, description: 'Permission introuvable' })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.permissionService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer une permission' })
	@ApiResponse({ status: 201, description: 'Permission créée' })
	create(@Body() body: { role: 'CLIENT' | 'OPERATOR' | 'MANAGER' | 'ADMIN' }) {
		return this.permissionService.create(body);
	}
}
