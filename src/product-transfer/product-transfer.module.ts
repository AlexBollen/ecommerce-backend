import { Module } from '@nestjs/common';
import { ProductTransferService } from './product-transfer.service';
import { ProductTransferController } from './product-transfer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTransfer } from './entities/product-transfer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTransfer])],
  controllers: [ProductTransferController],
  providers: [ProductTransferService],
  exports: [ProductTransferService],
})
export class ProductTransferModule {}
