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

  async createRoom(endingAt: Date, times: { date: Date; start: Date; end: Date }[]) {
    const room = new Room( 
      endingAt
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
