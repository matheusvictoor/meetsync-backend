import { prisma } from "../services/prisma";

//Consertar o tipo de data
export const createRoom = async (data: any) => {
  const room = await prisma.room.create({
    data,
  }); 
  return room;
}