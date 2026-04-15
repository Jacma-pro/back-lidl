import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientAccountController } from './client-account.controller';
import { ClientAccountService } from './client-account.service';
import { ClientAccount } from './client-account.entity/client-account.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientAccount])],
  controllers: [ClientAccountController],
  providers: [ClientAccountService],
})
export class ClientAccountModule {}
