import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credentials } from "./Credentials";
import { Turns } from "./Turns";

@Entity({
    name: "users",
})
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 50,
    })
    name!: string

    @Column({
        length: 50,
        unique: true
    })
    email!: string
    
    @Column({ type: 'date' })
    birthdate!: Date
    
    @Column({
        length: 30,
        unique: true
    })
    nDni!: string

    @OneToOne(() => Credentials, credentials => credentials.user)
    credentials!: Credentials;

    @OneToMany(() => Turns, turn => turn.user)
    turns!: Turns[];
}
