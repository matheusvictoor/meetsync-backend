import app from './app';
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error";
import 'express-async-errors';
import cors from 'cors';
import { sendResultsToAllParticipants } from './utils/sendResultEmail';

dotenv.config();


// Middleware para habilitar CORS
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true 
}));

// Middleware para habilitar CORS em todas as rotas
app.options('*', cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Rota simples para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('API MeetSync Conectada!');
});

app.post('/email/:roomId', (req, res, next) => sendResultsToAllParticipants(req.params.roomId))

// Middleware de tratamento de erros
app.use(errorMiddleware);

const PORT  = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
