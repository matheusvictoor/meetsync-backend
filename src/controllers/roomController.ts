import { Request, Response } from 'express'
import RoomService from '../services/roomService';

class RoomController{

  private roomService: RoomService;

  constructor() {
    this.roomService = new RoomService();
  }

  async getRoom (req: Request, res: Response) {
    const { roomId } = req.params;

    try {
      const room = await this.roomService.getRoom(roomId);
      res.status(200).json(room);
    } catch (error : any) {
      res.status(400).json({ error: error.message });
    }
  };

  async createRoom (req: Request, res: Response) {
    const { endingAt, times } = req.body;

    try {
      const room = await this.roomService.createRoom(endingAt, times);
      res.status(201).json(room);
    } catch (error : any) {
      res.status(400).json({ error: error.message });
    }
  };

  async deleteRoom (req: Request, res: Response) {
    const { roomId } = req.params;

    try {
      await this.roomService.deleteRoom(roomId);
      res.status(204).send();
    } catch (error : any) {
      res.status(404).json({ error: error.message });
    }
  };
}

export default new RoomController();
