import { IsEmail, IsString} from "class-validator";

export class CreateUserDto {

    @IsString({message: 'Atributos deben contener "email"'})
    @IsEmail()
    public readonly email: string;

    @IsString({message: 'Atributos deben contener "privateKey"'})
    public readonly privateKey: string;

    @IsString({message: 'Atributos deben contener "publicKey"'})
    public readonly publicKey: string;
    
    constructor(email: string, privateKey: string, publicKey: string){
        this.email = email;
        this.privateKey = privateKey;
        this.publicKey = publicKey
    }

    public getAttributes(){
        const createUserDto = {
            'correo': this.email,
            'privateKey': this.privateKey,
            'publicKey': this.publicKey
        }
         return createUserDto;
    }
}
