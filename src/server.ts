import app from './app';
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error";
import 'express-async-errors';
import { sendResultsToAllParticipants } from './utils/sendResultEmail';

dotenv.config();

// Configuração do CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://meetsync-pi.vercel.app");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    return res.sendStatus(200);
  }
  next();
});

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
