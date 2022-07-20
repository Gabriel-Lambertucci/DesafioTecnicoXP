import { Router } from 'express';
import investimentosController from '../controllers/investimentosController';
import investimentosMiddleware from '../middlewares/investimentosMiddleware';

const routes = Router();

routes.post('/investimentos/comprar', investimentosMiddleware.postComprarMiddleware ,investimentosController.postComprar,);
routes.post('/investimentos/vender', investimentosMiddleware.postVenderMiddleware ,investimentosController.postVender,);


export default routes;
