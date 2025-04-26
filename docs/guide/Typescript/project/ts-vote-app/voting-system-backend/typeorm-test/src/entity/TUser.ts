import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class TUser {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column()
    email!: string;
}