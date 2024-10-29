import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";
import { Customer } from "src/customers/customer.entity";
import { Agency } from "src/agencies/agency.entity";
import { DetailQuote } from "src/detail-quotes/entities/detail-quote.entity";

@Entity({ name: 'quote' })
export class Quote {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id_cotizacion: number;

    @Column({ nullable: false })
    @ApiProperty()
    monto_total: number;

    @Column({ type: 'tinyint', default: 1 })
    @ApiProperty()
    estado: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    created_at: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    updated_at: Date;

    @ManyToOne(() => Customer, (customer) => customer.cotizaciones)
    cliente: Customer

    @ManyToOne(() => Agency, (agency) => agency.cotizaciones)
    sucursal: Agency

    @ManyToOne(() => User, (user) => user.cotizaciones)
    usuario: User

    @OneToMany(() => DetailQuote, (detailQuote) => detailQuote.cotizacion)
    detalle_cotizaciones: DetailQuote[]
}
