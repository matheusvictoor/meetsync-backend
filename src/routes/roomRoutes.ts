import express from 'express';
import RoomController from '../controllers/roomController';

const router = express();

router.post('/', (req, res) => RoomController.createRoom(req, res));

export default router;