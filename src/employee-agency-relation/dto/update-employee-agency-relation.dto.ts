import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeAgencyRelationDto } from './create-employee-agency-relation.dto';
import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEmployeeAgencyRelationDto extends PartialType(CreateEmployeeAgencyRelationDto) {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id_usuario?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    id_sucursal?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    estado?: number;
}
