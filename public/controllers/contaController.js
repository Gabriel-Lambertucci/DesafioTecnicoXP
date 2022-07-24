"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contaService_1 = __importDefault(require("../services/contaService"));
const postSaque = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield contaService_1.default.postSaque(req.body.CodCliente, req.body.Valor, req.body.Senha);
    if (typeof response === 'string')
        return res.status(400).json({ message: response });
    return res.status(200).json({ message: 'Saque realizado com sucesso', Saque: req.body });
});
const postDeposito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield contaService_1.default.postDeposito(req.body.CodCliente, req.body.Valor, req.body.Senha);
    if (typeof response === 'string')
        return res.status(404).json({ message: response });
    return res.status(200).json({ message: 'Depósito realizado com sucesso', Deposito: req.body });
});
const getContaByClient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cliente = yield contaService_1.default.getContaByClient(parseInt(req.params.CodCliente, 10), req.body.Senha);
    if (typeof cliente === 'string')
        return res.status(404).json({ message: cliente });
    return res.status(200).json(...cliente);
});
exports.default = { postSaque, postDeposito, getContaByClient };
