import { Transform } from 'class-transformer';
import {
  IsInt,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { Role } from 'src/roles/role.entity';

export class CreateUserDto {
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
  @MinLength(1)
  password: string;
  @IsInt()
  role: Role;
  @IsInt()
  @Min(1)
  id_sucursal?: number;
}
