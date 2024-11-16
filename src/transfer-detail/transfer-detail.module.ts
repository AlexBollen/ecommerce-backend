import { Module } from '@nestjs/common';
import { TransferDetailService } from './transfer-detail.service';
import { TransferDetailController } from './transfer-detail.controller';

@Module({
  controllers: [TransferDetailController],
  providers: [TransferDetailService],
})
export class TransferDetailModule {}
