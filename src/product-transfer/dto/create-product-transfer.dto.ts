import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsString,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Agency } from 'src/agencies/agency.entity';
import { CreateTransferDetailDto } from 'src/transfer-detail/dto/create-transfer-detail.dto';
import { TransferState } from 'src/transfer-states/transfer-state.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateProductTransferDto {
  @IsString()
  @MinLength(1)
  descripcion_transferencia: string;

  @IsInt()
  @Min(1)
  sucursal_Saliente: number;

  @IsInt()
  @Min(1)
  sucursal_Entrante: Agency;

  @IsInt()
  @Min(1)
  id_estado_transferencia: TransferState;

  @IsInt()
  @Min(1)
  id_usuario: User;

  @IsArray()
  @ArrayNotEmpty()
  @Type(() => CreateTransferDetailDto)
  detalles: CreateTransferDetailDto[];
}
