import { Injectable } from '@nestjs/common';
import { GenerateTransferDto } from './dto/';
import { Web3 }  from 'web3';
import { EnvConfig } from 'src/config/env.config';
import { web3Variables} from 'src/common/constants';


const decimals = 1000000000000000000;
@Injectable()
export class TransfersService {
  async generate(generateTransferDto: GenerateTransferDto) {

    const chainRPCUrl = EnvConfig().chainRPC
    const web3 = new Web3(chainRPCUrl);
    const account = web3.eth.accounts.wallet.add(EnvConfig().privateKey)
    const amount = generateTransferDto.amount;
    const to = generateTransferDto.receiver;
    const tx = {
      from: account[0].address, // Dirección pública de la privada agregada a la wallet.
      to,
      value: amount * decimals
    }

    const txReceipt = await web3.eth.sendTransaction(tx);
    // console.log("Tx hash: ", txReceipt.transactionHash);
    const txHash = {
      hash: txReceipt.transactionHash
    }
    return txHash;
  }

    async generateERC20(generateTransferDto: GenerateTransferDto) {

    const chainRPCUrl = EnvConfig().chainRPC
    const web3 = new Web3(chainRPCUrl);
    const account = web3.eth.accounts.wallet.add(EnvConfig().privateKey)
    const amount = generateTransferDto.amount;
    const to = generateTransferDto.receiver;

    const XMCopContract = new web3.eth.Contract(
      web3Variables.ABIXMCOP, 
      web3Variables.XMCOP)
    
    const trx = await XMCopContract.methods
    .transfer(to, amount * decimals)
    .send({ from: EnvConfig().publicKey }) // Se requiere para interactuar con una función de escritura. Determina quién paga el gas.
    
    console.log("Tx hash: ", trx);
    const txHash = {
      hash: trx?.transactionHash
    }
    return txHash;
  }

  findAll() {
    return `This action returns all transfers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transfer`;
  }

}
