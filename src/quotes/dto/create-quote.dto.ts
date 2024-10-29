import { Transform, Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CreateQuoteDto {
    @IsInt()
    @Min(1)
    monto_total: number;
}
