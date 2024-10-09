import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async register({ nombre_persona, username, password }: RegisterDto) {
    const user = await this.userService.findByUsername(username);
    if (user) {
      throw new BadRequestException('El usuario ya esta registrado');
    }
    return await this.userService.createUser({
      nombre_persona,
      username,
      password: await bcryptjs.hash(password, 10),
    });
  }

  async login({ username, password }: LoginDto) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
        throw new UnauthorizedException('El username no existe')
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password)
    if (!isPasswordValid) {
        throw new UnauthorizedException('La contraseña no es correcta')
    }
    return user;
  }
}
