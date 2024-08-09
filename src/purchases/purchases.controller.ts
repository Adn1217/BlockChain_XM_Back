import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, HttpException, HttpStatus, Query } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { purchaseType } from './dto/purchase.dto';
import { CreatePurchaseDto, CreatePurchaseDtoWeb3 } from './dto';
import { purchasesQueryParams } from './model/purchases.interface';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post(':type')
  async create(@Param('type') type: purchaseType, @Headers() purchaseHeaders, @Body() createPurchaseDto: CreatePurchaseDto | CreatePurchaseDtoWeb3) {

    const headers = purchaseHeaders?.authorization;
    const email = headers.split(" ")[1];

    if (Object.keys(createPurchaseDto).length === 0 || (Object.keys(purchaseHeaders).length === 0)){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `No hay información suficiente para la compra`,
      }, HttpStatus.BAD_REQUEST)
    }

    if(type == purchaseType.web2){
      return this.purchasesService.create(email, createPurchaseDto);
    }else if(type == purchaseType.web3) {
      return this.purchasesService.createWeb3(email, <CreatePurchaseDtoWeb3>createPurchaseDto);
    }else{
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `Tipo de compra no soportada.`,
      }, HttpStatus.BAD_REQUEST)
    }
  }

  @Get(':type')
  findAll(@Query() query: purchasesQueryParams, @Param('type') type: purchaseType) {
    const {email, ...rest} = query;
    if (email){
      if(!type || type == purchaseType.web2)
        return this.purchasesService.findAllByEmail(email);
      else if (type = purchaseType.web3){
        return this.purchasesService.findAllByEmailWeb3(email);
      }else{
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: `Tipo de consulta no soportada.`,
        }, HttpStatus.BAD_REQUEST)
      }
    }else if (rest){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `Parámetros no reconocidos`,
      }, HttpStatus.BAD_REQUEST)
    }else{
      return this.purchasesService.findAll();
    }
  }
  
  @Get()
  findAllByEmail(@Query() query: purchasesQueryParams) {
    const {email, ...rest} = query;
    if (email){
      return this.purchasesService.findAllByEmail(email);
    }else{
      return this.purchasesService.findAll();
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchasesService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchasesService.remove(id);
  }
}
