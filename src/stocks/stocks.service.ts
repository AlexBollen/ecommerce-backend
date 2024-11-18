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
        'stock.cantidad_actual AS cantidad_actual',
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

  getStocksByProduct(id_product: number) {
    return this.stockRepository
      .createQueryBuilder('stock')
      .leftJoinAndSelect('stock.sucursal', 'sucursal')
      .select([
        'sucursal.nombre_sucursal AS sucursal',
        'SUM(stock.cantidad_actual) AS existencias',
      ])
      .where(
        'stock.productoIdProducto = :id_product AND stock.estado = 1 AND stock.cantidad_actual > 0',
        { id_product },
      )
      .groupBy('sucursal.nombre_sucursal')
      .getRawMany();
  }

  getTotalExistences(id_product: number) {
    return this.stockRepository
      .createQueryBuilder('stock')
      .select(['SUM(stock.cantidad_actual) AS existencias'])
      .where(
        'stock.productoIdProducto = :id_product AND stock.estado = 1 AND stock.cantidad_actual > 0',
        { id_product },
      )
      .getRawOne();
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

  getLowQuantityProducts() {
    return this.stockRepository
      .createQueryBuilder('stock')
      .innerJoin('stock.producto', 'producto')
      .innerJoin('stock.sucursal', 'sucursal')
      .select([
        'producto.id_producto AS id_producto',
        'producto.nombre_producto AS nombre_producto',
        'stock.cantidad_actual AS cantidad_actual',
        'stock.id_stock AS id_stock',
        'sucursal.nombre_sucursal AS nombre_sucursal',
      ])
      .where('stock.cantidad_actual < :limit', { limit: 10 })
      .orderBy('stock.cantidad_actual', 'DESC')
      .limit(20)
      .getRawMany();
  }
}
