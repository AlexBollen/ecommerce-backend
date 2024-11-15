import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class CreateCustomerDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombre_cliente: string;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nit_cliente?: string;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  telefono_cliente?: string;
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  correo_cliente: string;
  @IsString()
  @MinLength(6)
  password_cliente: string;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  direccion_cliente: string;
  @IsString()
  @MinLength(1)
  municipio_cliente: string;
  @IsString()
  @MinLength(1)
  departamento_cliente: string;
}
