import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/product.entity';

@Entity({ name: 'marca' })
export class Brand {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id_marca: number;

  @Column({ unique: true })
  @ApiProperty()
  nombre_marca: string;

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty()
  estado: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updated_at: Date;

  @OneToMany(() => Product, (product) => product.marca)
  productos: Product[]
}
