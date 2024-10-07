import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'payment_method' })
export class Payment_Method {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id_metodo_pago: number;

  @Column({ unique: true })
  @ApiProperty()
  nombre_metodo_pago: string;

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
