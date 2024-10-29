import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote } from './entities/quote.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote) private quoteRepository: Repository<Quote>,
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

  createQuote(quote: CreateQuoteDto) {
    const newQuote = this.quoteRepository.create(quote);
    this.quoteRepository.save(newQuote);
  }

  updateQuote(id_cotizacion: number, quote: UpdateQuoteDto) {
    return this.quoteRepository.update(
      { id_cotizacion: id_cotizacion },
      quote,
    );
  }
  
  deleteQuote(id_cotizacion: number) {
    return this.quoteRepository.update({ id_cotizacion }, { estado: 0 });
  }
}
