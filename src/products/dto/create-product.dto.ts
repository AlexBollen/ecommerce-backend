import { IsString, MinLength, IsInt, Min, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { Category } from 'src/categories/category.entity';
import { Brand } from 'src/brands/brand.entity';

export class CreateProductDto {
  @IsString()
  @MinLength(1)
  nombre_producto: string;

  @IsString()
  @MinLength(1)
  descripcion_producto: string;

  @IsString()
  @MinLength(1)
  modelo_producto: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  cantidad_minima: number;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  precio_costo: number;

  @IsNumber()
  @Min(1)
  @Type(() => Number)
  precio_venta: number;

  @IsOptional()
  @IsString()
  @MinLength(1)
  imagen?: string;

  @IsInt()
  @Type(() => Number)
  categoria: Category

  @IsInt()
  @Type(() => Number)
  marca: Brand
}
