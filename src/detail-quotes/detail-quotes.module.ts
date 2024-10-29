import { Module } from '@nestjs/common';
import { DetailQuotesService } from './detail-quotes.service';
import { DetailQuotesController } from './detail-quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailQuote } from './entities/detail-quote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetailQuote])],
  controllers: [DetailQuotesController],
  providers: [DetailQuotesService],
  exports: [DetailQuotesService]

})
export class DetailQuotesModule {}
