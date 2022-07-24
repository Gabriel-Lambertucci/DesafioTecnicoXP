import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import swaggerFile from './swagger.json';
import app from './app';

dotenv.config();

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

const PORT = process.env.PORT || process.env.MYSQL_PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`); /* eslint-disable-line */ // ignorando warning de lint para o console.log()
});
