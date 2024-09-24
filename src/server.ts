import app from './app'
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error";
import 'express-async-errors'

dotenv.config();

app.get('/', (req, res) => {
  res.send('API MeetSync Conectada!')
})

app.use(errorMiddleware);

const PORT  = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
