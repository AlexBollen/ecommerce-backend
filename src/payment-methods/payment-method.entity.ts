import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Sale } from 'src/sales/entities/sale.entity';

@Entity({ name: 'metodo_pago' })
export class PaymentMethod {
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

  @OneToMany(() => Sale, (sale) => sale.metodoPago)
  ventas: Sale[]
}
