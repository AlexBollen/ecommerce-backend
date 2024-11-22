import { IsInt, Min } from 'class-validator';
import { Agency } from 'src/agencies/agency.entity';
import { Product } from 'src/products/product.entity';

export class CreateStockDto {
  @IsInt()
  @Min(1)
  cantidad_inicial: number;

  @IsInt()
  @Min(0)
  cantidad_actual: number;

  @IsInt()
  producto: Product;

  @IsInt()
  sucursal: Agency;
}
