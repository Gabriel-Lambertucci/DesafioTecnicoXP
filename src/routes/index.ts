import { Router } from 'express';
import ativosController from '../controllers/ativosController';
import clientesController from '../controllers/clientesController';
import contaController from '../controllers/contaController';
import investimentosController from '../controllers/investimentosController';
import loginController from '../controllers/loginController';
import clientesMiddleware from '../middlewares/clientesMiddleware';
import investimentosMiddleware from '../middlewares/investimentosMiddleware';

const routes = Router();

// Rotas de clientes:

routes.post('/cliente', clientesMiddleware.postClienteMiddleware, clientesController.postCliente);
routes.get('/clientes', clientesController.getClientes);

// Rotas de login:

routes.post('/login', clientesMiddleware.postClienteMiddleware, loginController.login);

// Rotas de investimentos:

routes.get('/investimentos', investimentosController.getInvestimentos);
routes.post('/investimentos/comprar', investimentosMiddleware.postComprarMiddleware, investimentosController.postComprar);
routes.post('/investimentos/vender', investimentosMiddleware.postVenderMiddleware, investimentosController.postVender);

// Rotas de ativos:

routes.get('/ativos', ativosController.getAtivos);
routes.get('/ativos/:CodAtivo', ativosController.getByAtivo);
routes.get('/ativos/cliente/:CodCliente', ativosController.getByClient);

// Rotas de conta:

routes.post('/conta/saque', contaController.postSaque);
routes.post('/conta/deposito', contaController.postDeposito);
routes.get('/conta/:CodCliente', contaController.getContaByClient);

export default routes;
