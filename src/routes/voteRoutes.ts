import express from 'express';
import VoteController from '../controllers/voteController';

const router = express();

router.post('/', (req, res, next) => VoteController.createVotes(req, res, next));

export default router;