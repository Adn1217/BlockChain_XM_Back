import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PurchaseDto } from './dto/';
import { UserService } from 'src/users/users.service';
import { promises as fs } from 'fs';
import { EnvConfig } from 'src/config/env.config';
import { Web3 }  from 'web3';
import { CreatePurchaseDto, status } from './dto/createPurchase.dto';

@Injectable()
export class PurchasesService {
  constructor(private readonly usersService: UserService){}

  async create(email: string, createPurchaseDto: CreatePurchaseDto) {
    // const users = JSON.parse(data).users;
    const user = await this.usersService.getUserByEmail(email);
    if(!user){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Usuario no encontrado`,
      }, HttpStatus.NOT_FOUND)
    }else{
      const myOffer =  await this.findOne(createPurchaseDto.id);
      if(myOffer && myOffer.status == "free"){
        const myFreeOffer = myOffer;
        const privateKey = user.privateKey;
        const message = `XM-${myFreeOffer}-2024`;
        const chainRPCUrl = EnvConfig().chainRPC
        const web3 = new Web3(chainRPCUrl);
        const sign = web3.eth.accounts.sign(message, privateKey);
        const purchase = {
          ...myFreeOffer, 
          id : ""+(await this.findAll()).length + 1,
          cashback: myFreeOffer.price * 0.1,
          status: status.pending,
          signature: sign.signature,
          createdAt: Math.floor(Date.now()/1000),
          updatedAt: Math.floor(Date.now()/1000),
        }
        const data = await fs.readFile("./src/db/data.json","utf8");
        const dataJSON = JSON.parse(data);
        dataJSON.purchase.push(purchase);
        dataJSON.purchase[createPurchaseDto.id].status = status.inProgress;
        await fs.writeFile("./src/db/data.json", JSON.stringify(dataJSON, null, '\t'));
        console.log("BD actualizad");
        return purchase;
      }else{
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: `Oferta no disponible`,
        }, HttpStatus.NOT_FOUND)
      }
    }
  }

  //TODO: Separate Offers from purchase methods.
  async findAll(): Promise<PurchaseDto[]> {
    const data = await fs.readFile("./src/db/data.json","utf8");
    const offers = JSON.parse(data).offers;
    return offers;
  }
  //TODO: Separate Offers from purchase methods.
  async findOne(id: string): Promise<PurchaseDto> {
    const offers = await this.findAll();
    const offer = offers.find((offer) => offer.id == id);
    return offer;
  }

  remove(id: string) {
    return `This action removes a #${id} purchase`;
  }
}
