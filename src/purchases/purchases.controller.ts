import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchaseDto, purchaseType } from './dto/purchase.dto';
import { CreatePurchaseDto, CreatePurchaseDtoWeb3 } from './dto';

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

  @Get()
  findAll() {
    return this.purchasesService.findAll();
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
