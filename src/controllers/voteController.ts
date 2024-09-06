import { Request, Response } from 'express'
import VoteService from '../services/voteService';

class VoteController{

  private voteService: VoteService;

  constructor() {
    this.voteService = new VoteService();
  }

  async createVotes (req: Request, res: Response) {
    const { userName, times } = req.body;

    try {
      const room = await this.voteService.createVotes(userName, times);
      res.status(201).json(room);
    } catch (error : any) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default new VoteController();
