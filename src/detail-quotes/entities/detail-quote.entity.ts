import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Quote } from "src/quotes/entities/quote.entity";
import { Stock } from "src/stocks/entities/stock.entity";

@Entity({ name: 'detalle_cotizacion' })
export class DetailQuote {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id_detalle_cotizacion: number;

  @Column({ nullable: false })
  @ApiProperty()
  cantidad_solicitada: number;

  @Column({ type: 'tinyint', default: 1 })
  @ApiProperty()
  estado: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updated_at: Date;

  @ManyToOne(() => Quote, (quote) => quote.detalle_cotizaciones)
  cotizacion: Quote

  @ManyToOne(() => Stock, (stock) => stock.detalle_cotizaciones)
  stock: Stock
}
