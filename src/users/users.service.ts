import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Agency } from 'src/agencies/agency.entity';
import { AgencyEmployeeRelation } from 'src/agency-employee-relation/entities/agency-employee-relation.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Agency)
    private sucursalRepository: Repository<Agency>,
    @InjectRepository(AgencyEmployeeRelation)
    private relacionRepository: Repository<AgencyEmployeeRelation>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();

    // Conectarse al QueryRunner y comenzar la transacción
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Verificar si la sucursal existe
      const sucursal = await queryRunner.manager.findOne(Agency, {
        where: { id_sucursal: createUserDto.id_sucursal },
      });

      if (!sucursal) {
        throw new Error('La sucursal especificada no existe');
      }

      // Crear el usuario
      const usuario = this.userRepository.create({
        nombre_persona: createUserDto.nombre_persona,
        username: createUserDto.username,
        password: createUserDto.password,
      });

      const nuevoUsuario = await queryRunner.manager.save(usuario);

      // Crear la relación entre el usuario y la sucursal
      const relacion = this.relacionRepository.create({
        id_usuario: nuevoUsuario,
        id_sucursal: sucursal,
      });

      await queryRunner.manager.save(relacion);

      // Confirmar la transacción
      await queryRunner.commitTransaction();

      return { usuario: nuevoUsuario, relacion };
    } catch (error) {
      // Revertir la transacción en caso de error
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Liberar el QueryRunner
      await queryRunner.release();
    }
  }

  findByUsername(username: string) {
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

  async getAllUsers(page: number, limit: number) {
    const queryBuilder = this.userRepository
      .createQueryBuilder('usuario')
      .innerJoin('usuario.role', 'rol')
      .where('usuario.estado = true')
      .select([
        'usuario.id_usuario',
        'usuario.nombre_persona',
        'usuario.username',
        'rol.nombre_rol',
      ]);

    const total = await queryBuilder.getCount();
    const users = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getMany();

    const totalPages = Math.ceil(total / limit);

    return {
      data: users,
      total,
      currentPage: page,
      totalPages,
    };
  }

  deleteUser(id_usuario: number) {
    return this.userRepository.update({ id_usuario }, { estado: 0 });
  }
}
