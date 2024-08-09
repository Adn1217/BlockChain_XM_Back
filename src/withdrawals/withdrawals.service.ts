import { Injectable } from '@nestjs/common';
import { GenerateWithdrawalDto } from './dto';
import { EnvConfig } from 'src/config/env.config';
import Web3 from 'web3';
import { web3Variables } from 'src/common/constants';


const decimals = 1000000000000000000;

@Injectable()
export class WithdrawalsService {
  async create(generateWithdrawalDto: GenerateWithdrawalDto) {
    try{
      const chainRPCUrl = EnvConfig().chainRPC
      const web3 = new Web3(chainRPCUrl);
      const amount = generateWithdrawalDto.amount * decimals;
      // const to = generateTransferDto.receiver;        
      // const userPrivateKey = createPurchaseDto.userPrivateKey;
      const receiverPublicKey = generateWithdrawalDto.receiver
      const accountXMCOwner = web3.eth.accounts.wallet.add(EnvConfig().xmcopOwnerPrivateKey);
      // const accountUser = web3.eth.accounts.wallet.add(userPrivateKey);
      
      const XMMainContract = new web3.eth.Contract(
        web3Variables.ABIMain,
        web3Variables.Main
      );
      const estimateApprove = await XMMainContract.methods
      .withdraw(receiverPublicKey, amount)
      .estimateGas({ from: accountXMCOwner[0].address}) // Se estima el gas requerido para la operación.
      console.log('Aprobación estimada: ', estimateApprove)
      let approve = await XMMainContract.methods
      .withdraw(receiverPublicKey , amount)
      .send({ from: accountXMCOwner[0].address }) // Se requiere para interactuar con una función de escritura. Determina quién paga el gas. En este caso el usuario autorizado para withdraw(withdrawOnlyOwner).
      // console.log('Aprobación: ', approve);
      
      if(approve.gasUsed){
        let ack = {
          approve: approve?.transactionHash,
        }
        return ack;
      }
    }catch(err){
      console.log(err);
      console.log('Se presenta error: ', err.message);
    }
    // return 'This action adds a new withdrawal';
  }

  findAll() {
    return `This action returns all withdrawals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} withdrawal`;
  }

  remove(id: number) {
    return `This action removes a #${id} withdrawal`;
  }
}
