import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo usuario',
    description: 'Este endpoint sirve para crear un nuevo usuario',
  })
  @ApiBody({
    description: 'Datos necesarios para crear un nueco usuario.',
    schema: {
      type: 'object',
      properties: {
        nombre_persona: {
          type: 'string',
          example: 'María Rojas',
        },
        username: {
          type: 'string',
          example: 'marredxxx',
        },
        password: {
          type: 'string',
          example: 'mySecret_password',
        },
      },
    },
  })
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser);
  }

  @Get(':username')
  @ApiOperation({
    summary: 'Obtener usuario',
    description: 'Este endpoint sirve para obtener un usuario',
  })
  @ApiParam({
    name: 'username',
    type: String,
    description: 'username del usuario a obtener',
    example: 'alex',
  })
  findByUsername(@Param('username') username: string): Promise<User | any> {
    return this.usersService.findByUsername(username);
  }
}
