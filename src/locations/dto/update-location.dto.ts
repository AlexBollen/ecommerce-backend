import { Transform } from 'class-transformer';
import { IsDecimal, IsInt, IsOptional, MinLength } from 'class-validator';

export class UpdateLocationDto {
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsInt()
  @MinLength(1)
  id_ubicacion?: number;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsDecimal()
  @MinLength(1)
  latitud_gps?: number;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsDecimal()
  @MinLength(1)
  longitud_gps?: number;
}
