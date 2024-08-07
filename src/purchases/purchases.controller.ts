import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchaseDto } from './dto/purchase.dto';
import { CreatePurchaseDto } from './dto';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  async create(@Headers() purchaseHeaders, @Body() createPurchaseDto: CreatePurchaseDto) {
    const headers = purchaseHeaders?.authorization;
    const email = headers.split(" ")[1];
    return this.purchasesService.create(email, createPurchaseDto);
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
