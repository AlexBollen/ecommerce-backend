import { Injectable } from '@nestjs/common';
import { CreateProductTransferDto } from './dto/create-product-transfer.dto';
import { UpdateProductTransferDto } from './dto/update-product-transfer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTransfer } from './entities/product-transfer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductTransferService {
  constructor(
    @InjectRepository(ProductTransfer)
    private productTransferRepository: Repository<ProductTransfer>,
  ) {}

  getAllTransferences() {
    return this.productTransferRepository.find({
      relations: [
        'DetalleTransferencia',
        'id_estado_transferencia',
        'sucursal_Entrante',
        'id_usuario',
      ],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} productTransfer`;
  }

  update(id: number, updateProductTransferDto: UpdateProductTransferDto) {
    return `This action updates a #${id} productTransfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} productTransfer`;
  }
}
