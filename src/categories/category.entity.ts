import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({ name: 'categoria' })
export class Category {
    @PrimaryGeneratedColumn()
    id_categoria: number
    @Column({unique: true})
    nombre_categoria: string
    @Column({type: 'tinyint'})
    estado: number
    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date
    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    updated_at: Date
}