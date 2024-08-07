import { PartialType } from '@nestjs/mapped-types';
import { status, typeGenerator } from './Purchase.dto';
import { IsEnum, IsInt, IsNumber, IsPositive, IsString } from 'class-validator';

export class OfferDto {
    
    @IsString({message: 'Atributos deben contener "Id"'})
    public readonly id: string;
    
    @IsString({message: 'Atributos deben contener "agent"'})
    public readonly agent: string;

    @IsInt({message: 'La energía debe ser un entero.'})
    @IsNumber()
    public readonly energy: number;

    @IsNumber()
    @IsPositive({message: 'El precio debe ser un número positivo'})
    public readonly price: number;
    
    @IsNumber()
    @IsPositive({message: 'Atributos deben contener "hourFrom"'})
    public readonly hourFrom: number;
    
    @IsNumber()
    @IsPositive({message: 'Atributos deben contener "hourFrom"'})
    public readonly hourTo: number;
    
    @IsNumber()
    @IsPositive({message: 'El precio normal debe ser un número positivo'})
    public readonly priceNormal: number;
    
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

    constructor(id: string, agent: string, energy: number, price: number, hourFrom: number, hourTo: number, priceNormal: number, cashback: number, typeGenerator: typeGenerator, status: status, signature: string, createdAt: number, updatedAt: number){
        this.id = id;
        this.agent = agent;
        this.energy = energy;
        this.price = price;
        this.hourFrom = hourFrom;
        this.hourTo = hourTo;
        this.priceNormal = priceNormal;
        this.typeGenerator = typeGenerator;
        this.status = status;
        this.cashback = cashback;
        this.signature = signature;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    public getAttributes(){
        const offerDto = {
            'id': this.id,
            'agent': this.agent,
            'energy': this.energy,
            'price': this.price,
            'hourFrom': this.hourFrom,
            'hourTo': this.hourTo,
            'priceNormal': this.priceNormal,
            'typeGenerator': this.typeGenerator,
            'status': this.status,
            'cashback': this.cashback,
            'signature': this.signature,
            'createdAt': this.createdAt,
            'updatedAt': this.updatedAt
        }
         return offerDto;
    }
}
