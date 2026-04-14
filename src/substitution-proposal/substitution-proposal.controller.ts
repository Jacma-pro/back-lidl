import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubstitutionProposalService } from './substitution-proposal.service';

@ApiTags('SubstitutionProposal')
@Controller('substitution-proposal')
export class SubstitutionProposalController {
	constructor(private readonly substitutionProposalService: SubstitutionProposalService) {}

	@Get()
	@ApiOperation({ summary: 'Lister les propositions de substitution' })
	@ApiResponse({ status: 200, description: 'Liste des propositions retournée' })
	findAll() {
		return this.substitutionProposalService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Récupérer une proposition par ID' })
	@ApiParam({ name: 'id', example: 1 })
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.substitutionProposalService.findOne(id);
	}

	@Post()
	@ApiOperation({ summary: 'Créer une proposition de substitution' })
	create(
		@Body()
		body: {
			order_item_id: number;
			original_product_id: number;
			proposed_product_id: number;
			status?: 'PENDING' | 'ACCEPTED' | 'REFUSED';
		},
	) {
		return this.substitutionProposalService.create(body);
	}
}
