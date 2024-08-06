import { Injectable } from '@nestjs/common';
import { GenerateTransferDto } from './dto/';
import { Web3 }  from 'web3';
import { EnvConfig } from 'src/config/env.config';



@Injectable()
export class TransfersService {
  async generate(generateTransferDto: GenerateTransferDto) {

    const chainRPCUrl = EnvConfig().chainRPC
    const web3 = new Web3(chainRPCUrl);
    // const web3 = new Web3();
    const account = web3.eth.accounts.wallet.add(EnvConfig().privateKey)
    const amount = generateTransferDto.amount;
    const to = generateTransferDto.receiver;
    const tx = {
      from: account[0].address, // Dirección pública de la privada agregada a la wallet.
      to,
      value: amount * 10000000000000000000
    }

    const txReceipt = await web3.eth.sendTransaction(tx);
    // console.log("Tx hash: ", txReceipt.transactionHash);
    const txHash = {
      hash: txReceipt.transactionHash
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
