import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupSlotController } from './pickup-slot.controller';
import { PickupSlotService } from './pickup-slot.service';
import { PickupSlot } from './pickup-slot.entity/pickup-slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PickupSlot])],
  controllers: [PickupSlotController],
  providers: [PickupSlotService],
})
export class PickupSlotModule {}
