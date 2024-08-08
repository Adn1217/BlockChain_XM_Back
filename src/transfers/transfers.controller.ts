import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { GenerateTransferDto } from './dto/generateTransfer.dto';


type standards = 'NATIVA'|'ERC20'

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @Post(':standard')
  generate(@Param('standard') std: standards , @Body() generateTransferDto: GenerateTransferDto) {
    if (Object.keys(generateTransferDto).length === 0){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `No hay información de la tranferencia`,
      }, HttpStatus.BAD_REQUEST)
    }
    if(std = 'NATIVA'){
      return this.transfersService.generate(generateTransferDto);
    } else if (std = 'ERC20'){
      return this.transfersService.generateERC20(generateTransferDto);
    }else {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `Tipo de transferencia no soportada.`,
      }, HttpStatus.BAD_REQUEST)
    }
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
