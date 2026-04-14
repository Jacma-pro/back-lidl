import { Module } from '@nestjs/common';
import { SubstitutionProposalController } from './substitution-proposal.controller';
import { SubstitutionProposalService } from './substitution-proposal.service';

@Module({
  controllers: [SubstitutionProposalController],
  providers: [SubstitutionProposalService]
})
export class SubstitutionProposalModule {}
