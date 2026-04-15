import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreparerController } from './preparer.controller';
import { PreparerService } from './preparer.service';
import { Preparer } from './preparer.entity/preparer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Preparer])],
  controllers: [PreparerController],
  providers: [PreparerService],
  exports: [PreparerService],
})
export class PreparerModule {}
