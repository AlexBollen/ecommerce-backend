import { PartialType } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, MinLength, Min, IsNumber } from 'class-validator';

export class UpdateSaleDto {

    @IsOptional()
    @IsInt()
    @Min(1)
    id_venta?: number;

    @IsOptional()
    @IsNumber()
    @Min(1)
    total_pagado: number

    @IsOptional()
    @IsNumber()
    @Min(0)
    descuento_aplicado: number
}
