import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

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
}
