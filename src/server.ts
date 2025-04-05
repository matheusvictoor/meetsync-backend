import app from './app';
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error";
import 'express-async-errors';
import { sendResultsToAllParticipants } from './utils/sendResultEmail';

dotenv.config();

// Rota simples para verificar se o servidor está funcionando
app.get('/', (req, res) => {
  res.send('API MeetSync Conectada!');
});

app.post('/email/:roomId', (req, res, next) => sendResultsToAllParticipants(req.params.roomId))

app.options('*', (req, res, next) => {
  console.log('Requisição OPTIONS recebida:', req.headers);
  next();
});

// Middleware de tratamento de erros
app.use(errorMiddleware);

const PORT  = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
