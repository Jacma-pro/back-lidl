import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItemController } from './cart-item.controller';
import { CartItemService } from './cart-item.service';
import { CartItem } from './cart-item.entity/cart-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
