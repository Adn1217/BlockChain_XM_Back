import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreatePurchaseDtoWeb3 {
    
    @IsString({message: 'Atributos deben contener "Id"'})
    public readonly offerId: string;
    
    @IsNumber()
    @IsPositive({message: 'El precio debe ser un número positivo'})
    public readonly price: number;
    
    @IsString({message: 'Atributos deben contener "userPrivateKey"'})
    public readonly userPrivateKey: string;
    
    @IsString({message: 'Atributos deben contener "userPublicKey"'})
    public readonly userPublicKey: string;
    
    @IsString({message: 'Atributos deben contener "signature"'})
    public readonly signature: string;
    
    constructor(offerId: string, price: number, userPrivateKey: string, userPublicKey: string, signature: string){
        this.offerId = offerId;
        this.price = price;
        this.userPrivateKey = this.userPrivateKey;
        this.userPublicKey = this.userPublicKey;
        this.signature = this.signature;
    }

}
