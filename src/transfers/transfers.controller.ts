import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { GenerateTransferDto } from './dto/generateTransfer.dto';


type standards = 'ERC20' | 'ERC721'

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
    if(std = 'ERC721'){
      return this.transfersService.generate(generateTransferDto);
    } else if (std = 'ERC20'){
      return this.transfersService.generateERC20(generateTransferDto);
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
