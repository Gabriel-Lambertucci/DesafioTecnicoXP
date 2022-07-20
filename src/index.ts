import app from './app';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`); /* eslint-disable-line */ // ignorando warning de lint para o console.log()
});
