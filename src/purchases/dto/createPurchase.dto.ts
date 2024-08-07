import { IsEnum, IsInt, IsNumber, IsPositive, IsString } from "class-validator";
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

export class CreatePurchaseDto {
    
    @IsString({message: 'Atributos deben contener "Id"'})
    public readonly id: string;
    
    constructor(id: string){
        this.id = id;
    }

}
