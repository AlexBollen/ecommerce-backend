import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransferState } from './transfer-state.entity';
import { Repository } from 'typeorm';
import { CreateTransferStateDto } from './dto/create-transfer-state.dto';
import { UpdateTransferStateDto } from './dto/update-transfer-state.dto';

@Injectable()
export class TransferStatesService {
  constructor(
    @InjectRepository(TransferState)
    private transferStateRepository: Repository<TransferState>,
  ) {}

  getAllTransferStates() {
    return this.transferStateRepository.find();
  }

  getTransferState(id_estado_transferencia: number) {
    return this.transferStateRepository.findOne({
      where: {
        id_estado_transferencia,
      },
    });
  }

  createTransferState(transferState: CreateTransferStateDto) {
    const newTransferState = this.transferStateRepository.create(transferState);
    this.transferStateRepository.save(newTransferState);
  }

  updateTransferState(
    id_estado_transferencia: number,
    transfer_state: UpdateTransferStateDto,
  ) {
    return this.transferStateRepository.update(
        { id_estado_transferencia },
        transfer_state
    )
  }

  deleteTransferState(id_estado_transferencia: number) {
    return this.transferStateRepository.update(
        { id_estado_transferencia },
        { estado: 0 }
    )
  }
}
