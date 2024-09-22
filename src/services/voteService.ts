import { Vote } from '../models/vote';
import RoomRepository from '../repositories/roomRepository';
import VoteRepository from '../repositories/voteRepository';
import { Result } from '../utils/result';

class VoteService {
  private voteRepository;
  private roomRepository;

  constructor() {
    this.voteRepository = new VoteRepository();
    this.roomRepository = new RoomRepository();
  }

  async createVotes(userName: string, times: string[]) {
    const roomData = await this.roomRepository.getRoomByTimeId(times[0]);

    if (roomData.isFailure) {
      return Result.fail(new Error('Sala indefinida'));
    }
    
    const room = roomData.getValue();

    const now = new Date();
    if (room.endingAt < now) {
      return Result.fail(new Error('Tempo de votação encerrado'));
    }

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