import { Transform } from 'class-transformer';
import { IsString, MinLength, IsInt, Min } from 'class-validator';

export class CreateProductDto {
   
    @IsString()
    @MinLength(1)
    nombre_producto: string

    @IsString()
    @MinLength(1)
    descripcion_producto: string

    @IsString()
    @MinLength(1)
    modelo_producto: string

    @IsInt()
    @Min(1)
    cantidad_minima: number
   
    @IsInt()
    @Min(1)
    precio_costo: number

    @IsInt()
    @Min(1)
    precio_venta: number
}
