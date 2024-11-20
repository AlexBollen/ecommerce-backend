import { Injectable } from '@nestjs/common';
import { CreateProductTransferDto } from './dto/create-product-transfer.dto';
import { UpdateProductTransferDto } from './dto/update-product-transfer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTransfer } from './entities/product-transfer.entity';
import { DataSource, Repository } from 'typeorm';
import { Stock } from 'src/stocks/entities/stock.entity';
import { TransferDetail } from 'src/transfer-detail/entities/transfer-detail.entity';
import { Agency } from 'src/agencies/agency.entity';
import { Console } from 'console';
import { Product } from 'src/products/product.entity';

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
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
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
        const idStock =
          typeof product.id_stock === 'object'
            ? product.id_stock.id_stock
            : product.id_stock;
        const idProducto = product.productoIdProducto;

        console.log('Producto: ' + idProducto);
        console.log('Cantidad: ' + cantidadTransferencia);
        if (isNaN(cantidadTransferencia) || cantidadTransferencia <= 0) {
          throw new Error('Cantidad solicitada no válida');
        }
        console.log('IdStock: ' + idStock);
        const producto = await this.productRepository.findOne({
          where: { id_producto: idProducto },
        });

        const stockSaliente = await this.stockRepository.findOne({
          where: {
            producto: producto,
            sucursal: sucursalSaliente,
          },
        });

        if (!stockSaliente) {
          throw new Error('El stock en la sucursal saliente no existe');
        }

        if (cantidadTransferencia > stockSaliente.cantidad_actual) {
          throw new Error(
            'No hay existencias suficientes en la sucursal saliente',
          );
        }

        await this.stockRepository.decrement(
          {
            id_stock: stockSaliente.id_stock,
            sucursal: sucursalSaliente,
          },
          'cantidad_actual',
          cantidadTransferencia,
        );

        //console.log(product.id_stock);
        // Crear y guardar el detalle de la transferencia
        const newDetail = this.transferDetailRepository.create({
          cantidad_transferencia: cantidadTransferencia,
          id_stock: product.id_stock,
          id_transferencia: savedTransfer,
        });
        await queryRunner.manager.save(newDetail);
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
  /*
  updateAgency(id_sucursal: number, sucursal: UpdateAgencyDto) {
    return this.AgencyRepository.update({ id_sucursal: id_sucursal }, sucursal);
  }
  */
}
