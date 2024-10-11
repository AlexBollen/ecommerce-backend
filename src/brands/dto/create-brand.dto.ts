import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

export class CreateBrandDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombre_marca: string;
}
