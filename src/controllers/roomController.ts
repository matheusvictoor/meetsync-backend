import { Request, Response } from 'express'
import RoomService from '../services/roomService';

class RoomController{

  private roomService: RoomService;

  constructor() {
    this.roomService = new RoomService();
  }

  async getRoom (req: Request, res: Response) {
    const { roomId } = req.params;
    const room = await this.roomService.getRoom(roomId);

    if(room.isFailure)
      return res.status(400).json({ error: room.error?.message });

    res.status(200).json(room.getValue());
  };

  async createRoom (req: Request, res: Response) {
    const { endingAt, times } = req.body;
    const room = await this.roomService.createRoom(endingAt, times);

    if(room.isFailure)
      return res.status(400).json({ error: room.error?.message });

    res.status(201).json(room.getValue());  
  };

  async deleteRoom (req: Request, res: Response) {
    const { roomId } = req.params;
    const room = await this.roomService.deleteRoom(roomId);

    if(room.isFailure)
      return res.status(404).json({ error: room.error?.message });

    res.status(204).send();
  };
}

export default new RoomController();
