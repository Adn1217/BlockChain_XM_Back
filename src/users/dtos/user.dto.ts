
import { CreateUserDto } from ".";
import {IsString} from "class-validator";

export class UserDto extends CreateUserDto {
    @IsString({message: 'Atributos deben contener "id"'})
    public readonly id: string;
    
    constructor(id: string, email: string, privateKey: string, publicKey: string){
        super(email, privateKey, publicKey)
        this.id = id;
    }
}