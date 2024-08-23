import { Room } from "../models/room";
import prisma from "../utils/prisma";

class RoomRepository {
  async createRoom(room: Room) {
    return await prisma.room.create({
      data: { 
        link: room.link
      },
    });
  }
}

export default RoomRepository;