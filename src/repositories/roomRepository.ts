import { Room } from "../models/room";
import { Time } from "../models/time";
import { RoomResponse } from "../services/roomService";
import prisma from "../utils/prisma";
import { Result } from "../utils/result";

class RoomRepository {
  async getRoom(roomId: string): Promise<Result<RoomResponse>> {
    try {
      const room = await prisma.room.findUnique({
        where: {
          roomId: roomId,
        },
        include: {
          Time: {
            include: {
              Vote: true,
            },
          },
        },
      });
      return room ? Result.ok(room as RoomResponse) : Result.fail(new Error('Sala não encontrada.'));
    } catch (error) {
      return Result.fail(new Error('Erro ao buscar a sala.'));
    }
  }

  async createRoom(room: Room, times: Time[]) {
    try {
      const roomData = await prisma.room.create({
        data: {
          endingAt: room.endingAt,
          title: room.title, 
          description: room.description || "", 
          Time: {
            createMany: {
              data: times.map(time => ({
                date: time.date,
                start: time.start,
                end: time.end
              }))
            }
          }
        },
        include: {
          Time: true,  
        }
      });
      return Result.ok(roomData);
    } catch (error) {
      return Result.fail(new Error('Erro ao criar uma sala.'));
    }
  }

  async deleteRoom(roomId: string): Promise<Result<void>> {
    try {
      await prisma.room.delete({
        where: {
          roomId: roomId,
        }
      });
      return Result.ok();
    } catch (error) {
      return Result.fail(new Error('Erro ao deletar a sala.'));
    }
  }

  async getRoomByTimeId(timeId: string): Promise<Result<Room>> {
    try {
      const timeWithRoom = await prisma.time.findUnique({
        where: {
          timeId: timeId,
        },
        include: {
          room: true,  
        },
      });
      return timeWithRoom?.room ? Result.ok(timeWithRoom.room) : Result.fail(new Error('Sala não encontrada.')); 
    } catch (error) {
      return Result.fail(new Error('Erro ao buscar a sala pelo ID do horário.'));
    }  
  }
}

export default RoomRepository;
