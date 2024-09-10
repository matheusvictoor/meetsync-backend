import { Room } from '../models/room';
import { Vote } from '../models/vote';
import RoomRepository from '../repositories/roomRepository';
import VoteRepository from '../repositories/voteRepository';

class VoteService {
  private voteRepository;
  private roomRepository;

  constructor() {
    this.voteRepository = new VoteRepository();
    this.roomRepository = new RoomRepository();
  }

  async createVotes(userName: string, times: string[]) {
    const room = await this.roomRepository.getRoomByTimeId(times[0]);

    if (!room) {
      throw new Error('Sala indefinida');
    }

    const now = new Date();
    if (room.endingAt < now) {
      throw new Error('Tempo de votação encerrado');
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