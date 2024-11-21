import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { ProductTransfer } from 'src/product-transfer/entities/product-transfer.entity';
import { Stock } from 'src/stocks/entities/stock.entity';

@Entity({ name: 'detalle_transferencia' })
export class TransferDetail {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id_detalle_transferencia;

  @Column({ type: 'integer' })
  @ApiProperty()
  cantidad_transferencia;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    () => ProductTransfer,
    (producttransfer) => producttransfer.DetalleTransferencia,
    { nullable: false },
  )
  @JoinColumn({ name: 'id_transferencia' })
  id_transferencia: ProductTransfer;

  @ManyToOne(() => Stock, (stock) => stock, { nullable: false })
  @JoinColumn({ name: 'id_stock' })
  id_stock: Stock;
}
