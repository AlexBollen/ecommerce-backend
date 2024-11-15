import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsInt()
  @MinLength(1)
  id_cliente?: number;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombre_cliente?: string;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  telefono_cliente?: string;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  correo_cliente?: string;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  direccion_cliente?: string;
  @IsOptional()
  @IsString()
  @MinLength(1)
  municipio_cliente?: string;
  @IsOptional()
  @IsString()
  @MinLength(1)
  departamento_cliente?: string;
}
