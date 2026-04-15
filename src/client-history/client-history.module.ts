import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientHistoryController } from './client-history.controller';
import { ClientHistoryService } from './client-history.service';
import { ClientHistory } from './client-history.entity/client-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientHistory])],
  controllers: [ClientHistoryController],
  providers: [ClientHistoryService],
})
export class ClientHistoryModule {}
