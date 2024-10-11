import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateBrandDto {
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsInt()
  @MinLength(1)
  id_marca?: number;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombre_marca?: string;
}
