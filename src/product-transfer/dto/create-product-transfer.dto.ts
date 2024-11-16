import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateTransferDetailDto } from 'src/transfer-detail/dto/create-transfer-detail.dto';

export class CreateProductTransferDto {
  @IsString()
  @MinLength(1)
  descripcion_transferencia: string;

  @IsInt()
  @Min(1)
  sucursal_saliente: number;

  @IsInt()
  @Min(1)
  sucursal_Entrante: number;

  @IsInt()
  @Min(1)
  id_estado_transferencia: number;

  @IsInt()
  @Min(1)
  id_usuario: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTransferDetailDto)
  detalles: CreateTransferDetailDto[];
}
