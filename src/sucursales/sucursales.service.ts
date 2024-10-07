import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sucursal } from './sucursal.entity';
import { Repository } from 'typeorm';
import { CreateSucursalDto } from './dto/create-sucursal.dto';
import { UpdateSucursalDto } from './dto/update-sucursal.dto';

@Injectable()
export class SucursalesService {
  constructor(
    @InjectRepository(Sucursal)
    private SucursalRepository: Repository<Sucursal>,
  ) {}
  getAllSucursales() {
    return this.SucursalRepository.find();
  }
  getSucursal(id_sucursal: number) {
    return this.SucursalRepository.findOne({
      where: {
        id_sucursal,
      },
    });
  }
  createSucursal(sucursal: CreateSucursalDto) {
    const newSucursal = this.SucursalRepository.create(sucursal);
    this.SucursalRepository.save(newSucursal);
  }
  updateSucursal(id_sucursal: number, sucursal: UpdateSucursalDto) {
    return this.SucursalRepository.update(
      { id_sucursal: id_sucursal },
      sucursal,
    );
  }
  deleteSucursal(id_sucursal: number) {
    return this.SucursalRepository.update({ id_sucursal }, { estado: 0 });
  }
}
