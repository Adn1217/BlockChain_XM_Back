import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseDto } from './createPurchase.dto';
import { IsEnum, IsInt, IsNumber, IsPositive, IsString } from 'class-validator';

export enum typeGenerator {
    eolic = 'eolic',
    hydro = 'hydro',
    solar = 'solar',
    thermal = 'thermal',
  }

export enum status {
    free = 'free',
    inProgress = 'inProgress',
    pending = 'pending',
    done = 'done'
  }

export enum purchaseType {
    web2= 'web2',
    web3= 'web3'
}
export class PurchaseDto extends CreatePurchaseDto {
    
    @IsString({message: 'Atributos deben contener "id"'})
    public readonly id: string;

    @IsString({message: 'Atributos deben contener "id"'})
    public readonly userId: string;
    
    @IsInt({message: 'La energía debe ser un entero.'})
    @IsNumber()
    public readonly energy: number;

    @IsNumber()
    @IsPositive({message: 'El precio debe ser un número positivo'})
    public readonly price: number;
    
    @IsString({message: 'Atributos deben contener "typeGenerator"'})
    @IsEnum(typeGenerator)
    public readonly typeGenerator: typeGenerator;

    @IsString({message: 'Atributos deben contener "status"'})
    @IsEnum(status)
    public readonly status: status
    
    @IsNumber()
    @IsPositive({message: 'El cashback debe ser un número positivo'})
    public readonly cashback: number;
    
    @IsString({message: 'Atributos deben contener firma criptografica'})
    public readonly signature: string;
    
    @IsNumber()
    @IsPositive({message: 'Atributos deben contener "createdAt"'})
    public readonly createdAt: number;
    
    @IsNumber()
    @IsPositive({message: 'Atributos deben contener "updatedAt"'})
    public readonly updatedAt: number;

    constructor(offerId: string, id: string, userId: string, energy: number, price: number, hourFrom: number, hourTo: number, priceNormal: number, cashback: number, typeGenerator: typeGenerator, status: status, signature: string, createdAt: number, updatedAt: number){
        super(offerId),
        this.id = id;
        this.userId = userId;        
        this.energy = energy;
        this.price = price;
        this.typeGenerator = typeGenerator;
        this.status = status;
        this.cashback = cashback;
        this.signature = signature;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    public getAttributes(){
        const purchaseDto = {
            'id': this.id,
            'offerId': this.offerId,
            'userId': this.userId,
            'energy': this.energy,
            'price': this.price,
            'typeGenerator': this.typeGenerator,
            'status': this.status,
            'cashback': this.cashback,
            'signature': this.signature,
            'createdAt': this.createdAt,
            'updatedAt': this.updatedAt
        }
         return purchaseDto;
    }
}
