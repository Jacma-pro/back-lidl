import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientHistoryService } from './client-history.service';

@ApiTags('ClientHistory')
@Controller('client-history')
export class ClientHistoryController {
	constructor(private readonly clientHistoryService: ClientHistoryService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les historiques client' })
	@ApiResponse({ status: 200, description: 'Liste des historiques retournée' })
	findAll() {
		return this.clientHistoryService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer un historique client par ID' })
	@ApiParam({ name: 'id', example: 1 })
	@ApiResponse({ status: 200, description: 'Historique trouvé' })
	@ApiResponse({ status: 404, description: 'Historique introuvable' })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.clientHistoryService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer un historique client' })
	@ApiResponse({ status: 201, description: 'Historique créé' })
	create(@Body() body: { client_id: number; loyalty_points?: number; loyalty_status?: boolean }) {
		return this.clientHistoryService.create(body);
	}
}
