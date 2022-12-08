import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('users', {
    schema: 'public'
})
export class Users extends BaseEntity {
    @PrimaryColumn()
    id: string;
    @Column()
    name: string
    @Column()
    lastname: string
    @Column()
    email: string
    @Column()
    password: string
}