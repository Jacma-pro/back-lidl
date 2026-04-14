import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
	constructor(private readonly paymentService: PaymentService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les paiements' })
	@ApiResponse({ status: 200, description: 'Liste des paiements retournée' })
	findAll() {
		return this.paymentService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer un paiement par ID' })
	@ApiParam({ name: 'id', example: 1 })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.paymentService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer un paiement simulé' })
	create(
		@Body()
		body: {
			order_id: number;
			amount: number;
			method?: 'IN_STORE' | 'SIMULATED_ONLINE';
			status?: 'PENDING' | 'VALIDATED' | 'REFUNDED';
			transaction_ref?: string | null;
		},
	) {
		return this.paymentService.create(body);
	}
}
