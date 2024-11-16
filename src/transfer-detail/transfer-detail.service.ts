import { Injectable } from '@nestjs/common';
import { CreateTransferDetailDto } from './dto/create-transfer-detail.dto';
import { UpdateTransferDetailDto } from './dto/update-transfer-detail.dto';

@Injectable()
export class TransferDetailService {
  create(createTransferDetailDto: CreateTransferDetailDto) {
    return 'This action adds a new transferDetail';
  }

  findAll() {
    return `This action returns all transferDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transferDetail`;
  }

  update(id: number, updateTransferDetailDto: UpdateTransferDetailDto) {
    return `This action updates a #${id} transferDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} transferDetail`;
  }
}
