import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ManagerService } from './manager.service';

@ApiTags('Manager')
@Controller('manager')
export class ManagerController {
	constructor(private readonly managerService: ManagerService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les managers' })
	@ApiResponse({ status: 200, description: 'Liste des managers retournée' })
	findAll() {
		return this.managerService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer un manager par ID' })
	@ApiParam({ name: 'id', example: 1 })
	@ApiResponse({ status: 200, description: 'Manager trouvé' })
	@ApiResponse({ status: 404, description: 'Manager introuvable' })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.managerService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer un manager' })
	@ApiResponse({ status: 201, description: 'Manager créé' })
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
		return this.managerService.create(body);
	}
}
