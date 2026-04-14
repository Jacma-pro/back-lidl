import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientAccountService } from './client-account.service';

@ApiTags('ClientAccount')
@Controller('client-account')
export class ClientAccountController {
	constructor(private readonly clientAccountService: ClientAccountService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les comptes client' })
	@ApiResponse({ status: 200, description: 'Liste des comptes client retournée' })
	findAll() {
		return this.clientAccountService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer un compte client par ID' })
	@ApiParam({ name: 'id', example: 1 })
	@ApiResponse({ status: 200, description: 'Compte client trouvé' })
	@ApiResponse({ status: 404, description: 'Compte client introuvable' })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.clientAccountService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer un compte client' })
	@ApiResponse({ status: 201, description: 'Compte client créé' })
	create(@Body() body: { client_id: number; is_verified?: boolean; is_active?: boolean }) {
		return this.clientAccountService.create(body);
	}
}
