import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransferDetailDto } from './dto/create-transfer-detail.dto';
import { UpdateTransferDetailDto } from './dto/update-transfer-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransferDetail } from './entities/transfer-detail.entity';
import { Repository } from 'typeorm';
import { ProductTransfer } from 'src/product-transfer/entities/product-transfer.entity';

@Injectable()
export class TransferDetailService {
  constructor(
    @InjectRepository(TransferDetail)
    private transferDetailRepository: Repository<TransferDetail>,
  ) {}

  createTransferDetail(transferDetail: CreateTransferDetailDto) {
    const newTransferDetail =
      this.transferDetailRepository.create(transferDetail);
    this.transferDetailRepository.save(newTransferDetail);
  }

  getTransferDetail(id_detalle_transferencia: number) {
    return this.transferDetailRepository.find({
      where: { id_detalle_transferencia },
      relations: ['id_stock', 'id_stock.producto'],
    });
  }

  async getFormattedTransferDetails(id_transferencia: ProductTransfer) {
    const detalles = await this.transferDetailRepository.find({
      where: { id_transferencia },
      relations: ['id_stock', 'id_stock.producto'], // Incluye la relación hacia `Producto`
    });
    //console.log(detalles);

    if (!detalles.length) {
      throw new NotFoundException(
        `No se encontraron detalles para la transferencia con id ${id_transferencia}`,
      );
    }

    return detalles.map((detalle) => ({
      id_detalle_transferencia: detalle.id_detalle_transferencia,
      cantidad_transferida: detalle.cantidad_transferencia,
      nombre_producto: detalle.id_stock.producto.nombre_producto, // Acceso al nombre del producto
      cantidad_actual: detalle.id_stock.cantidad_actual,
      created_at: detalle.created_at,
    }));
  }
}
