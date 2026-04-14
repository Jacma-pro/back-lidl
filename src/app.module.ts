import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { StoresModule } from './stores/stores.module';
import { PermissionModule } from './permission/permission.module';
import { ClientModule } from './client/client.module';
import { ClientAccountModule } from './client-account/client-account.module';
import { ClientHistoryModule } from './client-history/client-history.module';
import { PreparerModule } from './preparer/preparer.module';
import { ManagerModule } from './manager/manager.module';
import { StockModule } from './stock/stock.module';
import { PickupSlotModule } from './pickup-slot/pickup-slot.module';
import { CartModule } from './cart/cart.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { SubstitutionProposalModule } from './substitution-proposal/substitution-proposal.module';
import { PaymentModule } from './payment/payment.module';
import { ScheduleModule } from './schedule/schedule.module';
import { PerformanceModule } from './performance/performance.module';
import { NotificationModule } from './notification/notification.module';
import { AuditLogModule } from './audit-log/audit-log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    CategoriesModule,
    StoresModule,
    PermissionModule,
    ClientModule,
    ClientAccountModule,
    ClientHistoryModule,
    PreparerModule,
    ManagerModule,
    StockModule,
    PickupSlotModule,
    CartModule,
    CartItemModule,
    OrderModule,
    OrderItemModule,
    SubstitutionProposalModule,
    PaymentModule,
    ScheduleModule,
    PerformanceModule,
    NotificationModule,
    AuditLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }