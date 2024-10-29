import { Transform, Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CreateDetailQuoteDto {
    @IsInt()
    @Min(1)
    cantidad_solicitada: number;
}
