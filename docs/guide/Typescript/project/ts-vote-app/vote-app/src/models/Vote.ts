import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const { userId } = jwt.verify(token, 'your-secret-key') as any;
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user; // 将用户信息添加到请求中
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
