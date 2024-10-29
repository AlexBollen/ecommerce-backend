import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Quote } from 'src/quotes/entities/quote.entity';

@Entity({ name: 'cliente' })
export class Customer {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id_cliente: number;

  @Column({ unique: true })
  @ApiProperty()
  nombre_cliente: string;

  @Column({ unique: true, nullable: true })
  @ApiProperty()
  nit_cliente: string;

  @Column({ unique: true, nullable: true })
  @ApiProperty()
  telefono_cliente: string;

  @Column({ unique: true, nullable: true })
  @ApiProperty()
  correo_cliente: string;

  @Column({ unique: true })
  @ApiProperty()
  direccion_cliente: string;

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty()
  estado: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updated_at: Date;

  @OneToMany(() => Quote, (quote) => quote.cliente)
  cotizaciones: Quote[]
}