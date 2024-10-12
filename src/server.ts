import app from './app';
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error";
import 'express-async-errors';
import cors from 'cors';  // Importa o middleware cors

dotenv.config();

// Rota simples para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('API MeetSync Conectada!');
});

app.use(cors({
  origin: 'https://meet-sync-six.vercel.app', // Permitir apenas este domínio
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true // Se você precisa enviar cookies ou cabeçalhos de autenticação
}));

// Middleware para habilitar CORS
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://meet-sync-six.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.sendStatus(204); // No Content
});

// Middleware de tratamento de erros
app.use(errorMiddleware);

const PORT  = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
