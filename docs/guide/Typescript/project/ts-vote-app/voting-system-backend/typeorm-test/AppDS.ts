import { DataSource } from 'typeorm';
import { TUser } from './src/entity/TUser';

console.log('__dirname===' + __dirname)
// __dirname = global.__dirname || process.cwd();
export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'test.db',
    synchronize: true,
    logging: true,
    entities: [TUser]
});


AppDataSource.initialize()
    .then(() => {
        console.log('数据库连接已建立');
    })
    .catch((error) => console.log(error));