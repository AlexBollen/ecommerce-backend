import { Transform } from "class-transformer";
import { IsString, MinLength } from "class-validator";

export class CreateRoleDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  nombre_rol: string;
  @Transform(({ value }) => value.trim())
  @IsString()
  @MinLength(1)
  descripcion_rol: string;
}
