import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProductTransfer } from 'src/product-transfer/entities/product-transfer.entity';

@Entity({ name: 'estado_transferencia' })
export class TransferState {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id_estado_transferencia: number;

  @Column({ unique: true, nullable: false })
  @ApiProperty()
  nombre_estado_transferencia: string;

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty()
  estado: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updated_at: Date;

  @OneToMany(
    () => ProductTransfer,
    (producttransfer) => producttransfer.id_estado_transferencia,
  )
  TransferenciaProductos: ProductTransfer[];
}
