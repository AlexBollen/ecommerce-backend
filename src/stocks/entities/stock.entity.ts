import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/products/product.entity";
import { Agency } from "src/agencies/agency.entity";
import { DetailQuote } from "src/detail-quotes/entities/detail-quote.entity";

@Entity({ name: 'stock' })
export class Stock {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id_stock: number;

    @Column({ nullable: false })
    @ApiProperty()
    cantidad_inicial: number

    @Column({ nullable: false })
    @ApiProperty()
    cantidad_actual: number

    @Column({ type: 'tinyint', default: 1 })
    @ApiProperty()
    estado: number;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    created_at: Date;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    updated_at: Date;

    @ManyToOne(() => Product, (product) => product.stocks)
    producto: Product

    @ManyToOne(() => Agency, (agency) => agency.stocks)
    sucursal: Agency

    @OneToMany(() => DetailQuote, (detailQuote) => detailQuote.stock)
    detalle_cotizaciones: DetailQuote[]
}
