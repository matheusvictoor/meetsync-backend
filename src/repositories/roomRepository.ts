import { Room } from "../models/room";
import { Time } from "../models/time";
import prisma from "../utils/prisma";

class RoomRepository {
  async getRoom(roomId: string) {
    return await prisma.room.findUnique({
      where: {
        roomId: roomId,
      },
      include: {
        Time: true,  
      }
    });
  }

  async createRoom(room: Room, times: Time[]) {
    return await prisma.room.create({
      data: {
        link: room.link || "",
        Time: {
          create: times.map(time => ({
            date: time.date,
            start: time.start,
            end: time.end
          }))
        }
      },
      include: {
        Time: true,  
      }
    });
  }
}

export default RoomRepository;