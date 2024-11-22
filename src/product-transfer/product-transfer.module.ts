import { Module } from '@nestjs/common';
import { ProductTransferService } from './product-transfer.service';
import { ProductTransferController } from './product-transfer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTransfer } from './entities/product-transfer.entity';
import { TransferDetail } from 'src/transfer-detail/entities/transfer-detail.entity';
import { Stock } from 'src/stocks/entities/stock.entity';
import { Agency } from 'src/agencies/agency.entity';
import { Product } from 'src/products/product.entity';
import { StocksService } from 'src/stocks/stocks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductTransfer,
      TransferDetail,
      Stock,
      Agency,
      Product,
    ]),
  ],
  controllers: [ProductTransferController],
  providers: [ProductTransferService, StocksService],
  exports: [ProductTransferService],
})
export class ProductTransferModule {}
