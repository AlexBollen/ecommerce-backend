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

  
}
