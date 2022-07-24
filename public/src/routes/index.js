"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ativosController_1 = __importDefault(require("../controllers/ativosController"));
const clientesController_1 = __importDefault(require("../controllers/clientesController"));
const contaController_1 = __importDefault(require("../controllers/contaController"));
const investimentosController_1 = __importDefault(require("../controllers/investimentosController"));
const loginController_1 = __importDefault(require("../controllers/loginController"));
const clientesMiddleware_1 = __importDefault(require("../middlewares/clientesMiddleware"));
const investimentosMiddleware_1 = __importDefault(require("../middlewares/investimentosMiddleware"));
const routes = (0, express_1.Router)();
// Rotas de clientes:
routes.post('/cliente', clientesMiddleware_1.default.postClienteMiddleware, clientesController_1.default.postCliente);
routes.get('/clientes', clientesController_1.default.getClientes);
// Rotas de login:
routes.post('/login', clientesMiddleware_1.default.postClienteMiddleware, loginController_1.default.login);
// Rotas de investimentos:
routes.get('/investimentos', investimentosController_1.default.getInvestimentos);
routes.post('/investimentos/comprar', investimentosMiddleware_1.default.postComprarMiddleware, investimentosController_1.default.postComprar);
routes.post('/investimentos/vender', investimentosMiddleware_1.default.postVenderMiddleware, investimentosController_1.default.postVender);
// Rotas de ativos:
routes.get('/ativos', ativosController_1.default.getAtivos);
routes.get('/ativos/:CodAtivo', ativosController_1.default.getByAtivo);
routes.get('/ativos/cliente/:CodCliente', ativosController_1.default.getByClient);
// Rotas de conta:
routes.post('/conta/saque', contaController_1.default.postSaque);
routes.post('/conta/deposito', contaController_1.default.postDeposito);
routes.get('/conta/:CodCliente', contaController_1.default.getContaByClient);
exports.default = routes;
