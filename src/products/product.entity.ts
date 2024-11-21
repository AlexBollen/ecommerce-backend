import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/category.entity';
import { Brand } from 'src/brands/brand.entity';
import { Stock } from 'src/stocks/entities/stock.entity';

@Entity({ name: 'producto' })
export class Product {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id_producto: number;

  @Column({ unique: true, nullable: false })
  @ApiProperty()
  nombre_producto: string;

  @Column({ nullable: true })
  @ApiProperty()
  descripcion_producto: string;

  @Column({ nullable: true })
  @ApiProperty()
  modelo_producto: string;

  @Column({ nullable: false })
  @ApiProperty()
  cantidad_minima: number;

  @Column({ nullable: false })
  @ApiProperty()
  precio_costo: number;

  @Column({ nullable: false })
  @ApiProperty()
  precio_venta: number;

  @Column({ nullable: true })
  @ApiProperty()
  imagen: string;

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty()
  estado: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.productos)
  categoria: Category;

  @ManyToOne(() => Brand, (brand) => brand.productos)
  marca: Brand;

  @OneToMany(() => Stock, (stock) => stock.producto)
  stocks: Stock[];
}
