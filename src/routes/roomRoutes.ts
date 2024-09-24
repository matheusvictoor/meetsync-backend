import express from 'express';
import RoomController from '../controllers/roomController';

const router = express();

router.get('/:roomId', (req, res, next) => RoomController.getRoom(req, res, next));

router.post('/', (req, res, next) => RoomController.createRoom(req, res, next));

router.delete('/:roomId', (req, res, next) => RoomController.deleteRoom(req, res, next));

export default router;