import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly roleService: RolesService,
  ) {}

  async register({ nombre_persona, username, password, id_rol }: RegisterDto) {
    const user = await this.userService.findByUsername(username);
    if (user) {
      throw new BadRequestException('El usuario ya esta registrado');
    }
    const role = await this.roleService.getRole(id_rol);
    if (!role) {
      throw new HttpException('No se encontro el rol', HttpStatus.NOT_FOUND);
    }
    await this.userService.createUser({
      nombre_persona,
      username,
      password: await bcryptjs.hash(password, 10),
      role,
    });
    return {
      nombre_persona,
      username,
      role
    }
  }

  async login({ username, password }: LoginDto) {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('El username no existe');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('La contraseña no es correcta');
    }
    const role = await this.roleService.getRole(user.id_rol);
    const payload = { sub: user.id_usuario, username: user.username, role: user.id_rol };
    const token = await this.jwtService.signAsync(payload);
    const agency_employee = 1
    return {
      token,
      sub: user.id_usuario,
      name: user.nombre_persona,
      role: role.nombre_rol,
      agency_employee: agency_employee
    };
  }
}
