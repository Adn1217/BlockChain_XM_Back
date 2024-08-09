import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WithdrawalsService } from './withdrawals.service';
import { GenerateWithdrawalDto } from './dto/';

@Controller('withdrawals')
export class WithdrawalsController {
  constructor(private readonly withdrawalsService: WithdrawalsService) {}

  @Post()
  async create(@Body() generateWithdrawalDto: GenerateWithdrawalDto ){
    return await this.withdrawalsService.create(generateWithdrawalDto);
  }

  @Get()
  findAll() {
    return this.withdrawalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.withdrawalsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.withdrawalsService.remove(+id);
  }
}
