import { Router } from 'express';
import clientesController from '../controllers/clientesController';
import investimentosController from '../controllers/investimentosController';
import clientesMiddleware from '../middlewares/clientesMiddleware';
import investimentosMiddleware from '../middlewares/investimentosMiddleware';

const routes = Router();

routes.post('/investimentos/comprar', investimentosMiddleware.postComprarMiddleware, investimentosController.postComprar);
routes.post('/investimentos/vender', investimentosMiddleware.postVenderMiddleware, investimentosController.postVender);
routes.post('/user', clientesMiddleware.criarClienteMiddleware, clientesController.criarCliente);

export default routes;
