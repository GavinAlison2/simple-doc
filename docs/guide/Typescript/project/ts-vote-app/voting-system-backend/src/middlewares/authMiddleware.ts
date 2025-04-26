import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // req.user = user; // 将用户信息添加到请求中
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
