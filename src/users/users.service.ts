import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserDto } from './dtos';
import { Web3 }  from 'web3';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import { EnvConfig } from 'src/config/env.config';


const web3 = new Web3(EnvConfig().chainRPC);

@Injectable()
export class UserService {
  
  
  async getUsers(): Promise<CreateUserDto[]>{
    const data = await fs.readFile('./src/db/data.json', 'utf8');
    const users = JSON.parse(data).users;
    return users;
  }
  
  async getUserByEmail(email: string): Promise<UserDto | undefined>{
    const data = await fs.readFile('./src/db/data.json', 'utf8');
    const users = JSON.parse(data).users;
    const user = users.find((user) => user.email == email);
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto>{
    let newUser = {...createUserDto, id: randomUUID()};
    let newUserDto = new UserDto(newUser.id,newUser.email, newUser.privateKey, newUser.publicKey);
    const data = await fs.readFile("./src/db/data.json","utf8");
    const dataJSON = JSON.parse(data);
    let users = await this.getUsers()
    users.push(newUserDto)
    dataJSON.users = users;
    await fs.writeFile("./src/db/data.json", JSON.stringify(dataJSON, null, '\t'));
    console.log("BD actualizada");
    return newUserDto;
  }

  async createRandomUser(): Promise<UserDto>{
    const account = web3.eth.accounts.create();
    let newUser = {
      id: randomUUID(),
      email: faker.internet.email(),
      privateKey: account.privateKey,
      publicKey: account.address

    }
    let newUserDto = new UserDto(newUser.id,newUser.email, newUser.privateKey, newUser.publicKey);
    await this.saveUser(newUserDto);
    return newUserDto;
  }

  async saveUser(newUserDto: UserDto) {
    const data = await fs.readFile("./src/db/data.json","utf8");
    const dataJSON = JSON.parse(data);
    let users = await this.getUsers()
    users.push(newUserDto)
    dataJSON.users = users;
    await fs.writeFile("./src/db/data.json", JSON.stringify(dataJSON, null, '\t'));
    console.log("BD actualizada");
  }

  
}
