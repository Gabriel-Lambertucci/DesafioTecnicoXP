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
const clientesService_1 = __importDefault(require("../services/clientesService"));
const postCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = yield clientesService_1.default.postCliente(req.body);
    if (!id)
        return res.status(404).json({ message: 'Usuário já Cadastrado' });
    return res.status(201).json({ CodCliente: id, Nome: req.body.Nome });
});
const getClientes = (__req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield clientesService_1.default.getClientes();
    const clientesResponse = clientes.map((item) => ({ CodCliente: item.CodCliente, Nome: item.UserName }));
    if (clientes.length === 0)
        return res.status(404).json({ message: 'Não há clientes cadastrados' });
    return res.status(200).json(clientesResponse);
});
exports.default = { postCliente, getClientes };
