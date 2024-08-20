import express from 'express';
import { roomController } from '../controller/roomController';

export const roomRouter = express.Router();

roomRouter.get('/', roomController.getRooms);