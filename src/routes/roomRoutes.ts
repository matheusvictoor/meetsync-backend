import express from 'express';
import RoomController from '../controllers/roomController';

const router = express();

router.get('/:roomId', (req, res) => RoomController.getRoom(req, res));

router.post('/', (req, res) => RoomController.createRoom(req, res));

router.delete('/:roomId', (req, res) => RoomController.deleteRoom(req, res));

export default router;