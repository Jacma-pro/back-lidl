import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PreparerService } from './preparer.service';

@ApiTags('Preparer')
@Controller('preparer')
export class PreparerController {
	constructor(private readonly preparerService: PreparerService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les preparateurs' })
	@ApiResponse({ status: 200, description: 'Liste des preparateurs retournée' })
	findAll() {
		return this.preparerService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer un preparateur par ID' })
	@ApiParam({ name: 'id', example: 1 })
	@ApiResponse({ status: 200, description: 'Preparateur trouvé' })
	@ApiResponse({ status: 404, description: 'Preparateur introuvable' })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.preparerService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer un preparateur' })
	@ApiResponse({ status: 201, description: 'Preparateur créé' })
	create(
		@Body()
		body: {
			permission_id: number;
			store_id: number;
			first_name: string;
			last_name_initials: string;
			work_email: string;
			password: string;
			work_phone: string;
		},
	) {
		return this.preparerService.create(body);
	}
}
