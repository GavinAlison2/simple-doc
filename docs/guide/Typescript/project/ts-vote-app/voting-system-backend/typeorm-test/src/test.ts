import "reflect-metadata"
import { AppDataSource } from './datasources';
import { TUser } from './entity/TUser';

// 测试创建用户
async function createUser() {
    const user = new TUser();
    user.username = 'John Doe';
    user.email = 'johndoe@example.com';

    const savedUser = await AppDataSource.manager.save(user);
    console.log('User created:', savedUser);
    return savedUser;
}

// 测试读取用户
async function findUserById(id: number) {
    const user = await AppDataSource.manager.findOneBy(TUser, { id });
    console.log('User found:', user);
    return user;
}

// 测试更新用户
async function updateUser(user: TUser) {
    user.username = 'Jane Doe';
    const updatedUser = await AppDataSource.manager.save(user);
    console.log('User updated:', updatedUser);
    return updatedUser;
}

// 测试删除用户
async function deleteUser(user: TUser) {
    await AppDataSource.manager.remove(user);
    console.log('User deleted');
}

AppDataSource.initialize()
    .then(async () => {
        const createdUser = await createUser();
        const foundUser = await findUserById(createdUser.id);
        const updatedUser = await updateUser(foundUser!);
        await deleteUser(updatedUser);
    })
    .catch((error) => console.log(error));