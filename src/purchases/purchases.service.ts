import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePurchaseDto, PurchaseDto, OfferDto, CreatePurchaseDtoWeb3 } from './dto/';
import { UserService } from 'src/users/users.service';
import { promises as fs } from 'fs';
import { EnvConfig } from 'src/config/env.config';
import { Web3 }  from 'web3';
import { status } from './dto/Purchase.dto';
import { web3Variables } from 'src/common/constants';

const decimals = 1000000000000000000;
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
      const myOffer =  await this.findOneOffer(createPurchaseDto.offerId);
      if(myOffer && myOffer.status == "free"){
        const {agent, hourFrom, hourTo, ...rest} = myOffer;
        const myFreeOffer = rest;
        const privateKey = user.privateKey;
        const message = `XM-${myFreeOffer}-2024`;
        const chainRPCUrl = EnvConfig().chainRPC
        const web3 = new Web3(chainRPCUrl);
        const sign = web3.eth.accounts.sign(message, privateKey);
        const purchase = {
          ...myFreeOffer, 
          id : "" + ((await this.findAll()).length + 1),
          idOffer: myFreeOffer.id,
          userId: user.id,
          cashback: myFreeOffer.price * 0.1,
          status: status.pending,
          signature: sign.signature,
          createdAt: Math.floor(Date.now()/1000),
          updatedAt: Math.floor(Date.now()/1000),
        }
        let myPurchasedOffer = {...myOffer, status: status.pending};
        const data = await fs.readFile("./src/db/data.json","utf8");
        const dataJSON = JSON.parse(data);
        let myPurchasedOfferIndex = dataJSON.offers.findIndex((offer) => offer.id === myPurchasedOffer.id);
        dataJSON.offers.splice(myPurchasedOfferIndex,1, myPurchasedOffer);
        // dataJSON.offers[myPurchasedOfferIndex].status = status.inProgress;
        dataJSON.purchase.push(purchase);
        await fs.writeFile("./src/db/data.json", JSON.stringify(dataJSON, null, '\t'));
        console.log("BD actualizada");
        return {
          message: 'Offer adquired',
          offerId: createPurchaseDto.offerId
        };
      }else{
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: `Oferta no disponible`,
        }, HttpStatus.NOT_FOUND)
      }
    }
  }
  
  async findAll(): Promise<PurchaseDto[]> {
    const data = await fs.readFile("./src/db/data.json","utf8");
    const purchases = JSON.parse(data).purchase;
    return purchases;
  }
  
  async findOne(id: string): Promise<PurchaseDto> {
    const purchases = await this.findAll();
    const purchase = purchases.find((offer) => offer.id == id);
    return purchase;
  }

  //TODO: Separate Offers from purchase methods.
  async findAllOffers(): Promise<OfferDto[]> {
    const data = await fs.readFile("./src/db/data.json","utf8");
    const offers = JSON.parse(data).offers;
    return offers;
  }
  //TODO: Separate Offers from purchase methods.
  async findOneOffer(id: string): Promise<OfferDto> {
    const offers = await this.findAllOffers();
    const offer = offers.find((offer) => offer.id == id);
    return offer;
  }

  remove(id: string) {
    return `This action removes a #${id} purchase`;
  }

  async createWeb3(email: string, createPurchaseDto: CreatePurchaseDtoWeb3) {
    // const users = JSON.parse(data).users;
    const user = await this.usersService.getUserByEmail(email);
    if(!user){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: `Usuario no encontrado`,
      }, HttpStatus.NOT_FOUND)
    }else{
      const myOffer =  await this.findOneOffer(createPurchaseDto.offerId);
      if(myOffer && myOffer.status == "free"){
        try{
          const chainRPCUrl = EnvConfig().chainRPC
          const web3 = new Web3(chainRPCUrl);
          const amount = createPurchaseDto.price * decimals;
          // const to = generateTransferDto.receiver;        
          const userPrivateKey = createPurchaseDto.userPrivateKey;
          const userPublicKey = createPurchaseDto.userPublicKey;
          const accountXMCOwner = web3.eth.accounts.wallet.add(EnvConfig().xmcopOwnerPrivateKey);
          const accountUser = web3.eth.accounts.wallet.add(userPrivateKey);
          
          //La Moneda propia (XMCOP) autoriza al contrato inteligente para que haga uso de un monto igual al precio de la compra.
          const XMCopContract = new web3.eth.Contract(web3Variables.ABIXMCOP, web3Variables.XMCOP)
          const estimateApprove = await XMCopContract.methods
          .approve(web3Variables.Main, amount) //Se aprueba al contrato gastar el precio de la compra.
          .estimateGas({ from: userPublicKey}) // Se estima el gas requerido para la operación.
          console.log('Aprobación estimada: ', estimateApprove)
          let approve = await XMCopContract.methods
          .approve(web3Variables.Main, amount)
          .send({ from: userPublicKey }) // Se requiere para interactuar con una función de escritura. Determina quién paga el gas. En este caso el usuario que está comprando.
          // console.log('Aprobación: ', approve);
          //El contrato inteligente hace uso del monto aprobado por el usuario y se deposita a sí mismo el dinero de la compra.
          const XMMainContract = new web3.eth.Contract(
            web3Variables.ABIMain,
            web3Variables.Main
          );
          if(approve.gasUsed){
            const deposit =await XMMainContract.methods
            .deposit(userPublicKey, amount, createPurchaseDto.offerId, createPurchaseDto.signature)
            .send({from: userPublicKey}) // Dirección del usuario.
            // .send({from: web3Variables.Main}) // Dirección del contrato inteligente.
            const createPurchaseDtoWeb2 = new CreatePurchaseDto(""+createPurchaseDto.offerId)
            let purchaseDone = await this.create(email, createPurchaseDtoWeb2)
            let ack = {...purchaseDone,
              approve: approve?.transactionHash,
              deposit: deposit?.transactionHash
            }
            return ack;
          }else{
            return {message: 'Aprobación del monto no realizada.'}
          }
        }catch(err){
          console.log(err)
          console.log('Se presenta error: ', err.message);
        }
      }else{
        throw new HttpException({
          status: HttpStatus.NOT_FOUND,
          error: `Oferta no disponible`,
        }, HttpStatus.NOT_FOUND)
      }
    }
  }


}
