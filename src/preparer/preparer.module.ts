import { Module } from '@nestjs/common';
import { PreparerController } from './preparer.controller';
import { PreparerService } from './preparer.service';

@Module({
  controllers: [PreparerController],
  providers: [PreparerService]
})
export class PreparerModule {}
