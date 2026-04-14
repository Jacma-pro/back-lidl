import { Module } from '@nestjs/common';
import { ClientAccountController } from './client-account.controller';
import { ClientAccountService } from './client-account.service';

@Module({
  controllers: [ClientAccountController],
  providers: [ClientAccountService]
})
export class ClientAccountModule {}
