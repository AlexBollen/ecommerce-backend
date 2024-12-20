import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';
import { DetailQuote } from 'src/detail-quotes/entities/detail-quote.entity';
import { Stock } from 'src/stocks/entities/stock.entity';
import { StocksService } from 'src/stocks/stocks.service';
import { AgenciesService } from 'src/agencies/agencies.service';
import { AgenciesModule } from 'src/agencies/agencies.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Quote, DetailQuote, Stock]),
    AgenciesModule,
  ],
  controllers: [QuotesController],
  providers: [QuotesService, StocksService],
  exports: [QuotesService],
})
export class QuotesModule {}
