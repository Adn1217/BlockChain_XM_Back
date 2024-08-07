import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvConfig } from './config/env.config';
import { UserModule } from './users/users.module';
import { TransfersModule } from './transfers/transfers.module';
import { PurchasesModule } from './purchases/purchases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfig],
    }),
    UserModule, TransfersModule, PurchasesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

