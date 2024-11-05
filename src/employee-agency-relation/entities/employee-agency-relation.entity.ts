import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    ManyToOne,
    UpdateDateColumn,
}from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Agency } from "src/agencies/agency.entity";

@Entity({name:'relacionempleadosucursal'})
export class EmployeeAgencyRelation {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id_relacion_empleado_sucursal;

    @Column({ type: 'tinyint', default: 1 })
    @ApiProperty()
    estado: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    created_at: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    updated_at: Date;
    
    @Column({type: 'integer'})
    id_usuario: number;

    @ManyToOne(() => User, user => user.relacionEmpleadoSucursal)
    usuario: User

    @ManyToOne(() => Agency, sucursal => sucursal.relacionEmpleadoSucursal)
    sucursal: Agency;

}
