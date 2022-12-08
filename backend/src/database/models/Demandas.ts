import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('demandas', {
    schema: 'public'
})
export class Demandas extends BaseEntity {

    @PrimaryColumn()
    id: string
    @Column()
    filename: string;
    @Column()
    extension: string;
    @Column()
    category: string;
    @Column()
    path: string;
    @Column()
    user_id: string;
}