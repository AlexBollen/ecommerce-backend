import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Location } from 'src/locations/location.entity';
import { Stock } from 'src/stocks/entities/stock.entity';
import { Quote } from 'src/quotes/entities/quote.entity';
import { ProductTransfer } from 'src/product-transfer/entities/product-transfer.entity';
import { AgencyEmployeeRelation } from 'src/agency-employee-relation/entities/agency-employee-relation.entity';

@Entity({ name: 'sucursal' })
export class Agency {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id_sucursal: number;

  @Column({ unique: true })
  @ApiProperty()
  nombre_sucursal: string;

  @Column({ unique: true })
  @ApiProperty()
  direccion_detallada: string;

  @Column({ unique: true })
  @ApiProperty()
  telefono: string;

  @Column({ nullable: true })
  @ApiProperty()
  correo: string;

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty()
  estado: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updated_at: Date;

  @OneToOne(() => Location, { nullable: true })
  @JoinColumn()
  @ApiProperty()
  ubicacion: Location;

  @OneToMany(() => Stock, (stock) => stock.sucursal)
  stocks: Stock[];

  @OneToMany(() => Quote, (quote) => quote.sucursal)
  cotizaciones: Quote[];

  @OneToMany(
    () => ProductTransfer,
    (producttransfer) => producttransfer.sucursal_Entrante,
  )
  TransferenciaProducto: [];

  @OneToMany(() => AgencyEmployeeRelation, (relacion) => relacion.id_sucursal)
  UserRelation: AgencyEmployeeRelation[];
}
