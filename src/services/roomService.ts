import { Room } from '../models/room';
import { Time } from '../models/time';
import { Vote } from '../models/vote';
import RoomRepository from '../repositories/roomRepository';

type Report = {
  times: (Time & { timeId: string })[];  
  numVotes: number;
}

interface RoomResponse extends Room {
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

  async getRoom(roomId: string): Promise<RoomResponse | Report> {
    const room: RoomResponse | null = await this.roomRepository.getRoom(roomId);

    if (!room) {
        throw new Error('Sala indefinida');
    }

    const now = new Date();
    if (room.endingAt < now) {
        return this.generateReport(room);
    }
    return room;
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

  async createRoom(endingAt: string, times: { date: string; start: string; end: string }[]) {
    const room = new Room( 
      new Date(endingAt)
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

  async deleteRoom(roomId: string) {
    await this.roomRepository.deleteRoom(roomId);
  }
}

export default RoomService;
