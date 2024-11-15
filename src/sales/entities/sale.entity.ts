import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne , JoinColumn} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Quote } from "src/quotes/entities/quote.entity";
import { PaymentMethod } from "src/payment-methods/payment-method.entity";


@Entity({ name: 'venta'})
export class Sale {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id_venta: number;

    @Column({ nullable: false })
    @ApiProperty()
    total_pagado: number;
    
    @Column({ nullable: false })
    @ApiProperty()
    descuento_aplicado: number;

    @Column({ type: 'tinyint', default: 1 })
    @ApiProperty()
    estado: number;
  
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    created_at: Date;
  
    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    updated_at: Date;

    @OneToOne(() => Quote, { nullable: true})
    @JoinColumn()
    @ApiProperty()  
    cotizacion: Quote

    @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.ventas)
    metodoPago: PaymentMethod
}
