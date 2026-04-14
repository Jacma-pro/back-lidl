import { Module } from '@nestjs/common';
import { ClientHistoryController } from './client-history.controller';
import { ClientHistoryService } from './client-history.service';

@Module({
  controllers: [ClientHistoryController],
  providers: [ClientHistoryService]
})
export class ClientHistoryModule {}
