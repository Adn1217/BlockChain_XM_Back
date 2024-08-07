import { IsEnum, IsInt, IsNumber, IsPositive, IsString } from "class-validator";

export class CreatePurchaseDto {
    
    @IsString({message: 'Atributos deben contener "Id"'})
    public readonly offerId: string;
    
    constructor(offerId: string){
        this.offerId = offerId;
    }

}
