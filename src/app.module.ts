import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        ssl: { rejectUnauthorized: false }, // requis pour Supabase
        extra: { family: 4 }, // force IPv4 pour éviter les timeouts
      }),
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }