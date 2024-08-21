import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { roomRouter } from './router/roomRouter';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/room', roomRouter);

export default app;