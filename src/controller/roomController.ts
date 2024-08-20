import { Request, Response } from 'express'

class RoomController{
    getRooms = async (req: Request, res: Response) => {
        res.status(200).json({
          message : 'Hello World!'
        });      
    }

}

export const roomController = new RoomController()
