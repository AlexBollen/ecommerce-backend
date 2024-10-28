import { Transform, Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CreateStockDto {
    @Transform(({ value }) => value.trim())
    @IsInt()
    @Min(1)
    cantidad_inicial: number;

    @Transform(({ value }) => value.trim())
    @IsInt()
    @Min(1)
    cantidad_actual: number;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    id_producto: number;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    id_sucursal: number;
}