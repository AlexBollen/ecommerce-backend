import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsInt()
  @MinLength(1)
  id_categoria?: number;
  @IsOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombre_categoria?: string;
}
