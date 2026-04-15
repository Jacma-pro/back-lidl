import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubstitutionProposalController } from './substitution-proposal.controller';
import { SubstitutionProposalService } from './substitution-proposal.service';
import { SubstitutionProposal } from './substitution-proposal.entity/substitution-proposal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubstitutionProposal])],
  controllers: [SubstitutionProposalController],
  providers: [SubstitutionProposalService],
})
export class SubstitutionProposalModule {}
