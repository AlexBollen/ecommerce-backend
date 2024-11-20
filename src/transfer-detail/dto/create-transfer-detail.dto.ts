import { IsNotNull } from '@nestjsi/class-validator';
import { IsInt, Min } from 'class-validator';
import { ProductTransfer } from 'src/product-transfer/entities/product-transfer.entity';
import { Stock } from 'src/stocks/entities/stock.entity';

export class CreateTransferDetailDto {
  @IsInt()
  @Min(1, {
    message: 'El ID de transferencia debe ser válido',
  })
  id_transferencia: ProductTransfer;

  @IsInt()
  @Min(1, { message: 'El ID debe ser válido' })
  id_stock: Stock;

  @IsInt()
  @Min(1, { message: 'La cantidad transferida debe ser al menos 1' })
  cantidad_transferida: number;

  @IsInt()
  productoIdProducto: number;

  constructor(partial?: Partial<CreateTransferDetailDto>) {
    Object.assign(this, partial);
  }
}
