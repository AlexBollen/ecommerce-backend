import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StocksService {

  constructor(
    @InjectRepository(Stock) 
    private stockRepository: Repository<Stock>,
  ) {}

  getAllStocks() {
    return this.stockRepository
      .createQueryBuilder('stock')
      .leftJoinAndSelect('stock.sucursal', 'sucursal')
      .leftJoinAndSelect('stock.producto', 'producto')

      .select([
        'stock.id_stock AS id_stock',
        'stock.cantidad_inicial AS cantidad_inicial',
        'stock.cantidad_actual AS cantidad_actual'
      ])
      .where('stock.estado = 1')
      .getRawMany();
  }
  getStock(id_stock: number) {
    return this.stockRepository.findOne({
      where: {
        id_stock,
      },
    });
  }

  createStock(stock: CreateStockDto) {
    const newStock = this.stockRepository.create(stock);
    this.stockRepository.save(newStock);
  }

  updateStock(id_stock: number, stock: UpdateStockDto) {
    return this.stockRepository.update({ id_stock: id_stock }, stock);
  }

  deleteStock(id_stock: number) {
    return this.stockRepository.update({ id_stock }, { estado: 0 });
  }
  
}