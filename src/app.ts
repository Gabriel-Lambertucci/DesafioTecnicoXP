// Configurando express

import express from 'express';
import routes from './routes';
import errorMiddleware from './middlewares/errorMiddleware';

require('express-async-errors');

const app = express();

app.use(express.json());

app.use(errorMiddleware);

app.use(routes);

export default app;
