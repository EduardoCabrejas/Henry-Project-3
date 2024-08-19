import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity({
    name: "turns"
})
export class Turns {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'date' })
    date!: Date;

    @Column()
    time!: string;

    @Column()
    activity!: string;

    @Column()
    userId!: number;

    @Column()
    status!: boolean;

    @ManyToOne(() => User, user => user.turns)
    @JoinColumn()
    user!: User
}