import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class SubstitutionProposalService {
	private readonly proposals: any[] = [
		{
			id: 1,
			order_item_id: 1,
			original_product_id: 1,
			proposed_product_id: 2,
			status: 'PENDING' as const,
			created_at: new Date(),
		},
	];

	findAll() {
		return this.proposals;
	}

	findOne(id: number) {
		const proposal = this.proposals.find((item) => item.id === id);
		if (!proposal) {
			throw new NotFoundException(`SubstitutionProposal #${id} introuvable`);
		}
		return proposal;
	}

	create(input: {
		order_item_id: number;
		original_product_id: number;
		proposed_product_id: number;
		status?: 'PENDING' | 'ACCEPTED' | 'REFUSED';
	}) {
		const created = {
			id: this.proposals.length + 1,
			order_item_id: input.order_item_id,
			original_product_id: input.original_product_id,
			proposed_product_id: input.proposed_product_id,
			status: input.status ?? 'PENDING',
			created_at: new Date(),
		};

		this.proposals.push(created);
		return created;
	}
}
