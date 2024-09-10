import { Vote } from '../models/vote';
import VoteRepository from '../repositories/voteRepository';

class VoteService {
  private voteRepository;

  constructor() {
    this.voteRepository = new VoteRepository();
  }

  async createVotes(userName: string, times: string[]) {
    const voteObjects = times.map((timeId) => {
      return new Vote(
        userName,
        timeId 
      );
    });

    return await this.voteRepository.createVotes(voteObjects);
  }
}

export default VoteService;