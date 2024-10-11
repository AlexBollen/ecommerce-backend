import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class CreatePaymentMethodDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombre_metodo_pago: string;
}
