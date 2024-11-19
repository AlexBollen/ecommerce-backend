import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
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

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los usuarios activos con paginación',
    description:
      'Este endpoint lista los usuarios activos con soporte para paginación',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    example: 1,
  })
  async getAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  ): Promise<{
    data: any[];
    total: number;
    currentPage: number;
    totalPages: number;
  }> {
    return this.usersService.getAllUsers(page, limit);
  }

  @Put(':id_usuario')
  @ApiOperation({
    summary: 'Eliminar lógicamente un usuario',
    description: 'Este endpoint sirve para eliminar un usuario lógicamente',
  })
  @ApiParam({
    name: 'id_usuario',
    type: Number,
    description: 'Id del usuario a eliminar',
    example: '1',
  })
  deleteUser(@Param('id_usuario', ParseIntPipe) id_usuario: number) {
    return this.usersService.deleteUser(id_usuario);
  }
}
