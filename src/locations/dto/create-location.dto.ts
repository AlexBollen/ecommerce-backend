import { Transform } from 'class-transformer';
import { IsDecimal, MinLength } from 'class-validator';

export class GpsLocationDto {
  @Transform(({ value }) => value.trim())
  @IsDecimal()
  @MinLength(1)
  latitud_gps: number;
  @Transform(({ value }) => value.trim())
  @IsDecimal()
  @MinLength(1)
  longitud_gps: number;
}
