import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  getAllRoles() {
    return this.roleRepository.find();
  }

  getRole(id_rol: number) {
    return this.roleRepository.findOne({
      where: {
        id_rol,
      },
    });
  }

  createRole(role: CreateRoleDto) {
    const newRole = this.roleRepository.create(role);
    this.roleRepository.save(newRole);
  }

  updateRole(id_rol: number, role: UpdateRoleDto) {
    return this.roleRepository.update({ id_rol }, role);
  }

  deleteRole(id_rol: number) {
    return this.roleRepository.update({ id_rol }, { estado: 0 });
  }
}
