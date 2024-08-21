import app from './app';
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Servidor monitorando a porta ${port}.`);
  console.log(`The connection URL is ${process.env.DATABASE_URL}`);
});