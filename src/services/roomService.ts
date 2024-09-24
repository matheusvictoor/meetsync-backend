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
    const now = new Date();
    const endingAtDate = new Date(endingAt);
    if (endingAtDate < now) {
      return Result.fail(new Error('Criar sala já finalizada não é permitido'));
    }
    
    const hasDuplicate = times.some((time, index) => 
      times.findIndex(t => 
        t.date === time.date && 
        t.start === time.start && 
        t.end === time.end
      ) !== index
    );

    if (hasDuplicate) {
      return Result.fail(new Error('Horários duplicados não são permitidos.'));
    }

    const room = new Room( 
      endingAtDate,
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
