import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/roles/role.entity';
import { Quote } from 'src/quotes/entities/quote.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductTransfer } from 'src/product-transfer/entities/product-transfer.entity';

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

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Quote, (quote) => quote.usuario)
  cotizaciones: Quote[];

  @OneToMany(
    () => ProductTransfer,
    (producttranser) => producttranser.id_usuario,
  )
  TransferenciaProducto: ProductTransfer[];
}
