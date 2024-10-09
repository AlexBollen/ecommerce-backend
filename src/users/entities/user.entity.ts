import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'usuario' })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id_usuario: number;

  @Column()
  @ApiProperty()
  nombre_persona: string;

  @Column({ unique: true, nullable: false })
  @ApiProperty()
  username: string;

  @Column({ nullable: false })
  @ApiProperty()
  password: string;

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty()
  estado: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
