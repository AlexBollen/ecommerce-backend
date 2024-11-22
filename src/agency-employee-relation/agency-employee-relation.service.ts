import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgencyEmployeeRelationDto } from './dto/create-agency-employee-relation.dto';
import { UpdateAgencyEmployeeRelationDto } from './dto/update-agency-employee-relation.dto';
import { AgencyEmployeeRelation } from './entities/agency-employee-relation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AgencyEmployeeRelationService {
  constructor(
    @InjectRepository(AgencyEmployeeRelation)
    private readonly relationRepository: Repository<AgencyEmployeeRelation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(
    createDto: CreateAgencyEmployeeRelationDto,
  ): Promise<AgencyEmployeeRelation> {
    const newRelation = this.relationRepository.create(createDto);
    return this.relationRepository.save(newRelation);
  }

  async findAll(): Promise<AgencyEmployeeRelation[]> {
    return this.relationRepository.find({
      relations: ['id_usuario', 'id_sucursal'],
    });
  }

  async findOne(id: number): Promise<AgencyEmployeeRelation> {
    const relation = await this.relationRepository.findOne({
      where: { id_relacion_empleado_sucursal: id },
      relations: ['id_usuario', 'id_sucursal'],
    });
    if (!relation) {
      throw new NotFoundException(`Relation with ID ${id} not found`);
    }
    return relation;
  }

  async findByUserId(userId: number): Promise<AgencyEmployeeRelation> {
    return this.relationRepository
      .createQueryBuilder('relation')
      .innerJoinAndSelect('relation.id_usuario', 'user')
      .innerJoinAndSelect('relation.id_sucursal', 'agency')
      .where('relation.id_usuario = :userId', { userId })
      .getOne();
  }

  async update(
    id: number,
    updateDto: UpdateAgencyEmployeeRelationDto,
  ): Promise<AgencyEmployeeRelation> {
    const relation = await this.relationRepository.preload({
      id_relacion_empleado_sucursal: id,
      ...updateDto,
    });
    if (!relation) {
      throw new NotFoundException(`Relation with ID ${id} not found`);
    }
    return this.relationRepository.save(relation);
  }

  async remove(id: number): Promise<void> {
    const result = await this.relationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Relation with ID ${id} not found`);
    }
  }
}
