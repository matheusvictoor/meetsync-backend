
import express from "express";
import userRoutes from './routes/userRoutes';
import roomRoutes from "./routes/roomRoutes";

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

app.use('/api/room', roomRoutes);


app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json
})

export default app;

