import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../data-source';
import { Vote } from '../entities/Vote';
import { User } from '../entities/User';

export class VoteController {
  static async createVote(req: Request, res: Response, next: NextFunction) {
    const { title, description, options, endDate } = req.body;
    const voteRepository = AppDataSource.getRepository(Vote);
    const vote = voteRepository.create({ title, description, options, endDate, creator: new User() });
    await voteRepository.save(vote);
    res.status(201).json(vote);
  }

  static async getVotes(req: Request, res: Response) {
    const voteRepository = AppDataSource.getRepository(Vote);
    const votes = await voteRepository.find();
    res.json(votes);
  }
}
