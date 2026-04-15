import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubstitutionProposal } from './substitution-proposal.entity/substitution-proposal.entity';

@Injectable()
export class SubstitutionProposalService {
  constructor(
    @InjectRepository(SubstitutionProposal)
    private readonly repo: Repository<SubstitutionProposal>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const proposal = await this.repo.findOne({ where: { id } });
    if (!proposal) throw new NotFoundException(`SubstitutionProposal #${id} introuvable`);
    return proposal;
  }

  async create(input: {
    order_item_id: number;
    original_product_id: number;
    proposed_product_id: number;
    status?: 'PENDING' | 'ACCEPTED' | 'REFUSED';
  }) {
    const entity = this.repo.create(input as any);
    return this.repo.save(entity as any);
  }
}
