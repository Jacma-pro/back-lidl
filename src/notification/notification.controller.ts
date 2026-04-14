import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les notifications' })
	@ApiResponse({ status: 200, description: 'Liste des notifications retournée' })
	findAll() {
		return this.notificationService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer une notification par ID' })
	@ApiParam({ name: 'id', example: 1 })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.notificationService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer une notification' })
	create(
		@Body()
		body: {
			client_id: number;
			order_id?: number | null;
			type: 'CONFIRMATION' | 'READY' | 'CANCELLATION' | 'SUBSTITUTION';
			channel: 'EMAIL' | 'SMS' | 'PUSH';
			status?: 'PENDING' | 'SENT' | 'FAILED';
			sent_at?: Date | null;
		},
	) {
		return this.notificationService.create(body);
	}
}
