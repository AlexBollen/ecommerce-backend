import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote } from './entities/quote.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DetailQuote } from 'src/detail-quotes/entities/detail-quote.entity';
import { Stock } from 'src/stocks/entities/stock.entity';
import { StocksService } from 'src/stocks/stocks.service';
import { AgenciesService } from 'src/agencies/agencies.service';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote) private quoteRepository: Repository<Quote>,
    @InjectRepository(DetailQuote)
    private detailQuoteRepository: Repository<DetailQuote>,
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
    private stockService: StocksService,
    private agencyService: AgenciesService,
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
        'cotizacion.tipo_transaccion AS tipo_transaccion',
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
      const agency = await this.agencyService.getAgency(quote.sucursalId);

      for (const product of quote.lista_productos) {
        const cantidadSolicitada = parseInt(product[1]);
        let cantidadTmp = cantidadSolicitada;
        if (isNaN(cantidadSolicitada) || cantidadSolicitada <= 0) {
          throw new Error('Cantidad solicitada no válida');
        }

        if (quote.tipo) {
          const relatedStocks = await this.stockService.getRelatedStocks(
            product[0],
            agency.id_sucursal,
          );

          if (relatedStocks.length === 0) {
            throw new Error('No hay existencias en los stocks de producto');
          }

          let cantidadExistentes = 0;
          for (const stock of relatedStocks) {
            cantidadExistentes += stock.cantidad_actual;
          }

          if (cantidadExistentes < cantidadSolicitada) {
            throw new Error('No hay existencias suficientes');
          }

          for (const relatedStock of relatedStocks) {
            if (cantidadTmp > 0) {
              if (cantidadTmp > relatedStock.cantidad_actual) {
                cantidadTmp -= relatedStock.cantidad_actual;
                await this.stockRepository.update(
                  { id_stock: relatedStock.id_stock },
                  { cantidad_actual: 0 },
                );
              } else if (cantidadTmp <= relatedStock.cantidad_actual) {
                await this.stockRepository.decrement(
                  { id_stock: relatedStock.id_stock },
                  'cantidad_actual',
                  cantidadTmp,
                );
                cantidadTmp = 0;
              }
            }
          }
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

  getBestCustomersAgency(id_sucursal: number) {
    return this.quoteRepository
      .createQueryBuilder('cotizacion')
      .innerJoin('cotizacion.cliente', 'cliente')
      .innerJoin('cotizacion.sucursal', 'sucursal')
      .select([
        'cliente.nombre_cliente AS nombre_cliente',
        'COUNT(cotizacion.id_cotizacion) AS cantidad_compras',
        'sucursal.nombre_sucursal AS nombre_sucursal',
      ])
      .where('sucursal.id_sucursal = :id_sucursal', { id_sucursal })
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
      .where(
        'cotizacion.created_at >= :startDate AND cotizacion.created_at <= :endDate',
        {
          startDate: '2024-01-01',
          endDate: '2024-11-18',
        },
      )
      .groupBy('cliente.nombre_cliente')
      .addGroupBy('sucursal.nombre_sucursal')
      .orderBy('cantidad_compras', 'DESC')
      .getRawMany();
  }

  getHistoricalSales() {
    return this.quoteRepository
      .createQueryBuilder('cotizacion')
      .innerJoin('cotizacion.cliente', 'cliente')
      .innerJoin('cotizacion.sucursal', 'sucursal')
      .innerJoin('cotizacion.usuario', 'usuario')
      .select([
        'usuario.nombre_persona AS nombre_persona',
        "DATE_FORMAT(cotizacion.created_at, '%Y-%m-%d') AS fecha",
        'TIME(cotizacion.created_at) AS hora',
        'sucursal.nombre_sucursal AS nombre_sucursal',
      ])
      .groupBy('usuario.nombre_persona')
      .addGroupBy('fecha')
      .addGroupBy('hora')
      .addGroupBy('sucursal.nombre_sucursal')
      .orderBy('fecha', 'DESC')
      .getRawMany();
  }

  getHistoricalSalesByAgency(id_sucursal: number) {
    return this.quoteRepository
      .createQueryBuilder('cotizacion')
      .innerJoin('cotizacion.cliente', 'cliente')
      .innerJoin('cotizacion.sucursal', 'sucursal')
      .innerJoin('cotizacion.usuario', 'usuario')
      .select([
        'usuario.nombre_persona AS nombre_persona',
        "DATE_FORMAT(cotizacion.created_at, '%Y-%m-%d') AS fecha",
        'TIME(cotizacion.created_at) AS hora',
        'sucursal.nombre_sucursal AS nombre_sucursal',
      ])
      .where('sucursal.id_sucursal = :id_sucursal', { id_sucursal })
      .groupBy('usuario.nombre_persona')
      .addGroupBy('fecha')
      .addGroupBy('hora')
      .addGroupBy('sucursal.nombre_sucursal')
      .orderBy('fecha', 'DESC')
      .getRawMany();
  }
}
