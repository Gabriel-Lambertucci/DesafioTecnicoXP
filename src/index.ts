import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.MYSQL_PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`); /* eslint-disable-line */ // ignorando warning de lint para o console.log()
});
