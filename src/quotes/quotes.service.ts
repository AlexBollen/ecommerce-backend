import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote } from './entities/quote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailQuote } from 'src/detail-quotes/entities/detail-quote.entity';
import { Stock } from 'src/stocks/entities/stock.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote) private quoteRepository: Repository<Quote>,
    @InjectRepository(DetailQuote)
    private detailQuoteRepository: Repository<DetailQuote>,
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
    private readonly dataSource: DataSource,
  ) {}

  getAllQuotes() {
    return this.quoteRepository
      .createQueryBuilder('cotizacion')
      .leftJoinAndSelect('cotizacion.cliente', 'cliente')
      .leftJoinAndSelect('cotizacion.sucursal', 'sucursal')
      .leftJoinAndSelect('cotizacion.usuario', 'usuario')
      .select([
        'cotizacion.id_cotizacion AS id_cotizacion',
        'cotizacion.monto_total AS monto_total',
        'cliente.nombre_cliente AS nombre_cliente',
        'sucursal.nombre_sucursal AS nombre_sucursal',
      ])
      .where('cotizacion.estado = 1')
      .getRawMany();
  }

  getQuote(id_cotizacion: number) {
    return this.quoteRepository.findOne({
      where: {
        id_cotizacion,
      },
    });
  }

  async createQuote(quote: CreateQuoteDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newQuote = this.quoteRepository.create(quote);
      const savedQuote = await queryRunner.manager.save(newQuote);

      for (const product of quote.lista_productos) {
        const cantidadSolicitada = parseInt(product[1]);
        if (isNaN(cantidadSolicitada) || cantidadSolicitada <= 0) {
          throw new Error('Cantidad solicitada no válida');
        }

        const stock = await this.stockRepository.findOne({
          where: { id_stock: product[0] },
        });

        if (!stock) {
          throw new Error('El stock no existe en el inventario');
        }

        if (cantidadSolicitada > stock.cantidad_actual) {
          throw new Error('No hay existencias suficientes');
        }

        if (quote.tipo_transaccion) {
          await this.stockRepository.decrement(
            { id_stock: product[0] },
            'cantidad_actual',
            cantidadSolicitada,
          );
        }

        const newDetail = this.detailQuoteRepository.create({
          cantidad_solicitada: cantidadSolicitada,
          stock: product[0],
          cotizacion: savedQuote,
        });
        await queryRunner.manager.save(newDetail);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  updateQuote(id_cotizacion: number, quote: UpdateQuoteDto) {
    return this.quoteRepository.update({ id_cotizacion: id_cotizacion }, quote);
  }

  deleteQuote(id_cotizacion: number) {
    return this.quoteRepository.update({ id_cotizacion }, { estado: 0 });
  }

  getBestCustomersGeneral() {
    return this.quoteRepository
      .createQueryBuilder('cotizacion')
      .innerJoin('cotizacion.cliente', 'cliente') 
      .innerJoin('cotizacion.sucursal', 'sucursal') 
      .select([
        'cliente.nombre_cliente AS nombre_cliente',
        'COUNT(cotizacion.id_cotizacion) AS cantidad_compras',
        'sucursal.nombre_sucursal AS nombre_sucursal',
      ])
      .groupBy('cliente.nombre_cliente') 
      .addGroupBy('sucursal.nombre_sucursal') 
      .orderBy('cantidad_compras', 'DESC') 
      .limit(10)
      .getRawMany();
  }

  getBestCustomersAgency() {
    return this.quoteRepository
      .createQueryBuilder('cotizacion')
      .innerJoin('cotizacion.cliente', 'cliente') 
      .innerJoin('cotizacion.sucursal', 'sucursal') 
      .select([
        'cliente.nombre_cliente AS nombre_cliente',
        'COUNT(cotizacion.id_cotizacion) AS cantidad_compras',
        'sucursal.nombre_sucursal AS nombre_sucursal',
      ])
      .where('sucursal.id_sucursal = 1')
      .groupBy('cliente.nombre_cliente') 
      .addGroupBy('sucursal.nombre_sucursal') 
      .orderBy('cantidad_compras', 'DESC') 
      .limit(10)
      .getRawMany();
  }
  

  getSaleByDate() {
    return this.quoteRepository
      .createQueryBuilder('cotizacion')
      .innerJoin('cotizacion.cliente', 'cliente')
      .innerJoin('cotizacion.sucursal', 'sucursal')
      .select([
        'cliente.nombre_cliente AS nombre_cliente',
        'COUNT(cotizacion.id_cotizacion) AS cantidad_compras',
        'sucursal.nombre_sucursal AS nombre_sucursal',
      ])
      .where('cotizacion.created_at >= :startDate AND cotizacion.created_at <= :endDate', { 
        startDate: '2024-01-01', 
        endDate: '2024-11-18' 
      })
      .groupBy('cliente.nombre_cliente')
      .addGroupBy('sucursal.nombre_sucursal')
      .orderBy('cantidad_compras', 'DESC')
      .getRawMany();
  }
  
  
}
