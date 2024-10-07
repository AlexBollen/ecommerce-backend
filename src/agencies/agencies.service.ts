import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Agency } from './agency.entity';
import { Repository } from 'typeorm';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';

@Injectable()
export class AgenciesService {
  constructor(
    @InjectRepository(Agency)
    private AgencyRepository: Repository<Agency>,
  ) {}
  getAllAgencies() {
    return this.AgencyRepository.find();
  }
  getAgency(id_sucursal: number) {
    return this.AgencyRepository.findOne({
      where: {
        id_sucursal,
      },
    });
  }
  createAgency(sucursal: CreateAgencyDto) {
    const newAgency = this.AgencyRepository.create(sucursal);
    this.AgencyRepository.save(newAgency);
  }
  updateAgency(id_sucursal: number, sucursal: UpdateAgencyDto) {
    return this.AgencyRepository.update({ id_sucursal: id_sucursal }, sucursal);
  }
  deleteAgency(id_sucursal: number) {
    return this.AgencyRepository.update({ id_sucursal }, { estado: 0 });
  }
}
