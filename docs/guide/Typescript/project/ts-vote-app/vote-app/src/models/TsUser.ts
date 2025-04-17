// User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vote } from './Vote';
import { VoteRecord } from './VoteRecord';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: 'admin' | 'user'; // 用户角色

  @OneToMany(() => Vote, (vote) => vote.creator)
  votes: Vote[];

  @OneToMany(() => VoteRecord, (record) => record.user)
  records: VoteRecord[];
}
