import { Injectable } from '@nestjs/common';
import { CreateEmployeeAgencyRelationDto } from './dto/create-employee-agency-relation.dto';
import { UpdateEmployeeAgencyRelationDto } from './dto/update-employee-agency-relation.dto';
import { EmployeeAgencyRelation } from './entities/employee-agency-relation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
//import { UsersService } from 'src/users/users.service';
//import { AgenciesService } from 'src/agencies/agencies.service';

@Injectable()
export class EmployeeAgencyRelationService {

  constructor(
    @InjectRepository(EmployeeAgencyRelation) 
    private relationRepository: Repository<EmployeeAgencyRelation>,
    //private userService: UsersService,
    //private sucursalService: AgenciesService,
  ) {}

  getAllRelations() {
    /*return this.relationRepository.createQueryBuilder('relacionempleadosucursal')
      .leftJoinAndSelect('relacionempleadosucursal.usuario', 'usuario')
      .select([
        'relacionempleadosucursal.id_relacion_empleado_sucursal AS id_sucursal',
        'relacionempleadosucursal.nombre_sucursal AS nombre_sucursal',
        'relacionempleadosucursal.direccion_detallada AS direccion_detallada',
        'relacionempleadosucursal.telefono AS telefono',
        'relacionempleadosucursal.correo AS correo',
        'relacionempleadosucursal.estado AS estado',
        'relacionempleadosucursal.created_at AS created_at',
        'relacionempleadosucursal.updated_at AS updated_at',
        'ubicacion.id_ubicacion AS id_ubicacion',
        'ST_X(ubicacion.ubicacion_gps) AS latitud',
        'ST_Y(ubicacion.ubicacion_gps) AS longitud',
      ])
      .getRawMany();*/
  }

  getRelation(id: number) {
    return this.relationRepository.findOne({
      where: { id_relacion_empleado_sucursal: id, estado: 1 },
    });
  }

  async createRelation(relationData: CreateEmployeeAgencyRelationDto) {
    const newRelation = this.relationRepository.create(relationData);
    await this.relationRepository.save(newRelation);
    return newRelation;
  }

  async updateRelation(id: number, relationData: UpdateEmployeeAgencyRelationDto) {
    await this.relationRepository.update(id, relationData);
    return this.getRelation(id);
  }

  async deleteRelation(id: number) {
    await this.relationRepository.update(id, { estado: 0 });
    return { message: `Relación con ID ${id} desactivada` };
  }
}
