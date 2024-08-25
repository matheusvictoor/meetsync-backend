import { Room } from '../models/room';
import { Time } from '../models/time';
import RoomRepository from '../repositories/roomRepository';

class RoomService {
  private roomRepository;

  constructor() {
    this.roomRepository = new RoomRepository();
  }

  async getRoom(roomId: string) {
    return await this.roomRepository.getRoom(roomId);
  }

  async createRoom(link: string, times: { date: string; start: string; end: string }[]) {
    const room = new Room(link);
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