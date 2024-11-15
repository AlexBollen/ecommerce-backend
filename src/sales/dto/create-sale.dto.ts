import { Transform, Type } from 'class-transformer';
import { IsInt, Min, IsNumber } from 'class-validator';

export class CreateSaleDto {

    @IsNumber()
    @Min(1)
    total_pagado: number

    @IsNumber()
    @Min(0)
    descuento_aplicado: number
}
