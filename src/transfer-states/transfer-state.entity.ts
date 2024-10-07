import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

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
}
