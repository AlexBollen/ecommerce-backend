import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'sucursal' })
export class Sucursal {
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

  @Column({ unique: true, nullable: true })
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
}
