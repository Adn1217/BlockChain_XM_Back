import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { UserModule } from 'src/users/users.module';

@Module({
  controllers: [PurchasesController],
  providers: [PurchasesService],
  imports: [UserModule]
})
export class PurchasesModule {}
