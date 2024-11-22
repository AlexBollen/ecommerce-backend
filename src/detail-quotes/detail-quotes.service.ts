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

  updateDetailQuote(
    id_detalle_cotizacion: number,
    detailQuote: UpdateDetailQuoteDto,
  ) {
    return this.detailQuoteRepository.update(
      { id_detalle_cotizacion: id_detalle_cotizacion },
      detailQuote,
    );
  }

  deleteDetailQuote(id_detalle_cotizacion: number) {
    return this.detailQuoteRepository.update(
      { id_detalle_cotizacion },
      { estado: 0 },
    );
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
        'SUM(detalle_cotizacion.cantidad_solicitada*producto.precio_venta) AS total_vendido',
        `CONCAT('http://localhost:3000/', producto.imagen) AS imagen`,
      ])
      .where("cotizacion.tipo_transaccion = 'V'")
      .groupBy('producto.id_producto, producto.nombre_producto')
      .orderBy('total_vendido', 'DESC')
      .limit(10)
      .getRawMany();
  }

  getTopSellingProductsAgencies(id_sucursal: number) {
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
        'SUM(detalle_cotizacion.cantidad_solicitada*producto.precio_venta) AS total_vendido',
      ])
      .where('sucursal.id_sucursal = :id_sucursal', { id_sucursal })
      .groupBy(
        'producto.id_producto, producto.nombre_producto, sucursal.nombre_sucursal',
      )
      .orderBy('total_vendido', 'DESC')
      .limit(10)
      .getRawMany();
  }

  getProductByMonth() {
    const subQuery = this.detailQuoteRepository
      .createQueryBuilder('detalle_cotizacion')
      .innerJoin('detalle_cotizacion.stock', 'stock')
      .innerJoin('stock.producto', 'producto')
      .innerJoin('detalle_cotizacion.cotizacion', 'quote')
      .select([
        'producto.nombre_producto AS nombre_producto',
        'DATE_FORMAT(quote.created_at, "%M %Y") AS mes',
        'MONTH(quote.created_at) AS nm',
        'SUM(detalle_cotizacion.cantidad_solicitada) AS total_vendido',
        'ROW_NUMBER() OVER (PARTITION BY DATE_FORMAT(quote.created_at, "%M %Y") ORDER BY SUM(detalle_cotizacion.cantidad_solicitada) DESC) AS ranking',
      ])
      .groupBy('producto.id_producto, mes, nm')
      .getQuery();

    return this.detailQuoteRepository
      .createQueryBuilder('ranked')
      .addFrom(`(${subQuery})`, 'ranked')
      .where('ranked.ranking = 1')
      .select([
        'ranked.nombre_producto',
        'ranked.mes',
        'ranked.total_vendido',
        'ranked.nm',
      ])
      .distinct(true)
      .orderBy('ranked.nm', 'ASC')
      .addOrderBy('ranked.mes', 'ASC')
      .getRawMany();
  }

  getMonthlyProductSummary() {
    const subQuery = this.detailQuoteRepository
      .createQueryBuilder('detalle_cotizacion')
      .innerJoin('detalle_cotizacion.stock', 'stock')
      .innerJoin('stock.producto', 'producto')
      .innerJoin('detalle_cotizacion.cotizacion', 'quote')
      .select([
        'producto.nombre_producto AS nombre_producto',
        'DATE_FORMAT(quote.created_at, "%M %Y") AS mes',
        'MONTH(quote.created_at) AS nm',
        `CONCAT('http://localhost:3000/', producto.imagen) AS imagen`,
        'SUM(detalle_cotizacion.cantidad_solicitada) AS cantidad',
        'ROW_NUMBER() OVER (PARTITION BY DATE_FORMAT(quote.created_at, "%M %Y") ORDER BY SUM(detalle_cotizacion.cantidad_solicitada) DESC) AS ranking',
      ])
      .groupBy('producto.id_producto, mes, nm')
      .getQuery();

    return this.detailQuoteRepository
        .createQueryBuilder('ranked') 
        .addFrom(`(${subQuery})`, 'ranked')  
        .where('ranked.ranking = 1') 
        .select([
            'ranked.nombre_producto',
            'ranked.mes',
            'ranked.cantidad',
            'ranked.nm' 
      ])
      .distinct(true)  
      .orderBy('ranked.nm', 'ASC')  
      .addOrderBy('ranked.mes', 'ASC')  
      .getRawMany();
  }

  getMonthlyProductSummaryByAgency(id_sucursal: number) {
    return this.detailQuoteRepository
      .createQueryBuilder('dc')
      .innerJoin('dc.stock', 's')
      .innerJoin('s.producto', 'p')
      .innerJoin('dc.cotizacion', 'q')
      .innerJoin('q.sucursal', 'sr')
      .select([
        'p.nombre_producto AS nombre_producto',
        "DATE_FORMAT(q.created_at, '%M %Y') AS mes",
        'SUM(dc.cantidad_solicitada) AS cantidad',
        'MONTH(q.created_at) AS NM',
        'YEAR(q.created_at) AS NY'
      ])
      .where('sr.id_sucursal = :id_sucursal', { id_sucursal })
      .groupBy('p.id_producto')
      .addGroupBy("DATE_FORMAT(q.created_at, '%M %Y')")
      .addGroupBy('sr.id_sucursal')
      .addGroupBy('MONTH(q.created_at)')
      .addGroupBy('YEAR(q.created_at)')
      .orderBy('sr.nombre_sucursal', 'ASC')
      .addOrderBy('p.nombre_producto', 'ASC')
      .getRawMany();
  }
  
  



    getMonthlyProductByGeneral() {
      const subQuery = this.detailQuoteRepository
      .createQueryBuilder('detalle_cotizacion')
      .innerJoin('detalle_cotizacion.stock', 'stock')
      .innerJoin('stock.producto', 'producto')
      .innerJoin('detalle_cotizacion.cotizacion', 'quote')
      .select([
          'producto.nombre_producto AS nombre_producto',
          `CONCAT('http://localhost:3000/', producto.imagen) AS imagen`,
          'SUM(detalle_cotizacion.cantidad_solicitada) AS cantidad',
          'MAX(quote.created_at) AS fecha_ultima_cotizacion', 
          'ROW_NUMBER() OVER (ORDER BY SUM(detalle_cotizacion.cantidad_solicitada) DESC) AS ranking'
      ])
      .groupBy('producto.id_producto')  
      .getQuery();

  return this.detailQuoteRepository
      .createQueryBuilder('ranked')
      .addFrom(`(${subQuery})`, 'ranked')
      .where('ranked.ranking <= 5') 
      .select([
          'ranked.nombre_producto',
          'ranked.cantidad',
          'ranked.imagen',
          'ranked.fecha_ultima_cotizacion' 
      ])
      .distinct(true)  
      .getRawMany();
    }
}
