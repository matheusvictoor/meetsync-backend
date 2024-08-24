import { Time } from "../models/time";
import prisma from "../utils/prisma";

class TimeRepository {
  async createTime(time: Time) {
    return await prisma.time.create({
      data: { 
        date: time.date,
        start: time.start,
        end: time.end,
        roomId: time.roomId
      },
    });
  }
}

export default TimeRepository;
