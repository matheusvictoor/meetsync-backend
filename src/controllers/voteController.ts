import { NextFunction, Request, Response } from 'express'
import VoteService from '../services/voteService';
import { voteSchema } from '../utils/validSchema';

class VoteController{

  private voteService: VoteService;

  constructor() {
    this.voteService = new VoteService();
  }

  async createVotes (req: Request, res: Response, next: NextFunction) {

    try {
      const voteData = voteSchema.parse(req.body);
      const { userName, times } = voteData;
  
      const votes = await this.voteService.createVotes(userName, times);
  
      if(votes.isFailure) 
        return res.status(400).json({ error: votes.error?.message });
        
      return res.status(201).json(votes.getValue());  
    } catch (error) {
      next(error);
    }
  };
}

export default new VoteController();
