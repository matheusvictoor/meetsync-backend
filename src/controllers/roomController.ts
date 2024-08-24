import { Request, Response } from 'express'
import RoomService from '../services/roomService';

class RoomController{

  private roomService: RoomService;

  constructor() {
    this.roomService = new RoomService();
  }

  async createRoom (req: Request, res: Response) {
    const { link, times } = req.body;

    try {
      const room = await this.roomService.createRoom(link, times);
      res.status(201).json(room);
    } catch (error : any) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default new RoomController();
