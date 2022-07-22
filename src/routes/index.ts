import { Router } from 'express';
import ativosController from '../controllers/ativosController';
import clientesController from '../controllers/clientesController';
import contaController from '../controllers/contaController';
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
routes.get('/ativos/:CodAtivo', ativosController.getByAtivo);
routes.get('/ativos/cliente/:CodCliente', ativosController.getByClient);
routes.post('/conta/saque', contaController.postSaque);
routes.post('/conta/deposito', contaController.postDeposito);
routes.get('/conta/:CodCliente', contaController.getContaByClient);

export default routes;
