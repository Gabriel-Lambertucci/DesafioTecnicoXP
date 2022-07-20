// Configurando express

import routes from "./routes";
import express from "express";

require('express-async-errors');

const app = express();

app.use(express.json());

app.use(routes);

export default app;
