import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class CustomerLoginDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  correo_cliente: string;
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password_cliente: string;
}