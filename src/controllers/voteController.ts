import { Request, Response } from 'express'
import VoteService from '../services/voteService';

class VoteController{

  private voteService: VoteService;

  constructor() {
    this.voteService = new VoteService();
  }

  async createVotes (req: Request, res: Response) {
    const { userName, times } = req.body;

    const votes = await this.voteService.createVotes(userName, times);

    if(votes.isFailure) 
      return res.status(400).json({ error: votes.error?.message });
      
    return res.status(201).json(votes.getValue());

  };
}

export default new VoteController();
