import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from './User';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('simple-json')
  options: string[];

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  endDate: Date;

  @ManyToOne(() => User)
  creator: User;

}
