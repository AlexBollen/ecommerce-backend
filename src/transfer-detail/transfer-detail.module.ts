import { Module } from '@nestjs/common';
import { TransferDetailService } from './transfer-detail.service';
import { TransferDetailController } from './transfer-detail.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferDetail } from './entities/transfer-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransferDetail])],
  controllers: [TransferDetailController],
  providers: [TransferDetailService],
  exports: [TransferDetailService],
})
export class TransferDetailModule {}
