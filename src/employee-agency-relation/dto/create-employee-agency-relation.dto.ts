import { Transform, Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CreateEmployeeAgencyRelationDto {
    @Type(() => Number)
    @IsInt()
    @Min(1)
    id_usuario: number;

    @Type(() => Number)
    @IsInt()
    @Min(1)
    id_sucursal: number;

    @Type(() => Number)
    @IsInt()
    @Min(0)
    estado: number;

}
