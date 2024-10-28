import { Transform, Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CreateStockDto {
 
    @IsInt()
    @Min(1)
    cantidad_inicial: number;

    @IsInt()
    @Min(1)
    cantidad_actual: number;

}