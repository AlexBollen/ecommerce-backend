import { PartialType } from '@nestjs/swagger';
import { CreateStockDto } from './create-stock.dto';
import { IsDecimal, IsInt, IsOptional, MinLength, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateStockDto extends PartialType(CreateStockDto) {
  @IsOptional()
  @IsInt()
  @Min(1)
  id_stock?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  cantidad_inicial?: number;

  @IsOptional()
  
  @IsInt()
  @Min(1)
  cantidad_actual?: number;
}
