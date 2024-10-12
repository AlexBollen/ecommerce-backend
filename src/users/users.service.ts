import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  createUser(user: CreateUserDto) {
    return this.userRepository.save(user);
  }

  findByUsername(username: string) {
    // return this.userRepository.findOneBy({ username });
    return this.userRepository
      .createQueryBuilder('usuario')
      .leftJoinAndSelect('usuario.role', 'rol')
      .select([
        'usuario.id_usuario AS id_usuario',
        'usuario.nombre_persona AS nombre_persona',
        'usuario.username AS username',
        'usuario.password AS password',
        'usuario.estado AS estado',
        'rol.id_rol AS id_rol',
      ])
      .where('usuario.username = :username', { username })
      .getRawOne();
  }
}
