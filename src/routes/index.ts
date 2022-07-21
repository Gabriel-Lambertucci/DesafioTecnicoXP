import { Router } from 'express';
import ativosController from '../controllers/ativosController';
import clientesController from '../controllers/clientesController';
import investimentosController from '../controllers/investimentosController';
import loginController from '../controllers/loginController';
import clientesMiddleware from '../middlewares/clientesMiddleware';
import investimentosMiddleware from '../middlewares/investimentosMiddleware';

const routes = Router();

routes.post('/investimentos/comprar', investimentosMiddleware.postComprarMiddleware, investimentosController.postComprar);
routes.post('/investimentos/vender', investimentosMiddleware.postVenderMiddleware, investimentosController.postVender);
routes.post('/user', clientesMiddleware.criarClienteMiddleware, clientesController.criarCliente);
routes.post('/login', clientesMiddleware.criarClienteMiddleware, loginController.login);
routes.get('/ativos', ativosController.getAtivos);
routes.get('/ativos/:CodCliente', ativosController.getByClient);

export default routes;
