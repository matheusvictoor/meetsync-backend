import { Room } from '../models/room';
import RoomRepository from '../repositories/roomRepository';
import TimeService from '../services/timeService';

class RoomService {
  private roomRepository;
  private timeService: TimeService;

  constructor() {
    this.roomRepository = new RoomRepository();
    this.timeService = new TimeService();
  }

  async createRoom(link: string, times: { date: string; start: string; end: string }[]) {
    const room = new Room(link);
    const response = await this.roomRepository.createRoom(room);

    await this.timeService.createTimesForRoom(response.roomId, times);
    return response;
  }
}

export default RoomService;