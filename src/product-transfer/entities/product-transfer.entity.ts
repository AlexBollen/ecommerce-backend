import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
import { TransferState } from 'src/transfer-states/transfer-state.entity';
import { Agency } from 'src/agencies/agency.entity';
import { User } from 'src/users/entities/user.entity';
import { TransferDetail } from 'src/transfer-detail/entities/transfer-detail.entity';

@Entity({ name: 'transferencia_producto' })
export class ProductTransfer {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id_transferencia: number;

  @Column({ nullable: false })
  @ApiProperty()
  descripcion_transferencia: string;

  @Column({ nullable: false })
  @ApiProperty()
  sucursal_Saliente: number;

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty()
  estado: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => TransferDetail,
    (transferdetail) => transferdetail.id_transferencia,
  )
  DetalleTransferencia: TransferDetail[];

  @ManyToOne(
    () => TransferState,
    (transferstate) => transferstate.TransferenciaProductos,
  )
  @JoinColumn({ name: 'id_estado_transferencia' })
  id_estado_transferencia: TransferState;

  @ManyToOne(() => Agency, (agency) => agency.TransferenciaProducto)
  @JoinColumn({ name: 'sucursal_Entrante' })
  sucursal_Entrante: Agency;

  @ManyToOne(() => User, (user) => user.TransferenciaProducto)
  @JoinColumn({ name: 'id_usuario' })
  id_usuario: User;
}
