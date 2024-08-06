import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './users.service';
import { EnvConfig } from '../config/env.config';
import { UserController } from './users.controller';

@Module({
  imports: [ConfigModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
