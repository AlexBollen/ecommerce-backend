import { Transform } from 'class-transformer';
import { IsString, IsInt, IsOptional, MinLength, Min } from 'class-validator';

export class UpdateProductDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    id_producto?: number;

    @IsOptional()
    @IsString()
    @MinLength(1)
    nombre_producto: string

    
    @IsOptional()
    @IsString()
    @MinLength(1)
    descripcion_producto: string

    @IsOptional()
    @IsString()
    @MinLength(1)
    modelo_producto: string

    @IsOptional()
    @IsInt()
    @Min(1)
    cantidad_minima: number
   
    @IsOptional()
    @IsInt()
    @Min(1)
    precio_costo: number

    @IsOptional()
    @IsInt()
    @Min(1)
    precio_venta: number
  }