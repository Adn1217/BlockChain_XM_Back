import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { GenerateTransferDto } from './dto/generate-transfer.dto';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Post()
  generate(@Body() generateTransferDto: GenerateTransferDto) {
    if (Object.keys(generateTransferDto).length === 0){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `No hay información de la tranferencia`,
      }, HttpStatus.BAD_REQUEST)
    }
    return this.transfersService.generate(generateTransferDto);
  }

  @Get()
  findAll() {
    return this.transfersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transfersService.findOne(+id);
  }

}
