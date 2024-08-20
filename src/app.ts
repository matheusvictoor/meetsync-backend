import express, { Request, Response, NextFunction } from 'express';
import { roomRouter } from './router/roomRouter';

const app = express();
app.use(express.json());

app.use('/room', roomRouter)

export default app;