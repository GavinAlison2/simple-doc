import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './User';
import { Vote } from './Vote';

@Entity()
export class VoteRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Vote)
  vote: Vote;

  @Column()
  option: string;
}
