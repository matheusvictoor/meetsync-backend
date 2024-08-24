import { Time } from '../models/time';
import TimeRepository from '../repositories/timeRepository';

class TimeService {
  private timeRepository;

  constructor() {
    this.timeRepository = new TimeRepository();
  }

  async createTime(date: Date, start: Date, end: Date, roomId: string) {
    const time = new Time(date, start, end, roomId);

    return await this.timeRepository.createTime(time);
  }

  async createTimesForRoom(roomId: string, times: { date: string; start: string; end: string }[]) {
    const timePromises = times.map((time) => {
      const newTime = new Time(
        new Date(time.date), 
        new Date(time.start), 
        new Date(time.end), 
        roomId
      );
      return this.timeRepository.createTime(newTime);
    });

    return Promise.all(timePromises);
  }
}

export default TimeService;