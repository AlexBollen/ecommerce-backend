import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

@Entity({ name: 'rol' })
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id_rol: number;

  @Column({ unique: true, nullable: false })
  @ApiProperty()
  nombre_rol: string;

  @Column({ nullable: false })
  @ApiProperty()
  descripcion_rol: string;

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty()
  estado: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updated_at: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
