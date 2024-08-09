import { IsPositive, IsString} from "class-validator";

export class GenerateWithdrawalDto {

    //@IsInt({message: 'La cantidad debe ser un entero.'})
    @IsPositive({message: 'La cantidad debe ser positiva.'})
    public readonly amount: number;
    

    @IsString({message: 'Atributos deben contener "receiver"'})
    public readonly receiver: string;

    constructor(amount: number, receiver: string){
        this.amount = amount;
        this.receiver = receiver;
    }

    public getAttributes(){
        const generateWithdrawalDto = {
            'amount': this.amount,
            'receiver': this.receiver,
        }
         return generateWithdrawalDto;
    }

}

