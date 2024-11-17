import { Transform, Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { Quote } from 'src/quotes/entities/quote.entity';
import { Stock } from 'src/stocks/entities/stock.entity';

export class CreateDetailQuoteDto {
  @IsInt()
  @Min(1)
  cantidad_solicitada: number;
  @IsInt()
  stock: Stock;
  @IsInt()
  cotizacion: Quote;

  constructor(partial?: Partial<CreateDetailQuoteDto>) {
    Object.assign(this, partial);
  }
}
