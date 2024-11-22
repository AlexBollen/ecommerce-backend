import { Injectable } from '@nestjs/common';
import { CreateProductTransferDto } from './dto/create-product-transfer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTransfer } from './entities/product-transfer.entity';
import { DataSource, Repository } from 'typeorm';
import { Stock } from 'src/stocks/entities/stock.entity';
import { TransferDetail } from 'src/transfer-detail/entities/transfer-detail.entity';
import { Agency } from 'src/agencies/agency.entity';
import { StocksService } from 'src/stocks/stocks.service';

@Injectable()
export class ProductTransferService {
  constructor(
    @InjectRepository(ProductTransfer)
    private productTransferRepository: Repository<ProductTransfer>,
    @InjectRepository(Stock) private stockRepository: Repository<Stock>,
    private readonly dataSource: DataSource,
    @InjectRepository(TransferDetail)
    private transferDetailRepository: Repository<TransferDetail>,
    @InjectRepository(Agency)
    private agencyRepository: Repository<Agency>,
    private stockService: StocksService,
  ) {}

  getAllTransferences() {
    return this.productTransferRepository.find({
      where: { estado: 1 },
      relations: [
        'DetalleTransferencia',
        'id_estado_transferencia',
        'sucursal_Entrante',
        'id_usuario',
      ],
    });
  }

  async createTransference(transferencia: CreateProductTransferDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    const sucursalSaliente = await this.agencyRepository.findOne({
      where: { id_sucursal: transferencia.sucursal_Saliente },
    });
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newTransfer = this.productTransferRepository.create(transferencia);
      const savedTransfer = await queryRunner.manager.save(newTransfer);

      for (const product of transferencia.detalles) {
        const cantidadTransferencia = product.cantidad_transferida;
        let cantidadTmp = cantidadTransferencia;
        const idProducto = product.productoIdProducto;

        if (isNaN(cantidadTransferencia) || cantidadTransferencia <= 0) {
          throw new Error('Cantidad solicitada no válida');
        }

        const stocksSaliente = await this.stockService.getRelatedStocks(
          idProducto,
          sucursalSaliente.id_sucursal,
        );

        if (stocksSaliente.length === 0) {
          throw new Error('No hay existencias en los stocks de producto');
        }

        let cantidadExistentes = 0;
        for (const stock of stocksSaliente) {
          cantidadExistentes += stock.cantidad_actual;
        }

        if (cantidadTransferencia > cantidadExistentes) {
          throw new Error(
            'No hay existencias suficientes en la sucursal saliente',
          );
        }

        for (const relatedStock of stocksSaliente) {
          if (cantidadTmp > 0) {
            let cantidad_decremento = 0;
            if (cantidadTmp > relatedStock.cantidad_actual) {
              cantidad_decremento = relatedStock.cantidad_actual;
              cantidadTmp -= relatedStock.cantidad_actual;
              await this.stockRepository.update(
                { id_stock: relatedStock.id_stock },
                { cantidad_actual: 0 },
              );
            } else if (cantidadTmp <= relatedStock.cantidad_actual) {
              cantidad_decremento = cantidadTmp;
              await this.stockRepository.decrement(
                { id_stock: relatedStock.id_stock },
                'cantidad_actual',
                cantidadTmp,
              );
              cantidadTmp = 0;
            }
            // Crear y guardar el detalle de la transferencia
            const newDetail = this.transferDetailRepository.create({
              cantidad_transferencia: cantidad_decremento,
              id_stock: relatedStock,
              id_transferencia: savedTransfer,
            });
            await queryRunner.manager.save(newDetail);
          }
        }
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  getTransfer(id_transferencia: number) {
    return this.productTransferRepository.findOne({
      where: { id_transferencia },
      relations: [
        'DetalleTransferencia',
        'id_estado_transferencia',
        'sucursal_Entrante',
        'id_usuario',
      ],
    });
  }

  deleteTransfer(id_transferencia: number) {
    return this.productTransferRepository.update(
      { id_transferencia },
      { estado: 0 },
    );
  }
}
