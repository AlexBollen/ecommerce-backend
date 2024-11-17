import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetailQuote } from './entities/detail-quote.entity';
import { CreateDetailQuoteDto } from './dto/create-detail-quote.dto';
import { UpdateDetailQuoteDto } from './dto/update-detail-quote.dto';

@Injectable()
export class DetailQuotesService {

  constructor(
    @InjectRepository(DetailQuote)
    private detailQuoteRepository: Repository<DetailQuote>,
  ) {}
 
  getAllDetailQuotes() {
    return this.detailQuoteRepository
      .createQueryBuilder('detalle_cotizacion')
      .leftJoinAndSelect('detalle_cotizacion.cotizacion', 'cotizacion')
      .leftJoinAndSelect('detalle_cotizacion.stock', 'stock')
      .select([
        'detalle_cotizacion.id_detalle_cotizacion AS id_detalleCotizacion',
        'detalle_cotizacion.cantidad_solicitada AS cantidad_solicitada',
       
      ])
      .where('detalle_cotizacion.estado = 1')
      .getRawMany();
  }

  getDetailQuote(id_detalle_cotizacion: number) {
    return this.detailQuoteRepository.findOne({
      where: {
        id_detalle_cotizacion,
      },
    });
  }

  createDetailQuote(detailQuote: CreateDetailQuoteDto) {
    const newDetailQuote = this.detailQuoteRepository.create(detailQuote);
    this.detailQuoteRepository.save(newDetailQuote);
  }

  updateDetailQuote(id_detalle_cotizacion: number, detailQuote: UpdateDetailQuoteDto) {
    return this.detailQuoteRepository.update(
      { id_detalle_cotizacion: id_detalle_cotizacion },
      detailQuote,
    );
  }

  deleteDetailQuote(id_detalle_cotizacion: number) {
    return this.detailQuoteRepository.update({ id_detalle_cotizacion }, { estado: 0 });
  }

  
  getTopSellingProducts() {
    return this.detailQuoteRepository
      .createQueryBuilder('detalle_cotizacion')
      .innerJoin('detalle_cotizacion.stock', 'stock') 
      .innerJoin('stock.producto', 'producto') 
      .innerJoin('detalle_cotizacion.cotizacion', 'cotizacion') 
      .select([
        'producto.id_producto AS id_producto', 
        'producto.nombre_producto AS nombre_producto', 
        'SUM(detalle_cotizacion.cantidad_solicitada) AS total_vendido', 
      ])
      .groupBy('producto.id_producto, producto.nombre_producto') 
      .orderBy('total_vendido', 'DESC') 
      .limit(10) 
      .getRawMany();
  }

  getTopSellingProductsAgencies() {
    return this.detailQuoteRepository
      .createQueryBuilder('detalle_cotizacion')
      .innerJoin('detalle_cotizacion.stock', 'stock') 
      .innerJoin('stock.producto', 'producto') 
      .innerJoin('detalle_cotizacion.cotizacion', 'cotizacion') 
      .innerJoin('cotizacion.sucursal', 'sucursal') 
      .select([
        'producto.id_producto AS id_producto', 
        'producto.nombre_producto AS nombre_producto', 
        'sucursal.nombre_sucursal AS nombre_sucursal', 
        'SUM(cotizacion.monto_total) AS total_vendido', 
      ])
      .groupBy('producto.id_producto, producto.nombre_producto, sucursal.nombre_sucursal') 
      .orderBy('total_vendido', 'DESC') 
      .limit(10) 
      .getRawMany();
  }
  
  
  
}
