import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserDto } from './users/dtos';
import { Web3 }  from 'web3';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';



@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
