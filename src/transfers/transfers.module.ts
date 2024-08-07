import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { UserModule } from 'src/users/users.module';

@Module({
  controllers: [TransfersController],
  providers: [TransfersService],
  imports: [UserModule]
})
export class TransfersModule {}
