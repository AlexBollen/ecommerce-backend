import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registrar un usuario',
    description: 'Este endpoint sirve para registrar un usuario',
  })
  @ApiBody({
    description: 'Datos necesarios para registrar un nuevo usuario',
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
          example: 'myStrongPassword',
        },
        id_rol: {
          type: 'number',
          example: '1',
        },
      },
    },
  })
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Autenticar un usuario',
    description: 'Este endpoint sirve para autenticar un usuario',
  })
  @ApiBody({
    description: 'Datos necesarios para registrar un nuevo usuario',
    schema: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          example: 'marredxxx',
        },
        password: {
          type: 'string',
          example: 'myStrongPassword',
        },
      },
    },
  })
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }
}
