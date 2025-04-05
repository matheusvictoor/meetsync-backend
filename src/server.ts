import app from './app';
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error";
import 'express-async-errors';
import cors from 'cors';
import { sendResultsToAllParticipants } from './utils/sendResultEmail';

dotenv.config();

// Configuração do CORS
const corsOptions = {
  origin: 'https://meetsync-pi.vercel.app', // Permitir apenas este domínio
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
};

app.use(cors(corsOptions));

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
