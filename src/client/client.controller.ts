import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientService } from './client.service';

@ApiTags('Client')
@Controller('client')
export class ClientController {
	constructor(private readonly clientService: ClientService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les clients' })
	@ApiResponse({ status: 200, description: 'Liste des clients retournée' })
	findAll() {
		return this.clientService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer un client par ID' })
	@ApiParam({ name: 'id', example: 1 })
	@ApiResponse({ status: 200, description: 'Client trouvé' })
	@ApiResponse({ status: 404, description: 'Client introuvable' })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.clientService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer un client' })
	@ApiResponse({ status: 201, description: 'Client créé' })
	create(
		@Body()
		body: {
			permission_id: number;
			last_name: string;
			first_name: string;
			email: string;
			password: string;
			phone: string;
			address: string;
			preferred_store_id?: number | null;
		},
	) {
		return this.clientService.create(body);
	}
}
