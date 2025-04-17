import { AppDataSource } from './AppDS'

import { TUser } from './src/entities/TUser'

console.log('__dirname:' + __dirname)
AppDataSource.initialize();

const insertUser = async () => {
    const userRepository = AppDataSource.getRepository(TUser);
    const newUser = new TUser();
    newUser.username = 'JohnDoe';
    newUser.password = 'password123';

    const savedUser = await userRepository.save(newUser);
    console.log('插入的用户:', savedUser);

    const newUser2 = new TUser();
    newUser2.username = 'TomSmith';
    newUser2.password = 'password';
    const savedUser2 = await userRepository.save(newUser2);
    console.log('插入的用户:', savedUser2);
};

insertUser();

const findAllUsers = async () => {
    const userRepository = AppDataSource.getRepository(TUser);
    const users = await userRepository.find();
    console.log('所有用户:', users);
};

findAllUsers();

const findUserByUsername = async () => {
    const userRepository = AppDataSource.getRepository(TUser);
    const user = await userRepository.find({ where: { username: 'JohnDoe' } });
    console.log('找到的用户:', user);
};

findUserByUsername();

const updateUser = async () => {
    const userRepository = AppDataSource.getRepository(TUser);
    const userToUpdate = await userRepository.findOne({ where: { username: 'JohnDoe' } });
    if (userToUpdate) {
        userToUpdate.password = 'newPassword';
        const updatedUser = await userRepository.save(userToUpdate);
        console.log('更新的用户:', updatedUser);
    }
};

updateUser();


const deleteUser = async () => {
    const userRepository = AppDataSource.getRepository(TUser);
    const result = await userRepository.delete({ username: 'JohnDoe' });
    console.log('删除结果:', result);
};

deleteUser();