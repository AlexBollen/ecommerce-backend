import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class CreateTransferStateDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombre_estado_transferencia: string;
}
