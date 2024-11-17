import { Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsBoolean, IsInt, Min, ValidateNested } from 'class-validator';
import { Agency } from 'src/agencies/agency.entity';
import { Customer } from 'src/customers/customer.entity';
import { CreateDetailQuoteDto } from 'src/detail-quotes/dto/create-detail-quote.dto';
import { User } from 'src/users/entities/user.entity';

export class CreateQuoteDto {
  @IsInt()
  @Min(1)
  monto_total: number;
  @IsInt()
  cliente: Customer;
  @IsInt()
  sucursal: Agency;
  @IsInt()
  usuario: User;
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => CreateDetailQuoteDto)
  lista_productos: CreateDetailQuoteDto[];
  @IsBoolean()
  tipo_transaccion: boolean;
}
