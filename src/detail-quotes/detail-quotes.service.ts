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
      ])
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
            'SUM(quote.monto_total) AS total_vendido',
            'ROW_NUMBER() OVER (PARTITION BY DATE_FORMAT(quote.created_at, "%M %Y") ORDER BY SUM(quote.monto_total) DESC) AS ranking'
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
            'ranked.nm' 
        ])
        .distinct(true)  
        .orderBy('ranked.nm', 'ASC')  
        .addOrderBy('ranked.mes', 'ASC')  
        .getRawMany();
  }

  getMonthlyProductSummary() {
    return this.detailQuoteRepository
      .createQueryBuilder('detalle_cotizacion')
      .innerJoin('detalle_cotizacion.stock', 'stock')
      .innerJoin('stock.producto', 'producto')
      .innerJoin('detalle_cotizacion.cotizacion', 'quote')
      .select([
        'producto.nombre_producto AS nombre_producto',
        "DATE_FORMAT(quote.created_at, '%M %Y') AS mes",
        'SUM(detalle_cotizacion.cantidad_solicitada) AS cantidad',
        'MONTH(quote.created_at) AS nm',
        'YEAR(quote.created_at) AS ny',
      ])
      .groupBy('producto.id_producto')
      .addGroupBy("DATE_FORMAT(quote.created_at, '%M %Y')")
      .addGroupBy('MONTH(quote.created_at)')
      .addGroupBy('YEAR(quote.created_at)')
      .orderBy('YEAR(quote.created_at)', 'ASC')
      .addOrderBy('MONTH(quote.created_at)', 'ASC')
      .getRawMany();
  }

  getMonthlyProductSummaryByAgency() {
    return this.detailQuoteRepository
      .createQueryBuilder('detalle_cotizacion')
      .innerJoin('detalle_cotizacion.stock', 'stock')
      .innerJoin('stock.sucursal', 'sucursal')
      .innerJoin('stock.producto', 'producto')
      .innerJoin('detalle_cotizacion.cotizacion', 'quote')
      .select([
        'producto.nombre_producto AS nombre_producto',
        "DATE_FORMAT(quote.created_at, '%M %Y') AS mes",
        'SUM(detalle_cotizacion.cantidad_solicitada) AS cantidad',
        'MONTH(quote.created_at) AS nm',
        'YEAR(quote.created_at) AS ny',
      ])
      .where('sucursal.id_sucursal = :sucursalId', { sucursalId: 1 })
      .groupBy('producto.id_producto')
      .addGroupBy("DATE_FORMAT(quote.created_at, '%M %Y')")
      .addGroupBy('MONTH(quote.created_at)')
      .addGroupBy('YEAR(quote.created_at)')
      .orderBy('cantidad', 'DESC')
      .addOrderBy('YEAR(quote.created_at)', 'ASC')
      .addOrderBy('MONTH(quote.created_at)', 'ASC')
      .getRawMany();
  }

  getMonthlyProductByGeneral() {
    return this.detailQuoteRepository
      .createQueryBuilder('detalle_cotizacion')
      .innerJoin('detalle_cotizacion.stock', 'stock')
      .innerJoin('stock.producto', 'producto')
      .innerJoin('detalle_cotizacion.cotizacion', 'quote')
      .select([
        'producto.nombre_producto AS nombre_producto',
        "DATE_FORMAT(quote.created_at, '%M %Y') AS mes",
        'SUM(detalle_cotizacion.cantidad_solicitada) AS cantidad',
        'MONTH(quote.created_at) AS nm',
        'YEAR(quote.created_at) AS ny',
      ])
      .groupBy('producto.id_producto')
      .addGroupBy("DATE_FORMAT(quote.created_at, '%M %Y')")
      .addGroupBy('MONTH(quote.created_at)')
      .addGroupBy('YEAR(quote.created_at)')
      .orderBy('cantidad', 'DESC')
      .addOrderBy('producto.nombre_producto', 'ASC')
      .addOrderBy('MONTH(quote.created_at)', 'ASC')
      .addOrderBy('YEAR(quote.created_at)', 'ASC')
      .getRawMany();
  }
}
