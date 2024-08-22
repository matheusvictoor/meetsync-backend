import app from './app'
import dotenv from "dotenv";

dotenv.config();

app.get('/', (req, res) => {
  res.send('API MeetSync Conectada!')
})

const PORT  = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})