import { PartialType } from '@nestjs/swagger';
import { CreateDetailQuoteDto } from './create-detail-quote.dto';
import { IsDecimal, IsInt, IsOptional, MinLength, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateDetailQuoteDto extends PartialType(CreateDetailQuoteDto) {
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsInt()
  @MinLength(1)
  id_detalle_cotizacion?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    cantidad_solicitada?: number;
}
