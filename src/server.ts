import app from './app';
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error";
import 'express-async-errors';
import cors from 'cors';
import { sendResultsToAllParticipants } from './utils/sendResultEmail';

dotenv.config();

// Middleware para habilitar CORS
const allowedOrigins = [
  'http://localhost:5173', // Vite
  'http://localhost:3000',
  'https://meetsync.ddns.net',
  'https://meetsync-backend.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Permite requests sem Origin (como mobile/postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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
