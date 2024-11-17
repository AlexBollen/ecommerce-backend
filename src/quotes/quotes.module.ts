import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { DetailQuote } from 'src/detail-quotes/entities/detail-quote.entity';
import { Stock } from 'src/stocks/entities/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quote, DetailQuote, Stock])],
  controllers: [QuotesController],
  providers: [QuotesService],
  exports: [QuotesService],
})
export class QuotesModule {}
