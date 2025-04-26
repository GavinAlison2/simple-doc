import "reflect-metadata"; // this shim is required
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Vote } from './entities/Vote';
import { VoteRecord } from './entities/VoteRecord';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './database.db',
  entities: [User, Vote, VoteRecord],
  synchronize: false, // set to true to automatically create tables on startup
  logging: true,
  migrations: [],
  subscribers: [],
});

// AppDataSource.initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!');
//   })
//   .catch((err: Error) => {
//     console.error('Error during Data Source initialization', err);
//   });
