import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateAgencyDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombre_sucursal: string;
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  direccion_detallada: string;
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  telefono: string;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  correo?: string;
  @IsOptional()
  @IsNumber()
  latitud_gps?: number;
  @IsOptional()
  @IsNumber()
  longitud_gps?: number;
}
