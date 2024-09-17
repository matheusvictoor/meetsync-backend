import express from 'express';
import VoteController from '../controllers/voteController';

const router = express();

router.post('/', (req, res) => VoteController.createVotes(req, res));

export default router;