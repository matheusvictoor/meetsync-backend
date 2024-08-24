import { Room } from '../models/room';
import RoomRepository from '../repositories/roomRepository';

class RoomService {
  private roomRepository;

  constructor() {
    this.roomRepository = new RoomRepository();
  }

  async createRoom(link: string) {
    const room = new Room(link);

    return await this.roomRepository.createRoom(room);
  }
}

export default RoomService;