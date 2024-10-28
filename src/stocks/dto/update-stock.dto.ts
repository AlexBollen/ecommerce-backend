import { PartialType } from '@nestjs/swagger';
import { CreateStockDto } from './create-stock.dto';
import { IsDecimal, IsInt, IsOptional, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateStockDto extends PartialType(CreateStockDto) {
  
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsInt()
  @MinLength(1)
  cantidad_inicial?: number;

  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsInt()
  @MinLength(1)
  cantidad_actual?: number;
}
