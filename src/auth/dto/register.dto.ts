import { Transform } from 'class-transformer';
import { IsInt, IsString, Min, MinLength } from 'class-validator';
import { Agency } from 'src/agencies/agency.entity';

export class RegisterDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombre_persona: string;
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  username: string;
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(6)
  password: string;
  @IsInt()
  id_rol: number;
  @IsInt()
  @Min(1)
  id_sucursal: Agency;
}
