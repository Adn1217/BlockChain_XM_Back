import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto, UserDto } from './dtos'

@Controller('users')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get()
  async getUsers(): Promise<CreateUserDto[]>{
    return await this.appService.getUsers();
  }
  
  @Get(':email')
  async getUserByEmail(@Param('email') email: string): Promise<UserDto | undefined>{
    return await this.appService.getUserByEmail(email);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): CreateUserDto {
    if (Object.keys(createUserDto).length === 0){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: `No hay información del usuario`,
      }, HttpStatus.BAD_REQUEST)
    }
    return this.appService.createUser(createUserDto);
  }

  @Post('random')
  createRandomUser(): CreateUserDto {
    return this.appService.createRandomUser();
  }

}
