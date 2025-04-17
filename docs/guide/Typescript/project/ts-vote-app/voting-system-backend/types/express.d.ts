import { User } from '../src/entities/User';
import 'express';

declare module 'express' {
    interface Request {
        user?: User;
    }
}