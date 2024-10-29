import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from './entities/quote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quote])],
  controllers: [QuotesController],
  providers: [QuotesService],
  exports: [QuotesService]
})
export class QuotesModule {}
