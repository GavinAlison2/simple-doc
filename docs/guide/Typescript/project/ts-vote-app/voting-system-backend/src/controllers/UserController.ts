
import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

console.log('process.env.JWT_SECRET==' + process.env.JWT_SECRET)

export class UserController {
  static async register(req: Request, res: Response) {
    const { username, password, role } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({ username, password: hashedPassword, role });
    await userRepository.save(user);
    res.status(201).json(user);
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token });
  }
  static async getUsers(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    res.json(users);
  }
}
