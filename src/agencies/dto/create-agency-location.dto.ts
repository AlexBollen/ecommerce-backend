import { Transform } from 'class-transformer';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { Location } from 'src/locations/location.entity';

export class CreateAgencyLocationDto {
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
  @MinLength(1)
  ubicacion?: Location;
}
