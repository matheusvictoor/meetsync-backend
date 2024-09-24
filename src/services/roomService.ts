import { Room } from '../models/room';
import { Time } from '../models/time';
import { Vote } from '../models/vote';
import RoomRepository from '../repositories/roomRepository';
import { Result } from '../utils/result';

type Report = {
  times: (Time & { timeId: string })[];  
  numVotes: number;
}

export interface RoomResponse extends Room {
  Time: (Time & {
    timeId: string;
    Vote: Vote[];
  })[];
}

class RoomService {
  private roomRepository;

  constructor() {
    this.roomRepository = new RoomRepository();
  }

  async getRoom(roomId: string): Promise<Result<RoomResponse | Report>> {
    const roomData = await this.roomRepository.getRoom(roomId);

    if (roomData.isFailure) {
        return Result.fail(roomData.error!);
    }

    const room = roomData.getValue();

    const now = new Date();
    if (room.endingAt < now) {
        return Result.ok(this.generateReport(room));
    }
    return Result.ok(room);
  }

  generateReport(room: RoomResponse): Report {
    let mostVoted: Report = {
      times: [],
      numVotes: 0
    };

    room.Time.forEach((time) => {
      let votes = time.Vote.length;
      if (votes > mostVoted.numVotes) {
        mostVoted = {
          times: [time],
          numVotes: votes
        };
      } else if (votes === mostVoted.numVotes) {
        mostVoted.times.push(time);
      }
    });

    return mostVoted;
  }

  async createRoom(endingAt: string, title: string, times: { date: string; start: string; end: string }[], description?: string) {
    if (!endingAt) {
      return Result.fail(new Error('A data de término é obrigatória.'));
    }
    if (!title) {
      return Result.fail(new Error('O título é obrigatório.'));
    }
    if (!times || times.length === 0) {
      return Result.fail(new Error('É necessário informar pelo menos um horário.'));
    }
    
    const room = new Room( 
      new Date(endingAt),
      title,
      description
    );
    const timeObjects = times.map((time) => {
      return new Time(
        new Date(time.date), 
        new Date(time.start), 
        new Date(time.end)
      );
    });

    return await this.roomRepository.createRoom(room, timeObjects);
  }

  async deleteRoom(roomId: string): Promise<Result<void>> {
    return await this.roomRepository.deleteRoom(roomId);
  }
}

export default RoomService;
