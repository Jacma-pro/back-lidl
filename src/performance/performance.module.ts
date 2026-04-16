import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerformanceController } from './performance.controller';
import { PerformanceService } from './performance.service';
import { Performance } from './performance.entity/performance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Performance])],
  controllers: [PerformanceController],
  providers: [PerformanceService],
})
export class PerformanceModule {}
