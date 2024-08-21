import { Request, Response } from 'express'
import { createRoom } from '../repository/roomRepository'

class RoomController{

    getRooms = async (req: Request, res: Response) => {
        res.status(200).json({
          message : 'Hello World!'
        });      
    };

    postRoom = async(req: Request, res: Response) => {
      try {
        const room = await createRoom(req.body);
        res.status(200).send(room);
      } catch (e) {
        res.status(400).send(e);
      }
    };
}

export const roomController = new RoomController();
