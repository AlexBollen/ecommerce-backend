import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

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
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  correo_cliente?: string;
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  direccion_cliente: string;
}
