import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private saleRepository: Repository<Sale>,
  ) {}

  getAllSales() {
    return this.saleRepository
      .createQueryBuilder('venta')
      .leftJoinAndSelect('venta.cotizacion', 'cotizacion')
      .leftJoinAndSelect('venta.metodoPago', 'metodoPago')
      .select([
        'venta.id_venta AS id_venta',
        'venta.total_pagado AS total_pagado',
        'venta.descuento_aplicado AS descuento_aplicado',
      ])
      .where('venta.estado = 1')
      .getRawMany();
  }

  getSale(id_venta: number) {
    return this.saleRepository.findOne({
      where: {
        id_venta,
      },
    });
  }

  createSale(sale: CreateSaleDto) {
    const newSale = this.saleRepository.create(sale);
    this.saleRepository.save(newSale);
  }

  updateSale(id_venta: number, sale: UpdateSaleDto) {
    return this.saleRepository.update({ id_venta: id_venta }, sale);
  }

  deleteSale(id_venta: number) {
    return this.saleRepository.update({ id_venta }, { estado: 0 });
  }
}
