
import { DataSource } from 'typeorm';

console.log('__dirname==' + __dirname)
console.log(__dirname + '/entity/*.{.ts,.js}')
export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'test.db',
    synchronize: true,
    logging: true,
    entities: [__dirname + '/entity/*{.ts,.js}']
});

// AppDataSource.initialize()
//     .then(() => {
//         console.log('Data Source has been initialized!');
//     })
//     .catch(err => console.error('Error initializing data source:', err));
