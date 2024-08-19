import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity({
    name: "credentials"
})
export class Credentials {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    username!: string;

    @Column({unique: true})
    password!: string;

    @Column()
    userId!: number;

    @OneToOne(() => User, user => user.credentials)
    @JoinColumn()
    user!: User;
}