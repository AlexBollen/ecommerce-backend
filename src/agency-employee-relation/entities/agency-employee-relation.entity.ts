import { ApiProperty } from '@nestjs/swagger';
import { Agency } from 'src/agencies/agency.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'relacionempleadosucursal' })
export class AgencyEmployeeRelation {
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

  @ManyToOne(() => User, (user) => user.AgencyRelation)
  @JoinColumn({ name: 'id_usuario' })
  id_usuario: User;

  @ManyToOne(() => Agency, (sucursal) => sucursal.UserRelation)
  @JoinColumn({ name: 'id_sucursal' })
  id_sucursal: Agency;
}
