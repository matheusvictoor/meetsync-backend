import express from "express";
import cors from 'cors';
import userRoutes from "./routes/userRoutes";
import roomRoutes from "./routes/roomRoutes";
import voteRoutes from "./routes/voteRoutes";

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'https://meetsync-pi.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

app.use('/api/users', userRoutes);

app.use('/api/room', roomRoutes);

app.use('/api/vote', voteRoutes);

export default app;

