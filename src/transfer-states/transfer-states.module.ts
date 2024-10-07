import { Module } from '@nestjs/common';
import { TransferStatesService } from './transfer-states.service';
import { TransferStatesController } from './transfer-states.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferState } from './transfer-state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransferState])],
  providers: [TransferStatesService],
  controllers: [TransferStatesController],
})
export class TransferStatesModule {}
