import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuditLogService } from './audit-log.service';

@ApiTags('AuditLog')
@Controller('audit-log')
export class AuditLogController {
	constructor(private readonly auditLogService: AuditLogService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les logs d audit' })
	@ApiResponse({ status: 200, description: 'Liste des logs retournée' })
	findAll() {
		return this.auditLogService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer un log d audit par ID' })
	@ApiParam({ name: 'id', example: 1 })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.auditLogService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer un log d audit' })
	create(
		@Body()
		body: {
			actor_id: number;
			actor_role: 'CLIENT' | 'OPERATOR' | 'MANAGER' | 'ADMIN';
			action: string;
			target_table: string;
			target_id?: number | null;
			ip_address: string;
		},
	) {
		return this.auditLogService.create(body);
	}
}
