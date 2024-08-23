import { Request, Response } from 'express'
import RoomService from '../services/roomService';

class RoomController{

  private roomService: RoomService;

  constructor() {
    this.roomService = new RoomService();
  }

  getRooms = async (req: Request, res: Response) => {
      res.status(200).json({
        message : 'Hello Worlds!'
      });      
  };

  async createRoom (req: Request, res: Response) {
    const { link } = req.body;

    try {
      const room = await this.roomService.createrRoom(link);
      res.status(201).json(room);
    } catch (error : any) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default new RoomController();
