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
const clientesModel_1 = __importDefault(require("../models/clientesModel"));
const contaModel_1 = __importDefault(require("../models/contaModel"));
const postCliente = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield clientesModel_1.default.getClientes();
    const existeCliente = clientes.some((item) => item.UserName === body.Nome);
    if (existeCliente)
        return false;
    const { insertId } = yield clientesModel_1.default.postCliente(body);
    yield contaModel_1.default.postConta(insertId);
    return insertId;
});
const getClientes = () => __awaiter(void 0, void 0, void 0, function* () {
    const clientes = yield clientesModel_1.default.getClientes();
    return clientes;
});
exports.default = { postCliente, getClientes };
