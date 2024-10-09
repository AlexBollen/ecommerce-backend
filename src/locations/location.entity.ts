import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Point, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ubicacion' })
export class Location {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id_ubicacion: number;

  @Column({
    type: 'point',
    spatialFeatureType: 'Point',
    srid: 4326,
  })
  @ApiProperty()
  ubicacion_gps: string;

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
