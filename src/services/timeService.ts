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
}

export default TimeService;