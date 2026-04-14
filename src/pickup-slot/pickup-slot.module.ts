import { Module } from '@nestjs/common';
import { PickupSlotController } from './pickup-slot.controller';
import { PickupSlotService } from './pickup-slot.service';

@Module({
  controllers: [PickupSlotController],
  providers: [PickupSlotService]
})
export class PickupSlotModule {}
