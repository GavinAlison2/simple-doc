// require('dotenv').config({ path: '../.env' });
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import apiRoutes from './routes/api';
import { User } from './entities/User';

dotenv.config({ path: '../.env' });
const app = express();
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    app.use('/api', apiRoutes);
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
    // AppDataSource.getRepository(User).find()
    //   .then((users) => {
    //     console.log(users)
    //   });
  })
  .catch((error: Error) => {
    console.error('Error during Data Source initialization', error);
  });
